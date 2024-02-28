import React from "react";
import "./about.css";
import Loop from "../Techstack/Loop.js";
import { useSelector } from 'react-redux';


const About = () => {
  const { about } = useSelector((state) => state.data);
  return (
    <div className="about-container">
      <div className="about">
        <h2 className="title">About Me</h2>
        {about?.map((item) => (
          <div className="about-info" key={item._id}>
            <p className="title">{item.about}</p>
          </div>
        ))}
      </div>
      <Loop />
    </div>
  );
};

export default About;
