import React from 'react';

const FilterSidebar = () => {
  return (
    <div className="w-64 p-4 bg-white border rounded-md h-fit shadow-sm">
      <h3 className="font-semibold mb-2">Keywords</h3>
      <div className="mb-4 space-x-2">
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">Spring ✕</span>
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">Smart ✕</span>
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">Modern ✕</span>
      </div>

      <div className="space-y-1 mb-4">
        <label className="block">
          <input type="checkbox" defaultChecked /> 많은 좋아요 순
        </label>
        <label className="block">
          <input type="checkbox" /> 최신 레시피 순
        </label>
        <label className="block">
          <input type="checkbox" defaultChecked /> 구독자 많은 순
        </label>
      </div>

      <div>
        <h4 className="font-medium mb-1">Subscribe</h4>
        <ul className="text-sm space-y-1">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i}>channel {i + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;