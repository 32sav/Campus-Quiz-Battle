package com.campusquizbattle.service;

import com.campusquizbattle.dto.AuthDto;
import com.campusquizbattle.exception.BadRequestException;
import com.campusquizbattle.model.User;
import com.campusquizbattle.repository.UserRepository;
import com.campusquizbattle.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .userId(1L)
                .name("Alex Student")
                .email("alex@campus.edu")
                .passwordHash("hashed_secret")
                .role("STUDENT")
                .build();
    }

    @Test
    @DisplayName("Register new user successfully")
    void testRegisterSuccess() {
        AuthDto.RegisterRequest request = AuthDto.RegisterRequest.builder()
                .name("Alex Student")
                .email("alex@campus.edu")
                .password("password123")
                .role("STUDENT")
                .build();

        when(userRepository.existsByEmail("alex@campus.edu")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashed_secret");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(tokenProvider.generateToken("alex@campus.edu", "STUDENT", 1L)).thenReturn("mock.jwt.token");

        AuthDto.AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("Alex Student", response.getName());
        assertEquals("alex@campus.edu", response.getEmail());
        assertEquals("STUDENT", response.getRole());
        assertEquals("mock.jwt.token", response.getToken());
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("Register with duplicate email throws BadRequestException")
    void testRegisterDuplicateEmail() {
        AuthDto.RegisterRequest request = AuthDto.RegisterRequest.builder()
                .name("Alex Duplicate")
                .email("alex@campus.edu")
                .password("password123")
                .build();

        when(userRepository.existsByEmail("alex@campus.edu")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Login with valid credentials returns JWT token")
    void testLoginSuccess() {
        AuthDto.LoginRequest request = AuthDto.LoginRequest.builder()
                .email("alex@campus.edu")
                .password("password123")
                .build();

        when(userRepository.findByEmail("alex@campus.edu")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("password123", "hashed_secret")).thenReturn(true);
        when(tokenProvider.generateToken("alex@campus.edu", "STUDENT", 1L)).thenReturn("mock.jwt.token");

        AuthDto.AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mock.jwt.token", response.getToken());
        assertEquals(1L, response.getUserId());
    }

    @Test
    @DisplayName("Login with incorrect password throws BadRequestException")
    void testLoginIncorrectPassword() {
        AuthDto.LoginRequest request = AuthDto.LoginRequest.builder()
                .email("alex@campus.edu")
                .password("wrongpassword")
                .build();

        when(userRepository.findByEmail("alex@campus.edu")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("wrongpassword", "hashed_secret")).thenReturn(false);

        assertThrows(BadRequestException.class, () -> authService.login(request));
    }
}
