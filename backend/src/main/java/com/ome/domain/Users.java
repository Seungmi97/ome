package com.ome.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Builder;
import lombok.AllArgsConstructor;


@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, length = 100, unique = true)
    private String userId; // 로그인 ID

    @Column(nullable = false, length = 100)
    private String username; // 닉네임

    @Column(nullable = false, length = 200)
    private String password;

    @Column(nullable = false, length = 200)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private boolean approved = false;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false) 
    private CreatorStatus creatorStatus;

    // 연관관계: 1:1 Membership
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Membership membership;

    // 연관관계: 1:N Recipes
    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Recipe> recipes = new ArrayList<>();
    
    // 연관관계: 1:N Bookmarks
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bookmark> bookmarks = new ArrayList<>();
 

    // 헬퍼 메서드 (멤버쉽 자동 추가)
    public void setMembership(Membership membership) {
        this.membership = membership;
        if (membership.getUser() != this) {
            membership.setUser(this);
        }
    }

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    
    public void addRecipe(Recipe recipe) {
        this.recipes.add(recipe);
        recipe.setWriter(this);
    }
    
    public void addBookmark(Bookmark bookmark) {
        bookmarks.add(bookmark);
        bookmark.setUser(this);
    }
    
    public void removeBookmark(Bookmark bookmark) {
        bookmarks.remove(bookmark);
        bookmark.setUser(null);
    }

}
