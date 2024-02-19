import axios from "axios";
import React, { useEffect, useRef } from "react";
import "./Confirm_password.css";
// import backgroundImage from "../HomePage/Main/MainBG.png";
// import mrs_logo from "../../Assets/mrs_logo.png";
// import logo_img from "../../Assets/png-assets/Asset 25-8.png";
import "./Reset_pass.css";
import { useState } from "react";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main_divStyle = {
  // backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Confirm_password = () => {
  const New_pass = useRef();
  const Confirm_new_pass = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [visible_criteria, setVisible_criteria] = useState(false);
  const [pass_conf_pass_visible, setPass_conf_pass_visible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const Old_password = Old_pass.current.value;
    const New_password = New_pass.current.value;
    const Confirm_password = Confirm_new_pass.current.value;
    if ( New_password === "" || Confirm_password === "") {
      alert("Please Enter All Details");
    } else {
      const validatePassword = (password) => {
        // Regular expressions to check for at least one special character, one number, and one uppercase letter
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const uppercaseRegex = /[A-Z]/;

        const hasSpecialChar = specialCharRegex.test(password);
        const hasNumber = numberRegex.test(password);
        const hasUppercase = uppercaseRegex.test(password);
        const chars8 = password.length;
        const pass_8chars = chars8 >= 8;

        return hasSpecialChar && hasNumber && hasUppercase && pass_8chars;
      };

      const password = New_password;
      const isValid = validatePassword(password);

      if (isValid) {
        setVisible_criteria(false);
        if (New_password === Confirm_password) {
          setPass_conf_pass_visible(false);
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const token = urlParams.get("token");

          if (token) {
            axios
              .post("http://192.168.145.72:8000/resetPass", {
                password: Confirm_password,
              },
              {
                headers: {
                  Authorization: token,
                },
              })
              .then(function (response) {
                alert("Password Changed Successfully!");
                New_pass.current.value = "";
                Confirm_new_pass.current.value = "";
              })
              .catch(function (error) {
                alert("Error while Changing Password!");
              });
          } else {
            alert("Unauthorised User!");
          }
        } else {
          setPass_conf_pass_visible(true);
        }
      } else {
        setVisible_criteria(true);
        if (New_password === Confirm_password) {
          setPass_conf_pass_visible(false);
        } else {
          setPass_conf_pass_visible(true);
        }
      }
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div style={Main_divStyle} className="main_div">
        <div>
          {/* <img src={mrs_logo} alt="mrs_logo" height="70px" /> */}
        </div>
        <div className="card_div">
          <h4 style={{color:"black"}}>Set New Password</h4>
          <div
            style={{
              height: "70%",
              width: "700px",
              borderRadius: "10px",
              display: "flex",
              gap: "60px",
              padding: "20px",
              backgroundColor: "rgb(252, 249, 240)",
              color: "black",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <div
              style={{
                width: "250px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              {/* <label>
                Enter OTP :<span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="inputboxes"
                  style={{ border: "1px solid grey", borderRadius: "5px" }}
                  ref={Old_pass}
                  placeholder="Enter Old Password"
                  required
                  autoComplete="new-password"
                />
                <br />
                <span style={{ fontSize: "x-small", color: "grey" }}>
                  (Mail OTP)
                </span>
              </label> */}
              <label style={{ position: "relative" }}>
                New Password:<span style={{ color: "red" }}>*</span>
                <div style={{ position: "relative" }}>
                  {/* <FontAwesomeIcon
                    onClick={toggleShowPassword}
                    icon={showPassword ? faEyeSlash : faEye}
                    style={{
                      height: "15px",
                      position: "absolute",
                      left: "10.35rem",
                      top: "0.4rem",
                    }}
                  /> */}

                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      style={{ border: "1px solid grey", borderRadius: "5px" }}
                      ref={New_pass}
                      placeholder="Enter New Password"
                      required
                      autoComplete="new-password"
                    ></input>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "x-small",
                    color: "red",
                    display: visible_criteria ? "" : "none",
                  }}
                  id="pass_para"
                >
                  Please follow below Password Criteria:
                  <br />
                  <span style={{ color: "black" }}>
                    {" "}
                    <li>Should have 8 characters</li>
                    <li>One Capital Leteer(A-Z)</li>
                    <li>One Special Symbol (!@#$%^&*)</li>
                    <li>One Number</li>
                  </span>
                </p>
              </label>

              <label>
                Confirm New Password:<span style={{ color: "red" }}>*</span>
                <input
                  type={showPassword ? "text" : "password"}
                  style={{ border: "1px solid grey", borderRadius: "5px" }}
                  ref={Confirm_new_pass}
                  placeholder="Re-enter New Password"
                  required
                  autoComplete="new-password"
                />
                <p
                  style={{
                    fontSize: "x-small",
                    color: "red",
                    display: pass_conf_pass_visible ? "" : "none",
                  }}
                  id="pass_para"
                >
                  (New password & Confirm Password Should be same)
                </p>
              </label>

              <input
                type="button"
                value="Reset Password"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "rgb(68, 137, 246)",
                  color: "white",
                  borderRadius: "10px",
                  border: "none",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  cursor: "pointer",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "70px",
                paddingLeft: "40px",
                backgroundColor: "",
                width: "200px",
              }}
            >
              {/* <img src={logo_img} alt="mrs_logo" height="90px" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm_password;
