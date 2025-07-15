import axios from "axios";

// 하드코딩된 API 기본 URL
// 추후에 env파일로 고치면 됨
const API_BASE_URL = "http://localhost:8080/api/recipes";

export const getRecipeDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/recipes/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // 콘솔에 전체 에러 출력
    console.error('레시피 상세 조회 실패:', error);

    // 예외를 상위 컴포넌트에서 catch할 수 있도록 다시 throw
    throw new Error(error.response?.data?.message || '레시피를 불러오지 못했습니다.');
  }
};
