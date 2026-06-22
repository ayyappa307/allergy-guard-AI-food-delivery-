"use client";

import { useAppContext } from "@/context/AppContext";
import { Trash2, ShieldAlert, ArrowRight, ShieldCheck, MapPin, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { recordOrderInDb } from "@/lib/dbActions";

export default function Cart() {
  const { 
    cart, addToCart, removeFromCart, updateQuantity, allergyProfile, 
    deliveryAddress, setDeliveryAddress,
    tipPercentage, setTipPercentage,
    appliedPromo, setAppliedPromo,
    clearCart,
    currentUserId, registeredUsers,
    foodItems
  } = useAppContext();
  
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [instructions, setInstructions] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [addressType, setAddressType] = useState<"Home" | "Work" | "Other">("Home");

  // Find the logged-in user's saved home address
  const currentUser = registeredUsers.find(u => u.userId === currentUserId);
  const homeAddress = currentUser?.address || "Please login to save address";

  const userAllergiesCleaned = useMemo(() => {
    return allergyProfile.allergies.map(a => a.split("(")[0].trim().toLowerCase());
  }, [allergyProfile]);

  const unsafeItemsCount = useMemo(() => {
    if (userAllergiesCleaned.length === 0) return 0;
    return cart.reduce((count, item) => {
      const fullFoodItem = foodItems.find(f => f.id === item.id);
      if (fullFoodItem) {
        const isUnsafe = fullFoodItem.ingredients.some(ing => 
          userAllergiesCleaned.includes(ing.toLowerCase())
        );
        if (isUnsafe) return count + 1;
      }
      return count;
    }, 0);
  }, [cart, userAllergiesCleaned, foodItems]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.05;
  const delivery = 40;
  
  // Promo logic
  const discount = appliedPromo === "SAVE20" ? subtotal * 0.2 : 0;
  
  const subtotalAfterDiscount = subtotal - discount;
  
  // Tip logic
  const tipAmount = tipPercentage > 0 ? subtotalAfterDiscount * (tipPercentage / 100) : 0;
  
  const total = subtotal > 0 ? subtotalAfterDiscount + taxes + delivery + tipAmount : 0;

  // Recommendations: Items from the same restaurant not currently in cart
  const recommendations = useMemo(() => {
    if (cart.length === 0) return [];
    const restaurantIdsInCart = new Set(cart.map(item => item.restaurantId));
    const cartItemIds = new Set(cart.map(item => item.id));
    
    return foodItems.filter(f => 
      restaurantIdsInCart.has(f.restaurantId) && !cartItemIds.has(f.id)
    ).slice(0, 4); // Show up to 4 recommendations
  }, [cart, foodItems]);

  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === "SAVE20") {
      setAppliedPromo("SAVE20");
    } else {
      alert("Invalid promo code. Try 'SAVE20'");
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const restaurantId = cart[0]?.restaurantId || "";
      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      await recordOrderInDb({
        userId: currentUserId || "guest",
        restaurantId,
        items,
        subtotal,
        discount,
        taxes,
        delivery,
        tip: tipAmount,
        total,
        address: addressType === "Other" && customAddress ? customAddress : addressType === "Home" ? homeAddress : "456 Business Blvd",
        instructions
      });
    } catch (error) {
      console.error("Failed to save order to database:", error);
    }

    setTimeout(() => {
      setCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <main className="container flex-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`glass-panel ${styles.successCard}`}
          style={{ padding: '3rem', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--secondary)', marginBottom: '1rem' }}>
            <ShieldCheck size={64} />
          </div>
          <h1 className="heading-2">Order Safe & Confirmed!</h1>
          <p className="text-muted" style={{ marginTop: '1rem' }}>
            Delivering to <strong>{addressType === "Other" && customAddress ? customAddress : addressType === "Home" ? homeAddress : "456 Business Blvd"}</strong>. Your allergy-friendly meal is being prepared.
          </p>
          <Link href="/restaurants" className={styles.primaryBtn} style={{marginTop: '2rem', display: 'inline-block'}}>
            Return Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={`container ${styles.main}`}>
      <h1 className="heading-2">Your Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link href="/restaurants" className={styles.primaryBtn}>Browse Food</Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.itemsList}>
            
            {/* Delivery Address Section */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}><MapPin size={20} /> Delivery Address</h3>
              <div className={styles.addressGrid}>
                {['Home', 'Work', 'Other'].map(type => (
                  <div 
                    key={type}
                    onClick={() => setAddressType(type as any)}
                    className={`${styles.addressCard} ${addressType === type ? styles.addressCardActive : ''}`}
                  >
                    <div className={styles.addressType}>
                      {type}
                      {addressType === type && <Check size={16} color="var(--primary)" />}
                    </div>
                    <div className={styles.addressDetail}>
                      {type === 'Home' ? homeAddress : type === 'Work' ? '456 Business Blvd' : 'Enter custom address'}
                    </div>
                  </div>
                ))}
              </div>
              
              {addressType === 'Other' && (
                <div style={{ marginTop: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter manual delivery address..." 
                    className={styles.instructionsInput}
                    style={{ minHeight: '40px', padding: '0.75rem' }}
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Cart Items */}
            {cart.map(item => {
              const fullFoodItem = foodItems.find(f => f.id === item.id);
              const matchedAllergens = fullFoodItem ? fullFoodItem.ingredients.filter(ing => 
                userAllergiesCleaned.includes(ing.toLowerCase())
              ) : [];
              const isUnsafe = matchedAllergens.length > 0;

              return (
                <div key={item.id} className={`glass-panel ${styles.cartItem} ${isUnsafe ? styles.unsafeCartItem : ''}`}>
                  <div className={styles.itemInfo}>
                    <h3 className="heading-3">{item.name}</h3>
                    <span className={styles.price}>₹{item.price}</span>
                    {isUnsafe && (
                      <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ShieldAlert size={14} /> Unsafe: Contains {matchedAllergens.join(", ")}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.actions}>
                    <div className={styles.quantity}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Delivery Instructions */}
            <div className={styles.sectionBlock} style={{ marginTop: '2rem' }}>
              <h3 className={styles.sectionTitle}>Delivery Instructions</h3>
              <textarea 
                className={styles.instructionsInput}
                placeholder="E.g. Leave at the door, ring the bell, beware of dog..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionTitle}>Frequently bought together</h3>
                <div className={styles.suggestionsGrid}>
                  {recommendations.map(item => (
                    <div key={item.id} className={styles.suggestCard}>
                      <img src={item.image} alt={item.name} className={styles.suggestImg} />
                      <div className={styles.suggestInfo}>
                        <div className={styles.suggestName}>{item.name}</div>
                        <div className={styles.price}>₹{item.price}</div>
                        <button 
                          className={styles.suggestAddBtn}
                          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, restaurantId: item.restaurantId })}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergy Verification */}
            <div className={`${styles.allergyCheck} ${unsafeItemsCount > 0 ? styles.allergyCheckUnsafe : ''}`}>
              <div className={styles.allergyHeader}>
                <ShieldAlert size={24} color={unsafeItemsCount > 0 ? 'var(--danger)' : 'var(--secondary)'} />
                <strong>Final AI Allergy Check Before Checkout</strong>
              </div>
              <p>Profile: {allergyProfile.allergies.length > 0 ? allergyProfile.allergies.join(", ") : "No allergies set"}</p>
              <p>
                Risk Status:{" "}
                {unsafeItemsCount > 0 ? (
                  <strong style={{ color: 'var(--danger)' }}>⚠ Unsafe Items Detected</strong>
                ) : (
                  <strong style={{ color: 'var(--secondary)' }}>Safe to Proceed</strong>
                )}
                {" "}({unsafeItemsCount} unsafe item{unsafeItemsCount === 1 ? '' : 's'} in cart)
              </p>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className={`glass-panel ${styles.summary}`}>
            <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
            
            {/* Promo Code */}
            <div className={styles.promoSection}>
              <input 
                type="text" 
                placeholder="Promo Code (SAVE20)" 
                className={styles.promoInput}
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                disabled={!!appliedPromo}
              />
              <button 
                className={styles.promoBtn} 
                onClick={appliedPromo ? () => { setAppliedPromo(""); setPromoInput(""); } : handleApplyPromo}
              >
                {appliedPromo ? "Remove" : "Apply"}
              </button>
            </div>

            {/* Tip Selection */}
            <div className={styles.tipSection}>
              <div className={styles.tipSectionTitle}>Driver Tip</div>
              <div className={styles.tipPills}>
                {[0, 10, 15, 20].map(amount => (
                  <button 
                    key={amount}
                    onClick={() => setTipPercentage(amount)}
                    className={`${styles.tipPill} ${tipPercentage === amount ? styles.tipPillActive : ''}`}
                  >
                    {amount === 0 ? 'No tip' : `${amount}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Math Breakdown */}
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className={styles.summaryRow} style={{ color: 'var(--secondary)', fontWeight: 600 }}>
                <span>Discount (SAVE20)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span>Taxes (5%)</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery Fee</span>
              <span>₹{delivery.toFixed(2)}</span>
            </div>
            
            {tipAmount > 0 && (
              <div className={styles.summaryRow}>
                <span>Driver Tip ({tipPercentage}%)</span>
                <span>₹{tipAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={checkingOut || unsafeItemsCount > 0}
              className={styles.checkoutBtn}
              style={unsafeItemsCount > 0 ? { background: 'var(--danger)', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' } : {}}
            >
              {checkingOut ? "Processing..." : (
                unsafeItemsCount > 0 ? "Remove Unsafe Items to Order" : <>Place Order <ArrowRight size={20} /></>
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
