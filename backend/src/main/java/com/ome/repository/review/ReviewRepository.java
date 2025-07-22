package com.ome.repository.review;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
