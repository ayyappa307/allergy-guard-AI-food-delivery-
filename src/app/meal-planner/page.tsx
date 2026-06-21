"use client";

import { useState } from "react";
import { FOOD_ITEMS } from "@/lib/mockData";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Calendar, Target, Activity } from "lucide-react";
import styles from "./page.module.css";

export default function MealPlanner() {
  const { allergyProfile } = useAppContext();
  const [goal, setGoal] = useState("lose");
  const [calories, setCalories] = useState(1500);
  const [plan, setPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      // Filter foods to only safe ones
      const userAllergies = allergyProfile.allergies.map(a => a.toLowerCase());
      const safeFoods = FOOD_ITEMS.filter(f => !f.ingredients.some(i => userAllergies.includes(i.toLowerCase())));
      
      // Separate into healthy/low cal vs high cal
      const lightMeals = safeFoods.filter(f => f.calories < 400);
      const heavyMeals = safeFoods.filter(f => f.calories >= 400);

      const generatedPlan = {
        breakfast: lightMeals[0] || safeFoods[0],
        lunch: heavyMeals[0] || safeFoods[0],
        dinner: lightMeals[1] || safeFoods[1] || safeFoods[0],
      };

      const totalCals = (generatedPlan.breakfast?.calories || 0) + 
                        (generatedPlan.lunch?.calories || 0) + 
                        (generatedPlan.dinner?.calories || 0);

      setPlan({ ...generatedPlan, totalCals });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.hero}>
        <div className={styles.badge}><Calendar size={16} /> AI Daily Meal Planner</div>
        <h1 className="heading-2">Plan Your Nutrition safely</h1>
        <p className="text-muted">Set your goal, and our AI will create a daily meal plan that completely avoids your allergies.</p>
      </div>

      <div className={styles.layout}>
        <div className={`glass-panel ${styles.sidebar}`}>
          <h3 className="heading-3">Your Parameters</h3>
          
          <div className={styles.formGroup}>
            <label>Weight Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className={styles.input}>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Muscle</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Target Daily Calories</label>
            <input 
              type="number" 
              value={calories} 
              onChange={(e) => setCalories(parseInt(e.target.value))}
              className={styles.input}
              step={100}
            />
          </div>

          <div className={styles.allergySummary}>
            <Activity size={18} color="var(--primary)" />
            <span>AI automatically avoiding: <strong>{allergyProfile.allergies.length > 0 ? allergyProfile.allergies.join(", ") : "None"}</strong></span>
          </div>

          <button onClick={generatePlan} disabled={isGenerating} className={styles.generateBtn}>
            {isGenerating ? "Generating..." : "Generate Safe Meal Plan"}
          </button>
        </div>

        <div className={styles.content}>
          {plan ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.planResult}
            >
              <div className={styles.scoreCard}>
                <div>
                  <h2 className="heading-2 text-gradient">Health Score: 89/100</h2>
                  <p>Total Calories: <strong>{plan.totalCals} kcal</strong></p>
                </div>
                <Target size={48} color="var(--secondary)" />
              </div>

              <div className={styles.meals}>
                {['breakfast', 'lunch', 'dinner'].map((mealStr) => {
                  const meal = plan[mealStr];
                  return meal ? (
                    <div key={mealStr} className={`glass-panel ${styles.mealCard}`}>
                      <div className={styles.mealLabel}>{mealStr.toUpperCase()}</div>
                      <div className={styles.mealInfo}>
                        <div className={styles.emoji}>
                          <img src={meal.image} alt={meal.name} className={styles.realImage} />
                        </div>
                        <div>
                          <h4>{meal.name}</h4>
                          <p>{meal.calories} kcal • {meal.protein} Protein</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </motion.div>
          ) : (
            <div className={styles.emptyState}>
              <Calendar size={64} color="var(--muted)" />
              <p>Your AI generated meal plan will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
