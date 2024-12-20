// lib/api.ts
import axios from "axios";
import { User, FoodLog, CalorieStatus } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export class ApiService {
  private static token: string | null = null;

  static setToken(newToken: string) {
    console.log("Setting token:", newToken); // Debug log
    this.token = newToken;
  }

  private static getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  // Auth
  static async signup(email: string, password: string, username: string) {
    try {
      console.log("Making signup API call...");
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
        username,
      });
      console.log("Signup API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Signup API error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to create account"
        );
      }
      throw new Error("Network error occurred");
    }
  }

  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login API error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to log in");
      }
      throw new Error("Network error occurred");
    }
  }

  // Food
  static async analyzeFoodImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/food/analyze`, formData, {
      headers: {
        ...this.getHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("🍗", response.data);
    return response.data;
  }

  static async getFoodLogs(): Promise<FoodLog[]> {
    const response = await axios.get(`${BASE_URL}/food/logs`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  // User
  static async getProfile(): Promise<User> {
    try {
      console.log("Getting profile with token:", this.token); // Debug log
      const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  }

  static async updateProfile(data: Partial<User>) {
    const response = await axios.put(`${BASE_URL}/users/profile`, data, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  static async setCalorieGoal(daily_goal: number) {
    const response = await axios.post(
      `${BASE_URL}/users/calorie-goal`,
      { daily_goal },
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  static async getCalorieStatus(): Promise<CalorieStatus> {
    const response = await axios.get(`${BASE_URL}/users/calorie-status`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  // Streaks
  static async getCurrentStreak() {
    const response = await axios.get(`${BASE_URL}/streaks/current`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  static async getLeaderboard() {
    const response = await axios.get(`${BASE_URL}/streaks/leaderboard`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  // Social

  static async getAllUsers() {
    const response = await axios.get(`${BASE_URL}/social/users`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }
  
  static async getFriends() {
    const response = await axios.get(`${BASE_URL}/social/friends`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  static async sendFriendRequest(userId: string) {
    const response = await axios.post(
      `${BASE_URL}/social/friends/request/${userId}`,
      {},
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  static async getFriendRequests(type: "sent" | "received") {
    const response = await axios.get(`${BASE_URL}/social/friends/requests`, {
      params: { type },
      headers: this.getHeaders(),
    });
    return response.data;
  }

  static async acceptFriendRequest(requestId: string) {
    const response = await axios.post(
      `${BASE_URL}/social/friends/accept/${requestId}`,
      {},
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  static async getFeed() {
    const response = await axios.get(`${BASE_URL}/social/feed`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }
}
