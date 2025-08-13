export const ProductCardSkeleton = () => {
  return (
    <div className="section-gap">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-6 relative group">
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
      </div>
      <div className="productCard rounded-md shadow-md p-4 relative group bg-background flex flex-col items-center">
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};
