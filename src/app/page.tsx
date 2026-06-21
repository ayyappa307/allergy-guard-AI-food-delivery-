"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, HeartPulse, Search } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={`container ${styles.hero}`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.heroContent}
        >
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            AI-Powered Safe Dining
          </div>
          <h1 className="heading-1">
            Eat without fear. <br/>
            <span className="text-gradient">Intelligent</span> Food Delivery.
          </h1>
          <p className={styles.subtitle}>
            Personalized menus, AI risk prediction, and safe alternative recommendations tailored exactly to your allergy profile.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/restaurants" className={styles.primaryBtn}>
              Browse Safe Foods <ArrowRight size={20} />
            </Link>
            <Link href="/ai-scanner" className={styles.secondaryBtn}>
              <Search size={20} /> Search with AI
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.heroImageContainer}
        >
          <div className={`glass-panel ${styles.floatingCard} ${styles.card1}`}>
            <HeartPulse size={24} color="var(--secondary)" />
            <div>
              <strong>100% Safe</strong>
              <p>Dairy-free match</p>
            </div>
          </div>
          <div className={`glass-panel ${styles.floatingCard} ${styles.card2}`}>
            <ShieldCheck size={24} color="var(--danger)" />
            <div>
              <strong>Warning</strong>
              <p>Contains Peanuts</p>
            </div>
          </div>
          <div className={styles.heroImagePlaceholder}>
            <div className={styles.foodCircle}>
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600" alt="Food" className={styles.heroRealImage} />
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
