"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { RESTAURANTS, FOOD_ITEMS, Restaurant, FoodItem } from "@/lib/mockData";
import {
  getRestaurantsFromDb,
  getFoodItemsFromDb,
  registerUserInDb,
  getAllergyProfileFromDb,
  updateAllergyProfileInDb,
  getRegisteredUsersFromDb
} from "@/lib/dbActions";

export interface AllergyProfile {
  name: string;
  allergies: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
}

export type UserRole = "guest" | "customer" | "restaurant" | "admin";

interface RegisteredUser {
  userId: string;
  password: string;
  address?: string;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: React.Dispatch<React.SetStateAction<UserRole>>;
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
  registeredUsers: RegisteredUser[];
  registerUser: (user: RegisteredUser) => void;
  allergyProfile: AllergyProfile;
  setAllergyProfile: (profile: AllergyProfile | ((prev: AllergyProfile) => AllergyProfile)) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  deliveryAddress: string;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<string>>;
  tipPercentage: number;
  setTipPercentage: React.Dispatch<React.SetStateAction<number>>;
  appliedPromo: string;
  setAppliedPromo: React.Dispatch<React.SetStateAction<string>>;
  restaurants: Restaurant[];
  foodItems: FoodItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>("guest");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([{ userId: "user", password: "user123", address: "123 Main Street, Apt 4B" }]);
  const [allergyProfile, setAllergyProfile] = useState<AllergyProfile>({ name: "", allergies: [] });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("Home");
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>(RESTAURANTS);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(FOOD_ITEMS);

  // Sync / Load database data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const dbRestaurants = await getRestaurantsFromDb();
        const dbFoodItems = await getFoodItemsFromDb();
        const dbUsers = await getRegisteredUsersFromDb();

        setRestaurants(dbRestaurants);
        setFoodItems(dbFoodItems);
        if (dbUsers && dbUsers.length > 0) {
          setRegisteredUsers(dbUsers);
        }
      } catch (err) {
        console.error("Failed to load initial DB data:", err);
      }
    }
    loadData();
  }, []);

  // Load user allergy profile on login
  useEffect(() => {
    async function loadUserAllergies() {
      if (currentUserId) {
        try {
          const dbProfile = await getAllergyProfileFromDb(currentUserId);
          if (dbProfile) {
            setAllergyProfile(dbProfile);
          }
        } catch (err) {
          console.error("Failed to load allergy profile:", err);
        }
      } else {
        setAllergyProfile({ name: "", allergies: [] });
      }
    }
    loadUserAllergies();
  }, [currentUserId]);

  const registerUser = async (user: RegisteredUser) => {
    try {
      const res = await registerUserInDb(user.userId, user.password, user.address);
      if (res.success) {
        setRegisteredUsers(prev => [...prev, user]);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const setAndSaveAllergyProfile = async (profile: AllergyProfile | ((prev: AllergyProfile) => AllergyProfile)) => {
    let newProfile: AllergyProfile;
    if (typeof profile === 'function') {
      newProfile = profile(allergyProfile);
      setAllergyProfile(newProfile);
    } else {
      newProfile = profile;
      setAllergyProfile(profile);
    }

    const targetUserId = newProfile.name || currentUserId;
    if (targetUserId) {
      try {
        await updateAllergyProfileInDb(targetUserId, newProfile.name || targetUserId, newProfile.allergies);
      } catch (err) {
        console.error("Failed to save allergy profile to DB:", err);
      }
    }
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    setTipPercentage(0);
    setAppliedPromo("");
  };

  return (
    <AppContext.Provider
      value={{ 
        userRole, setUserRole, 
        currentUserId, setCurrentUserId,
        registeredUsers, registerUser,
        allergyProfile, setAllergyProfile: setAndSaveAllergyProfile, 
        cart, addToCart, removeFromCart, updateQuantity, clearCart,
        deliveryAddress, setDeliveryAddress,
        tipPercentage, setTipPercentage,
        appliedPromo, setAppliedPromo,
        restaurants,
        foodItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
