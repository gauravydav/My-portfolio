import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserSuccess } from "../../store/dataSlice";
import { scroller } from "react-scroll";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const isLogin = useSelector((state) => state.data.isLogin);

  const toggleAction = () => {
    setToggle(!toggle);
  };

  const closeNavbar = () => {
    if (toggle === true) {
      setToggle(false);
    }
  };

  const logoutSubmit = () => {
    localStorage.clear();
    dispatch(logoutUserSuccess()); // Dispatch the logoutUserSuccess action
  };

  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 50,
      smooth: true,
      offset: -70,
    });
  };

  return (
    <div className="nav-container">
      <nav className="nav">
        <div className="logoBtn">
          <div className="btn" onClick={toggleAction}>
            <div className={toggle ? "bar1 animatedBar" : "bar bar1"}></div>
            <div className={toggle ? "bar2 animatedBar" : "bar bar1"}></div>
            <div className={toggle ? "bar3 animatedBar" : "bar bar1"}></div>
          </div>
        </div>
        <div className="links-container">
          <ul
            className={toggle ? "new-links links" : "links"}
            onClick={closeNavbar}
          >
            <li onClick={() => scrollToElement("Home")}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => scrollToElement("About")}>
              <Link to="/">About</Link>
            </li>
            <li onClick={() => scrollToElement("Education")}>
              <Link to="/">Education</Link>
            </li>
            <li onClick={() => scrollToElement("Experience")}>
              <Link to="/">Experience</Link>
            </li>
            <li onClick={() => scrollToElement("Projects")}>
              <Link to="/">Projects</Link>
            </li>
            <li onClick={() => scrollToElement("Contact")}>
              <Link to="/">Contact</Link>
            </li>

            <li className={isLogin ? "" : "adminLi"}>
              <Link to={isLogin ? "/admin/" : "/"}>
                {isLogin ? <div className="admin"> Admin </div> : ""}
              </Link>
            </li>
            <li onClick={logoutSubmit}>
              <Link to={isLogin ? "/" : "/login"}>
                {isLogin ? "Logout" : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
