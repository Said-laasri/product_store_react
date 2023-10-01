import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const token = localStorage.getItem("token") || "";

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    company: "",
    description: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product added successfully!");

      setProduct({
        name: "",
        price: 0,
        company: "",
        description: "",
        quantity: 0,
      });
    } catch (error) {
      console.error(error);
      toast.error("Product addition failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Company:</label>
          <input
            type="text"
            name="company"
            value={product.company}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            maxLength="500"
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>
      <button type="submit" style={styles.button}>
        Add Product
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#fff",
  },
  row: {
    display: "flex",
    marginBottom: "15px",
  },
  formGroup: {
    flex: 1,
    marginRight: "10px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default CreateProduct;
