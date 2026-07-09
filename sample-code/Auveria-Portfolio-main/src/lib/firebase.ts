"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKFWY_DebuQHEk7IHfnzwCOSzHyDr2Elg",
  authDomain: "first-angular-f3853.firebaseapp.com",
  projectId: "first-angular-f3853",
  storageBucket: "first-angular-f3853.firebasestorage.app",
  messagingSenderId: "329986126025",
  appId: "1:329986126025:web:621c9e914080bfc1c11d18",
  measurementId: "G-KY367LK08F",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

let analyticsInstance: Promise<Analytics | null> | null = null;

export function getFirebaseAnalytics() {
  if (!analyticsInstance) {
    analyticsInstance = isSupported().then((supported) => {
      if (!supported) {
        return null;
      }

      return getAnalytics(firebaseApp);
    });
  }

  return analyticsInstance;
}
