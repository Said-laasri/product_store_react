import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import './Main.css'

const Main = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  return (
    <div className="main-container">
      <div className="form-container">
        {showLogin && <Login />}
        {showRegister && <Register />}
        <p className="toggle-message">
          {showLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={handleRegisterClick}>
            {showLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Main;
