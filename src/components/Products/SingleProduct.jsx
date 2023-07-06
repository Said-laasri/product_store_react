import React, { useState } from "react";
import "./SingleProduct.css";

const SingleProduct = (props) => {
  const { product, onRemove, onEdit } = props;
  const {
    company,
    description,
    _id,
    name,
    price: initialPrice,
    quantity: initialQuantity,
  } = product;

  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveClick = () => {
    onRemove();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedProduct = {
      _id,
      price,
      quantity,
    };

    onEdit(updatedProduct);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setPrice(initialPrice);
    setQuantity(initialQuantity);
  };

  const calculateTotalPrice = () => {
    return price * quantity;
  };

  return (
    <div className="product-container">
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <div className="product-row">
          <p className="product-label">Company:</p>
          <p className="product-value">{company}</p>
        </div>
        <div className="product-row">
          <p className="product-label">Description:</p>
          <p className="product-value">{description}</p>
        </div>
        <div className="product-row">
          <p className="product-label">Price:</p>
          {isEditing ? (
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <p className="product-value">${price}</p>
          )}
        </div>
        <div className="product-row">
          <p className="product-label">Quantity:</p>
          {isEditing ? (
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          ) : (
            <p className="product-value">{quantity}</p>
          )}
        </div>
        <div className="product-row">
          <p className="product-label">Total Price:</p>
          <p className="product-value">${calculateTotalPrice()}</p>
        </div>
      </div>
      <div className="product-buttons">
        {!isEditing ? (
          <>
            <button className="product-button" onClick={handleRemoveClick}>
              Remove
            </button>
            <button className="product-button" onClick={handleEditClick}>
              Edit
            </button>
          </>
        ) : (
          <>
            <button className="product-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="product-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
