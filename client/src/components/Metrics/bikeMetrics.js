import React, { Component } from "react";
import "./metrics.css";

import moment from "moment";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking } from '@fortawesome/free-solid-svg-icons';

library.add(faBiking);

class BikeMetrics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            userBikes: null,
            totalMiles: 0,
            avgMilesPerWeek: 0,
            totalClimb: 0,
            totalMins: 0,
            avgMiles: 0,
            speed: 0,
            maxMiles: 0,
            workouts: "NA",
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            userBikes: this.props.userBikes,
        }, () => {
            this.getMetrics();
            this.getAvgMilesPerWeek();
        });
    }

    getMetrics = () => {
        let bikes = this.state.userBikes;
        let totalMiles = 0, totalClimb = 0;
        let maxMiles = 0;
        let totalMins = 0;

        for (var b in bikes) {
            let miles = parseFloat(bikes[b].distance);
            let climb = parseFloat(bikes[b].climb);
            let time = parseFloat(bikes[b].ttlMins);

            // Get max miles
            if (maxMiles < miles) {
                maxMiles = miles;
            }

            // Get total miles, total time
            totalMiles += miles;
            totalMins += time;

            // Get total climb (if climb is not null)
            if (climb) {
                totalClimb += climb;
            }
        }

        // Get avg. speed (mph)
        let speed = Math.round((totalMiles / (totalMins / 60)) * 100) / 100;

        this.setState({
            totalMiles: totalMiles,
            totalClimb: totalClimb,
            totalMins: totalMins,
            maxMiles: maxMiles,
            workouts: bikes.length,
            speed: speed,
        });
    }

    // Calculates miles per week for current year only
    getAvgMilesPerWeek = () => {
        let bikes = this.state.userBikes;
        let year = [];
        for (var i=0; i<52; i++) {
            year.push(0);
        }

        let miles = 0;
        let week;
        let totalMiles = 0;
        for (var r in bikes) {
            miles = parseFloat(bikes[r].distance);
            week = moment(bikes[r].date).week();
            year[week] += miles;

            totalMiles += miles;
        }

        let avgMiles = 0;
        let today = new Date();
        avgMiles = Math.round((totalMiles / moment(today).week()) * 100) / 100;

        this.setState({
            avgMilesPerWeek: avgMiles,
        });
    }

    render() {
        return (
            <span>
                {/* <h4 className="metricsSectionTitle">Bikes</h4> */}
                <div className={`d-flex flex-${this.props.flexDir} metricRow`}>
                    <div className="metricIcon metricIcon-bike">
                        <FontAwesomeIcon className="fa-2x icon" icon={faBiking} />
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
                        <div className="metricTitle">Total Miles</div>
                        <div>{this.state.totalMiles.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Miles / Week</div>
                        <div>{this.state.avgMilesPerWeek.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Climb (ft.)</div>
                        <div>{this.state.totalClimb.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Avg. Speed (mph)</div>
                        <div>{this.state.speed.toFixed(2)}</div>
                    </div>
                    <div className="metric">
                        <div className="metricTitle">Max. Dist. (mi.)</div>
                        <div>{this.state.maxMiles}</div>
                    </div>
                </div>
            </span>
        )
    }
}

export default BikeMetrics;