import logo from "../images/swiggy.svg";
import "./Css/App.css";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI, SignUPAPI } from "../Api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Start() {
  const navigate = useNavigate();
  const cookieValue = Cookies.get("Swiggy_client");
  const loginDataFromCookie = cookieValue ? JSON.parse(cookieValue) : null;
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setisVisible] = useState({
    status: "visually-hidden",
    message: "null",
    for: "null",
  });
  const [loginData, setloginData] = useState({
    emailIdLogin: "hulkcharlie17@gmail.com",
    passwordLogin: "123",
  });
  function HandleLoginData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setloginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function HandleLoginSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    HandleLoginResponse(await LoginAPI(loginData), "login");
  }
  function HandleLoginResponse(response, value) {
    if (response === false) {
      setisVisible({
        status: "visually-true",
        message: "Invalid Username or password",
        for: value,
      });
    } else if (response === "Server Busy") {
      setisVisible({
        status: "visually-true",
        message: "Server Busy",
        for: value,
      });
    } else {
      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Cookies.set("auth_token", JSON.stringify(response), {
        expires: expiryDate,
        sameSite: "None",
        secure: true,
      });

      toast.success("🥳 Login successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/home");
      },1000);
    }
    setIsLoading(false);
  }
  const [signupData, setsignupData] = useState({
    nameSignup: "",
    emailIdSignup: "",
    phoneSignup: "",
    passwordSignup: "",
    confirmpasswordSignup: "",
  });
  function HandleSignUpData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setsignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function HandleSignUpSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    if (signupData.confirmpasswordSignup === signupData.passwordSignup) {
      HandleSignUpResponse(await SignUPAPI(signupData), "signup");
    } else {
      setisVisible({
        status: "visually-true",
        message: "Password Mismatch",
        for: "signup",
      });
      setIsLoading(false);
    }
  }
  function HandleSignUpResponse(response, value) {
    console.log(response);
    if (response === true) {
      // alert("Registration link sent to your mail id");
      // new AWN().success("Registration link sent to your mail id", {
      //   durations: { success: 0 },
      // });

      toast.warn("🚀 Registration link sent to your mail id", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      SwitchTab("loginDiv");
    } else if (response === false) {
      setisVisible({
        status: "visually-true",
        message: "Already registered",
        for: value,
      });
    } else {
      setisVisible({
        status: "visually-true",
        message: "Invalid email or Server time out",
        for: value,
      });
    }
    setIsLoading(false);
  }
  // let currentIndex = 0;
  // setInterval(() => {
  //   let titles = [
  //     "Hungry?",
  //     "Late night at office?",
  //     "Movie marathon?",
  //     "Game night?",
  //     "Cooking gone wrong?",
  //   ];
  //   var ChangingElement = document.getElementById("ChangingElement");
  //   ChangingElement.innerHTML = titles[currentIndex];
  //   currentIndex++;
  //   if (currentIndex === 5) {
  //     currentIndex = 0;
  //   }
  // }, 3000);
  function SwitchTab(value) {
    var signupDiv;
    var loginDiv;
    if (value === "signupDiv") {
      // alert("Please enter valid email, Otherwise you will not recieve verification link")
      // new AWN().warning('Please enter valid email, Otherwise you will not receive verification link', {durations: {success: 0}})

      toast.warn(
        "😔 Please enter valid email, Otherwise you will not receive verification link",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );

      signupDiv = document.getElementById(value);
      signupDiv.style.visibility = "visible";
      loginDiv = document.getElementById("loginDiv");
      loginDiv.style.visibility = "hidden";
    } else if (value === "loginDiv") {
      loginDiv = document.getElementById(value);
      loginDiv.style.visibility = "visible";
      signupDiv = document.getElementById("signupDiv");
      signupDiv.style.visibility = "hidden";
    }
    setisVisible((preState) => ({
      ...preState,
      status: "visually-hidden",
    }));
    setIsLoading(false);
  }
  function Close(value) {
    var element = document.getElementById(value);
    element.style.visibility = "hidden";
    setsignupData({
      nameSignup: "",
      phoneSignup: "",
      emailIdSignup: "",
      passwordSignup: "",
      confirmpasswordSignup: "",
    });
    setisVisible((preState) => ({
      ...preState,
      status: "visually-hidden",
    }));
    setIsLoading(false);
  }
  function LoginVisible(value) {
    var element = document.getElementById(value);
    element.style.visibility = "visible";
    if (loginDataFromCookie !== null) {
      setloginData({
        emailIdLogin: loginDataFromCookie.emailIdLogin,
        passwordLogin: loginDataFromCookie.passwordLogin,
      });
    }
  }
  return (
    <div>
      <div className="container-fluid firstrow">
        <div className="row firstrow row1 ml-5">
          <div className="container col-sm-7 ml-5">
            <div className="container firstrow mt-5 mx-3">
              <div className="row col-12 firstrow  ">
                <div className="col-6 imageBox">
                  <img alt="Logo" className="logo" src={logo} />
                  <span className="Swiggycolour">swiggy</span>
                </div>
                <div className="col-6 mt-2 " id="loginsign">
                  <button
                    type="button"
                    className="btn mx-2 loginButton"
                    onClick={() => LoginVisible("loginDiv")}
                  >
                    <b>Login</b>
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {
                      LoginVisible("signupDiv");
                      // alert("Please enter valid email, Otherwise you will not recieve verification link")
                      // new AWN().warning('Please enter valid email, Otherwise you will not receive verification link', {durations: {success: 0}})

                      toast.warn(
                        "😔 Please enter valid email, Otherwise you will not receive verification link",
                        {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        }
                      );
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-sm-12 mt-5">
                  <h1 id="ChangingElement">Hungry?</h1>
                  <h4 className="greyColour">
                    Order food from favourite restaurants near you.
                  </h4>
                </div>
                <div className="row">
                  <div className="col-sm-10 mt-5 ">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="Enter delivery location"
                      ></input>
                      <button type="submit">Find Food</button>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-secondary">POPULAR CITIES IN INDIA</p>
                <p className="mt-3 cities">
                  Ahmedabad <span className="text-secondary">Bangalore</span>{" "}
                  Chennai <span className="text-secondary">Delhi</span> Gurgaon
                  <span className="text-secondary"> Hyderabad </span>
                  Kolkata
                  <span className="text-secondary"> Mumbai </span> Pune & more.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-5 imagefirstDiv firstrow">
            <img
              alt="Banner"
              className="firstImage"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid brownColour">
        <div className="row">
          <div className="col-sm-4">
            <img
              alt="Banner"
              className=""
              width="104"
              height="199"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf"
            />
            <h6 className="mt-3">No Minimum Order</h6>
            <p>
              Order in for yourself or for the group,
              <br /> with no restrictions on order value
            </p>
          </div>
          <div className="col-sm-4">
            <img
              alt="Banner"
              className=""
              width="112"
              height="206"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy"
            />
            <h6 className="mt-3">Live Order Tracking</h6>
            <p>
              Know where your order is at all times,
              <br /> from the restaurant to your doorstep
            </p>
          </div>
          <div className="col-sm-4">
            <img
              alt="Banner"
              className=""
              width="124"
              height="188"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
            />
            <h6 className="mt-3">Lightning-Fast Delivery</h6>
            <p>
              Experience Swiggy's superfast delivery,
              <br /> for food delivered fresh & on time
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <div className="container-fluid loginDiv" id="loginDiv">
        <div className="row">
          <div className="col-8 loginleftDiv"></div>
          <div className="col-4 loginrighttDiv">
            <button
              className="btn "
              value="loginDiv"
              onClick={() => Close("loginDiv")}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="row createAcc">
              <div className="col-5   mt-4  ms-3 pe-0 ps-0">
                <h3 className="Login">Login</h3>

                <p
                  onClick={() => {
                    SwitchTab("signupDiv");
                  }}
                >
                  or{" "}
                  <button className="btn orangeColour switchTapButton">
                    {" "}
                    create an account{" "}
                  </button>
                </p>
              </div>
              <div className="col-5 ">
                <img
                  alt="Banner"
                  width="100"
                  height="105"
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                />
              </div>
            </div>
            <form onSubmit={HandleLoginSubmit}>
              <div className="row inputBoxDiv">
                <div className="col-12  mt-4  ms-3">
                  <input
                    className="pt-3 ps-2 pb-3 inputLogin"
                    placeholder="Email"
                    type="email"
                    onChange={HandleLoginData}
                    name="emailIdLogin"
                    id="emailid"
                    value={loginData.emailIdLogin}
                    required
                  />
                  <input
                    className="mt-3 pt-3 ps-2 pb-3 inputLogin"
                    placeholder="Password"
                    type="password"
                    onChange={HandleLoginData}
                    name="passwordLogin"
                    value={loginData.passwordLogin}
                    required
                  />
                  <label
                    htmlFor="emailIdLogin"
                    className={
                      isVisible.for === "login"
                        ? isVisible.status
                        : "visually-hidden"
                    }
                  >
                    {isVisible.message}
                  </label>
                </div>
                <div>
                  <Link
                    to="/forgetpassword"
                    className="forgrtpasswordlink text-decoration-none"
                  >
                    Forget password?
                  </Link>
                  <button
                    className="btn LoginButton mt-2 ms-3 pt-1 pb-2"
                    type="submit"
                  >
                    Login
                  </button>
                  <p className=" ms-3 mt-1">
                    <span className="text-secondary">
                      By clicking on Login, I accept the{" "}
                    </span>
                    Terms & Conditions & Privacy Policy
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid loginDiv" id="signupDiv">
        <div className="row">
          <div className="col-8  loginleftDiv"></div>
          <div className="col-4   loginrighttDiv">
            <button className="btn " onClick={() => Close("signupDiv")}>
              <i className="fas fa-times"></i>
            </button>
            <div className="row createAcc">
              <div className="col-5  mt-4  ms-3 pe-0 ps-0">
                <h3 className="Login">Sign up</h3>
                <p
                  onClick={() => {
                    SwitchTab("loginDiv");
                  }}
                >
                  or{" "}
                  <button className="btn orangeColour switchTapButton">
                    login into account
                  </button>
                </p>
              </div>
              <div className="col-5 ms-3">
                <img
                  alt="Banner"
                  width="100"
                  height="105"
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                />
              </div>
            </div>
            <form onSubmit={HandleSignUpSubmit}>
              <div className="row inputBoxDiv">
                <div className="col-12  mt-4  ms-3">
                  <input
                    placeholder="Name"
                    type="text"
                    required
                    className="pt-3 ps-2 pb-3 mb-3 inputLogin"
                    name="nameSignup"
                    value={signupData.nameSignup}
                    onChange={HandleSignUpData}
                  />
                  <input
                    placeholder="Phone"
                    type="text"
                    required
                    className="pt-3 ps-2 pb-3 mb-3 inputLogin"
                    name="phoneSignup"
                    pattern="^\d{10}$"
                    maxLength={10}
                    title="Max 10 digits is allowed."
                    value={signupData.phoneSignup}
                    onChange={HandleSignUpData}
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    required
                    className="pt-3 ps-2 pb-3 mb-3 inputLogin"
                    id="emailidsignup"
                    title="Enter valid mail id"
                    name="emailIdSignup"
                    value={signupData.emailIdSignup}
                    onChange={HandleSignUpData}
                  />
                  <input
                    placeholder="Password"
                    type="password"
                    title="password length must between 8 to 15, must have one alphabet,number and special character"
                    required
                    className="pt-3 ps-2 pb-3 inputLogin"
                    name="passwordSignup"
                    value={signupData.passwordSignup}
                    onChange={HandleSignUpData}
                  />
                  <input
                    placeholder="Confirm password"
                    type="password"
                    title="password length must between 8 to 15, must have one alphabet,number and special character"
                    required
                    className="mt-3 pt-3 ps-2 pb-3 inputLogin"
                    name="confirmpasswordSignup"
                    value={signupData.confirmpasswordSignup}
                    onChange={HandleSignUpData}
                  />
                  <label
                    htmlFor="emailid"
                    className={
                      isVisible.for === "signup"
                        ? isVisible.status
                        : "visually-hidden"
                    }
                  >
                    {isVisible.message}
                  </label>
                </div>
                <div>
                  <button
                    className="btn LoginButton mt-4 ms-3 pt-1 pb-2"
                    type="submit"
                  >
                    Sign up
                  </button>
                  <p className=" ms-3 mt-1 text-secondary">
                    <span className="text-danger">
                      Please enter valid email,{" "}
                    </span>
                    Otherwise you will not recieve verification link
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="isLoadingLogin">
          <div className="spinner-border  "></div>
        </div>
      )}
    </div>
  );
}

export default Start;
