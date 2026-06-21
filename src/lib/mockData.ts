export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  cuisine: string;
  distance: string;
  image: string;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  rating: number;
  deliveryTime: string;
  ingredients: string[];
  image: string;
  calories: number;
  protein: string;
  fat: string;
}

export const RESTAURANTS: Restaurant[] = [
  { id: "r1", name: "Burger King", rating: 4.2, cuisine: "Fast Food", distance: "2.5 km", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600" },
  { id: "r2", name: "Domino's Pizza", rating: 4.5, cuisine: "Italian", distance: "1.2 km", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600" },
  { id: "r3", name: "Healthy Bites", rating: 4.8, cuisine: "Healthy", distance: "3.0 km", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600" },
  { id: "r4", name: "Spice Route", rating: 4.1, cuisine: "Indian", distance: "5.1 km", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600" },
  { id: "r5", name: "Biryani House", rating: 4.7, cuisine: "Indian", distance: "1.5 km", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600" },
  { id: "r6", name: "Wok & Roll", rating: 4.3, cuisine: "Chinese", distance: "4.0 km", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600" },
  { id: "r7", name: "Sweet Bakery", rating: 4.9, cuisine: "Dessert", distance: "2.0 km", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600" },
  { id: "r8", name: "Andhra Ruchulu", rating: 4.9, cuisine: "Andhra", distance: "2.2 km", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600" },
  { id: "r9", name: "South Indian Express", rating: 4.6, cuisine: "South Indian", distance: "1.8 km", image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=600" },
  { id: "r10", name: "North Indian Dhaba", rating: 4.7, cuisine: "North Indian", distance: "3.5 km", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=600" },
  { id: "r11", name: "Chaat Corner", rating: 4.5, cuisine: "Street Food", distance: "1.0 km", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600" },
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: "f1", restaurantId: "r1", name: "Chicken Cheese Burger", price: 199, rating: 4.5, deliveryTime: "30 min",
    ingredients: ["Chicken", "Cheese", "Milk", "Egg", "Wheat", "Sesame"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600", calories: 450, protein: "32g", fat: "18g"
  },
  {
    id: "f2", restaurantId: "r1", name: "Veggie Delight Burger", price: 149, rating: 4.3, deliveryTime: "30 min",
    ingredients: ["Potato", "Peas", "Wheat", "Soy"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600", calories: 350, protein: "12g", fat: "10g"
  },
  {
    id: "f3", restaurantId: "r2", name: "Margherita Pizza", price: 299, rating: 4.6, deliveryTime: "40 min",
    ingredients: ["Wheat", "Tomato", "Cheese", "Milk"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600", calories: 600, protein: "24g", fat: "22g"
  },
  {
    id: "f4", restaurantId: "r2", name: "Gluten-Free Veg Pizza", price: 349, rating: 4.7, deliveryTime: "45 min",
    ingredients: ["Rice Flour", "Tomato", "Vegan Cheese", "Olive Oil"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600", calories: 450, protein: "10g", fat: "15g"
  },
  {
    id: "f5", restaurantId: "r3", name: "Grilled Chicken Salad", price: 249, rating: 4.9, deliveryTime: "25 min",
    ingredients: ["Chicken", "Lettuce", "Tomato", "Olive Oil"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600", calories: 320, protein: "40g", fat: "8g"
  },
  {
    id: "f6", restaurantId: "r5", name: "Hyderabadi Chicken Biryani", price: 349, rating: 4.8, deliveryTime: "40 min",
    ingredients: ["Rice", "Chicken", "Ghee", "Milk", "Spices", "Onion"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600", calories: 850, protein: "35g", fat: "25g"
  },
  {
    id: "f7", restaurantId: "r5", name: "Veg Dum Biryani", price: 299, rating: 4.5, deliveryTime: "35 min",
    ingredients: ["Rice", "Mixed Veggies", "Ghee", "Milk", "Spices"],
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=600", calories: 650, protein: "15g", fat: "20g"
  },
  {
    id: "f8", restaurantId: "r6", name: "Hakka Noodles", price: 199, rating: 4.4, deliveryTime: "30 min",
    ingredients: ["Wheat Noodles", "Soy Sauce", "Cabbage", "Carrot", "Egg"],
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600", calories: 400, protein: "12g", fat: "10g"
  },
  {
    id: "f9", restaurantId: "r6", name: "Chicken Fried Rice", price: 249, rating: 4.6, deliveryTime: "30 min",
    ingredients: ["Rice", "Chicken", "Egg", "Soy Sauce", "Spring Onion"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600", calories: 500, protein: "25g", fat: "15g"
  },
  {
    id: "f10", restaurantId: "r7", name: "Chocolate Truffle Cake", price: 499, rating: 4.9, deliveryTime: "45 min",
    ingredients: ["Wheat", "Cocoa", "Milk", "Egg", "Sugar", "Butter"],
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600", calories: 750, protein: "8g", fat: "40g"
  },
  {
    id: "f11", restaurantId: "r7", name: "Eggless Vanilla Cake", price: 399, rating: 4.7, deliveryTime: "45 min",
    ingredients: ["Wheat", "Vanilla", "Milk", "Sugar", "Butter"],
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600", calories: 600, protein: "6g", fat: "30g"
  },
  {
    id: "f12", restaurantId: "r4", name: "Paneer Butter Masala", price: 299, rating: 4.8, deliveryTime: "35 min",
    ingredients: ["Paneer", "Tomato", "Butter", "Milk", "Cashew", "Tree Nut"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600", calories: 550, protein: "18g", fat: "35g"
  },
  {
    id: "f13", restaurantId: "r8", name: "Guntur Chilli Chicken", price: 320, rating: 4.9, deliveryTime: "30 min",
    ingredients: ["Chicken", "Guntur Chilli", "Garlic", "Soy Sauce", "Egg"],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600", calories: 450, protein: "38g", fat: "20g"
  },
  {
    id: "f14", restaurantId: "r8", name: "Gongura Mutton", price: 450, rating: 4.8, deliveryTime: "45 min",
    ingredients: ["Mutton", "Gongura Leaves", "Onion", "Spices"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600", calories: 650, protein: "42g", fat: "30g"
  },
  {
    id: "f15", restaurantId: "r8", name: "Pesarattu (Green Gram Dosa)", price: 150, rating: 4.7, deliveryTime: "25 min",
    ingredients: ["Green Gram", "Rice", "Onion", "Ginger", "Chilli"],
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600", calories: 300, protein: "12g", fat: "5g"
  },
  // South Indian Mainstays
  // South Indian Mainstays
  { id: "f16", restaurantId: "r9", name: "Masala Dosa", price: 120, rating: 4.8, deliveryTime: "20 min", ingredients: ["Rice", "Lentil", "Potato", "Ghee", "Mustard", "Chutney"], image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=600", calories: 350, protein: "8g", fat: "12g" },
  { id: "f17", restaurantId: "r9", name: "Idli Sambar", price: 80, rating: 4.9, deliveryTime: "15 min", ingredients: ["Rice", "Lentil", "Tamarind", "Vegetables", "Mustard"], image: "https://images.unsplash.com/photo-1626776876729-abdf8bd67115?q=80&w=600", calories: 250, protein: "10g", fat: "3g" },
  { id: "f18", restaurantId: "r9", name: "Medu Vada", price: 90, rating: 4.7, deliveryTime: "15 min", ingredients: ["Black Gram", "Oil", "Chilli", "Coconut"], image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600", calories: 400, protein: "12g", fat: "20g" },
  { id: "f19", restaurantId: "r9", name: "Uttapam", price: 110, rating: 4.6, deliveryTime: "20 min", ingredients: ["Rice", "Lentil", "Onion", "Tomato", "Chilli"], image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600", calories: 300, protein: "8g", fat: "10g" },
  { id: "f20", restaurantId: "r9", name: "Upma", price: 70, rating: 4.5, deliveryTime: "15 min", ingredients: ["Semolina", "Wheat", "Ghee", "Cashew", "Tree Nut", "Mustard"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600", calories: 280, protein: "6g", fat: "15g" },
  { id: "f21", restaurantId: "r9", name: "Poori Curry", price: 130, rating: 4.7, deliveryTime: "25 min", ingredients: ["Wheat", "Oil", "Potato", "Onion"], image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600", calories: 450, protein: "8g", fat: "25g" },
  
  // North Indian Gravies & Breads
  { id: "f22", restaurantId: "r10", name: "Palak Paneer", price: 280, rating: 4.8, deliveryTime: "30 min", ingredients: ["Spinach", "Paneer", "Milk", "Garlic", "Spices"], image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600", calories: 350, protein: "18g", fat: "25g" },
  { id: "f23", restaurantId: "r10", name: "Chana Masala", price: 220, rating: 4.6, deliveryTime: "25 min", ingredients: ["Chickpeas", "Tomato", "Onion", "Spices"], image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600", calories: 300, protein: "15g", fat: "10g" },
  { id: "f24", restaurantId: "r10", name: "Malai Kofta", price: 310, rating: 4.9, deliveryTime: "35 min", ingredients: ["Potato", "Paneer", "Milk", "Cream", "Cashew", "Tree Nut"], image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600", calories: 550, protein: "12g", fat: "40g" },
  { id: "f25", restaurantId: "r10", name: "Dal Makhani", price: 260, rating: 4.8, deliveryTime: "35 min", ingredients: ["Black Lentil", "Butter", "Milk", "Cream", "Tomato"], image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600", calories: 400, protein: "14g", fat: "22g" },
  { id: "f26", restaurantId: "r10", name: "Tandoori Chicken", price: 350, rating: 4.9, deliveryTime: "40 min", ingredients: ["Chicken", "Yogurt", "Milk", "Spices", "Lemon"], image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=600", calories: 450, protein: "45g", fat: "20g" },
  { id: "f27", restaurantId: "r10", name: "Chicken Tikka Masala", price: 340, rating: 4.8, deliveryTime: "35 min", ingredients: ["Chicken", "Tomato", "Cream", "Milk", "Spices"], image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=600", calories: 500, protein: "38g", fat: "30g" },
  { id: "f28", restaurantId: "r10", name: "Garlic Naan", price: 60, rating: 4.8, deliveryTime: "20 min", ingredients: ["Wheat", "Garlic", "Butter", "Milk", "Yogurt"], image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600", calories: 200, protein: "5g", fat: "8g" },
  { id: "f29", restaurantId: "r10", name: "Tandoori Roti", price: 40, rating: 4.5, deliveryTime: "20 min", ingredients: ["Wheat", "Water"], image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600", calories: 150, protein: "4g", fat: "2g" },
  { id: "f30", restaurantId: "r10", name: "Lachha Paratha", price: 70, rating: 4.7, deliveryTime: "25 min", ingredients: ["Wheat", "Ghee", "Milk"], image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600", calories: 250, protein: "5g", fat: "12g" },
  
  // Rice Specialties
  { id: "f31", restaurantId: "r5", name: "Chicken Dum Biryani", price: 330, rating: 4.9, deliveryTime: "40 min", ingredients: ["Rice", "Chicken", "Ghee", "Milk", "Spices", "Yogurt"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600", calories: 750, protein: "35g", fat: "22g" },
  { id: "f32", restaurantId: "r5", name: "Mutton Biryani", price: 450, rating: 4.8, deliveryTime: "45 min", ingredients: ["Rice", "Mutton", "Ghee", "Milk", "Spices", "Yogurt"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600", calories: 850, protein: "40g", fat: "30g" },
  { id: "f33", restaurantId: "r5", name: "Veg Pulao", price: 200, rating: 4.5, deliveryTime: "30 min", ingredients: ["Rice", "Carrot", "Peas", "Beans", "Ghee", "Milk"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600", calories: 400, protein: "8g", fat: "10g" },
  { id: "f34", restaurantId: "r5", name: "Jeera Rice", price: 160, rating: 4.6, deliveryTime: "25 min", ingredients: ["Rice", "Cumin", "Ghee", "Milk"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600", calories: 350, protein: "6g", fat: "8g" },
  
  // Street Food & Snacks (Chaat)
  { id: "f35", restaurantId: "r11", name: "Pani Puri / Golgappa", price: 80, rating: 4.9, deliveryTime: "15 min", ingredients: ["Wheat", "Potato", "Chickpeas", "Mint", "Tamarind"], image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=600", calories: 200, protein: "5g", fat: "6g" },
  { id: "f36", restaurantId: "r11", name: "Samosa Chaat", price: 100, rating: 4.7, deliveryTime: "20 min", ingredients: ["Wheat", "Potato", "Peas", "Yogurt", "Milk", "Tamarind"], image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600", calories: 450, protein: "10g", fat: "20g" },
  { id: "f37", restaurantId: "r11", name: "Papdi Chaat", price: 90, rating: 4.6, deliveryTime: "15 min", ingredients: ["Wheat", "Yogurt", "Milk", "Potato", "Tamarind"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600", calories: 350, protein: "8g", fat: "15g" },
  { id: "f38", restaurantId: "r11", name: "Aloo Tikki", price: 80, rating: 4.5, deliveryTime: "20 min", ingredients: ["Potato", "Peas", "Spices", "Oil"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600", calories: 300, protein: "4g", fat: "12g" },
  { id: "f39", restaurantId: "r11", name: "Bhel Puri", price: 70, rating: 4.8, deliveryTime: "10 min", ingredients: ["Puffed Rice", "Peanut", "Onion", "Tomato", "Tamarind"], image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600", calories: 250, protein: "6g", fat: "8g" },
  { id: "f40", restaurantId: "r11", name: "Dahi Puri", price: 90, rating: 4.7, deliveryTime: "15 min", ingredients: ["Wheat", "Yogurt", "Milk", "Potato", "Mint"], image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600", calories: 280, protein: "7g", fat: "10g" },
  { id: "f41", restaurantId: "r11", name: "Onion Pakoda", price: 110, rating: 4.6, deliveryTime: "20 min", ingredients: ["Gram Flour", "Onion", "Oil", "Spices"], image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600", calories: 400, protein: "10g", fat: "22g" },
  { id: "f42", restaurantId: "r11", name: "Paneer Kathi Roll", price: 180, rating: 4.8, deliveryTime: "25 min", ingredients: ["Wheat", "Paneer", "Milk", "Onion", "Capsicum"], image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600", calories: 500, protein: "18g", fat: "25g" },

  // Sweets & Beverages
  { id: "f43", restaurantId: "r7", name: "Gulab Jamun", price: 100, rating: 4.9, deliveryTime: "20 min", ingredients: ["Milk", "Wheat", "Sugar", "Ghee"], image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=600", calories: 350, protein: "6g", fat: "15g" },
  { id: "f44", restaurantId: "r7", name: "Rasmalai", price: 140, rating: 4.8, deliveryTime: "20 min", ingredients: ["Milk", "Sugar", "Pistachio", "Tree Nut", "Saffron"], image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=600", calories: 300, protein: "8g", fat: "12g" },
  { id: "f45", restaurantId: "r7", name: "Kaju Katli", price: 200, rating: 4.9, deliveryTime: "25 min", ingredients: ["Cashew", "Tree Nut", "Sugar", "Ghee", "Milk"], image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=600", calories: 450, protein: "10g", fat: "22g" },
  { id: "f46", restaurantId: "r7", name: "Gajar Ka Halwa", price: 160, rating: 4.7, deliveryTime: "25 min", ingredients: ["Carrot", "Milk", "Sugar", "Ghee", "Cashew", "Tree Nut"], image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=600", calories: 400, protein: "8g", fat: "18g" },
  { id: "f47", restaurantId: "r7", name: "Mango Lassi", price: 120, rating: 4.8, deliveryTime: "15 min", ingredients: ["Mango", "Yogurt", "Milk", "Sugar"], image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=600", calories: 250, protein: "6g", fat: "4g" },
  { id: "f48", restaurantId: "r7", name: "Masala Chai", price: 50, rating: 4.9, deliveryTime: "15 min", ingredients: ["Tea", "Milk", "Ginger", "Cardamom", "Sugar"], image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=600", calories: 120, protein: "4g", fat: "3g" }
];
