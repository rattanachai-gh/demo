package com.tonggaw.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tonggaw.demo.entity.User;
import com.tonggaw.demo.record.LoginReq;
import com.tonggaw.demo.record.RegReq;
import com.tonggaw.demo.security.CustomUserDetails;
import com.tonggaw.demo.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private SecurityContextRepository securityContextRepository;

    @Autowired
    public void setSecurityContextRepository(SecurityContextRepository securityContextRepository) {
        this.securityContextRepository = securityContextRepository;
    }

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegReq regReq) {
        User user = this.userService.registerUser(regReq);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully", "username", user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginReq loginRequest,
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    )
            );

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            System.out.println("Before save, session id = " + request.getSession().getId());
            this.securityContextRepository.saveContext(context, request, response);
            System.out.println("After save, auth = " + SecurityContextHolder.getContext().getAuthentication());
            System.out.println("After save, session id = " + request.getSession().getId());
            System.out.println("Session SPRING_SECURITY_CONTEXT = " +
                request.getSession().getAttribute("SPRING_SECURITY_CONTEXT"));

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(Map.of(
                    "message", "Login success",
                    "username", userDetails.getUsername()
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication, HttpServletRequest request) {
        System.out.println("ME session id = " + request.getSession(false));
       
        if (request.getSession(false) != null) {
            System.out.println("ME session id = " + request.getSession(false).getId());
            System.out.println("ME SPRING_SECURITY_CONTEXT = " +
                request.getSession(false).getAttribute("SPRING_SECURITY_CONTEXT"));
        }
        System.out.println("AuthController.getCurrentUser: " + authentication);

        if (authentication == null ||
            !authentication.isAuthenticated() ||
            authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                Map.of("authenticated", false, "message", "User is not authenticated")
            );
        }

        return ResponseEntity.ok(
            Map.of("authenticated", true, "username", authentication.getName())
        );
    }


}