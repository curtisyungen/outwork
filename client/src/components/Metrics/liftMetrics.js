import React, { Component } from "react";
import "./metrics.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

library.add(faDumbbell);

class LiftMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userLifts: null,
            workouts: "NA",
            totalMins: 0,
            pushups: 0,
            pullups: 0,
            maxPushUps: 0,
            maxPullUps: 0,
            goggins: 0,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userLifts: this.props.userLifts,
            maxPushUps: this.props.maxPushUps,
            maxPullUps: this.props.maxPullUps,
        }, () => {
            this.getMetrics();
        });
    }

    getMetrics = () => {
        let lifts = this.state.userLifts;
        let totalMins = 0;
        let pushups = 0;
        let pullups = 0;
        let goggins = 0;

        for (var l in lifts) {

            // Get total time
            let time = lifts[l].duration.split(":");
            let hours = parseFloat(time[0]);
            let minutes = parseFloat(time[1]);
            let seconds = parseFloat(time[2]);

            totalMins += (hours * 60) + minutes + Math.round(seconds / 60);

            // Get total push-ups
            if (lifts[l].pushups) {
                pushups += parseFloat(lifts[l].pushups);
            }

            // Get total pull-ups
            if (lifts[l].pullups) {
                pullups += parseFloat(lifts[l].pullups);
            }

            // Get total Goggins workouts
            if (lifts[l].generator === "Goggins") {
                goggins += 1;
            }
        }

        this.setState({
            totalMins: totalMins,
            pushups: pushups,
            pullups: pullups,
            workouts: lifts.length,
            goggins: goggins,
        });
    }

    render() {
        return (
            <span>
                {/* <h4 className="metricsSectionTitle">Lifts</h4> */}
                <div className={`d-flex flex-${this.props.flexDir} metricRow`}>
                    <div className="metricIcon metricIcon-lift">
                        <FontAwesomeIcon className="fa-2x icon" icon={faDumbbell} />
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Workouts</div>
                        <div>{this.state.workouts}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Time (min.)</div>
                        <div>{this.state.totalMins.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Push-Ups</div>
                        <div>{this.state.pushups}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Total Pull-Ups</div>
                        <div>{this.state.pullups}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Most Push-Ups</div>
                        <div>{this.props.maxPushUps}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Most Pull-Ups</div>
                        <div>{this.props.maxPullUps}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Goggins</div>
                        <div>{this.state.goggins}</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default LiftMetrics;