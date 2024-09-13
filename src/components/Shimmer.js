import React from "react";

export const Shimmer = () => {
  return (
    <div className="w-60">
      <div className="rounded-2xl w-60 h-48 bg-gray-200 mb-4"></div>
      <div className="p-2">
        <div className="w-24 h-2 bg-gray-200 mb-4 rounded-xl"></div>
        <div className="w-36 h-2 bg-gray-200 mb-4 rounded-xl"></div>
        <div className="w-54 h-2 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};
