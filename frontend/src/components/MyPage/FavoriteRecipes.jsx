import React, { useState } from 'react';
import { Heart, Clock, Users, ChefHat, ExternalLink, Trash2 } from 'lucide-react';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([
    {
      id: 1,
      title: "김치찌개",
      author: "김요리사",
      image: "🍲",
      difficulty: "중급",
      cookingTime: "30분",
      servings: 4,
      likes: 1250,
      savedDate: "2024.01.15"
    },
    {
      id: 2,
      title: "크림파스타",
      author: "박셰프",
      image: "🍝",
      difficulty: "초급",
      cookingTime: "20분",
      servings: 2,
      likes: 890,
      savedDate: "2024.01.20"
    },
    {
      id: 3,
      title: "마라샹궈",
      author: "이마스터",
      image: "🌶️",
      difficulty: "고급",
      cookingTime: "45분",
      servings: 3,
      likes: 1680,
      savedDate: "2024.01.18"
    }
  ]);

  // 사용자 여정: 레시피 상세 보기
  const handleViewRecipe = (recipeId) => {
    const recipe = favoriteRecipes.find(r => r.id === recipeId);
    if (recipe) {
      const confirmView = window.confirm(`'${recipe.title}' 레시피 상세 페이지로 이동하시겠습니까?`);
      if (confirmView) {
        // 실제로는 router.push(`/recipe/${recipeId}`) 같은 방식으로 구현
        window.open(`/recipe/${recipeId}`, '_blank');
      }
    }
  };

  // 사용자 여정: 찜 해제
  const handleRemoveFavorite = (recipeId) => {
    const recipe = favoriteRecipes.find(r => r.id === recipeId);
    if (recipe) {
      const confirmRemove = window.confirm(
        `정말로 '${recipe.title}'을(를) 찜 목록에서 제거하시겠습니까?\n\n제거 후에는:\n- 찜한 레시피 목록에서 사라집니다\n- 언제든 다시 찜할 수 있습니다`
      );
      
      if (confirmRemove) {
        // API 호출 시뮬레이션
        setTimeout(() => {
          setFavoriteRecipes(prev => prev.filter(r => r.id !== recipeId));
          alert(`'${recipe.title}'이(가) 찜 목록에서 제거되었습니다.`);
        }, 500);
      }
    }
  };

  // 요리 시작하기 (새로운 기능)
  const handleStartCooking = (recipeId) => {
    const recipe = favoriteRecipes.find(r => r.id === recipeId);
    if (recipe) {
      const confirmStart = window.confirm(`'${recipe.title}' 요리를 시작하시겠습니까?\n\n요리 모드로 진입합니다:\n- 단계별 안내\n- 타이머 기능\n- 재료 체크리스트`);
      if (confirmStart) {
        window.open(`/recipe/${recipeId}/cooking`, '_blank');
      }
    }
  };

  // 빈 상태 처리
  if (favoriteRecipes.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">찜한 레시피가 없습니다</h3>
          <p className="text-gray-500 mb-6">마음에 드는 레시피를 찜해보세요!</p>
          <button 
            onClick={() => window.open('/recipes', '_blank')}
            className="bg-ome-primary text-white px-6 py-3 rounded-lg hover:bg-ome-primary/90 transition-colors font-medium"
          >
            레시피 둘러보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">찜한 레시피</h2>
        <div className="text-sm text-gray-500">
          총 {favoriteRecipes.length}개의 레시피를 찜했습니다
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* 레시피 이미지 영역 */}
            <div className="relative bg-gradient-to-br from-ome-primary/20 to-ome-secondary/20 h-48 flex items-center justify-center">
              <span className="text-6xl">{recipe.image}</span>
              <button
                onClick={() => handleRemoveFavorite(recipe.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                title="찜 해제"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </button>
            </div>

            {/* 레시피 정보 영역 */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {recipe.author}</p>

              {/* 레시피 상세 정보 */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{recipe.cookingTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{recipe.servings}인분</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChefHat className="w-3 h-3" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{recipe.likes.toLocaleString()}</span>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="space-y-2">
                <button
                  onClick={() => handleStartCooking(recipe.id)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-ome-primary text-white rounded-lg hover:bg-ome-primary/90 transition-colors font-medium"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>요리 시작하기</span>
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>상세보기</span>
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(recipe.id)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>찜 해제</span>
                  </button>
                </div>
              </div>

              {/* 찜한 날짜 */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">찜한 날짜: {recipe.savedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더 많은 레시피 찾기 섹션 */}
      <div className="mt-8 p-6 bg-gradient-to-r from-ome-primary/10 to-ome-secondary/10 rounded-xl border border-ome-primary/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">더 많은 레시피를 찾아보세요!</h3>
          <p className="text-gray-600 mb-4">새로운 맛의 세계를 탐험해보세요.</p>
          <button 
            onClick={() => window.open('/recipes', '_blank')}
            className="bg-ome-primary text-white px-6 py-2 rounded-lg hover:bg-ome-primary/90 transition-colors font-medium"
          >
            레시피 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteRecipes; 