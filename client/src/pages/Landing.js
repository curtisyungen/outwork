import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import "./Landing.css";

class Landing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "outworkguest@gmail.com",
            password: "guest",
        }
    }

    componentDidMount = () => {
        let userId;
        if (localStorage.getItem("userId") !== null) {
            userId=localStorage.getItem("userId");
            userAPI.getUserById(userId)
                .then((res) => {
                    if (res.data.length === 0) {
                        this.props.logoutUser();
                        return;
                    }
                    else {
                        this.props.setRedirectToHome();
                    }
            });
        }
    }

    loginGuest = () => {
        this.props.loginUser(this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="landingPage">
                <div className="jumbotron jumbotron-fluid text-center">
                    <div className="logo">
                        <a href="/">
                            <img className="loginLogo" src={require('../images/logo2.png')} alt="congo" />
                        </a>
                        <h4 className="standardTitle">Outwork</h4>
                    </div>
                    <div className="loginBtns btn-group col-lg-2 text-center">
                        {/* <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={this.props.setRedirectToSignUp}
                        >
                            Sign Up
                        </button> */}
                        <button 
                            className="btn btn-outline-dark btn-sm" 
                            onClick={this.props.setRedirectToLogin}
                        >
                            Sign In
                        </button>
                        <button 
                            className="btn btn-warning btn-sm" 
                            onClick={this.loginGuest}
                        >
                            Guest
                        </button>
                    </div>
                </div>

                <hr/>

                <div className="sitePreview">
                    <a className="btn btn-outline-dark btn-sm videoDemo" href="">Video Demo (Coming Soon)</a>
                </div>
            </div>
        )
    }
}

export default Landing;
