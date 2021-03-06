import React, { Component } from "react";
// import Modal from "react-responsive-modal";
import LiftDetailExercise from "../LiftDetailExercise/liftDetailExercise";
import "./liftDetailSet.css";

class LiftDetailSet extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            set: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            set: this.props.set,
        });
    }

    render() {
        return (
            <table className="table table-bordered table-responsive table-sm text-center align-middle liftDetails liftDetailSet">
                <thead className="thead-dark">
                    <tr>
                        <th>Superset ID</th>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Total Reps</th>
                        <th>Lbs.</th>
                        <th>Rest</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.set && this.state.set.length > 0 ? (
                        this.state.set.map(exercise => (
                            <LiftDetailExercise
                                key={`${exercise.name}${exercise.sets}${exercise.reps}${exercise.totalReps}`}
                                name={exercise.name}
                                weight={exercise.weight}
                                superset={exercise.superset}
                                sets={exercise.sets}
                                reps={exercise.actualReps || exercise.reps}
                                totalReps={exercise.totalReps}
                                rest={exercise.rest}
                                notes={exercise.notes}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
        )
    }
}

export default LiftDetailSet;
