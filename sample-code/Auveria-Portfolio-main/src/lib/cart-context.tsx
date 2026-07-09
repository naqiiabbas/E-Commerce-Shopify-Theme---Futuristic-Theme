"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem } from '@/types/content';
import { useAuth } from './auth-context';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  // Track if we have performed initial load to prevent saving empty cart over existing data
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize cart from local storage or Firestore
  useEffect(() => {
    const initCart = async () => {
      let parsedLocalCart: CartItem[] = [];
      const localCartStr = localStorage.getItem('shopping_cart');
      if (localCartStr) {
        try {
          parsedLocalCart = JSON.parse(localCartStr);
        } catch(e) {}
      }

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const dbCart: CartItem[] = userDoc.data()?.cart || [];
          
          if (parsedLocalCart.length > 0) {
            // Merge local storage items into Firestore items
            const mergedCart = [...dbCart];
            parsedLocalCart.forEach(localItem => {
              const existingItem = mergedCart.find(i => i.product.id === localItem.product.id);
              if (existingItem) {
                existingItem.quantity += localItem.quantity;
              } else {
                mergedCart.push(localItem);
              }
            });
            
            setItems(mergedCart);
            await setDoc(userRef, { cart: mergedCart }, { merge: true });
            localStorage.removeItem('shopping_cart');
          } else {
            setItems(dbCart);
          }
        } else if (parsedLocalCart.length > 0) {
          setItems(parsedLocalCart);
          await setDoc(userRef, { cart: parsedLocalCart }, { merge: true });
          localStorage.removeItem('shopping_cart');
        } else {
          setItems([]);
        }
      } else {
        setItems(parsedLocalCart);
      }
      setIsLoaded(true);
    };

    initCart();
  }, [user]);

  const saveCart = async (newItems: CartItem[]) => {
    setItems(newItems);
    if (!isLoaded) return;
    
    if (user) {
      await setDoc(doc(db, "users", user.uid), { cart: newItems }, { merge: true });
    } else {
      localStorage.setItem('shopping_cart', JSON.stringify(newItems));
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: ProductItem) => {
    const newItems = [...items];
    const existingItem = newItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newItems.push({ product, quantity: 1 });
    }
    saveCart(newItems);
    openCart();
  };

  const removeFromCart = (productId: string) => {
    const newItems = items.filter((item) => item.product.id !== productId);
    saveCart(newItems);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newItems = items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(newItems);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce((total, item) => {
    return total + item.product.basePrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
