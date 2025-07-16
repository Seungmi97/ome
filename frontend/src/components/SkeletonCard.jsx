const SkeletonCard = () => {
  return (
    <div className="w-[200px] animate-pulse border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900 flex flex-col gap-2">
      {/* 이미지 뼈대 */}
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      {/* 제목 뼈대 */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      {/* 배지 + 하트 뼈대 */}
      <div className="flex justify-between items-center mt-auto">
        <div className="w-10 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-8 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;