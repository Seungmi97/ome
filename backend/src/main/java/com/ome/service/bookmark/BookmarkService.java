package com.ome.service.bookmark;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ome.common.enums.TargetType;
import com.ome.domain.Bookmark;
import com.ome.domain.Media;
import com.ome.domain.Recipe;
import com.ome.domain.Users;
import com.ome.dto.recipe.response.RecipeBookmarkDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.bookmark.BookmarkRepository;
import com.ome.repository.recipe.MediaRepository;
import com.ome.repository.recipe.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final MediaRepository mediaRepository;

    /**
     * 북마크 추가
     * @param userId
     * @param recipeId
     */
    public void addBookmark(Long userId, Long recipeId) {
        Users user = userRepository.findWithBookmarksById(userId) //user정보와 bookmarks컬렉션을 같이 가져오기(db세션이 닫혀서 Lazy로딩불가)
            .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));
        
        Recipe recipe = recipeRepository.findWithBookmarksByRecipeId(recipeId)
            .orElseThrow(() -> new RuntimeException("레시피가 존재하지 않습니다."));

        if (bookmarkRepository.existsByUserAndRecipe(user, recipe)) {
            throw new RuntimeException("이미 북마크 되었습니다.");
        }

        Bookmark bookmark = new Bookmark();
        user.addBookmark(bookmark);      // 양방향 연관관계 정리
        recipe.addBookmark(bookmark);

        bookmarkRepository.save(bookmark);
    }

    /**
     * 북마크 취소
     * @param userId
     * @param recipeId
     */
    public void removeBookmark(Long userId, Long recipeId) {
        Users user = userRepository.findWithBookmarksById(userId)
            .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));
        Recipe recipe = recipeRepository.findWithBookmarksByRecipeId(recipeId)
            .orElseThrow(() -> new RuntimeException("레시피가 존재하지 않습니다."));

        Bookmark bookmark = bookmarkRepository.findByUserAndRecipe(user, recipe)
            .orElseThrow(() -> new RuntimeException("북마크가 되지 않았습니다."));

        // 연관관계 끊기
        user.removeBookmark(bookmark);
        recipe.removeBookmark(bookmark);

        bookmarkRepository.delete(bookmark);
    }

    /**
     * 북마크한 레시피 목록 조회
     * @param userId
     * @return RecipeBookmarkDto 리스트
     */
    public List<RecipeBookmarkDto> getBookmarkedRecipeDtos(Long userId) {

        List<Bookmark> bookmarks = bookmarkRepository.findAllByUserIdWithRecipeAndWriter(userId);

        return bookmarks.stream()
            .map(Bookmark::getRecipe)
            .map((Recipe recipe) -> {
                List<Media> mediaList = mediaRepository
                        .findByTargetTypeAndTargetIdOrderBySeqAsc(TargetType.RECIPE, recipe.getRecipeId());

                return RecipeBookmarkDto.fromEntity(recipe, mediaList);
            })
            .collect(Collectors.toList());
    }
    
    
    /**
     * 북마크 여부 확인
     * @param userId
     * @param recipeId
     * @return
     */
    public boolean isBookmarked(Long userId, Long recipeId) {
        Users user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Recipe recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new RuntimeException("레시피 없음"));

        return bookmarkRepository.existsByUserAndRecipe(user, recipe);
    }
    
}