import axios from "axios";

// const API_URL = "http://localhost:3000/api/auth/";
const API_URL = "http://localhost:8080/api/v1/auth/";

const createAccount = (username, password) => {
    // return (username === "user123") && (password === "pass123") ? "Account Creation Success" : "Account Creation Failed";
    return axios.post(API_URL + "register", {
        username,
        password,
    });
};

const login = (username, password) => {
    // return username && password && (username === "user123") && (password === "pass123") ? "Login Success" : "Login Failed";
    return axios.post(API_URL + "authenticate", {
        email: username, password
    }).then((response) => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.token));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "logout")
        .then((response) => response.data);
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

const authService = { createAccount, login, logout, getCurrentUser, authHeader, };
export default authService;


