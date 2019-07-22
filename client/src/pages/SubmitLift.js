import React, { Component } from "react";
// import Container from "../components/Container/container";
import Exercise from "../components/Exercise/exercise";
import MuscleGroup from "../components/MuscleGroup/muscleGroup";
import ActivityIcons from "../components/ActivityIcons/activityIcons";
import userAPI from "../utils/userAPI";
import workoutAPI from "../utils/workoutAPI";
import "./SubmitLift.css";

class SubmitLift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            date: null,
            time: null,
            location: null,
            duration: null,
            generator: null,
            pushups: null,
            pullups: null,
            exercises: [],
            muscleGroups: [],
            muscleGroupList: [],
            notes: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

        // Get user info
        let userId = localStorage.getItem("userId");     

        userAPI.getUserById(userId)
            .then((res) => {
                // Get exercises 
                let exercises = [];   
                let exercise = {
                    id: 0,
                    name: "",
                    weight: "",
                    reps: "",
                    rest: "",
                }

                exercises.push(exercise);
                
                let muscleGroupList = [
                    "Chest", "Shoulders", 
                    "Back", "Biceps", 
                    "Triceps", "Forearms", 
                    "Quadriceps", "Hamstrings", 
                    "Calves", "Abdominals"];

                this.setState({
                    userId: userId,
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    exercises: exercises,
                    muscleGroupList: muscleGroupList,
                });
            });      
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    getPushUps = () => {
        let exercises = this.state.exercises;
        let pushups = 0;

        for (var e in exercises) {
            if (exercises[e].name.toLowerCase().indexOf("push-ups") > -1) {
                pushups += parseInt(exercises[e].reps);
            }

            if (exercises[e].name.toLowerCase().indexOf("push ups") > -1) {
                pushups += parseInt(exercises[e].reps);
            }
        }

        return pushups;
    }

    getPullUps = () => {
        let exercises = this.state.exercises;
        let pullups = 0;

        for (var e in exercises) {
            if (exercises[e].name.toLowerCase().indexOf("pull-ups") > -1) {
                pullups += parseInt(exercises[e].reps);
            }

            if (exercises[e].name.toLowerCase().indexOf("pull ups") > -1) {
                pullups += parseInt(exercises[e].reps);
            }
        }

        return pullups;
    }

    addExercise = () => {
        let exercises = this.state.exercises;

        let maxId = -1;
        for (var e in exercises) {
            if (exercises[e].id > maxId) {
                maxId = parseeInt(exercises[e].id);
            }
        }

        let exercise = {
            id: maxId + 1,
            name: "",
            weight: "",
            reps: "",
            rest: "",
        }

        exercises.push(exercise);

        this.setState({
            exercises: exercises,
        });
    }

    getExercise = (exercise) => {
        let exercises = this.state.exercises;
        let idx = -1;

        for (var e in exercises) {
            if (exercises[e].id === exercise.id) {
                idx = e;
            }
        }

        if (idx > -1) {
            exercises[idx] = exercise;
        }
        else {
            exercises.push(exercise);
        }

        this.setState({
            exercises: exercises,
        });
    }

    deleteExercise = (exercise) => {
        let exercises = this.state.exercises;
        let idx;

        for (var i = 0; i < exercises.length; i++) {
            if (exercises[i].id === exercise) {
                idx = i;
            }
        }

        exercises.splice(idx, 1);

        this.setState({
            exercises: exercises,
        });
    }

    submitLift = () => {

        if (this.props.checkValidUser()) {

            let generator = "Standard";
            switch (this.state.generator) {
                case "1": generator = "Baby"; break;
                case "2": generator = "Easy"; break;
                case "3": generator = "Average"; break;
                case "4": generator = "Superior"; break;
                case "5": generator = "Hero"; break;
                case "6": generator = "Superman"; break;
                case "7": generator = "Rogan"; break;
                case "8": generator = "Goggins"; break;
                default: generator = "Standard";
            }

            let liftData = {
                workoutType: "lift",
                userId: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                date: this.state.date,
                time: this.state.time,
                location: this.state.location,
                distance: null,
                duration: this.state.duration,
                milePace: null,
                runType: null,
                laps: null,
                repeats: null,
                race: null,
                surface: null,
                weather: null,
                climb: null,
                grade: null,
                shoe: null,
                bike: null,
                generator: generator,
                pushups: this.getPushUps(),
                pullups: this.getPullUps(),
                workout: JSON.stringify([this.state.exercises]),
                muscleGroups: JSON.stringify(this.state.muscleGroups),
                notes: this.state.notes,
                map: null,
            };

            workoutAPI.createWorkout(liftData)
                .then((res) => {
                    if (res.status === 200) {
                        alert("Workout submitted!");
                        window.location.reload();
                    }
                    else {
                        alert("Error submitting workout.");
                    }
                });
        }
    }

    updateMuscleGroups = (muscleGroup) => {
        let muscleGroups = this.state.muscleGroups;
        let idx = muscleGroups.indexOf(muscleGroup);

        if (idx === -1) {
            muscleGroups.push(muscleGroup);
        }
        else {
            muscleGroups.splice(idx, 1);
        }

        this.setState({
            muscleGroups: muscleGroups,
        });
    }

    render() {
        return (
            <div className="container pageContainer submitContainer">
                <div>

                    <div className="titleBar">
                        <h4>Lifting Workout</h4>

                        <ActivityIcons 
                            hidden="lift"
                        />
                    </div>

                    {/* DATE */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Date</span>
                        </div>
                        <input
                            autoComplete="off"
                            name="date"
                            type="date"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* TIME */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Time of Day</span>
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

                    {/* LOCATION */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Location</span>
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

                    {/* DURATION */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Duration</span>
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

                    {/* GENERATOR */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Generator</span>
                        </div>
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="generator"
                            type="text"
                            onChange={this.handleInputChange}
                            defaultValue={null}
                        >
                            <option value=""></option>
                            <option value="1">Baby</option>
                            <option value="2">Easy</option>
                            <option value="3">Average</option>
                            <option value="4">Superior</option>
                            <option value="5">Hero</option>
                            <option value="6">Superman</option>
                            <option value="7">Rogan</option>
                            <option value="8">Goggins</option>
                        </select>
                    </div>

                    {/* WORKOUT */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend submitFormSectTitle">
                            Workout
                            <div className="addExerciseDiv">
                                <button className="btn btn-dark btn-sm addExerciseBtn" onClick={this.addExercise}>
                                    Add Exercise
                                </button>
                            </div>
                        </div>
                    </div>

                    {this.state.exercises.map(exercise => (
                        <Exercise
                            key={Math.random() * 100000}
                            id={exercise.id}
                            name={exercise.name}
                            weight={exercise.weight}
                            superset={exercise.superset}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            rest={exercise.rest}
                            notes={exercise.notes}
                            getExercise={this.getExercise}
                            deleteExercise={this.deleteExercise}
                        />
                    ))}

                    {/* MUSCLE GROUPS */}
                    <div className="input-group input-group-sm mt-3 mb-3">
                        <div className="input-group-prepend submitFormSectTitle">
                            <div className="">Muscle Groups</div>
                        </div>
                    </div>

                    <div className="form-check">
                        {this.state.muscleGroupList && this.state.muscleGroupList.length > 0 ? (
                            this.state.muscleGroupList.map(group => (
                                <MuscleGroup
                                    key={Math.random() * 100000}
                                    muscleGroup={group}
                                    updateMuscleGroups={this.updateMuscleGroups}
                                    checked={this.state.muscleGroups.indexOf(group) > -1}
                                />
                            ))
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* NOTES */}
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Notes</span>
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

                    <button className="btn btn-primary" onClick={this.submitLift}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SubmitLift;