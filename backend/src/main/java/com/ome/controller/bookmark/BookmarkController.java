package com.ome.controller.bookmark;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.common.enums.TargetType;
import com.ome.domain.Media;
import com.ome.domain.Recipe;
import com.ome.dto.recipe.response.RecipeBookmarkDto;
import com.ome.dto.recipe.response.RecipeResponseDto;
import com.ome.repository.recipe.MediaRepository;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.bookmark.BookmarkService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;


    /**
     * 북마크 등록
     * @param recipeId
     * @param userDetails
     * @return
     */
    @PostMapping("/{recipeId}")
    public ResponseEntity<?> addBookmark(@PathVariable Long recipeId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        bookmarkService.addBookmark(userDetails.getId(), recipeId);
        return ResponseEntity.ok("북마크 추가 완료");
    }

    /**
     * 북마크 취소
     * @param recipeId
     * @param userDetails
     * @return
     */
    @DeleteMapping("/{recipeId}")
    public ResponseEntity<?> removeBookmark(@PathVariable Long recipeId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        bookmarkService.removeBookmark(userDetails.getId(), recipeId);
        return ResponseEntity.ok("북마크 취소 완료");
    }

    /**
     * 북마크한 레시피 목록 조회
     * @param userDetails
     * @return
     */
    @GetMapping
    public ResponseEntity<List<RecipeBookmarkDto>> getBookmarks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<RecipeBookmarkDto> response = bookmarkService.getBookmarkedRecipeDtos(userDetails.getId());
        return ResponseEntity.ok(response);
    }
    
    /**
     * 북마크 여부 확인
     * @param recipeId
     * @param userDetails
     * @return
     */
    @GetMapping("/{recipeId}/exists")
    public ResponseEntity<Boolean> isBookmarked(
            @PathVariable Long recipeId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        boolean exists = bookmarkService.isBookmarked(userDetails.getId(), recipeId);
        return ResponseEntity.ok(exists);
    }
    
    
}