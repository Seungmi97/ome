import { useEffect, useState } from 'react';

const dummyRecipes = [
  { id: 1, name: '청양마요', creator: 'Jane Cooper', score: 10000, email: 'jane@microsoft.com' },
  { id: 2, name: '황천짜장', creator: 'Floyd Miles', score: 5235, email: 'floyd@yahoo.com' },
  { id: 3, name: '킬구볶구', creator: 'Ronald Richards', score: 4234, email: 'ronald@adobe.com' },
  { id: 4, name: '사각김밥', creator: 'Marvin McKinney', score: 3253, email: 'marvin@tesla.com' },
  { id: 5, name: '육각 김밥', creator: 'Jerome Bell', score: 234, email: 'jerome@google.com' },
  { id: 6, name: '정통 수타면', creator: 'Kathryn Murphy', score: 111, email: 'kathryn@microsoft.com' },
  { id: 7, name: '참 케이크', creator: 'Jacob Jones', score: 12, email: 'jacob@yahoo.com' },
  { id: 8, name: '잘 만든 고향만두', creator: 'Kristin Watson', score: 5, email: 'kristin@facebook.com' },
];

export default function RecipeManage() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // 실제 API로 대체 예정
    setRecipes(dummyRecipes);
  }, []);

  const toggleAll = () => {
    if (selected.length === recipes.length) {
      setSelected([]);
    } else {
      setSelected(recipes.map((r) => r.id));
    }
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setRecipes((prev) => prev.filter((r) => !selected.includes(r.id)));
      setSelected([]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Recipes</h1>
          <p className="text-sm text-blue-500">All Creators</p>
        </div>

        <div className="flex items-center gap-4">
          <input type="text" placeholder="Search" className="border rounded px-2 py-1" />
          <select className="border rounded px-2 py-1">
            <option>높은 점수</option>
            <option>낮은 점수</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-2">크리에이터명</th>
            <th className="pb-2">레시피</th>
            <th className="pb-2">점수</th>
            <th className="pb-2">Email</th>
            <th>
              <input type="checkbox" checked={selected.length === recipes.length} onChange={toggleAll} />
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id} className="border-b">
              <td className="py-2">{recipe.creator}</td>
              <td>{recipe.name}</td>
              <td>{recipe.score}</td>
              <td>{recipe.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(recipe.id)}
                  onChange={() => toggleOne(recipe.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 + 삭제 버튼 */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1 text-sm">
          <button className="px-2 py-1 rounded border">&lt;</button>
          {[1, 2, 3, 4].map((p) => (
            <button key={p} className="px-2 py-1 border rounded bg-purple-600 text-white">{p}</button>
          ))}
          <button className="px-2 py-1 rounded border">…</button>
          <button className="px-2 py-1 rounded border">40</button>
          <button className="px-2 py-1 rounded border">&gt;</button>
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={deleteSelected}
        >
          레시피 삭제
        </button>
      </div>
    </div>
  );
}
