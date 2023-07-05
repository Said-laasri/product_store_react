import { useEffect } from "react";
import Products from "./components/Products";
import Main from "./components/Main";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/product");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
