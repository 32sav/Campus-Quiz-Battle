package com.campusquizbattle;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class CampusQuizBattleApplicationTests {

    @Test
    @DisplayName("Verify Spring application context loads successfully")
    void contextLoads() {
        // Verifies Spring context, JPA repositories, controllers, security configuration and services bootstrap cleanly
    }
}
