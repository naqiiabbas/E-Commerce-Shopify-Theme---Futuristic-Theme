"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useRouter, usePathname } from "next/navigation";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address?: string;
  gender?: string;
  additionalEmails?: string[];
  cart?: any[];
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  isProfileComplete: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  isProfileComplete: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/register");
    const isSetupProfileRoute = pathname === "/setup-profile";
    const profileComplete = profile?.name && profile?.phone && profile?.email;

    if (user && !profileComplete && !isSetupProfileRoute) {
      // User is logged in but profile is incomplete, redirect to setup
      router.replace("/setup-profile");
    } else if (user && profileComplete && isSetupProfileRoute) {
      // User is logged in and profile is complete, don't allow access to setup
      router.replace("/");
    } else if (user && profileComplete && isAuthRoute) {
       // Logged in users shouldn't access login/register
       router.replace("/");
    }
  }, [user, profile, loading, pathname, router]);

  const logout = async () => {
    await firebaseSignOut(auth);
    router.push("/");
  };

  const isProfileComplete = Boolean(profile?.name && profile?.phone && profile?.email);

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, isProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
