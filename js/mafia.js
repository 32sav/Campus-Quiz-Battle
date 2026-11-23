// mafia.js - Mafia Game Engine, Participant Registry & Lorde Shuffle Controller

const MafiaEngine = {
  // Roles specification
  ROLES: {
    IMPOSTER: {
      name: "Imposter",
      badgeClass: "badge-imposter",
      team: "Imposters",
      color: "#f87171",
      description: "Infiltrate the Village crew, blend in, and eliminate players without getting detected during the daily vote.",
      pointsWin: 160,
      pointsLose: 25
    },
    CHIEF: {
      name: "The Chief",
      badgeClass: "badge-chief",
      team: "Village",
      color: "#facc15",
      description: "Leader of the village inquiry. During each night round, inspect one player to learn if they are an Imposter.",
      pointsWin: 130,
      pointsLose: 20
    },
    DOCTOR: {
      name: "Doctor",
      badgeClass: "badge-doctor",
      team: "Village",
      color: "#38bdf8",
      description: "Medical specialist. Each night phase, select one player to protect from being eliminated by Imposters.",
      pointsWin: 125,
      pointsLose: 20
    },
    VILLAGER: {
      name: "Villager",
      badgeClass: "badge-villager",
      team: "Village",
      color: "#4ade80",
      description: "Honest campus crew member. Use deduction, observation, and debate during daytime trials to catch Imposters.",
      pointsWin: 100,
      pointsLose: 10
    }
  },

  // State managed by Lorde
  state: {
    sessionTitle: "Friday Night Mafia: Library Common Hall",
    location: "2nd Floor Study Room B",
    status: "REGISTRATION", // REGISTRATION, ROLES_ASSIGNED, IN_PROGRESS, COMPLETED
    participants: [
      { id: 1, name: "Alex Rivera", email: "alex.rivera@campus.edu", role: null, status: "Alive" },
      { id: 2, name: "Marcus Wright", email: "marcus.w@campus.edu", role: null, status: "Alive" },
      { id: 3, name: "Elena Rostova", email: "elena.r@campus.edu", role: null, status: "Alive" },
      { id: 4, name: "David Kim", email: "david.k@campus.edu", role: null, status: "Alive" },
      { id: 5, name: "Sarah Jenkins", email: "sarah.j@campus.edu", role: null, status: "Alive" },
      { id: 6, name: "Jordan Taylor", email: "jordan.t@campus.edu", role: null, status: "Alive" },
      { id: 7, name: "Maya Patel", email: "maya.p@campus.edu", role: null, status: "Alive" },
      { id: 8, name: "Liam Chen", email: "liam.c@campus.edu", role: null, status: "Alive" }
    ],
    winningTeam: null
  },

  // Compute exact role breakdown according to user specifications:
  // Imposters: range of 2 to 5 according to crew size
  // Chief: 1
  // Doctor: scales with crew size (1 for small/medium, 2 for large crew)
  // Villagers: remaining majority
  calculateRoleQuotas(total) {
    let imposterCount = 2;
    let doctorCount = 1;
    let chiefCount = 1;

    if (total <= 7) {
      imposterCount = 2;
      doctorCount = 1;
    } else if (total <= 11) {
      imposterCount = 2;
      doctorCount = 1;
    } else if (total <= 14) {
      imposterCount = 3;
      doctorCount = 1;
    } else if (total <= 18) {
      imposterCount = 4;
      doctorCount = 2;
    } else {
      imposterCount = 5;
      doctorCount = 2;
    }

    const villagerCount = Math.max(1, total - (imposterCount + chiefCount + doctorCount));
    return {
      total,
      imposterCount,
      chiefCount,
      doctorCount,
      villagerCount
    };
  },

  // Register a participant (Lorde action)
  registerParticipant(name, email) {
    if (!name.trim()) return false;
    const newId = this.state.participants.length > 0 ? Math.max(...this.state.participants.map(p => p.id)) + 1 : 1;
    this.state.participants.push({
      id: newId,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@campus.edu`,
      role: null,
      status: "Alive"
    });
    this.render();
    return true;
  },

  // Remove participant
  removeParticipant(id) {
    this.state.participants = this.state.participants.filter(p => p.id !== id);
    this.render();
  },

  // Automatic Role Shuffle via Fisher-Yates
  shuffleRoles() {
    const total = this.state.participants.length;
    if (total < 5) {
      alert("At least 5 participants are required to distribute Mafia roles.");
      return false;
    }

    const quotas = this.calculateRoleQuotas(total);
    const pool = [];

    for (let i = 0; i < quotas.imposterCount; i++) pool.push("IMPOSTER");
    for (let i = 0; i < quotas.chiefCount; i++) pool.push("CHIEF");
    for (let i = 0; i < quotas.doctorCount; i++) pool.push("DOCTOR");
    for (let i = 0; i < quotas.villagerCount; i++) pool.push("VILLAGER");

    // Fisher-Yates shuffle algorithm
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Assign to participants
    this.state.participants.forEach((p, idx) => {
      const roleKey = pool[idx] || "VILLAGER";
      p.role = this.ROLES[roleKey];
    });

    this.state.status = "ROLES_ASSIGNED";
    this.render();
    return true;
  },

  // End match and calculate score distribution
  recordMatchOutcome(winningFaction) {
    this.state.winningTeam = winningFaction;
    this.state.status = "COMPLETED";

    const ledger = this.state.participants.map(p => {
      const isWinner = p.role ? p.role.team === winningFaction : false;
      const pts = p.role ? (isWinner ? p.role.pointsWin : p.role.pointsLose) : 0;
      return {
        name: p.name,
        role: p.role ? p.role.name : "Villager",
        team: p.role ? p.role.team : "Village",
        outcome: isWinner ? "Victory" : "Defeat",
        pointsAwarded: pts
      };
    });

    return ledger;
  },

  // Lorde UI rendering helper
  render() {
    const total = this.state.participants.length;
    const quotas = this.calculateRoleQuotas(total);

    // Update count labels
    const countEl = document.getElementById("playerCountLabel");
    if (countEl) countEl.textContent = `${total} Registered Crew`;

    const quotasEl = document.getElementById("roleQuotasContainer");
    if (quotasEl) {
      quotasEl.innerHTML = `
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
          <div><span class="mafia-badge badge-imposter">${quotas.imposterCount} Imposters</span> <span style="font-size: 0.85rem; color: #94a3b8;">(2 to 5 scale)</span></div>
          <div><span class="mafia-badge badge-chief">${quotas.chiefCount} The Chief</span> <span style="font-size: 0.85rem; color: #94a3b8;">(Village Leader)</span></div>
          <div><span class="mafia-badge badge-doctor">${quotas.doctorCount} Doctor</span> <span style="font-size: 0.85rem; color: #94a3b8;">(Varies by crew)</span></div>
          <div><span class="mafia-badge badge-villager">${quotas.villagerCount} Villagers</span> <span style="font-size: 0.85rem; color: #94a3b8;">(Majority Crew)</span></div>
        </div>
      `;
    }

    // Render roster table
    const tableBody = document.getElementById("lordeRosterBody");
    if (tableBody) {
      tableBody.innerHTML = this.state.participants.map((p, index) => {
        let roleBadge = `<span style="color: #94a3b8; font-size: 0.85rem; font-style: italic;">Not yet shuffled</span>`;
        let teamText = `--`;
        if (p.role) {
          roleBadge = `<span class="mafia-badge ${p.role.badgeClass}">${p.role.name}</span>`;
          teamText = p.role.team === "Imposters" ? `<span style="color: #f87171; font-weight: 600;">Imposters</span>` : `<span style="color: #4ade80; font-weight: 600;">Village Crew</span>`;
        }

        return `
          <tr>
            <td><strong>${index + 1}. ${p.name}</strong></td>
            <td style="color: #94a3b8;">${p.email}</td>
            <td>${roleBadge}</td>
            <td>${teamText}</td>
            <td>
              <span style="color: #4ade80;">● Alive</span>
              <button onclick="MafiaEngine.removeParticipant(${p.id})" style="background: none; border: none; color: #ef4444; margin-left: 0.75rem; cursor: pointer;" title="Remove player">✕</button>
            </td>
          </tr>
        `;
      }).join("");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lordeRosterBody")) {
    MafiaEngine.render();
  }
});
