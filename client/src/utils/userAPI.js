import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// User-related API calls

export default {

    // USER ROUTES
    // =============================================================

    loginUser: function(email, password) {
        return axios.get("/api/users/loginUser", { params: {email: email, password: password}});
    },

    getUser: function(email) {
        return axios.get("/api/users/getUser/" + email);
    },

    getUserById: function(userId) {
        return axios.get("/api/users/getUserById/" + userId);
    },

    getAllUsers: function() {
        return axios.get("/api/users/getAllUsers");
    },

    searchForUser: function(userName) {
        return axios.get("/api/users/searchForUser/" + userName);
    },

    createUser: function(firstName, lastName, email, password) {
        let initials = firstName.charAt(0) + lastName.charAt(0);
        let userId = Math.floor(100000 + Math.random() * 900000).toString().concat(initials);

        let user = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password, 
        }
        
        return axios.post("/api/users/createUser", user);
    },

    updateWeight: function(userId, weight) {
        return axios.put("/api/users/updateWeight", {userId: userId, weight: weight});
    },

    updateEquipment: function(userId, equipment) {
        return axios.put("/api/users/updateEquipment", {userId: userId, equipment: equipment});
    },

    updateUserFollowings: function(userId, following) {
        return axios.put("/api/users/updateUserFollowings", { userId: userId, following: following });
    },

    updateUserFollowers: function(userId, followers) {
        return axios.put("/api/users/updateUserFollowers", { userId: userId, followers: followers });
    },

    deleteUser: function(userId, email) {
        return axios.delete("/api/users/deleteUser", {userId: userId, email: email});
    },

    // PASSWORD RESET ROUTES
    // =============================================================

    updatePassword: function(email, password) {
        return axios.put("/api/users/updatePassword", {email: email, password: password});
    },

    setResetCode: function (email) {
        let resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        return axios.post("/api/reset/setResetCode", { email: email, resetCode: resetCode });
    },

    sendPasswordResetCode: function (email, resetCode) {
        return axios.post("/api/reset/sendPasswordResetCode", { email: email, resetCode: resetCode });
    },

    submitResetCode: function (email, resetCode) {
        return axios.get("/api/reset/submitResetCode/", { params: { email: email, resetCode: resetCode } });
    },

    clearResetCode: function (email) {
        return axios.delete("/api/reset/clearResetCode/" + email);
    },
}