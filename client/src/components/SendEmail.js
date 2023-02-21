import "../index.css";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import SubjectIcon from "@material-ui/icons/Subject";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import React, { useState } from "react";
import axios from "axios";
import img from "../img/sending.gif";

function SendEmail() {
  const Form = () => {
    // form input state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    // loading
    const [loading, setLoading] = useState(false);

    // handleQuillChange;
    const handleQuillChange = (value) => {
      setMessage(value);
    };

    // handleClick btn click
    const handleClick = async (e) => {
      if (email && company && name && subject !== "") {
        if (message !== "") {
          e.preventDefault();

          setLoading(true);

          // console.log({
          //   name,
          //   email,
          //   subject,
          //   company,
          //   message,
          // });

          const body = {
            name,
            email,
            subject,
            company,
            message,
          };

          // api call 👍
          await axios
            .post(`http://localhost:5000/mail`, body, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              alert(`Email sent successful`);
              setLoading(false);
              console.log(`Main res : `, res);

              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      } else {
        alert(`Please fill all required field!`);
      }
    };

    return (
      <form>
        <div className="form">
          <div className="form__wrapper">
            <div className="form__title">
              <h4>{loading ? `Loading...` : `Email Send`}</h4>
              {loading && (
                <img
                  src={img}
                  alt=""
                  style={{
                    filter: "invert(1)",
                    position: "absolute",
                    width: 200,
                    height: 200,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>
            <div className="form__container">
              <div className="form__containerItems">
                <div className="form__containerItem">
                  <div className="form__containerItemName">
                    <label>Name</label>
                    <PersonIcon />
                  </div>
                  <div className="form__containerItemField">
                    <input
                      required={true}
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form__containerItem">
                  <div className="form__containerItemName">
                    <label>Email</label>
                    <EmailIcon />
                  </div>
                  <div className="form__containerItemField">
                    <input
                      required={true}
                      type="email"
                      placeholder="Enter Your valid Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form__containerItem">
                  <div className="form__containerItemName">
                    <label>Company</label>
                    <BusinessIcon />
                  </div>
                  <div className="form__containerItemField">
                    <input
                      type="text"
                      placeholder="Enter Your Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form__containerItem">
                  <div className="form__containerItemName">
                    <label>Subject</label>
                    <SubjectIcon />
                  </div>
                  <div className="form__containerItemField">
                    <input
                      required
                      type="text"
                      placeholder="Add Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form__containerItem">
                  <div className="form__containerItemName">
                    <label>Compose Mail</label>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleClick}
                    >
                      Send
                    </button>
                  </div>
                </div>
                <div className="container__composeMail">
                  <ReactQuill
                    className="quill"
                    value={message}
                    onChange={handleQuillChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="App">
      <>
        <Form />
      </>
    </div>
  );
}

export default SendEmail;
