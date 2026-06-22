"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext, UserRole } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Check, ShieldAlert, Store, Shield, User } from "lucide-react";
import styles from "./page.module.css";

const COMMON_ALLERGIES = [
  "Peanuts", "Cashews", "Seafood", 
  "Prawns", "Dairy", "Eggplant", "Ghee", 
  "Wheat", "Sesame", "Mustard", "Dust", 
  "Pollen", "Mold", "Smoke"
];

export default function Login() {
  const { userRole, setUserRole, currentUserId, setCurrentUserId, allergyProfile, setAllergyProfile, registeredUsers, registerUser, clearCart } = useAppContext();
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole === "guest" ? "customer" : userRole);
  
  // Customer Profile State
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(allergyProfile.allergies || []);
  const [customAllergyInput, setCustomAllergyInput] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Login State for ALL roles
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const handleAddCustomAllergy = () => {
    const trimmed = customAllergyInput.trim();
    if (trimmed && !selectedAllergies.includes(trimmed)) {
      setSelectedAllergies(prev => [...prev, trimmed]);
      setCustomAllergyInput("");
    }
  };

  const handleLogin = () => {
    setLoginError("");

    if (selectedRole === "admin") {
      if (userId === "chaitanya296" && password === "chaitanya24296") {
        setUserRole(selectedRole);
        setCurrentUserId("chaitanya296");
        clearCart();
        router.push("/admin");
      } else {
        setLoginError("Invalid Admin credentials.");
        return;
      }
    } else if (selectedRole === "customer") {
      if (isLoginMode) {
        // Check mock database
        const userExists = registeredUsers.find(u => u.userId === userId && u.password === password);
        if (userExists) {
          setUserRole(selectedRole);
          setCurrentUserId(userId);
          // In real app we'd load allergies from DB, here we just set them from what they picked or empty
          setAllergyProfile({ name: userId, allergies: selectedAllergies });
          clearCart();
          router.push("/restaurants");
        } else {
          setLoginError("Invalid Customer credentials. User not found.");
          return;
        }
      } else {
        // Register mode
        const userExists = registeredUsers.find(u => u.userId === userId);
        if (userExists) {
          setLoginError("User ID already exists. Please choose another.");
          return;
        }
        if (!userAddress.trim()) {
          setLoginError("Please enter a delivery address.");
          return;
        }
        registerUser({ userId, password, address: userAddress });
        setUserRole(selectedRole);
        setCurrentUserId(userId);
        setAllergyProfile({ name: userId, allergies: selectedAllergies });
        clearCart();
        router.push("/restaurants");
      }
    } else if (selectedRole === "restaurant") {
      if (userId === "owner" && password === "owner123") {
        setUserRole(selectedRole);
        setCurrentUserId("owner");
        clearCart();
        router.push("/restaurant-panel");
      } else {
        setLoginError("Invalid Restaurant credentials. (Try owner / owner123)");
        return;
      }
    }
  };

  return (
    <main className="container flex-center" style={{ minHeight: "calc(100vh - 80px)", padding: "2rem 0" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-panel ${styles.loginCard}`}
      >
        <div className={styles.header}>
          <h1 className="heading-2">{userRole !== "guest" ? "Account Status" : "Choose Account Type"}</h1>
          <p className="text-muted">{userRole !== "guest" ? "Manage your session." : "Select your role to access the platform."}</p>
        </div>

        {userRole !== "guest" ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <User size={64} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h2 className="heading-3">Welcome, {currentUserId}</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', marginTop: '0.5rem' }}>
              You are currently logged in as a <strong>{userRole}</strong>.
            </p>
            <button 
              onClick={() => {
                setUserRole("guest");
                setCurrentUserId("");
                clearCart();
                router.push("/");
              }} 
              className={styles.saveBtn}
              style={{ background: 'var(--danger)', maxWidth: '200px', margin: '0 auto' }}
            >
              Logout Now
            </button>
          </div>
        ) : (
          <>
            <div className={styles.roleSelector}>
              <button 
                className={`${styles.roleCard} ${selectedRole === "customer" ? styles.activeRole : ""}`}
                onClick={() => setSelectedRole("customer")}
              >
                <User size={32} />
                <span>Customer</span>
              </button>
              <button 
                className={`${styles.roleCard} ${selectedRole === "restaurant" ? styles.activeRole : ""}`}
                onClick={() => setSelectedRole("restaurant")}
              >
                <Store size={32} />
                <span>Restaurant</span>
              </button>
              <button 
                className={`${styles.roleCard} ${selectedRole === "admin" ? styles.activeRole : ""}`}
                onClick={() => setSelectedRole("admin")}
              >
                <Shield size={32} />
                <span>Admin</span>
              </button>
            </div>

        {selectedRole === "customer" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.customerForm}>
            <div className={styles.header} style={{marginTop: '1rem'}}>
              <ShieldAlert size={32} color="var(--primary)" />
              <h2 className="heading-3">{isLoginMode ? "Customer Login" : "Create Account"}</h2>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userId">User ID</label>
              <input 
                id="userId"
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="E.g., myuser123"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={styles.input}
              />
            </div>

            {!isLoginMode && (
              <div className={styles.formGroup}>
                <label htmlFor="userAddress">Home Address</label>
                <input 
                  id="userAddress"
                  type="text" 
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="E.g., 123 Main Street, Apt 4B"
                  className={styles.input}
                />
              </div>
            )}

            <div className={styles.formGroup} style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--card-border)" }}>
              <label>{isLoginMode ? "Update Allergies (Optional)" : "Select Allergies"}</label>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={customAllergyInput}
                  onChange={(e) => setCustomAllergyInput(e.target.value)}
                  placeholder="Type a custom allergy..."
                  className={styles.input}
                  style={{ flex: 1 }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomAllergy()}
                />
                <button 
                  onClick={handleAddCustomAllergy}
                  className={styles.saveBtn}
                  style={{ width: 'auto', padding: '0 1.5rem', margin: 0 }}
                >
                  Add
                </button>
              </div>

              <div className={styles.allergyGrid}>
                {[...new Set([...COMMON_ALLERGIES, ...selectedAllergies])].map(allergy => {
                  const isSelected = selectedAllergies.includes(allergy);
                  return (
                    <button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`${styles.allergyBadge} ${isSelected ? styles.selected : ''}`}
                    >
                      {isSelected && <Check size={14} />}
                      {allergy}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {loginError && <p style={{ color: "var(--danger)", fontWeight: 600 }}>{loginError}</p>}
            
            <p 
              onClick={() => { setIsLoginMode(!isLoginMode); setLoginError(""); }} 
              style={{ color: "var(--primary)", cursor: "pointer", textAlign: "center", fontWeight: 500, marginTop: "0.5rem" }}
            >
              {isLoginMode ? "Don't have an account? Register here" : "Already have an account? Login here"}
            </p>
          </motion.div>
        )}

        {selectedRole === "restaurant" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.customerForm}>
            <div className={styles.adminMsg} style={{ padding: "1rem", marginBottom: "1rem" }}>
              <Store size={32} color="var(--primary)" />
              <p>Enter your owner credentials to manage live orders and menus.</p>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="userId">User ID</label>
              <input 
                id="userId"
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter Restaurant ID (owner)"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password (owner123)"
                className={styles.input}
              />
            </div>

            {loginError && <p style={{ color: "var(--danger)", fontWeight: 600 }}>{loginError}</p>}
          </motion.div>
        )}

        {selectedRole === "admin" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.customerForm}>
            <div className={styles.adminMsg} style={{ padding: "1rem", marginBottom: "1rem" }}>
              <Shield size={32} color="var(--danger)" />
              <p>Enter your administrator credentials to access platform analytics.</p>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="userId">User ID</label>
              <input 
                id="userId"
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter Admin User ID"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={styles.input}
              />
            </div>

            {loginError && <p style={{ color: "var(--danger)", fontWeight: 600 }}>{loginError}</p>}
          </motion.div>
        )}

        <button 
          onClick={handleLogin} 
          className={styles.saveBtn}
          disabled={!userId.trim() || !password.trim()}
        >
          {selectedRole === "customer" && !isLoginMode ? "Register & Continue" : `Login as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
        </button>
          </>
        )}
      </motion.div>
    </main>
  );
}
