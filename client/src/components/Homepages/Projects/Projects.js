import React from "react";
import "./projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Projects = () => {
  const { projects } = useSelector((state) => state.data);

  return (
    <div className="project-container">
      <div className="projects">
        <h2 className="title">Projects</h2>
        <div className="projects-detail">
          {projects?.map((item) => (
            <div className="project-info" key={item._id}>
              <div className="project-img">
                <img src={item.images.url} alt="" />
              </div>
              <div className="project-name">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="project-icons">
                <a
                  href={item.product_id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
              <div className="project-icons">
                <a
                  href={item.images.public_id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faCircle} style={{ color: "green" }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
