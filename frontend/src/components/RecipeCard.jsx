import React from 'react';

const RecipeCard = ({ title, price }) => {
  return (
    <div className="w-full max-w-[200px] border rounded-md p-4 bg-white shadow-sm">
      <div className="w-full h-32 bg-gray-200 mb-4" />
      <div className="text-sm">{title}</div>
      <div className="font-bold">{price}</div>
    </div>
  );
};

export default RecipeCard;