import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Modal from "react-responsive-modal";
import Navbar from "./components/Navbar/navbar";
import Banner from "./components/Banner/banner";
import Backgrounds from "./components/Backgrounds/backgrounds";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Reset from "./pages/Reset";
import CreatePassword from "./pages/CreatePassword";
// import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogActivity from "./pages/LogActivity";
import SubmitRun from "./pages/SubmitRun";
import UpdateRun from "./pages/UpdateRun";
import SubmitBike from "./pages/SubmitBike";
import SubmitSwim from "./pages/SubmitSwim";
import SubmitLift from "./pages/SubmitLift";
import UpdateLift from "./pages/UpdateLift";
import Generator from "./pages/Generator";
import UpdateGen from "./pages/UpdateGen";
import HallOfFame from "./pages/HallOfFame";
import AllUsers from "./pages/AllUsers";
import Faq from "./pages/Faq";
import Error from "./pages/Error";
import userAPI from "./utils/userAPI";
import workoutAPI from "./utils/workoutAPI";
import hofAPI from "./utils/hofAPI";
import "./App.css";

import moment from "moment";

let week = moment().week();
const FIRSTDOW = moment()
  .year(2020)
  .day("Monday")
  .week(week)
  .format("YYYY-MM-DD");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToPasswordReset: false,
      redirectToCreatePassword: false,
      redirectToHome: false,
      redirectToLanding: false,
      redirectToProfile: false,
      userId: null,
      profileId: null,
      otherUserFirst: null,
      otherUserLast: null,
      allActivity: [],
      background: "tiles",
      resetEmail: null,
      displayOpt: "Recent",
      message: null,
      weekWorkouts: null,
      weekTime: null,
      weekUniqueWorkouts: null,
      firstDOW: null
    };
  }

  componentDidMount = () => {
    // this.correctMetrics();

    // Check if logged in
    let loginStatus = false;
    if (localStorage.getItem("isLoggedIn")) {
      loginStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    }

    // Get background image from local storage or default to Tiles
    let background = "tiles";
    if (
      localStorage.getItem("background") &&
      localStorage.getItem("background") !== null
    ) {
      background = localStorage.getItem("background");
    } else {
      localStorage.setItem("background", background);
    }

    this.setState({
      isLoggedIn: loginStatus,
      redirectToSignUp: false,
      redirectToLogin: false,
      redirectToPasswordReset: false,
      redirectToCreatePassword: false,
      redirectToHome: false,
      redirectToLanding: false,
      redirectToProfile: false,
      background: background
    });

    // Get userId from local storage
    let userId;
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("userId") !== null
    ) {
      userId = localStorage.getItem("userId");

      // Verify userId
      userAPI.getUserById(userId).then(res => {
        if (res.data > 0) {
          localStorage.setItem("fn", res.data[0].firstName);
          localStorage.setItem("ln", res.data[0].lastName);
        }
      });
    }

    this.updateHof();
    this.getChamp();
  };

  // REDIRECTS
  // ==================================

  setRedirectToSignUp = () => {
    this.setState({
      redirectToSignUp: true
    });
  };

  setRedirectToLogin = () => {
    this.setState({
      redirectToLogin: true
    });
  };

  setRedirectToPasswordReset = () => {
    this.setState({
      redirectToPasswordReset: true
    });
  };

  setRedirectToCreatePassword = () => {
    this.setState({
      redirectToCreatePassword: true
    });
  };

  setRedirectToHome = () => {
    this.setState({
      redirectToHome: true
    });
  };

  setRedirectToLanding = () => {
    this.setState({
      redirectToLanding: true
    });
  };

  setRedirectToProfile = () => {
    this.setState({
      redirectToProfile: true
    });
  };

  redirectToLanding = () => {
    return <Redirect to="/" />;
  };

  redirectToSignUp = () => {
    return <Redirect to="/signUp" />;
  };

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  redirectToPasswordReset = () => {
    return <Redirect to="/reset" />;
  };

  redirectToCreatePassword = () => {
    return <Redirect to="/createPassword" />;
  };

  redirectToHome = () => {
    return <Redirect to="/home" />;
  };

  redirectToProfile = () => {
    return <Redirect to="/profile" />;
  };

  updateParentState = () => {
    this.setState({
      redirectToHome: false,
      redirectToLogin: false,
      redirectToSignup: false,
      redirectToLanding: false,
      redirectToProfile: false,
      redirectToPasswordReset: false,
      redirectToCreatePassword: false
    });
  };

  // USER
  // ==================================

  createUser = (firstName, lastName, email, password) => {
    // Check if email already exists in database
    userAPI.getUser(email).then(res => {
      if (res.data.length === 0) {
        let weight = 150;
        let privacy = "public";

        userAPI
          .createUser(firstName, lastName, email, password, weight, privacy)
          .then(res => {
            if (res.status === 200) {
              alert("User created.");

              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("userId", res.data.userId);

              this.getRecentWorkouts();
              this.setRedirectToHome();
            }
          });
      } else {
        alert("Account already exists for this email address.");
        this.setRedirectToLogin();
      }
    });
  };

  loginUser = (email, password) => {
    // Check if email exists in database
    userAPI.getUser(email).then(res => {
      if (res.data.length === 0) {
        alert("No account exists for this email address.");
        // this.setRedirectToSignUp();
      } else {
        userAPI.loginUser(email, password).then(res => {
          if (res.data === "Incorrect password.") {
            alert("Incorrect password.");
          } else {
            // Store login status and userId in local storage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("fn", res.data.firstName);
            localStorage.setItem("ln", res.data.lastName);

            this.getRecentWorkouts();
            this.setRedirectToHome();
          }
        });
      }
    });
  };

  logoutUser = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("userId", null);
    localStorage.setItem("fn", null);
    localStorage.setItem("ln", null);
    localStorage.setItem("background", "tiles");

    this.setState(
      {
        isLoggedIn: "false",
        userId: null
      },
      () => {
        this.setRedirectToLanding();
      }
    );
  };

  // Checks userId in local storage to see if it exists in database
  // If it doesn't exist/it is a fake userId, automatically logs out user
  checkValidUser = () => {
    let returnVal = true;
    let userId;

    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("userId") !== null
    ) {
      userId = localStorage.getItem("userId");

      return userAPI.getUserById(userId).then(res => {
        if (res.data.length === 0) {
          returnVal = false;
          this.logoutUser();
          return returnVal;
        }
      });
    } else {
      returnVal = false;
      this.logoutUser();
    }

    return returnVal;
  };

  // WORKOUTS
  // ==================================

  getAllWorkouts = () => {
    workoutAPI.getAllWorkouts().then(res => {
      this.sortByDate(res.data);

      this.setState({
        displayOpt: "All"
      });
    });
  };

  getRecentWorkouts = () => {
    workoutAPI.getRecentWorkouts().then(res => {
      this.setState({
        displayOpt: "Recent"
      });

      this.sortByDate(res.data);
    });
  };

  sortByDate = allActivity => {
    allActivity.sort(this.compare);

    this.setState({
      allActivity: allActivity
    });
  };

  compare = (a, b) => {
    if (a.date === b.date) {
      return 0;
    } else {
      return a.date > b.date ? -1 : 1;
    }
  };

  deleteActivity = workoutId => {
    let userId = localStorage.getItem("userId");

    workoutAPI.deleteWorkoutById(userId, workoutId).then(res => {
      window.location.reload();
    });
  };

  loadProfile = (userId, firstName, lastName) => {
    this.setState(
      {
        profileId: userId,
        otherUserFirst: firstName,
        otherUserLast: lastName
      },
      () => {
        this.setRedirectToProfile();
      }
    );
  };

  // BACKGROUND
  // ==================================

  openBackgrounds = () => {
    this.setState({
      openModal: true
    });
  };

  setBackground = background => {
    this.setState(
      {
        background: background
      },
      () => {
        localStorage.setItem("background", background);
        this.closeBackgrounds();
      }
    );
  };

  closeBackgrounds = () => {
    this.setState({
      openModal: false
    });
  };

  // HALL OF FAME
  // ==================================

  updateHof = () => {
    hofAPI.getMaxWorkouts().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostWorkouts", max[0], max[1]);
    });

    hofAPI.getMaxRestDays().then(res => {
      let min = this.getMinimum(res.data);
      let dateNum = 365;
      let minVal = dateNum - min[1];
      hofAPI.updateHof("mostRestDays", min[0], minVal);
    });

    hofAPI.getLongestRun().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("longestRun", max[0], max[1]);
    });

    hofAPI.getMaxMiles().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostMiles", max[0], max[1]);
    });

    hofAPI.getMaxClimb().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("maxClimb", max[0], max[1]);
    });

    hofAPI.getMaxPushups().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostPushups", max[0], max[1]);
    });

    hofAPI.getMaxPullups().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostPullups", max[0], max[1]);
    });

    hofAPI.getMaxGoggins().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostGoggins", max[0], max[1]);
    });

    hofAPI.getTotalTime().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostTime", max[0], Math.round(max[1]));
    });

    hofAPI.getMaxRaces().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostRaces", max[0], max[1]);
    });

    hofAPI.getRainyDays().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostRainyDays", max[0], max[1]);
    });

    hofAPI.getSwims().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostSwims", max[0], max[1]);
    });

    hofAPI.getBikes().then(res => {
      let max = this.getMaximum(res.data);
      hofAPI.updateHof("mostBikes", max[0], max[1]);
    });
  };

  getHotDog = () => {
    hofAPI.getHotdog().then(res => {
      // Remove champ from results -- champ cannot also be weiner
      let champ = this.state.champ;

      let idx = -1;
      if (champ) {
        for (var u in res.data) {
          if (res.data[u].firstName === champ) {
            idx = u;
          }
        }

        res.data.splice(idx, 1);
      }

      let min = this.getMinimum(res.data);
      hofAPI.updateHof("hotdog", min[0], 1);
    });
  };

  getMaximum = data => {
    let max = 0;
    let maxName = null;

    for (var d in data) {
      if (data[d].value > max) {
        max = data[d].value;
        maxName = data[d].firstName;
      }
    }

    max = Math.round(max * 100) / 100;

    return [maxName, max];
  };

  getMinimum = data => {
    let min = 365;
    let minName = null;

    for (var d in data) {
      if (data[d].value < min) {
        min = data[d].value;
        minName = data[d].firstName;
      }
    }

    return [minName, min];
  };

  // GET OUTWORKER OF THE WEEK
  // ==================================

  getChamp = () => {
    // +1 for most workouts
    // +1 for most time
    // +1 for least rest days

    // Get date of most recent Sunday in yyyy-mm-dd format
    let today = new Date();
    let year = moment(today).year();
    let month = moment(today).month() + 1;
    let date = moment(today).date();
    let currDOW = moment(today).day();

    let moZero = "";
    let dayZero = "";

    if (month < 10) {
      moZero = 0;
    }

    if (date - currDOW < 10) {
      dayZero = 0;
    }

    //let firstDOW = `${year}-${moZero}${month}-${dayZero}${date - currDOW}`;
    let firstDOW = FIRSTDOW;

    this.setState({
      firstDOW: firstDOW
    });

    // Gets maximum number of workouts from current week
    hofAPI.getWeekWorkouts(firstDOW).then(res => {
      this.setState(
        {
          weekWorkouts: res.data
        },
        () => {
          this.getScores();
        }
      );
    });

    // Gets maximum time worked out in current week
    hofAPI.getWeekTime(firstDOW).then(res => {
      this.setState(
        {
          weekTime: res.data
        },
        () => {
          this.getScores();
        }
      );
    });

    // Gets maximum unique dates worked out in current week
    hofAPI.getWeekUniqueWorkouts(firstDOW).then(res => {
      this.setState(
        {
          weekUniqueWorkouts: res.data
        },
        () => {
          this.getScores();
        }
      );
    });
  };

  // Perhaps the most inelegant and clunky algorithm in the history of JavaScript
  getScores = () => {
    let ww = this.state.weekWorkouts;
    let wt = this.state.weekTime;
    let wuw = this.state.weekUniqueWorkouts;

    if (ww && wt && wuw) {
      let wwMax = 0;
      for (var i in ww) {
        if (ww[i].value > wwMax) {
          wwMax = ww[i].value;
        }
      }

      let wtMax = 0;
      for (var j in wt) {
        if (wt[j].value > wtMax) {
          wtMax = wt[j].value;
        }
      }

      let wuwMax = 0;
      for (var k in wuw) {
        if (wuw[k].value > wuwMax) {
          wuwMax = wuw[k].value;
        }
      }

      this.checkMaxes(wwMax, wtMax, wuwMax, ww, wt, wuw);
    }
  };

  checkMaxes = (wwMax, wtMax, wuwMax, ww, wt, wuw) => {
    let curtis = 0,
      jason = 0,
      joseph = 0;

    if (ww && wt && wuw) {
      for (var i in ww) {
        if (ww[i].value === wwMax) {
          if (ww[i].firstName === "Curtis") {
            curtis += 1;
          }
          if (ww[i].firstName === "Jason") {
            jason += 1;
          }
          if (ww[i].firstName === "Joseph") {
            joseph += 1;
          }
        }
      }

      for (var j in wt) {
        if (wt[j].value === wtMax) {
          if (wt[j].firstName === "Curtis") {
            curtis += 1;
          }
          if (wt[j].firstName === "Jason") {
            jason += 1;
          }
          if (wt[j].firstName === "Joseph") {
            joseph += 1;
          }
        }
      }

      for (var k in wuw) {
        if (wuw[k].value === wuwMax) {
          if (ww[k].firstName === "Curtis") {
            curtis += 1;
          }
          if (wuw[k].firstName === "Jason") {
            jason += 1;
          }
          if (wuw[k].firstName === "Joseph") {
            joseph += 1;
          }
        }
      }
    }

    let champ = [];
    let max = Math.max(curtis, jason, joseph);

    if (curtis === max) {
      champ.push("Curtis");
    }

    if (jason === max) {
      champ.push("Jason");
    }

    if (joseph === max) {
      champ.push("Joseph");
    }

    if (champ.length === 1) {
      champ = champ[0];
    } else {
      champ = "Tie";
    }

    this.setState(
      {
        champ: champ
      },
      () => {
        this.getHotDog();
      }
    );

    hofAPI.updateHof("champ", champ, 1);
  };

  // PASSWORD RESET
  // ==================================

  setResetEmail = resetEmail => {
    this.setState({
      resetEmail: resetEmail
    });
  };

  render() {
    return (
      <Router>
        <div className={`appClass ${this.state.background}`}>
          {/* Redirect To Landing Page */}

          {this.state.redirectToLanding === true ? (
            this.redirectToLanding()
          ) : (
            <></>
          )}

          {/* Redirect to Login Page */}

          {this.state.redirectToLogin === true ? this.redirectToLogin() : <></>}

          {/* Redirect to Password Reset Page */}

          {this.state.redirectToPasswordReset === true ? (
            this.redirectToPasswordReset()
          ) : (
            <></>
          )}

          {/* Redirect to Create Password Page */}

          {this.state.redirectToCreatePassword === true ? (
            this.redirectToCreatePassword()
          ) : (
            <></>
          )}

          {/* Redirect to Sign Up Page */}

          {this.state.redirectToSignUp === true ? (
            this.redirectToSignUp()
          ) : (
            <></>
          )}

          {/* Redirect to Home */}

          {this.state.redirectToHome === true ? this.redirectToHome() : <></>}

          {/* Redirect To Profile */}

          {this.state.redirectToProfile === true ? (
            this.redirectToProfile()
          ) : (
            <></>
          )}

          {/* Set Background Image */}

          {this.state.openModal ? (
            <Modal open={this.state.openModal} onClose={this.closeBackgrounds}>
              <Backgrounds setBackground={this.setBackground} />
            </Modal>
          ) : (
            <></>
          )}

          {/* Navbar */}
          <Navbar
            isLoggedIn={this.state.isLoggedIn}
            openBackgrounds={this.openBackgrounds}
            logoutUser={this.logoutUser}
          />

          {/* Banner */}
          {this.state.message !== "" ? (
            <Banner message={this.state.message} />
          ) : (
            <></>
          )}

          <Switch>
            {/* Landing Page */}
            <Route
              exact
              path="/"
              render={() => (
                <Landing
                  setRedirectToSignUp={this.setRedirectToSignUp}
                  setRedirectToLogin={this.setRedirectToLogin}
                  setRedirectToHome={this.setRedirectToHome}
                  checkValidUser={this.checkValidUser}
                  loginUser={this.loginUser}
                  logoutUser={this.logoutUser}
                />
              )}
            />

            {/* Login Page */}
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  setRedirectToSignUp={this.setRedirectToSignUp}
                  setRedirectToHome={this.setRedirectToHome}
                  loginUser={this.loginUser}
                />
              )}
            />

            {/* Forgot Password Page */}
            <Route
              exact
              path="/forgot"
              render={() => (
                <ForgotPassword
                  setRedirectToPasswordReset={this.setRedirectToPasswordReset}
                  setResetEmail={this.setResetEmail}
                />
              )}
            />

            {/* Reset Password Page */}
            <Route
              exact
              path="/reset"
              render={() => (
                <Reset
                  email={this.state.resetEmail}
                  setRedirectToCreatePassword={this.setRedirectToCreatePassword}
                />
              )}
            />

            {/* Create Password Page */}
            <Route
              exact
              path="/createPassword"
              render={() => (
                <CreatePassword
                  email={this.state.resetEmail}
                  setRedirectToLogin={this.setRedirectToLogin}
                />
              )}
            />

            {/* Sign Up Page */}
            {/* <Route exact path="/signUp" render={() =>
              <SignUp
                setRedirectToLogin={this.setRedirectToLogin}
                setRedirectToHome={this.setRedirectToHome}
                createUser={this.createUser}
              />
            } /> */}

            {/* Home Page */}
            <Route
              exact
              path="/home"
              render={() => (
                <Home
                  updateParentState={this.updateParentState}
                  checkValidUser={this.checkValidUser}
                  getAllWorkouts={this.getAllWorkouts}
                  getRecentWorkouts={this.getRecentWorkouts}
                  allActivity={this.state.allActivity}
                  deleteActivity={this.deleteActivity}
                  background={this.state.background}
                  displayOpt={this.state.displayOpt}
                  weekWorkouts={this.state.weekWorkouts}
                  weekTime={this.state.weekTime}
                  weekUniqueWorkouts={this.state.weekUniqueWorkouts}
                  firstDOW={this.state.firstDOW}
                />
              )}
            />

            {/* Profile Page */}
            <Route
              exact
              path="/profile"
              render={() => (
                <Profile
                  profileId={this.state.profileId}
                  otherUserFirst={this.state.otherUserFirst}
                  otherUserLast={this.state.otherUserLast}
                  checkValidUser={this.checkValidUser}
                  updateHof={this.updateHof}
                  deleteActivity={this.deleteActivity}
                  background={this.state.background}
                />
              )}
            />

            {/* Log Activity Page */}
            <Route
              exact
              path="/logActivity"
              render={() => (
                <LogActivity
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                />
              )}
            />

            {/* Log Run Page */}
            <Route
              exact
              path="/run"
              render={() => (
                <SubmitRun
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                />
              )}
            />

            {/* Update Run Page */}
            <Route
              exact
              path="/updateRun"
              render={() => (
                <UpdateRun
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                  setRedirectToHome={this.setRedirectToHome}
                />
              )}
            />

            {/* Log Bike Page */}
            <Route
              exact
              path="/bike"
              render={() => (
                <SubmitBike
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                />
              )}
            />

            {/* Log Swim Page */}
            <Route
              exact
              path="/swim"
              render={() => (
                <SubmitSwim
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                />
              )}
            />

            {/* Log Lift Page */}
            <Route
              exact
              path="/lift"
              render={() => (
                <SubmitLift
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                />
              )}
            />

            {/* Update Lift Page */}
            <Route
              exact
              path="/updateLift"
              render={() => (
                <UpdateLift
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                  setRedirectToHome={this.setRedirectToHome}
                />
              )}
            />

            {/* Generator Page */}
            <Route
              exact
              path="/generator"
              render={() => (
                <Generator
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                  difficulty={sessionStorage.getItem("diff")}
                />
              )}
            />

            {/* Update Generator Page */}
            {/* Update Lift Page */}
            <Route
              exact
              path="/updateGen"
              render={() => (
                <UpdateGen
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                  setRedirectToHome={this.setRedirectToHome}
                />
              )}
            />

            {/* Hall Of Fame Page */}
            <Route
              exact
              path="/hallOfFame"
              render={() => (
                <HallOfFame
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                  updateHof={this.updateHof}
                />
              )}
            />

            {/* Find Users Page */}
            <Route
              exact
              path="/allUsers"
              render={() => (
                <AllUsers
                  checkValidUser={this.checkValidUser}
                  loadProfile={this.loadProfile}
                  background={this.state.background}
                />
              )}
            />

            {/* FAQ Page */}
            <Route
              exact
              path="/faq"
              render={() => (
                <Faq
                  checkValidUser={this.checkValidUser}
                  background={this.state.background}
                />
              )}
            />

            <Route component={Error} />
          </Switch>

          {/* Footer */}
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
