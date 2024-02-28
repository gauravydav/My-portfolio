import { Routes, Route, Navigate } from "react-router-dom"; // Import necessary components from react-router-dom
import { Element } from "react-scroll";

import "./App.css";
import Header from "./components/Homepages/Header/Header.js";
import Navbar from "./components/Homepages/Navbar/Navbar.js";
import About from "./components/Homepages/About/About.js";
import Education from "./components/Homepages/Education/Education.js";
import Experience from "./components/Homepages/Experience/Experience.js";
import Projects from "./components/Homepages/Projects/Projects.js";
import Contact from "./components/Homepages/Contact/Contact.js";
import Footer from "./components/Homepages/Footer/Footer.js";
import Login from "./components/Homepages/Login/Login.js";
// admin components
import Admin from "./components/adminComponents/Admin/Admin.js";
// edit components
import EditAbout from "./components/editComponents/EditAbout";
import EditEducation from "./components/editComponents/EditEducation";
import EditProjects from "./components/editComponents/EditProjects";
import EditExperience from "./components/editComponents/EditExperience";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, fetchData } from "./components/store/dataSlice.js";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(checkLogin());
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Element className="Home">
                <Header />
              </Element>

              <Element className="About">
                <About />
              </Element>

              <Element className="Experience">
                <Experience />
              </Element>

              <Element className="Projects">
                <Projects />
              </Element>
              <Element className="Education">
                <Education />
              </Element>

              <Element className="Contact">
                <Contact />
              </Element>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <Login /> // Pass setIsLogin as a prop, not IsLogin
          }
        />

        {/* Add a protected route for the admin panel */}
        <Route
          path="/admin"
          element={
            isLogin ? ( // If isLogin is true, render the Admin component
              <Admin />
            ) : (
              // If isLogin is false, redirect to the login page using the Navigate component
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/editAbout/:id" element={<EditAbout />} />
        <Route path="/editEducation/:id" element={<EditEducation />} />
        <Route path="/editProject/:id" element={<EditProjects />} />
        <Route path="/editExperience/:id" element={<EditExperience />} />
      </Routes>
      <Footer /> {/* Render the Footer component */}
    </div>
  );
}

export default App;
