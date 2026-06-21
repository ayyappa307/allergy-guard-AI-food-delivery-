"use client";

import { motion } from "framer-motion";
import { RESTAURANTS, FOOD_ITEMS } from "@/lib/mockData";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import styles from "./page.module.css";
import { useState } from "react";

export default function Restaurants() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const cuisines = ["All", ...Array.from(new Set(RESTAURANTS.map(r => r.cuisine)))];

  const filteredRestaurants = RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || r.cuisine === filter;
    return matchesSearch && matchesFilter;
  });

  const filteredFoods = search.trim() !== "" 
    ? FOOD_ITEMS.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <main className="container" style={{ padding: "3rem 1.5rem" }}>
      <div className={styles.header}>
        <h1 className="heading-2">Browse & Search</h1>
        <p className="text-muted">Find the best places or search for specific dishes.</p>
      </div>

      <div className={styles.controls}>
        <input 
          type="text" 
          placeholder="Search restaurants or dishes (e.g. Biryani)..." 
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {!search && (
          <div className={styles.filters}>
            {cuisines.map(c => (
              <button 
                key={c}
                onClick={() => setFilter(c)}
                className={`${styles.filterBtn} ${filter === c ? styles.activeFilter : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {search.trim() !== "" && filteredFoods.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h2 className="heading-3" style={{ marginBottom: "1.5rem" }}>Dishes matching "{search}"</h2>
          <div className={styles.grid}>
            {filteredFoods.map((food, index) => {
              const restaurant = RESTAURANTS.find(r => r.id === food.restaurantId);
              return (
                <Link href={`/restaurants/${food.restaurantId}`} key={food.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-panel ${styles.card}`}
                  >
                    <div className={styles.imagePlaceholder}>
                      <img src={food.image} alt={food.name} className={styles.realImage} />
                    </div>
                    <div className={styles.info}>
                      <div className="flex-between">
                        <h3 className="heading-3">{food.name}</h3>
                        <div className={styles.rating}>
                          <Star size={16} fill="var(--warning)" color="var(--warning)" />
                          {food.rating}
                        </div>
                      </div>
                      <div className={styles.meta}>
                        <span className={styles.tag}>₹{food.price}</span>
                        <span className={styles.distance} style={{ color: "var(--primary)" }}>
                          from {restaurant?.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {(!search || filteredRestaurants.length > 0) && (
        <div>
          {search.trim() !== "" && <h2 className="heading-3" style={{ marginBottom: "1.5rem" }}>Restaurants matching "{search}"</h2>}
          <div className={styles.grid}>
            {filteredRestaurants.map((restaurant, index) => (
              <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-panel ${styles.card}`}
                >
                  <div className={styles.imagePlaceholder}>
                    <img src={restaurant.image} alt={restaurant.name} className={styles.realImage} />
                  </div>
                  <div className={styles.info}>
                    <div className="flex-between">
                      <h3 className="heading-3">{restaurant.name}</h3>
                      <div className={styles.rating}>
                        <Star size={16} fill="var(--warning)" color="var(--warning)" />
                        {restaurant.rating}
                      </div>
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.tag}>{restaurant.cuisine}</span>
                      <span className={styles.distance}>
                        <MapPin size={14} /> {restaurant.distance}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {search.trim() !== "" && filteredFoods.length === 0 && filteredRestaurants.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)" }}>
          <h3 className="heading-3">No results found</h3>
          <p>We couldn't find any restaurants or dishes matching "{search}".</p>
        </div>
      )}
    </main>
  );
}
