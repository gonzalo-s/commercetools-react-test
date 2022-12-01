import React from "react";
import GallElement from "./GallElement";
import "../styles/gallStyle.css";

function ProductGall({ products }) {
  return (
    <div className="productGallWrapper">
      {products.map((product) => {
        return (
          <div key={product.id}>
            {" "}
            <GallElement product={product} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductGall;
