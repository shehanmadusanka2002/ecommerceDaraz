const ProductGrid = ({ products }) => {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="flex-1 px-6 py-4">
      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              {category}
            </h2>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {groupedProducts[category].map((product) => (
                <div 
                  key={product._id || product.id} 
                  className="transition-transform transform hover:scale-105 hover:shadow-md"
                >
                  <ImageCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductGrid;