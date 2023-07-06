import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SingleProduct from "./SingleProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token") || "";

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productsData = response.data.products;
      setProducts(productsData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product!");
    }
  };

  const handleEdit = async (productId, updatedProduct) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/products/${productId}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProductData = response.data.product;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProductData._id ? updatedProductData : product
        )
      );
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product!");
    }
  };

  return (
    <div>
      <h2 style={styles.heading}>Products List:</h2>
      <ul style={styles.list}>
        {products.map((product) => (
          <li key={product._id} style={styles.listItem}>
            <SingleProduct
              product={product}
              onRemove={() => handleRemove(product._id)}
              onEdit={(updatedProduct) =>
                handleEdit(product._id, updatedProduct)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    marginBottom: "20px",
    border: "1px solid #000",
    borderRadius: "4px",
    padding: "10px",
    backgroundColor: "#f4f4f4",
  },
};

export default ProductList;
