"use client";

import Link from "next/link";
import { ShieldCheck, ShoppingCart, User } from "lucide-react";
import styles from "./Navbar.module.css";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const { cart, allergyProfile, userRole, currentUserId, setUserRole, setCurrentUserId, clearCart } = useAppContext();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUserRole("guest");
    setCurrentUserId("");
    clearCart();
    window.location.href = "/";
  };

  return (
    <nav className={styles.nav}>
      <div className={`container flex-between ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <ShieldCheck size={32} color="var(--primary)" />
          <span className="heading-3">AllergyGuard AI</span>
        </Link>
        <div className={styles.navLinks}>
          {(userRole === "customer" || userRole === "guest") && (
            <>
              <Link href="/restaurants">Restaurants</Link>
              <Link href="/ai-scanner">AI Scanner</Link>
              <Link href="/meal-planner">Meal Planner</Link>
            </>
          )}

          {userRole === "restaurant" && (
            <Link href="/restaurant-panel">Owner Panel</Link>
          )}

          {userRole === "admin" && (
            <Link href="/admin">Admin</Link>
          )}

          {(userRole === "customer" || userRole === "guest") && (
            <Link href="/cart" className={styles.cartLink}>
              <ShoppingCart size={24} />
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
            </Link>
          )}

          {userRole !== "guest" ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <User size={18} />
                <span style={{ color: 'var(--primary)' }}>{currentUserId}</span>
              </Link>
              <button onClick={handleLogout} className={styles.loginBtn} style={{ background: 'var(--danger)' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginBtn}>
              <User size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
