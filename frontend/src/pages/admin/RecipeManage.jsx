import { useEffect, useState } from 'react';
import { getRecipeList, deleteRecipe } from '@/services/recipeAPI';

export default function RecipeManage() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  const fetchRecipes = () => {
    getRecipeList({ page, size: 10, keyword })
      .then((res) => {
        console.log('📦', res.data);
        setRecipes(res.data.content);
        setTotalPages(res.data.totalPages);
        setSelected([]);
      })
      .catch((err) => {
        console.error('목록 조회 실패:', err);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  // 전체 선택 토글
  const toggleAll = () => {
    if (selected.length === recipes.length) {
      setSelected([]);
    } else {
      setSelected(recipes.map((r) => r.recipeId));
    }
  };

  // 개별 선택 토글
  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // 선택 삭제
  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await Promise.all(selected.map((id) => deleteRecipe(id)));
      alert('삭제 완료');
      fetchRecipes();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  // 검색
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchRecipes();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 상단 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">레시피 목록</h1>
          <p className="text-sm text-blue-500">All Creators</p>
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="제목 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
            검색
          </button>
        </form>
      </div>

      {/* 테이블 */}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-2">작성자</th>
            <th className="pb-2">제목</th>
            <th className="pb-2">프리미엄 여부</th>
            <th className="pb-2">카테고리</th>
            <th>
              <input type="checkbox" checked={selected.length === recipes.length} onChange={toggleAll} />
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.recipeId} className="border-b">
              <td className="py-2">{recipe.writerNickname}</td>
              <td>{recipe.title}</td>
              <td>{recipe.isPremium}</td>
              <td>{recipe.category}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(recipe.recipeId)}
                  onChange={() => toggleOne(recipe.recipeId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 + 삭제 버튼 */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="px-2 py-1 rounded border"
            disabled={page === 0}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 py-1 border rounded ${page === i ? 'bg-purple-600 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            className="px-2 py-1 rounded border"
            disabled={page === totalPages - 1}
          >
            &gt;
          </button>
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDelete}
          disabled={selected.length === 0}
        >
          선택 삭제
        </button>
      </div>
    </div>
  );
}
