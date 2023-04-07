export function login(username, password) {
    return username && password && (username === "user123") && (password === "pass123") ? "Login Success" : "Login Failed";
};

export function createAccount(username, password) {
    return (username === "user123") && (password === "pass123") ? "Account Creation Success" : "Account Creation Failed";
};