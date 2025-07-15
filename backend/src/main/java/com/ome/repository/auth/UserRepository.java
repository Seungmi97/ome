package com.ome.repository.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.domain.Users;



@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	Optional<Users> findByUserId( String userId);
	Optional<Users> findByEmail(String email);
	boolean existsByUserId(String userId);
	boolean existsByEmail(String email);

}
