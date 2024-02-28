import React, { useContext } from "react";
import "./education.css";
import { useSelector } from "react-redux";

const Education = () => {
  const { education } = useSelector((state) => state.data);

  return (
    <div className="edu-conatiner">
      <div className="education">
        <h2 className="title">Education</h2>
        <div className="education-detail">
          {education?.map((item) => (
            <div className="education-info" key={item._id}>
              <p>{item.education}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
