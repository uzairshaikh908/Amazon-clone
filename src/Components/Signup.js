import { React, useState } from "react";
import "./signin.css";
import Logo from "../imgs/logo2.png";
import BG1 from "../imgs/login-BG.png";
import BG2 from "../imgs/login-BG2.png";
import { app } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);

  document.title = "Amazon";

  const notify1 = () =>
    toast.error("Please fill-up all the credentials properly!", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyPasswordMismatch = () =>
    toast.error("Passwords do not match!", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailBlur = (event) => {
    if (
      event.target.value === "" ||
      !event.target.value.includes("@") ||
      !event.target.value.includes(".com")
    ) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleNameBlur = (event) => {
    if (event.target.value === "") {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
    }
  };

  const handlePasswordBlur = (event) => {
    if (event.target.value === "") {
      setPasswordError("Please enter your password.");
    } else if (event.target.value.length < 4) {
      setPasswordError("Password is too small.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const CreateUser = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      navigate("/signin");
    } catch (error) {
      swal({
        title: "Error!",
        text: error.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  const handleBgLoad = () => {
    setBgLoaded(true);
  };

  const handleSubmit = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      notify1();
    } else if (password !== confirmPassword) {
      notifyPasswordMismatch();
    } else {
      CreateUser();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signin-page">
        <div className="login-navbar">
          <div className="main-logo">
            <img src={Logo} className="amazon-logo" alt="logo" />
          </div>
          <div className="signup">
            <Link to="/signin">
              <button className="signup-btn">Sign in</button>
            </Link>
          </div>
        </div>
        <div className="background">
          <img
            src={BG1}
            className="BG1"
            onLoad={handleBgLoad}
            alt="background"
          />
          <img
            src={BG2}
            className="BG2"
            onLoad={handleBgLoad}
            alt="background"
          />
        </div>
        {bgLoaded && (
          <div className="main-form2">
            <div className="login-form">
              <div className="some-text">
                <p className="user">User Registration</p>
                <p className="user-desc">
                  Hey, Enter your details to create a new account
                </p>
              </div>
              <div className="user-details">
                <input
                  type="text"
                  placeholder="Name"
                  className="name"
                  value={name}
                  onBlur={handleNameBlur}
                  onChange={handleNameChange}
                  required
                />
                {nameError && <div className="error-message">{nameError}</div>}

                <input
                  type="email"
                  placeholder="Enter Email"
                  className="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  required
                />
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  required
                />
                {confirmPasswordError && (
                  <div className="error-message">{confirmPasswordError}</div>
                )}

                <button onClick={handleSubmit} className="signin-btn">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;
