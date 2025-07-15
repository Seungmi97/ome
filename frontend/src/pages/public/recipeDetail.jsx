import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../services/recipeAPI.js'; // API 호출 함수

const RecipeDetail = () => {
    // URL 파라미터에서 레시피 ID 추출
    const { recipeId } = useParams();
    // 상태 관리 (데이터,로딩,에러)
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 데이터 로딩
    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                setLoading(true);
                const data = await getRecipeDetail(recipeId);
                setRecipe(data);
            } catch (err) {
                setError(err.message || '레시피를 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeData();
    }, [recipeId]); // recipeId가 바뀔때마다 다시 실행 

    // loading UI
    if (loading) {
        return( 
        <div className='flex justify-center items-center h-screen'>
            <p className='text-center text-gray-500'>레시피를 불러오는 중입니다...</p> 
        </div>
        );
    }
    // error UI
    if (error) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-center text-red-500'>{error}</p>
            </div>
        );
    }
    // 데이터 없을 때 UI
    if (!recipe) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-center text-gray-500'>레시피를 찾을 수 없습니다.</p>
            </div>
        );
    }
    // 데이터 로딩 성공 시 UI
    return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto my-8 p-4 md:p-8">
        {/* 레시피 제목 */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          {recipe.title}
        </h1>

        {/* 작성자 정보 */}
      {recipe.author?.name && (
        <div className="flex items-center mb-6 text-gray-600">
          <span>
            By <span className="font-semibold text-gray-800">{recipe.author.name}</span>
          </span>
        </div>
      )}

      {/* 이미지 */}
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
        />
      )}


        {/* 레시피 설명 */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {recipe.description}
        </p>

        {/* 시간 정보 (준비, 조리, 총 시간) */}
        <div className="flex flex-wrap gap-4 md:gap-8 justify-center text-center mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              준비 시간
            </p>
            <p className="text-2xl font-bold text-gray-800">{recipe.prepTime}분</p>
          </div>
          <div className="border-l border-gray-200"></div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              조리 시간
            </p>
            <p className="text-2xl font-bold text-gray-800">{recipe.cookTime}분</p>
          </div>
          <div className="border-l border-gray-200"></div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              총 시간
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {recipe.prepTime + recipe.cookTime}분
            </p>
          </div>
        </div>

        {/* 재료 섹션 */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-amber-800 border-b-2 border-amber-200 pb-2">
            재료
          </h2>
          <ul className="space-y-3 text-gray-700">
            {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="font-medium text-gray-600">{item.amount}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">재료 정보가 없습니다.</li>
            )}
          </ul>
        </div>

        {/* 조리 방법 섹션 */}
        <div className="md:col-span-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
            조리 방법
          </h2>
          <ol className="space-y-6">
            {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
              recipe.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="flex-1 pt-1 text-gray-800 leading-relaxed">{step}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-400">조리 방법이 없습니다.</li>
            )}
          </ol>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
            댓글
          </h2>
          {/* 댓글 입력 폼 */}
          <div className="mb-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              rows="4"
              placeholder="댓글을 입력하세요..."
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                등록하기
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {/* 예시 댓글 */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">사용자 이름</span>
                <span className="text-sm text-gray-500">2025-07-15</span>
              </div>
              <p className="text-gray-700">정말 좋은 레시피네요!</p>
              <div className="flex justify-end gap-2 mt-2 text-sm">
                <button className="text-gray-500 hover:text-gray-700">수정</button>
                <button className="text-red-500 hover:text-red-700">신고</button>
              </div>
            </div>
            {/* 다른 댓글들... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;