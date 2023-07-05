import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    company: "",
    description: "",
    quantity: 0,
    createdBy: "", // assuming you have user authentication implemented
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products",
        product
      );
      console.log(response.data);

      setProduct({
        name: "",
        price: 0,
        company: "",
        description: "",
        quantity: 0,
        createdBy: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Company:</label>
        <input
          type="text"
          name="company"
          value={product.company}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          maxLength="500"
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Created By:</label>
        <input
          type="text"
          name="createdBy"
          value={product.createdBy}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
