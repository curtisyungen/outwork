import React, { Component } from "react";
import Container from "../Container/container";
import UserActivity from "../UserActivity/userActivity";
import Metrics from "../Metrics/metrics";
import workoutAPI from "../../utils/workoutAPI";
// import "./profileBody.css";

class ProfileBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userActivity: null,
            message: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userActivity: this.props.userActivity,
        }, () => {
            this.getAllWorkoutsByUserId(this.state.userId);
        });
    }

    
    getAllWorkoutsByUserId = (userId) => {
        this.setState({
            message: "Loading activity...",
        });

        workoutAPI.getAllWorkoutsByUserId(userId)
        .then((res) => {
            this.setState({
                userActivity: res.data,
                message: "No activity found.",
            });
        })
    }

    render() {
        return (
            <Container>
                {this.state.userId ? (
                    <Metrics 
                        userId={this.props.userId}
                    />
                ) : (
                    <p className="text-center">Loading metrics...</p>
                )}

                <div className="myActivity">
                    <h4>User Activity</h4>
                    {this.state.userActivity && this.state.userActivity.length > 0 ? (
                        this.state.userActivity.map(act => (
                            <UserActivity
                                key={Math.random() * 100000}
                                activity={act}
                                deleteActivity={this.props.deleteActivity}
                            />
                        ))
                    ) : (
                            <p className="text-center">{this.state.message}</p>
                        )}
                </div>
            </Container>
        )
    }
}

export default ProfileBody;