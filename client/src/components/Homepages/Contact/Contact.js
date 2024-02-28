import React, { useState } from "react";
import "./contact.css";
import img from "../../../images/img1.jpg";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null); // Add error state

  const sendEmail = async () => {
    const dataSend = { name, email, message }; // Simplify object creation
    try {
      const response = await axios.post(
        "http://localhost:5000/email/sendEmail",
        dataSend,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response); // Log response for debugging
      if (response.status >= 200 && response.status < 300) {
        alert("Email sent successfully!");
      } else {
        setError("Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error.message);
      setError("Error sending email. Please try again later.");
    }
    // Clear form inputs after sending the email
    setName("");
    setEmail("");
    setMessage("");
  };

  // Input Handle functions
  const handleNameInput = (e) => setName(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleMessageInput = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    sendEmail();
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2 className="title">Contact Me</h2>
        <div className="contact-form-detail">
          <div className="contact-form-info">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter name..."
                required
                value={name}
                onChange={handleNameInput}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email..."
                required
                value={email}
                onChange={handleEmailInput}
              />
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                required
                placeholder="Enter contact reason..."
                value={message}
                onChange={handleMessageInput}
              ></textarea>
              <div className="send-btn">
                <button type="submit">Send</button>
              </div>
            </form>
            {error && <p className="error">{error}</p>} {/* Display error message */}
          </div>
          <div className="contact-info">
            <h4>Send your message</h4>
            <img src={img} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
