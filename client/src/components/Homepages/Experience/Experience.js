import React, { useContext } from "react";
import "./experience.css";
import {useSelector } from 'react-redux';

const Experience = () => {
 
  const { experience } = useSelector((state) => state.data);

  return (
    <div className="experience-container">
      <div className="experience">
        <h2 className="title">Experience</h2>
        <div className="experience-detail">
          {experience?.map((item) => (
            <div className="experience-info" key={item._id}>
              <p>{item.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
