import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import axios from "axios";
import { checkLogin,logoutUserSuccess } from "../../store/dataSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.data.isLogin);
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErr("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ email: "", password: "" });

      localStorage.setItem("tokenStore", res.data.token);
      dispatch(checkLogin());
      
      setErr(res.data.msg);
      navigate("/admin");
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  console.log(isLogin)

  const handleLogout = () => {
    localStorage.removeItem("tokenStore"); 
    dispatch(logoutUserSuccess());
    dispatch({ type: 'LOGOUT_SUCCESS' }); 
    navigate("/"); 
  };

  if (isLogin) {
    return (
      <div className="login-body">
        <div className="login-container">
          <h2>Welcome back!</h2>
          <p>You are already logged in.</p>
          <button className="button2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-body">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={loginSubmit} id="login-form">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={user.email}
            onChange={onChangeInput}
            name="email"
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
            required
          />
          <div className="login-btns">
            <button className="button1" type="submit">
              Login
            </button>
            <Link to="/">
              <button className="button2" type="button">
                Home
              </button>
            </Link>
          </div>
          <p className="message" id="error-message">
            {err}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
