import React, { Component } from "react";
import "./profileHeader.css";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            badges: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
        });
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid profileHeader">
                <div className="container">
                    <h1 className="display-4">{this.state.firstName} {this.state.lastName}</h1>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;