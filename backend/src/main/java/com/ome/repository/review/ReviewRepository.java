package com.ome.repository.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.domain.Recipe;
import com.ome.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	Page<Review> findAllByRecipe(Recipe recipe, Pageable pageable);

}
