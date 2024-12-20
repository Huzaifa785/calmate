// types/api.types.ts

export interface User {
    id: string;
    email: string;
    username: string;
    full_name: string | null;
    profile_image: string | null;
    current_streak: number;
    highest_streak: number;
    total_points: number;
    achievements: string[];
    fcm_token: string | null;
    last_log_date: string | null;
    daily_calorie_goal: number | null;
    calories_consumed_today: number | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface FoodLog {
    id: string;
    user_id: string;
    food_name: string;
    portion_size: number;
    calories: number;
    macronutrients: {
      protein: number;
      carbs: number;
      fats: number;
    };
    image_url: string;
    visibility: string;
    reactions: any[];
    timestamp: string;
    new_achievements: string[] | null;
  }
  
  export interface CalorieStatus {
    goal: number;
    consumed: number;
    remaining: number;
  }

  interface UserMin {
    id: string;
    username: string;
  }
  
  export interface FriendRequest {
    id: string;
    from_user: UserMin;
    to_user: UserMin;
    status: string;
    timestamp: string;
  }

  export interface Streak {
    current_streak: number;
    highest_streak: number;
    last_log_date: string;
    user_id: string;
  }
  
  export interface LeaderboardEntry {
    username: string;
    total_points: number;
    achievements: number;
    highest_streak: number;
  }
  
  export interface CalorieGoal {
    success: boolean;
    daily_calorie_goal: number;
    message: string;
  }
  