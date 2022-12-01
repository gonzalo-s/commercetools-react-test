import React from "react";
import "../styles/gallStyle.css";

function GallElement({ product }) {
  const { image, name, price } = product;

  console.log(product);
  return (
    <div className="eleWrapper">
      <div className="eleDataWrapper">
        <div className="eleName">{name}</div>
        <div className="eleImgWrapper">
          {" "}
          <img className="eleImg" src={image.url} alt={name} />
        </div>
        <div className="productPrice">Price: {price.value.centAmount}</div>
      </div>
    </div>
  );
}

export default GallElement;
