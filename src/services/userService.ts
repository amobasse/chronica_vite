import { User } from "../types/User";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3001/api";

type RegParams = {
  username: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

export const registerUser = async ({
  username,
  email,
  password,
}: RegParams): Promise<{ success: boolean; message?: string }> => {
  try {
    // get all users from API backend
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: `An error occured: ${data.message}` };
    }

    return data;
  } catch (error) {
    console.error(`Error occurred during registration process.`);
    return { success: false, message: `Network error.` };
  }
};

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<{ success: boolean; user?: User; message?: string }> => {
  try {
    console.log(`API URL is ${API_URL}/users/login`);
    // get all users from API backend
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: `An error occured: ${data.message}` };
    }
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Error occurred during login process.`);
    return { success: false, message: `Network error.` };
  }
};
