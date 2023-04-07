import { createAccount, login } from "./auth";

test('successful login',()=>{
    expect(login("user123", "pass123")).toBe("Login Success");
})

test('failed login',()=>{
    expect(login("user123wrong", "pass123wrong")).toBe("Login Failed");
})

test('successful account creation',()=>{
    expect(createAccount("user123", "pass123")).toBe("Account Creation Success");
})

test('failed account creation',()=>{
    expect(createAccount("user123wrong", "pass123wrong")).toBe("Account Creation Failed");
})