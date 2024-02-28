import React from "react";
import "./header.css";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesConfig from "./particleConfig.js";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const particlesInit = (engine) => {
    loadFull(engine);
  };

  return (
    <div className="header">
      <div className="particles">
        <Particles init={particlesInit} options={particlesConfig} />
        <div className="myname">
          <h1>
            <Typewriter
              className="typewriter-text"
              options={{
                strings: ["Welcome!"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>
      </div>
      <div className="personalInfo">
        <div className="personalInfo-container">
          <div className="personalDetails">
            <div className="personal-content">
              <div className="content-1">
                <h5 style={{ color: "gainsboro" }}>Hey , I'm </h5>
                <h1>
                  Gaurav <span style={{ color: "gainsboro" }}> Yadav</span>
                </h1>
                <p className="role">
                  <span>Full stack developer</span>
                </p>
              </div>
              <div className="content-2">
                <p className="tag-line">
                  A Full Stack Developer specializes in creating versatile web
                  solutions, turning visions into dynamic websites.
                </p>
              </div>
            </div>
            <div className="cv-btn-container">
              <a
                href="https://drive.google.com/u/0/uc?id=1AesUe2uPkpFrFMy_fOiUF-OAMe4EdfQ7&export=download"
                download
                className="download-btn"
              >
                <i className="fas fa-file-download"></i> Download Resume
              </a>
            </div>

            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/gaurav-yadav-373973215/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-linkedin"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>

              <a
                href="https://github.com/gauravydav"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-github"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
