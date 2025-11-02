import React, { use } from "react";
import LatestProductCard from "./LatestProductCard";

const LatestProducts = ({ latestProductPromis }) => {
  const latestProducts = use(latestProductPromis);
  console.log(latestProducts);
  return (
    <div>
      <h1 className="text-center font-bold text-4xl">
        Recent <span className="text-gradient-primary">Products</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <LatestProductCard
            key={product._id}
            product={product}
          ></LatestProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
