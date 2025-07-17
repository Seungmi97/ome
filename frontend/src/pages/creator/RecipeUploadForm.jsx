import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RecipeUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState(''); // ✅ content 추가
  const [category, setCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [isPremium, setIsPremium] = useState('free');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // 카테고리 enum 목록 불러오기
  useEffect(() => {
    axios.get('/api/recipes/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then(res => {
        setAvailableCategories(res.data);
      })
      .catch(err => {
        console.error('카테고리 목록 불러오기 실패', err);
      });
  }, []);

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const recipeData = {
      title,
      description,
      content, // ✅ content 포함
      category,
      isPremium,
      ingredients: ingredients.join(', '),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(recipeData));
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.post("/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("레시피 등록 성공: " + res.data.recipeId);
      navigate("/creator/main"); // 홈으로 
    } catch (err) {
      console.error("레시피 등록 실패", err);
      alert("레시피 등록 실패: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">레시피 업로드</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 제목 */}
        <div>
          <label className="block font-semibold mb-1">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="block font-semibold mb-1">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block font-semibold mb-1">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block font-semibold mb-1">카테고리</label>
          <select
          value={category}
          onChange={(e) => setCategory(e.target.value.toLowerCase())}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">카테고리를 선택하세요</option>
          {availableCategories.map((cat, idx) => (
            <option key={idx} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>

        </div>

        {/* 재료 */}
        <div>
          <label className="block font-semibold mb-1">재료</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="flex-grow border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              추가
            </button>
          </div>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* 유료 여부 */}
        <div>
          <label className="block font-semibold mb-1">유료 여부</label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="isPremium"
                value="free"
                checked={isPremium === 'free'}
                onChange={(e) => setIsPremium(e.target.value)}
                className="peer hidden"
              />
              <div className="px-4 py-2 border rounded-lg peer-checked:bg-green-500 peer-checked:text-white">
                무료
              </div>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="isPremium"
                value="premium"
                checked={isPremium === 'premium'}
                onChange={(e) => setIsPremium(e.target.value)}
                className="peer hidden"
              />
              <div className="px-4 py-2 border rounded-lg peer-checked:bg-red-500 peer-checked:text-white">
                유료
              </div>
            </label>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="block font-semibold mb-1">레시피 이미지</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            레시피 업로드
          </button>
        </div>
      </form>
    </div>
  );
}
