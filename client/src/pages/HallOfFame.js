import React, { Component } from "react";
import hofAPI from "../utils/hofAPI";
import "./HallOfFame.css";

import moment from "moment";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, faHotdog
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, faHotdog);

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {

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
                console.log(res);
            });
    }

    // HALL OF FAME
    // ==================================

    render() {
        return (
            <div className="container pageContainer hofContainer">
                {this.state.mostWorkouts && this.state.mostRestDays && this.state.longestRun && this.state.maxClimb && this.state.mostPushUps &&
                    this.state.mostPullUps && this.state.mostGoggins && this.state.mostRainyDays && this.state.mostSwims && this.state.mostRaces
                    ? (
                        <span>
                            <h4>Hall of Fame</h4>
                            <div className="hallOfFame">
                                {/* MOST WORKOUTS */}
                                <div className="hofMetric mostWorkouts">
                                    <div className="hofHover">Highest number of workouts completed of any type.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x trophyIcon" icon={faTrophy} /></div>
                                    <div className="hofTitle">Hardest Worker</div>
                                    <div className="hofName">{this.state.mostWorkouts[1]}</div>
                                    <div className="hofValue">{this.state.mostWorkouts[0]} workouts</div>
                                </div>

                                {/* MOST REST DAYS */}
                                <div className="hofMetric mostRestDays">
                                    <div className="hofHover">Most number of rest days. Person here needs to stop cuddling with blanky, get the fuck out of bed, and quit being a lazy bitch.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x restIcon" icon={faBed} /></div>
                                    <div className="hofTitle">Snoozer</div>
                                    <div className="hofName">{this.state.mostRestDays[1]}</div>
                                    <div className="hofValue">{this.state.mostRestDays[0]} rest days</div>
                                </div>

                                {/* LONGEST RUN */}
                                <div className="hofMetric longestRun">
                                    <div className="hofHover">Most number of miles run in one workout.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x rulerIcon" icon={faRulerHorizontal} /></div>
                                    <div className="hofTitle">Endurer</div>
                                    <div className="hofName">{this.state.longestRun.firstName}</div>
                                    <div className="hofValue">{this.state.longestRun.distance} miles</div>
                                </div>

                                {/* GREATEST CLIMB */}
                                <div className="hofMetric mostClimb">
                                    <div className="hofHover">Most elevation climbed in single workout.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x mountainIcon" icon={faMountain} /></div>
                                    <div className="hofTitle">Climber</div>
                                    <div className="hofName">{this.state.maxClimb.firstName}</div>
                                    <div className="hofValue">{this.state.maxClimb.climb} feet</div>
                                </div>

                                {/* MOST PUSH-UPS */}
                                <div className="hofMetric mostPushUps">
                                    <div className="hofHover">Most push-ups done in a single workout.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x silverMedalIcon" icon={faMedal} /></div>
                                    <div className="hofTitle">Push-Up Bro</div>
                                    <div className="hofName">{this.state.mostPushUps.firstName}</div>
                                    <div className="hofValue">{this.state.mostPushUps.pushups} push-ups</div>
                                </div>

                                {/* MOST PULL-UPS */}
                                <div className="hofMetric mostPullUps">
                                    <div className="hofHover">Most pull-ups done in a single workout.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x bronzeMedalIcon" icon={faMedal} /></div>
                                    <div className="hofTitle">Prince of Pulls</div>
                                    <div className="hofName">{this.state.mostPullUps.firstName}</div>
                                    <div className="hofValue">{this.state.mostPullUps.pullups} pull-ups</div>
                                </div>

                                {/* MOST GOGGINS WORKOUTS */}
                                <div className="hofMetric mostGoggins">
                                    <div className="hofHover">Most Goggins workouts completed. Winner here is a total badass.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x dragonIcon" icon={faDragon} /></div>
                                    <div className="hofTitle">Most Goggins</div>
                                    <div className="hofName">{this.state.mostGoggins[1]}</div>
                                    <div className="hofValue">{this.state.mostGoggins[0]} workouts</div>
                                </div>

                                {/* MOST RACES */}
                                <div className="hofMetric mostRaces">
                                    <div className="hofHover">Most number of races completed.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x flagIcon" icon={faFlagCheckered} /></div>
                                    <div className="hofTitle">Competitor</div>
                                    <div className="hofName">{this.state.mostRaces[1]}</div>
                                    <div className="hofValue">{this.state.mostRaces[0]} races</div>
                                </div>

                                {/* MOST TIME */}
                                <div className="hofMetric mostTime">
                                    <div className="hofHover">Most time spent working out. Measured in minutes.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x clockIcon" icon={faClock} /></div>
                                    <div className="hofTitle">Most Time</div>
                                    <div className="hofName">{null}</div>
                                    <div className="hofValue">{null} minutes</div>
                                </div>

                                {/* MOST RAINY DAYS */}
                                <div className="hofMetric mostRainyDays">
                                    <div className="hofHover">Most days run in heavy rain.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x rainIcon" icon={faCloudShowersHeavy} /></div>
                                    <div className="hofTitle">Rain Man</div>
                                    <div className="hofName">{this.state.mostRainyDays[1]}</div>
                                    <div className="hofValue">{this.state.mostRainyDays[0]} rain runs</div>
                                </div>

                                {/* MOST SWIMS */}
                                <div className="hofMetric mostSwims">
                                    <div className="hofHover">Most swim workouts completed.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x fishIcon" icon={faFish} /></div>
                                    <div className="hofTitle">Merman</div>
                                    <div className="hofName">{this.state.mostSwims[1]}</div>
                                    <div className="hofValue">{this.state.mostSwims[0]} swims</div>
                                </div>

                                {/* HOT DOG */}
                                <div className="hofMetric hotdog">
                                    <div className="hofHover">The coveted weiner award.</div>
                                    <div className="hofIcon"><FontAwesomeIcon className="fa-3x hotdogIcon" icon={faHotdog} /></div>
                                    <div className="hofTitle">Weiner</div>
                                    <div className="hofName">{this.state.hotdog[1]}</div>
                                    <div className="hofValue">{this.state.hotdog[0]}</div>
                                </div>
                            </div>
                        </span>
                    ) : (
                        <></>
                    )}
            </div>

        )
    }
}

export default HallOfFame;
