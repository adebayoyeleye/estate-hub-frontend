import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1/auth/";


const getCsrfToken = () => {
    const name = 'XSRF-TOKEN=';
    const cookies = document.cookie.split(';');
    // console.log("we are here", cookies);
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            console.log(cookie.substring(name.length, cookie.length));
            // return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

const authHeaderWithCsrf = () => {
    const csrfToken = getCsrfToken();
    // console.log("we are here");
    const headers = {};
    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return headers;
}

const createAccount = (email, password) => {
    return axios.post(`${API_URL}register`, { email, password }, { headers: authHeaderWithCsrf() })
        .catch(error => {
            console.error("Error in account creation:", error);
            throw error;
        });
};

const login = (username, password) => {
        console.log("we are here: LOGIN");
    return axios.post(
        `${API_URL}authenticate`,
        { email: username, password },
        { 
            headers: authHeaderWithCsrf(),
            withCredentials: true // include this line
        }
    )
    .then((response) => response.data)
    .catch(error => {
        console.error("Error during login:", error);
        getCsrfToken();
        throw error;
    });
};

  
  const logout = () => {
    return axios.post(`${API_URL}logout`, {}, { headers: authHeaderWithCsrf() })
        .then((response) => response.data);
  };


//Add an API endpoint in your backend that returns the currently authenticated user's information if a valid JWT (from an HttpOnly cookie) is present in the request headers.
const getCurrentUser = async () => {
    console.error("API_URL: ", API_URL);

    return  axios.get(`${API_URL}getcurrentuser`, { headers: authHeaderWithCsrf() })
        .then((response) => response.data)
        .catch(error => {
            console.error("Could not fetch current user:", error);
            // throw error;
            return null;
        });
  };

const authService = { createAccount, login, logout, getCurrentUser };
export default authService;