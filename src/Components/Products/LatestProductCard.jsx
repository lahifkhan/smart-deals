import React from "react";
import { Link } from "react-router";

const LatestProductCard = ({ product }) => {
  const { title, price_max, price_min } = product;
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="px-10 pt-10">
        <img src={product.image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p className="text-gradient-primary font-semibold">
          ${price_min} - {price_max}
        </p>
        <div className="card-actions">
          <Link
            to={`/products/${product._id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestProductCard;
