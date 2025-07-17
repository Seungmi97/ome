package com.ome;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MyOmePlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyOmePlatformApplication.class, args);
	}

}
