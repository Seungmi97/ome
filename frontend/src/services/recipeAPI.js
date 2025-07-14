// 이 파일은 임시로 프론트엔드에서 가짜 데이터를 만들어주는 역할을 합니다.
// 실제 프로젝트에서는 백엔드 서버에 데이터를 요청하게 됩니다.

// --- 가짜 데이터베이스 ---
const fakeRecipes = {
  '123': {
    id: '123',
    title: '클래식 토마토 스파게티',
    description: '누구나 좋아하는 기본에 충실한 토마토 스파게티입니다. 신선한 바질과 파마산 치즈로 풍미를 더해보세요.',
    //imageUrl: 'https://images.unsplash.com/photo-1598866594240-a6278c672f15?q=80&w=2574&auto=format&fit=crop',
    author: { id: 'user1', name: '요리왕 비룡' },
    prepTime: 10,
    cookTime: 20,
    ingredients: [
      { name: '스파게티 면', amount: '200g' },
      { name: '토마토 홀', amount: '1캔 (400g)' },
      { name: '마늘', amount: '3쪽' },
      { name: '양파', amount: '1/2개' },
      { name: '올리브 오일', amount: '2큰술' },
      { name: '소금, 후추', amount: '약간' },
      { name: '바질 잎', amount: '5장' },
    ],
    instructions: [
      '끓는 물에 소금을 넣고 스파게티 면을 삶아줍니다 (알 덴테).',
      '팬에 올리브 오일을 두르고 다진 마늘과 양파를 볶아 향을 냅니다.',
      '토마토 홀을 넣고 으깨면서 10분간 끓여 소스를 만듭니다.',
      '삶은 면을 소스에 넣고 잘 섞어줍니다. 소금과 후추로 간을 맞춥니다.',
      '접시에 담고 바질 잎과 파마산 치즈를 뿌려 완성합니다.',
    ],
  },
  '456': {
    id: '456',
    title: '매콤한 닭갈비',
    description: '스트레스가 확 풀리는 화끈한 매운 맛! 춘천의 맛을 집에서 느껴보세요.',
    author: { id: 'user2', name: '고든 램지' },
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-4682265f2f1b?q=80&w=2574&auto=format&fit=crop',
    prepTime: 20,
    cookTime: 25,
    ingredients: [
      { name: '닭다리살', amount: '500g' },
      { name: '양배추', amount: '1/4통' },
      { name: '고구마', amount: '1개' },
      { name: '깻잎', amount: '10장' },
      { name: '고추장', amount: '3큰술' },
      { name: '고춧가루', amount: '2큰술' },
      { name: '간장', amount: '2큰술' },
      { name: '다진 마늘', amount: '1큰술' },
    ],
    instructions: [
      '닭다리살은 먹기 좋은 크기로 자르고 양념 재료에 30분간 재워둡니다.',
      '양배추, 고구마는 큼직하게 썰고, 깻잎은 채 썰어 준비합니다.',
      '팬에 기름을 두르고 양념한 닭고기와 고구마를 먼저 볶습니다.',
      '닭고기가 익으면 양배추를 넣고 함께 볶아줍니다.',
      '마지막으로 깻잎을 올려 마무리합니다. 기호에 따라 치즈를 추가해도 좋습니다.',
    ],
  },
  // 필요하다면 여기에 더 많은 레시피를 추가할 수 있습니다.
};

/**
 * 모든 레시피 목록을 가져오는 함수 (메인 페이지용)
 */
export const getAllRecipes = async () => {
  console.log('Fetching all recipes...');
  // 실제 API처럼 약간의 지연 시간을 줍니다.
  await new Promise(resolve => setTimeout(resolve, 500));
  return Object.values(fakeRecipes);
};

/**
 * ID로 특정 레시피 하나의 정보를 가져오는 함수 (상세 페이지용)
 * @param {string} id - 레시피의 고유 ID
 */
export const getRecipeById = async (id) => {
  console.log(`Fetching recipe with ID: ${id}`);
  // 실제 API처럼 약간의 지연 시간을 줍니다.
  await new Promise(resolve => setTimeout(resolve, 500));

  if (fakeRecipes[id]) {
    return fakeRecipes[id];
  } else {
    // 해당 ID의 레시피가 없으면 에러를 발생시킵니다.
    throw new Error('Recipe not found');
  }
};