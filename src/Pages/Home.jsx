import React, { Suspense } from "react";
import LatestProducts from "../Components/Products/LatestProducts";

const latestProductPromis = fetch("http://localhost:3000/latestProducts").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <p>Home</p>

      <Suspense fallback={<p>loading...</p>}>
        <LatestProducts
          latestProductPromis={latestProductPromis}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
