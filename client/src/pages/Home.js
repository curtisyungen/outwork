import React, { Component } from "react";
import "./Home.css";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.updateParentState();
    }

    render() {
        return (
            <div className="homePage">
                Home
            </div>
        )
    }
}

export default Home;