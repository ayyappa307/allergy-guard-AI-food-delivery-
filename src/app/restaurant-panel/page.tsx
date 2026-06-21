"use client";

import { useState } from "react";
import { Camera, Plus, CheckCircle2, Clock } from "lucide-react";
import styles from "./page.module.css";
import { motion } from "framer-motion";

export default function RestaurantPanel() {
  const [activeTab, setActiveTab] = useState("orders");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<any>(null);

  const mockOrders = [
    { id: "#1023", items: "2x Chicken Burger", status: "Preparing", time: "10 mins ago", allergySafe: true },
    { id: "#1024", items: "1x Vegan Salad", status: "New", time: "2 mins ago", allergySafe: true },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedResult({
        name: "Classic Cheeseburger",
        price: 150,
        ingredients: "Beef, Cheddar Cheese, Milk bun, Onion, Tomato, Lettuce",
        allergens: ["Milk", "Wheat"],
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.header}>
        <h1 className="heading-2">Restaurant Owner Panel</h1>
        <div className={styles.tabs}>
          <button 
            className={activeTab === "orders" ? styles.activeTab : ""}
            onClick={() => setActiveTab("orders")}
          >
            Live Orders
          </button>
          <button 
            className={activeTab === "menu" ? styles.activeTab : ""}
            onClick={() => setActiveTab("menu")}
          >
            OCR Menu Scanner
          </button>
        </div>
      </div>

      {activeTab === "orders" && (
        <div className={styles.ordersGrid}>
          {mockOrders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel ${styles.orderCard}`}
            >
              <div className="flex-between">
                <h3>{order.id}</h3>
                <span className={styles.time}><Clock size={14}/> {order.time}</span>
              </div>
              <p>{order.items}</p>
              
              <div className={styles.allergyClear}>
                <CheckCircle2 size={16} /> AI Allergy Clear
              </div>

              <div className="flex-between" style={{ marginTop: '1rem' }}>
                <span className={styles.status}>{order.status}</span>
                <button className={styles.updateBtn}>Update Status</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "menu" && (
        <div className={styles.ocrSection}>
          <div className={styles.ocrUpload}>
            <Camera size={48} color="var(--muted)" />
            <h3>Upload Menu Image</h3>
            <p className="text-muted">Our AI will extract food names, ingredients, and detect allergens automatically.</p>
            <button onClick={handleScan} disabled={isScanning} className={styles.scanBtn}>
              {isScanning ? "Scanning with AI..." : "Select Image & Scan"}
            </button>
          </div>

          {scannedResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`glass-panel ${styles.scanResult}`}
            >
              <h3>Scan Complete!</h3>
              <div className={styles.resultDetails}>
                <div className={styles.field}>
                  <label>Food Name</label>
                  <input type="text" defaultValue={scannedResult.name} />
                </div>
                <div className={styles.field}>
                  <label>Price (₹)</label>
                  <input type="number" defaultValue={scannedResult.price} />
                </div>
                <div className={styles.field}>
                  <label>Ingredients extracted</label>
                  <textarea defaultValue={scannedResult.ingredients} rows={3} />
                </div>
                <div className={styles.field}>
                  <label>AI Detected Allergens</label>
                  <div className={styles.allergensList}>
                    {scannedResult.allergens.map((a: string) => (
                      <span key={a} className={styles.allergenTag}>{a}</span>
                    ))}
                  </div>
                </div>
                <button className={styles.addToMenuBtn}><Plus size={18}/> Add to Menu</button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </main>
  );
}
