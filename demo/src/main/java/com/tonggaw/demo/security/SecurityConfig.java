package com.tonggaw.demo.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tonggaw.demo.service.CustomUserDetailsService;


@Configuration
@EnableMethodSecurity
public class SecurityConfig {



	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, SecurityContextRepository securityContextRepository) throws Exception {
		
		PathPatternRequestMatcher loginPathMatcher = PathPatternRequestMatcher.pathPattern("/auth/login");
		PathPatternRequestMatcher registerPathMatcher = PathPatternRequestMatcher.pathPattern("/auth/register");
		HeaderWriterLogoutHandler clearSiteData = new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(Directive.ALL));
		http	.securityContext(securityContext -> securityContext
													.securityContextRepository(securityContextRepository)
        		)
				.csrf(csrf -> csrf.csrfTokenRepository(new HttpSessionCsrfTokenRepository())
								 
								  .requireCsrfProtectionMatcher(registerPathMatcher)
								  .requireCsrfProtectionMatcher(loginPathMatcher)
				)
				.cors((cors) -> cors
						.configurationSource(apiConfigurationSource())
				)
				
				.authorizeHttpRequests(auth -> auth
                		.requestMatchers("/auth/login", "/auth/register", "/api/csrf", "/error").permitAll()
                		.requestMatchers(HttpMethod.GET, "/auth/me").authenticated()
                		.anyRequest().authenticated()
            	)
				.logout(logout -> logout
					.logoutUrl("/auth/logout")
					.addLogoutHandler(clearSiteData)
					.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
					.permitAll()
				);
		
		return http.build();

	}

	@Bean
	public SecurityContextRepository securityContextRepository() {
		return new HttpSessionSecurityContextRepository();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(customUserDetailsService());
		
		authProvider.setPasswordEncoder(passwordEncoder());
		
		return authProvider;
	}
	
	@Bean
	CustomUserDetailsService customUserDetailsService() {
		return new CustomUserDetailsService();
	}
	
	UrlBasedCorsConfigurationSource apiConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200",
        "http://192.168.1.112:4200",
        "https://localhost:4200",
        "https://192.168.1.112:4200"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization","Content-Type","X-CSRF-TOKEN"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}