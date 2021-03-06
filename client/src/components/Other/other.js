import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-responsive-modal";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import "./run.css";

library.add(faRunning);

class Run extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            userId: null,
            repeats: null,
            update: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            userId: this.props.userId,
            repeats: JSON.parse(this.props.repeats),
        });
    }
    
    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    openModal = () => {
        this.setState({
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

    updateRun = (event) => {
        event.preventDefault();

        let runId = this.props.id;
        sessionStorage.setItem("id", runId);

        this.setState({
            update: true,
        });
    }

    deleteRun = (event) => {
        event.preventDefault();

        let confirm = window.confirm("Delete this run?");

        if (confirm) {
            this.props.deleteActivity(this.props.id);
        }
    }

    render() {
        return (
            <span>
                <div className="d-flex flex-row actCard" onClick={this.openModal}>
                    <div className={`runIcon border-${this.props.runType !== null && this.props.runType === "Race"}`}><FontAwesomeIcon className={`fa-2x icon`} icon={faRunning} /></div>
                    <div className="cell"><span className="cellDesc">Name</span>{this.props.firstName}</div>
                    <div className="cell"><span className="cellDesc">Date</span>{this.props.date}</div>
                    <div className="cell"><span className="cellDesc">Miles</span>{this.props.distance}</div>
                    <div className="cell cell4"><span className="cellDesc">Time</span>{this.props.duration}</div>
                    <div className="cell cell5"><span className="cellDesc">Mile Pace</span>{this.props.milePace}</div>
                    <div className="cell cell6"><span className="cellDesc">Climb</span>{this.props.climb}</div>
                    <div className="cell cell7"><span className="cellDesc">Weather</span>{this.props.weather}</div>
                    <div className="cell cell8 actNotes"><span className="cellDesc">Notes</span>{this.props.notes}</div>
                </div>

                {this.state.update ? (
                    <Redirect 
                        to={{
                            pathname: "/updateRun",
                        }}
                    />
                ) : (
                    <></>
                )}

                {this.state.openModal ? (
                    <Modal
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        {/* ICON, DATE */}
                        <div className="">
                            <FontAwesomeIcon className="fa-3x runIcon dataIcon" icon={faRunning} />
                            <h5 className="dataPoint-xl">{this.props.firstName} | {this.props.date}</h5>
                        </div>

                        {/* DATA */}
                        <div>
                            <div className="d-flex flex-column">
                                {/* LOCATION */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Location</div>
                                    <div className="dataPoint">{this.props.location}</div>
                                </div>
                                {/* TIME OF DAY */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Time of Day</div>
                                    <div className="dataPoint">{this.props.time}</div>
                                </div>
                                {/* DISTANCE */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Distance (mi.)</div>
                                    <div className="dataPoint">{this.props.distance}</div>
                                </div>
                                {/* DURATION */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Duration</div>
                                    <div className="dataPoint">{this.props.duration}</div>
                                </div>
                                {/* PACE */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Pace (min./mi.)</div>
                                    <div className="dataPoint">{this.props.milePace}</div>
                                </div>
                                {/* TYPE */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Type</div>
                                    <div className="dataPoint">{this.props.runType}</div>
                                </div>
                                {/* RACE */}
                                {this.props.runType === "Race" ? (
                                    <div className="border-bottom">
                                        <div className="dataTitle">Race</div>
                                        <div className="dataPoint">{this.props.race}</div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {/* REPEATS */}
                                {this.props.runType === "Repeats" ? (
                                    <div className="border-bottom">
                                        <div className="dataTitle">Repeats</div>
                                        <div className="">
                                            {JSON.parse(this.props.repeats).map(repeat => (
                                                <div key={repeat.id} className="repeatDiv">
                                                    <span className="repeatSpan">Miles: {repeat.distance}</span>
                                                    <span className="repeatSpan">Time: {repeat.time}</span>
                                                    <span className="repeatSpan">Rest: {repeat.rest}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {/* CLIMB */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Climb (ft.)</div>
                                    <div className="dataPoint">{this.props.climb}</div>
                                </div>
                                {/* GRADE */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Grade (%)</div>
                                    <div className="dataPoint">{this.props.grade}</div>
                                </div>
                                {/* SURFACE */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Surface</div>
                                    <div className="dataPoint">{this.props.surface}</div>
                                </div>
                                {/* WEATHER */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Weather</div>
                                    <div className="dataPoint">{this.props.weather}</div>
                                </div>
                                {/* SHOES */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Shoes</div>
                                    <div className="dataPoint">{this.props.shoe}</div>
                                </div>
                                {/* NOTES */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Notes</div>
                                    <div className="dataPoint dataPoint-notes">{this.props.notes}</div>
                                </div>
                                {/* MAP */}
                                <div className="border-bottom">
                                    <div className="dataTitle">Map</div>
                                    <div className="dataPoint dataPoint-map">{this.props.map}</div>
                                </div>
                            </div>

                            {this.props.userId === localStorage.getItem("userId") ? (
                                <span>
                                    <button className="btn btn-danger btn-sm deleteActivity" onClick={this.deleteRun}>Delete Run</button>
                                    <button className="btn btn-success btn-sm updateActivity" onClick={this.updateRun}>Update</button>
                                </span>
                            ) : (
                                <></>
                            )}    
                        </div>            
                    </Modal>
                ) : (
                        <></>
                    )}
            </span>


        )
    }
}

export default Run;