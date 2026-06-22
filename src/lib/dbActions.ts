"use server";

import { prisma } from "./db";
import { RESTAURANTS, FOOD_ITEMS } from "./mockData";

// Helper to check if DB is configured
const isDbConfigured = () => {
  return !!process.env.DATABASE_URL || !!process.env.POSTGRES_PRISMA_URL;
};

// 1. Get Restaurants
export async function getRestaurantsFromDb() {
  if (!isDbConfigured()) {
    return RESTAURANTS;
  }
  try {
    const dbRestaurants = await prisma.restaurant.findMany();
    if (dbRestaurants.length === 0) {
      return RESTAURANTS;
    }
    return dbRestaurants.map(r => ({
      id: r.id,
      name: r.name,
      rating: r.rating,
      cuisine: r.cuisine,
      distance: r.distance,
      image: r.image,
    }));
  } catch (error) {
    console.error("Error reading restaurants from DB:", error);
    return RESTAURANTS;
  }
}

// 2. Get Food Items
export async function getFoodItemsFromDb() {
  if (!isDbConfigured()) {
    return FOOD_ITEMS;
  }
  try {
    const dbFoodItems = await prisma.foodItem.findMany();
    if (dbFoodItems.length === 0) {
      return FOOD_ITEMS;
    }
    return dbFoodItems.map(f => ({
      id: f.id,
      restaurantId: f.restaurantId,
      name: f.name,
      price: f.price,
      rating: f.rating,
      deliveryTime: f.deliveryTime,
      ingredients: f.ingredients,
      image: f.image,
      calories: f.calories,
      protein: f.protein,
      fat: f.fat,
    }));
  } catch (error) {
    console.error("Error reading food items from DB:", error);
    return FOOD_ITEMS;
  }
}

// 3. Register User
export async function registerUserInDb(userId: string, password: string, address?: string) {
  if (!isDbConfigured()) {
    return { success: true, user: { userId, password, address, role: "customer" } };
  }
  try {
    const user = await prisma.user.create({
      data: {
        userId,
        password, // Consistent with context plain text password
        address,
        role: "customer"
      }
    });
    return { success: true, user: { userId: user.userId, password: user.password, address: user.address || "", role: user.role } };
  } catch (error) {
    console.error("Error registering user in DB:", error);
    return { success: false, error: "User already exists or database error" };
  }
}

// 4. Fetch User Profile & Allergy
export async function getAllergyProfileFromDb(userId: string) {
  if (!isDbConfigured()) {
    return null;
  }
  try {
    const profile = await prisma.allergyProfile.findUnique({
      where: { userId }
    });
    if (!profile) return null;
    return {
      name: profile.name,
      allergies: profile.allergies
    };
  } catch (error) {
    console.error("Error fetching allergy profile:", error);
    return null;
  }
}

// 5. Update Allergy Profile
export async function updateAllergyProfileInDb(userId: string, name: string, allergies: string[]) {
  if (!isDbConfigured()) {
    return { success: true };
  }
  try {
    // Check if user exists (if not, create one to avoid foreign key violations for guest sessions)
    let user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          userId,
          password: "guest_password", // Placeholder
          role: "guest"
        }
      });
    }

    await prisma.allergyProfile.upsert({
      where: { userId },
      update: { name, allergies },
      create: { userId, name, allergies }
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating allergy profile:", error);
    return { success: false, error: "Database error" };
  }
}

// 6. Record Order
export async function recordOrderInDb(orderData: {
  userId: string;
  restaurantId: string;
  items: any[];
  subtotal: number;
  discount: number;
  taxes: number;
  delivery: number;
  tip: number;
  total: number;
  address: string;
  instructions?: string;
}) {
  if (!isDbConfigured()) {
    return { success: true, orderId: "mock-order-id" };
  }
  try {
    const order = await prisma.order.create({
      data: {
        userId: orderData.userId || "guest",
        restaurantId: orderData.restaurantId,
        items: orderData.items,
        subtotal: orderData.subtotal,
        discount: orderData.discount,
        taxes: orderData.taxes,
        delivery: orderData.delivery,
        tip: orderData.tip,
        total: orderData.total,
        address: orderData.address,
        instructions: orderData.instructions
      }
    });
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error recording order in DB:", error);
    return { success: false, error: "Database error" };
  }
}

// 7. Sync users on mount
export async function getRegisteredUsersFromDb() {
  if (!isDbConfigured()) {
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      where: { role: "customer" }
    });
    return users.map(u => ({
      userId: u.userId,
      password: u.password,
      address: u.address || ""
    }));
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
}
