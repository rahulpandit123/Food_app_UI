import React from "react";
import { withRouter } from "react-router";
import "../Style/Header.css";
import Modal from "react-modal";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useBeforeunload } from "react-beforeunload";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#60ecd9d4",
    boxShadow: " 10px 10px 5px grey",
  },
};
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      // loggedInUserName: undefined,
      // isLoggedIn: false,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      logingMessage: undefined,
    };
  }
  handleNavigate = () => {
    this.props.history.push("/");
  };

  handleLogin = () => {
    this.setState({ loginModalIsOpen: true });
  };
  responseFacebook = (response) => {
    console.log(response);
    localStorage.setItem("loggedInUserName", response.name);
    localStorage.setItem("isLoggedIn", true);
    this.setState({
      loginModalIsOpen: false,
      // isLoggedIn: true,
      // loggedInUserName: response.name,
    });
  };
  responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("loggedInUserName", response.profileObj.name);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("loggedInWith", "google");
    this.setState({
      loginModalIsOpen: false,
      // isLoggedIn: true,
      // loggedInUserName: response.profileObj.name,
    });
  };
  handleLogout = () => {
    localStorage.clear();
    this.setState({});
  };
  handleSignup = () => {
    this.setState({ signupModalIsOpen: true });
  };
  handleCloseModal = (state, value) => {
    this.setState({ [state]: value });
  };
  handleSignup2 = () => {
    this.setState({ signupModalIsOpen: true, loginModalIsOpen: false });
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  createAccount = async (event) => {
    event.preventDefault();
    const { firstname, lastname, email, password } = this.state;
    axios({
      url: `https://zoomato-backend.herokuapp.com/userregistration`,
      method: "POST",
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        this.setState({
          signupModalIsOpen: false,
          firstname: firstname,
        });
        // alert("Account created Successfully!!");
        console.log("This is for Create Account ->>   ", res.data.restaurant);
      })
      .catch((err) => {
        console.log("could not login -> ", err);
      });
  };
  loginHandler = async (event) => {
    event.preventDefault();
    const { email, password, loggedInUserName } = this.state;
    // console.log(email);
    // alert("Email - ", email + "Password = ", password);
    const reqObj = {
      email,
      password,
    };
    /*
    let result = await fetch("http://localhost:2020/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Application: "application/json",
      },
      body: JSON.stringify(data),
    });
    // result = result.json();
    alert("Result for Login -", result);
    this.setState({
      loginModalIsOpen: false,
      isLoggedIn: true,
      loggedInUserName: result.data.firstname,
    });
    localStorage.setItem("login_user", JSON.stringify(result));
    */

    axios({
      url: "https://zoomato-backend.herokuapp.com/login",
      method: "POST",
      data: reqObj,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // alert("Login! -> ", response.data);

        // setTimeout(function () {
        //   alert(response.data.firstname);
        // }, 3000);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUserName", response.data.firstname);

        this.setState({
          loginModalIsOpen: false,
          email: undefined,
          password: undefined,
          // isLoggedIn: true,
          // loggedInUserName: response.data.firstname,
        });

        // let resObj = JSON.parse(res);

        console.log("This is for Login Account Description ->>   ", response);
      })
      .catch((err) => {
        console.log("could not login -> ", err);
        <p>Could not login !</p>;
      });
  };

  componentWillUnmount() {
    // localStorage.setItem("isLoggedIn", false);
    // localStorage.setItem("loggedInUserName", " ")
    localStorage.clear();
    alert(
      "this is end of application",
      localStorage.getItem("loggedInUserName")
    );
  }
  onbeforeunload = function () {
    alert("useBeforeunload function call");
    localStorage.clear();
  };

  render() {
    const {
      loginModalIsOpen,
      // isLoggedIn,
      // loggedInUserName,
      signupModalIsOpen,
      firstname,
      lastname,
      email,
      password,
    } = this.state;
    let loggedInUserName = localStorage.getItem("loggedInUserName");
    console.log("LoggedIn User Name ->", loggedInUserName);

    let isLoggedIn = localStorage.getItem("isLoggedIn");

    return (
      <div>
        <header className='header2'>
          <span className='e'>
            <span className='Ellipse-2' onClick={this.handleNavigate}>
              <b>e!</b>
            </span>
          </span>
          {isLoggedIn ? (
            <div classame='auth' style={{ display: "inline-flex" }}>
              <span className='loggedInUserName'>{loggedInUserName}</span>
              <span className='login' onClick={this.handleLogout}>
                {" "}
                Logout{" "}
              </span>
            </div>
          ) : (
            <span>
              <span className='login' onClick={this.handleLogin}>
                Login
              </span>
              <span className='create-an-account'>
                {" "}
                <span className='Rectangle-17' onClick={this.handleSignup}>
                  Create Account
                </span>
              </span>
            </span>
          )}
        </header>
        <br />
        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div
            className='glyphicon glyphicon-remove'
            style={{ float: "right", margin: "5px", backgroundColor: "red" }}
            onClick={() =>
              this.handleCloseModal("loginModalIsOpen", false)
            }></div>
          <div>
            {" "}
            <h2 className='loginhead'>Login</h2>
            <hr />
            {/* <form className='loginForm'> */}
            <div className='logincred'>
              <label className='signup1'>Enter Email Address</label>
              <input
                type='email'
                placeholder='Enter Email Id'
                value={email}
                name='email'
                onChange={this.handleInputChange}
              />
              <label className='signup1'>Enter Password</label>

              <input
                type='password'
                placeholder='Enter Password'
                value={password}
                name='password'
                onChange={this.handleInputChange}
              />
            </div>
            <button
              type='submit'
              className='signup1 signupbtn'
              onClick={this.loginHandler}>
              Login
            </button>
            {/* </form> */}
            <hr />
            <label>
              Need a New Account{" "}
              <h2 className='loginsignup' onClick={this.handleSignup2}>
                {" "}
                Signup
              </h2>
            </label>
            <div>
              <FacebookLogin
                appId='4532601126792376'
                autoLoad={false}
                fields='name,email,picture'
                callback={this.responseFacebook}
              />
              <GoogleLogin
                clientId='599494905618-gan8mootlb17fo7q21oqid0msed543i7.apps.googleusercontent.com'
                buttonText='Login with Gmail'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                style={{ padding: "7px" }}
              />
            </div>
          </div>
        </Modal>
        <Modal isOpen={signupModalIsOpen} style={customStyles}>
          <div
            className='glyphicon glyphicon-remove'
            style={{ float: "right", margin: "5px" }}
            onClick={() =>
              this.handleCloseModal("signupModalIsOpen", false)
            }></div>
          <div className='signupform'>
            <form>
              <label className='signup1'>Enter First Name </label>
              <input
                type='text'
                placeholder='Enter first name'
                required
                style={{ width: "400px" }}
                value={firstname}
                name='firstname'
                onChange={this.handleInputChange}
              />
              <label className='signup1'>Enter Last Name </label>
              <input
                type='text'
                placeholder='Enter last name'
                style={{ width: "400px" }}
                value={lastname}
                name='lastname'
                onChange={this.handleInputChange}
              />
              <label className='signup1'>Enter Email Address </label>
              <input
                type='email'
                placeholder='Enter email Id'
                required
                style={{ width: "400px" }}
                value={email}
                name='email'
                onChange={this.handleInputChange}
              />
              <label className='signup1'> Set Password </label>
              <input
                type='password'
                placeholder='Enter password'
                required
                style={{ width: "400px" }}
                value={password}
                name='password'
                onChange={this.handleInputChange}
              />
              <button
                type='submit'
                className='signup1 signupbtn'
                onClick={this.createAccount}>
                Create Account
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Header);
