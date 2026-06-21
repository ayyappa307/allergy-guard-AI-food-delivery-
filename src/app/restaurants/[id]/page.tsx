"use client";

import { use, useState, useEffect } from "react";
import { RESTAURANTS, FOOD_ITEMS, FoodItem } from "@/lib/mockData";
import { useAppContext } from "@/context/AppContext";
import { ShieldAlert, ShieldCheck, Flame, Star, ShoppingCart, Info } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Link from "next/link";

export default function RestaurantMenu({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const restaurant = RESTAURANTS.find(r => r.id === resolvedParams.id);
  const menu = FOOD_ITEMS.filter(f => f.restaurantId === resolvedParams.id);
  const { allergyProfile, addToCart } = useAppContext();

  // AI Logic
  const getRiskAnalysis = (food: FoodItem) => {
    const userAllergies = allergyProfile.allergies.map(a => a.toLowerCase());
    const detected = food.ingredients.filter(ing => 
      userAllergies.includes(ing.toLowerCase())
    );

    const isUnsafe = detected.length > 0;
    
    // Find recommendation if unsafe
    let recommendation = null;
    if (isUnsafe) {
      recommendation = menu.find(f => {
        return !f.ingredients.some(ing => userAllergies.includes(ing.toLowerCase()));
      });
    }

    return {
      isUnsafe,
      detected,
      riskScore: isUnsafe ? Math.min(100, detected.length * 45 + 10) : 0,
      recommendation
    };
  };

  if (!restaurant) {
    return <main className="container flex-center"><h1>Restaurant Not Found</h1></main>;
  }

  return (
    <main className={`container ${styles.main}`}>
      <div className={`glass-panel ${styles.header}`}>
        <div className={styles.headerImage}>
          <img src={restaurant.image} alt={restaurant.name} className={styles.realImage} />
        </div>
        <div className={styles.headerInfo}>
          <h1 className="heading-2">{restaurant.name}</h1>
          <div className={styles.meta}>
            <span className={styles.tag}>{restaurant.cuisine}</span>
            <span><Star size={16} fill="var(--warning)" color="var(--warning)" /> {restaurant.rating}</span>
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>

      <div className={styles.warningBanner}>
        <Info size={24} color="var(--primary)" />
        <div>
          <strong>AI Safety Active</strong>
          <p>
            Menu items are being analyzed against your allergy profile: 
            {allergyProfile.allergies.length > 0 ? (
              <span className={styles.boldAllergies}> {allergyProfile.allergies.join(", ")}</span>
            ) : (
              <span> No allergies set. <Link href="/login" style={{color: 'var(--primary)', textDecoration: 'underline'}}>Set them here</Link></span>
            )}
          </p>
        </div>
      </div>

      <div className={styles.menuGrid}>
        {menu.map((food, i) => {
          const ai = getRiskAnalysis(food);

          return (
            <motion.div 
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel ${styles.foodCard}`}
            >
              <div className={styles.foodImage}>
                <img src={food.image} alt={food.name} className={styles.realImage} />
              </div>
              
              <div className={styles.foodInfo}>
                <div className="flex-between">
                  <h3 className="heading-3">{food.name}</h3>
                  <span className={styles.price}>₹{food.price}</span>
                </div>
                
                <p className="text-muted" style={{fontSize: "0.875rem", margin: "0.5rem 0"}}>
                  Ingredients: {food.ingredients.join(", ")}
                </p>

                <div className={styles.macros}>
                  <span><Flame size={14} color="var(--primary)" /> {food.calories} kcal</span>
                  <span>Protein: {food.protein}</span>
                  <span>Fat: {food.fat}</span>
                </div>

                {/* AI Safety Banner */}
                {ai.isUnsafe ? (
                  <div className={styles.aiDanger}>
                    <div className={styles.aiDangerHeader}>
                      <ShieldAlert size={20} />
                      <strong>Status: ⚠ Unsafe</strong>
                    </div>
                    <div className={styles.aiDetails}>
                      <p><strong>Risk Analysis:</strong> Overall Risk {ai.riskScore}%</p>
                      <p className={styles.detected}>Detected: {ai.detected.join(", ")}</p>
                      {ai.recommendation && (
                        <div className={styles.recommendation}>
                          <p><strong>Recommendation:</strong></p>
                          <p>✓ {ai.recommendation.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.aiSafe}>
                    <ShieldCheck size={20} />
                    <strong>AI Approved Safe</strong>
                  </div>
                )}

                <button 
                  onClick={() => addToCart({ ...food, quantity: 1 })}
                  className={styles.addBtn}
                  disabled={ai.isUnsafe}
                >
                  <ShoppingCart size={18} /> 
                  {ai.isUnsafe ? "Avoid Ordering" : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
