import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1/auth/";


const getCsrfToken = () => {
    const name = 'XSRF-TOKEN=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

const authHeaderWithCsrf = () => {
    const csrfToken = getCsrfToken();
    const headers = {};
    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return headers;
}

const createAccount = (email, password) => {
    return axios.post(
        `${API_URL}register`,
        { email, password },
        {
            headers: authHeaderWithCsrf(),
            withCredentials: true
        })
        .then((response) => response.data)
        .catch(error => {
            console.error("Error in account creation:", error);
            throw error;
        });
};

const login = (username, password) => {
    return axios.post(
        `${API_URL}authenticate`,
        { email: username, password },
        {
            headers: authHeaderWithCsrf(),
            withCredentials: true // must be included
        }
    )
        .then((response) => response.data)
        .catch(error => {
            console.error("Error during login:", error);
            throw error;
        });
};


const logout = () => {
    return axios.post(`${API_URL}logout`, {}, {
        headers: authHeaderWithCsrf(),
        withCredentials: true // include this line
    })
        .then((response) => response.data)
        .catch(error => {
            console.error("Error in account logout:", error);
            throw error;
        });
};


const getCurrentUser = () => {
    return axios.get(`${API_URL}getcurrentuser`, {
        headers: authHeaderWithCsrf(),
        withCredentials: true // include this line for HTTPOnly cookie in request
    })
        .then((response) => response.data)
        .catch(error => {
            console.error("Could not fetch current user:", error);
            throw error;
        });
};

const authService = { createAccount, login, logout, getCurrentUser };
export default authService;