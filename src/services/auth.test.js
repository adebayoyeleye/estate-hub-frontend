import axios from 'axios';
import { createAccount, login } from "./auth";

jest.mock('axios');

test('successful login', async () => {
    axios.post.mockResolvedValue({ data: { message: "Login Success", token: "sampleToken" } });

    const response = await login("user123", "pass123");
    expect(response.message).toBe("Login Success");
});

test('failed login', async () => {
    axios.post.mockResolvedValue({ data: { message: "Login Failed" } });

    const response = await login("user123wrong", "pass123wrong");
    expect(response.message).toBe("Login Failed");
});

test('successful account creation', async () => {
    axios.post.mockResolvedValue({ data: { message: "Account Creation Success" } });

    const response = await createAccount("user123", "pass123");
    expect(response.message).toBe("Account Creation Success");
});

test('failed account creation', async () => {
    axios.post.mockResolvedValue({ data: { message: "Account Creation Failed" } });

    const response = await createAccount("user123wrong", "pass123wrong");
    expect(response.message).toBe("Account Creation Failed");
});
