import { useEffect, useState } from "react";

export default function RecipeManageByCreator() {
  const [recipes, setRecipes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetch("/admin/recipes/by-creators") // 백엔드에서 필요한 형식으로 제공해야 함
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("레시피 조회 실패", err));
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (window.confirm("선택한 레시피를 삭제하시겠습니까?")) {
      // DELETE API 호출 or PATCH 비활성화 처리
      Promise.all(
        selectedIds.map(id =>
          fetch(`/admin/recipes/${id}`, { method: "DELETE" }) // 삭제 방식에 따라 수정
        )
      ).then(() => {
        setRecipes(recipes.filter(r => !selectedIds.includes(r.recipeId)));
        setSelectedIds([]);
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">📋 Recipes</h1>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500 border-b">
          <tr>
            <th>크리에이터명</th>
            <th>레시피</th>
            <th>찜 수</th>
            <th>Email</th>
            <th>
              <input type="checkbox" disabled /> {/* 전체 선택은 생략 */}
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r) => (
            <tr key={r.recipeId} className="border-b">
              <td className="py-2">{r.creatorName}</td>
              <td>{r.recipeTitle}</td>
              <td>{r.likes.toLocaleString()}</td>
              <td>{r.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(r.recipeId)}
                  onChange={() => toggleSelect(r.recipeId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          레시피 삭제
        </button>
      </div>
    </div>
  );
}
