import React, { Component } from "react";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import SwimLap from "../components/SwimLap/swimLap";
import userAPI from "../utils/userAPI";
import workoutAPI from "../utils/workoutAPI";
import "./SubmitSwim.css";

class SubmitSwim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      date: null,
      time: null,
      distance: null,
      units: "Meters",
      duration: null,
      ttlMins: null,
      laps: null,
      location: null,
      surface: null,
      workout: [],
      notes: null,
      today: null
    };
  }

  componentDidMount = () => {
    this.props.checkValidUser();
    this.getToday();

    // Get user info
    let userId = localStorage.getItem("userId");

    userAPI.getUserById(userId).then(res => {
      // Get workout
      let lap = {
        id: 0,
        distance: "",
        time: "",
        stroke: "",
        sets: "",
        rest: ""
      };

      let workout = [lap];

      this.setState({
        userId: userId,
        firstName: res.data[0].firstName,
        lastName: res.data[0].lastName,
        workout: workout
      });
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  validateSwimForm = () => {
    let date = this.state.date;
    let dist = this.state.distance;
    let time = this.state.duration;
    let workout = this.state.workout;

    if (date === null || date === "" || date.length < 10) {
      alert("Inputted date is not valid.");
      return false;
    }

    if (dist === null || dist === "" || dist < 0 || isNaN(dist)) {
      alert("Distance must be a positive integer.");
      return false;
    }

    if (time === null || time === "" || time.length < 8) {
      alert("Duration must be in hh:mm:ss format.");
      return false;
    }

    if (workout === null || workout === "" || workout.length === 0) {
      alert("Must input workout completed.");
      return false;
    }

    return true;
  };

  changeUnits = units => {
    this.setState({
      units: units
    });
  };

  addLap = () => {
    let laps = this.state.workout;

    let maxId = -1;
    for (var r in laps) {
      if (laps[r].id > maxId) {
        maxId = parseInt(laps[r].id);
      }
    }

    let lap = {
      id: maxId + 1,
      distance: "",
      time: "",
      stroke: "",
      rest: ""
    };

    laps.push(lap);

    this.setState({
      workout: laps
    });
  };

  deleteLap = lap => {
    let laps = this.state.workout;
    let idx;

    for (var i = 0; i < laps.length; i++) {
      if (laps[i].id === lap) {
        idx = i;
      }
    }

    laps.splice(idx, 1);

    this.setState({
      workout: laps
    });
  };

  getLap = lap => {
    let laps = this.state.workout;
    let idx = -1;

    for (var l in laps) {
      if (laps[l].id === lap.id) {
        idx = l;
      }
    }

    if (idx > -1) {
      laps[idx] = lap;
    } else {
      laps.push(lap);
    }

    this.setState({
      workout: laps
    });
  };

  setDistance = (id, distance) => {
    let workout = this.state.workout;

    for (var w in workout) {
      if (workout[w].id === id) {
        workout[w].distance = distance;
      }
    }

    this.setState({
      workout: workout
    });
  };

  setTime = (id, time) => {
    let workout = this.state.workout;

    for (var w in workout) {
      if (workout[w].id === id) {
        workout[w].time = time;
      }
    }

    this.setState({
      workout: workout
    });
  };

  setStroke = (id, stroke) => {
    let workout = this.state.workout;

    for (var w in workout) {
      if (workout[w].id === id) {
        workout[w].stroke = stroke;
      }
    }

    this.setState({
      workout: workout
    });
  };

  setSets = (id, sets) => {
    let workout = this.state.workout;

    for (var w in workout) {
      if (workout[w].id === id) {
        workout[w].sets = sets;
      }
    }

    this.setState({
      workout: workout
    });
  };

  setRest = (id, rest) => {
    let workout = this.state.workout;

    for (var w in workout) {
      if (workout[w].id === id) {
        workout[w].rest = rest;
      }
    }

    this.setState({
      workout: workout
    });
  };

  convertMilesToMeters = () => {
    let dist = this.state.distance;

    if (this.state.units === "Miles") {
      dist = dist * 1609.344;
    }

    dist = Math.round((dist * 100) / 100);

    this.setState(
      {
        distance: dist
      },
      () => {
        this.getTtlMins();
      }
    );
  };

  getTtlMins = () => {
    let time = this.state.duration;
    let hours, mins, secs;

    hours = parseFloat(time.split(":")[0]);
    mins = parseFloat(time.split(":")[1]);
    secs = parseFloat(time.split(":")[2]);

    let ttlMins = 0;

    ttlMins = Math.round((hours * 60 + mins + secs / 60) * 100) / 100;

    this.setState(
      {
        ttlMins: ttlMins
      },
      () => {
        this.submitSwim();
      }
    );
  };

  getToday = () => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    let moZero = "";

    if (month < 10) {
      moZero = 0;
    }

    let dateZero = "";

    if (date < 10) {
      dateZero = 0;
    }

    let defaultDate = `2019-${moZero}${month}-${dateZero}${date}`;

    this.setState({
      today: defaultDate,
      date: defaultDate
    });
  };

  submitSwim = () => {
    return;
    this.props.checkValidUser();

    if (this.validateSwimForm()) {
      let swimData = {
        workoutType: "swim",
        userId: this.state.userId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        distance: this.state.distance,
        duration: this.state.duration,
        ttlMins: this.state.ttlMins,
        milePace: null,
        runType: null,
        laps: this.state.laps,
        repeats: null,
        race: null,
        surface: this.state.surface,
        weather: null,
        climb: null,
        grade: null,
        shoe: null,
        bike: null,
        generator: null,
        pushups: null,
        pullups: null,
        workout: JSON.stringify(this.state.workout),
        muscleGroups: null,
        notes: this.state.notes,
        map: null
      };

      workoutAPI.createWorkout(swimData).then(res => {
        if (res.status === 200) {
          alert("Workout submitted!");
          window.location.reload();
        } else {
          alert("Error submitting workout.");
        }
      });
    }
  };

  render() {
    return (
      <div className="container pageContainer submitContainer">
        <div>
          <div className="titleBar">
            <h4>Swimming Workout</h4>
            <ActivityIcons hidden="swim" />
          </div>

          {/* DATE */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Date*
              </span>
            </div>
            <input
              autoComplete="off"
              name="date"
              type="date"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
              defaultValue={this.state.today}
            />
          </div>

          {/* TIME */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Time of Day
              </span>
            </div>
            <input
              autoComplete="off"
              name="time"
              type="text"
              className="form-control"
              placeholder="3:00pm"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
            />
          </div>

          {/* DISTANCE */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Distance*
              </span>
            </div>
            <input
              autoComplete="off"
              name="distance"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary dropdown-toggle unitDropdown"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.units}
              </button>
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={this.changeUnits.bind(null, "Meters")}
                >
                  Meters
                </div>
                <div
                  className="dropdown-item"
                  onClick={this.changeUnits.bind(null, "Miles")}
                >
                  Miles
                </div>
              </div>
            </div>
          </div>

          {/* DURATION */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Duration*
              </span>
            </div>
            <input
              autoComplete="off"
              name="duration"
              type="text"
              className="form-control"
              placeholder="hh:mm:ss"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
            />
          </div>

          {/* LOCATION */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Location
              </span>
            </div>
            <input
              autoComplete="off"
              name="location"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
            />
          </div>

          {/* LAPS */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Total Laps
              </span>
            </div>
            <input
              autoComplete="off"
              name="laps"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
            />
          </div>

          {/* WATER TYPE */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Water
              </span>
            </div>
            <select
              className="browser-default custom-select"
              autoComplete="off"
              name="surface"
              type="text"
              onChange={this.handleInputChange}
              defaultValue={null}
            >
              <option value=""></option>
              <option value="Pool">Pool</option>
              <option value="Lake">Lake</option>
              <option value="River">River</option>
              <option value="Ocean">Ocean</option>
            </select>
          </div>

          {/* SWIM WORKOUT */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend submitFormSectTitle">
              Workout*
            </div>
          </div>

          {this.state.workout.map(lap => (
            <SwimLap
              key={lap.id}
              id={lap.id}
              units={this.state.units}
              setDistance={this.setDistance}
              setTime={this.setTime}
              setStroke={this.setStroke}
              setSets={this.setSets}
              setRest={this.setRest}
              getLap={this.getLap}
              deleteLap={this.deleteLap}
            />
          ))}

          {/* ADD LAP BUTTON */}
          <div className="addRepeatBtn">
            <button className="btn btn-dark btn-sm" onClick={this.addLap}>
              Add Lap
            </button>
          </div>

          {/* NOTES */}
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Notes
              </span>
            </div>
            <input
              autoComplete="off"
              name="notes"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleInputChange}
            />
          </div>

          {/* {localStorage.getItem("userId") === "834292GU" ? (
            <></>
          ) : (
            <button
              className="btn btn-primary"
              onClick={this.convertMilesToMeters}
            >
              Submit
            </button>
          )} */}
        </div>
      </div>
    );
  }
}

export default SubmitSwim;
