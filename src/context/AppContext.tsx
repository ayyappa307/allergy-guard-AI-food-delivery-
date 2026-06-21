"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  setAllergyProfile: React.Dispatch<React.SetStateAction<AllergyProfile>>;
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

  const registerUser = (user: RegisteredUser) => {
    setRegisteredUsers(prev => [...prev, user]);
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
        allergyProfile, setAllergyProfile, 
        cart, addToCart, removeFromCart, updateQuantity, clearCart,
        deliveryAddress, setDeliveryAddress,
        tipPercentage, setTipPercentage,
        appliedPromo, setAppliedPromo
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
