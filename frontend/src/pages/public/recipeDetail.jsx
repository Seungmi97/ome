import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '@/services/recipeAPI';
import CommentSection from '@/components/Comment/CommentSection';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        const response = await getRecipeDetail(recipeId);
        setRecipe(response.data);
      } catch {
        setError('레시피를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeData();
  }, [recipeId]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-gray-500'>레시피를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-red-500'>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-gray-500'>레시피를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto my-8 p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          {recipe.title}
        </h1>

        <div className="flex items-center mb-6 text-gray-600">
          <span>
            By <span className="font-semibold text-gray-800">{recipe.writerNickname}</span> · {recipe.createdAt?.split(' ')[0]}
          </span>
        </div>

        {recipe.imageUrls?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {recipe.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`레시피 이미지 ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
            ))}
          </div>
        )}

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-4 md:gap-8 justify-center text-center mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              카테고리
            </p>
            <p className="text-2xl font-bold text-gray-800">{recipe.category}</p>
          </div>
          <div className="border-l border-gray-200"></div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              프리미엄 여부
            </p>
            <p className="text-2xl font-bold text-amber-600">
              {recipe.isPremium === 'premium' ? '유료' : '무료'}
            </p>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-amber-800 border-b-2 border-amber-200 pb-2">
            재료
          </h2>
          <ul className="space-y-3 text-gray-700">
            {recipe.ingredients ? (
              recipe.ingredients.split(',').map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.trim()}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">재료 정보가 없습니다.</li>
            )}
          </ul>
        </div>

        <div className="md:col-span-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
            조리 방법
          </h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {recipe.content || '조리 방법이 없습니다.'}
          </p>
        </div>

        {/* 대표 이미지 */}
        {recipe.imageUrls?.[0] && (
          <div className="mb-8">
            <img
              src={recipe.imageUrls[0]}
              alt="대표 이미지"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* 나머지 이미지 */}
        {recipe.imageUrls?.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {recipe.imageUrls.slice(1).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`레시피 이미지 ${index + 2}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        )}

        <div className="text-sm text-gray-400 mt-8 text-right">
          마지막 수정일: {recipe.updatedAt?.split(' ')[0]}
        </div>

        {/* 댓글 영역 */}
        <CommentSection recipeId={recipe.recipeId} />
      </div>
    </div>
  );
};

export default RecipeDetail;
