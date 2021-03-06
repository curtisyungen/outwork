import React, { Component } from "react";
import ProfileHeader from "../components/ProfileHeader/profileHeader";
import ProfileBody from "../components/ProfileBody/profileBody";
import Metrics from "../components/Metrics/metrics";
import Calendar from "../components/Calendar/calendar";
import hofAPI from "../utils/hofAPI";
import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            userActivity: null,
            hof: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        this.props.updateHof();

        let userId, firstName, lastName;

        if (this.props.profileId !== null) {
            userId = this.props.profileId;
            firstName = this.props.otherUserFirst;
            lastName = this.props.otherUserLast;
        }
        else {
            userId = localStorage.getItem("userId");
            firstName = localStorage.getItem("fn");
            lastName = localStorage.getItem("ln");
        }

        this.setState({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
        }, () => {
            this.getHof();
        });
    }

    getHof = () => {
        hofAPI.getHof()
            .then((res) => {

                let hof = [];

                for (var a in res.data) {
                    if (res.data[a].firstName === this.state.firstName) {
                        hof.push([res.data[a].title, res.data[a].icon]);
                    }
                }

                this.setState({
                    hof: hof,
                });
            });
    }

    render() {
        return (
            <div className="container pageContainer profileContainer">
                {this.state.firstName && this.state.lastName && this.state.hof ? (
                    <span>
                        <ProfileHeader
                            userId={this.state.userId}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            hof={this.state.hof}
                        />

                        {this.state.userId ? (
                            <span>
                                <Metrics 
                                    userId={this.state.userId}
                                    firstName={this.state.firstName}
                                />

                                <Calendar 
                                    userId={this.state.userId}
                                />
                            </span>
                        ) : (
                            <></>
                        )}

                        <ProfileBody
                            userId={this.state.userId}
                            deleteActivity={this.props.deleteActivity}
                        />
                    </span>
                ) : (
                        <p>Loading...</p>
                    )}
            </div>
        )
    }
}

export default Profile;