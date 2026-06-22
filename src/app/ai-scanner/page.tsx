"use client";

import { useState } from "react";
import { FoodItem } from "@/lib/mockData";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./page.module.css";
import { useAppContext } from "@/context/AppContext";

export default function AiScanner() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FoodItem[]>([]);
  const { allergyProfile, foodItems } = useAppContext();

  const handleSearch = () => {
    if (!query) return;
    setIsSearching(true);
    
    // Mock AI NLP logic
    setTimeout(() => {
      const q = query.toLowerCase();
      let matched = foodItems;

      // Simple mock NLP keyword matching
      if (q.includes("dairy-free") || q.includes("no milk")) {
        matched = matched.filter(f => !f.ingredients.some(i => i.toLowerCase() === "milk" || i.toLowerCase() === "cheese"));
      }
      if (q.includes("gluten-free") || q.includes("no wheat")) {
        matched = matched.filter(f => !f.ingredients.some(i => i.toLowerCase() === "wheat"));
      }
      if (q.includes("protein") || q.includes("healthy")) {
        matched = matched.filter(f => parseInt(f.protein) > 20);
      }

      // Automatically apply user's allergy profile to ANY search to guarantee safety
      const userAllergies = allergyProfile.allergies.map(a => a.split("(")[0].trim().toLowerCase());
      matched = matched.filter(f => !f.ingredients.some(i => userAllergies.includes(i.toLowerCase())));

      setResults(matched);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.hero}>
        <div className={styles.badge}><Sparkles size={16} /> Smart AI Search</div>
        <h1 className="heading-2">What are you craving?</h1>
        <p className="text-muted">Tell us naturally. E.g. "Show dairy-free burgers" or "Healthy protein meals"</p>
        
        <div className={styles.searchBox}>
          <Search size={24} color="var(--muted)" />
          <input 
            type="text"
            placeholder="Type your craving here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "Thinking..." : "Search"}
          </button>
        </div>

        <div className={styles.suggestions}>
          <span>Try:</span>
          <button onClick={() => setQuery("Show dairy-free burgers")}>"Show dairy-free burgers"</button>
          <button onClick={() => setQuery("Gluten-free pizza")}>"Gluten-free pizza"</button>
          <button onClick={() => setQuery("High protein meals")}>"High protein meals"</button>
        </div>
      </div>

      {results.length > 0 && (
        <div className={styles.resultsArea}>
          <h3 className="heading-3">AI Recommendations</h3>
          <p className="text-muted">Filtered based on your prompt and your Allergy Profile.</p>
          
          <div className={styles.grid}>
            {results.map((food, i) => (
              <motion.div 
                key={food.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel ${styles.card}`}
              >
                <div className={styles.emoji}>
                  <img src={food.image} alt={food.name} className={styles.realImage} />
                </div>
                <div>
                  <h4>{food.name}</h4>
                  <p>₹{food.price} • {food.protein} Protein</p>
                </div>
                <Link href={`/restaurants/${food.restaurantId}`} className={styles.viewBtn}>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
