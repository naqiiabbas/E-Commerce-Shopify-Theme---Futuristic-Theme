"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function SetupProfilePage() {
  const { user, profile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(profile?.name || user.displayName || "");
      setEmail(profile?.email || user.email || "");
      setPhone(profile?.phone || "");
      setAddress(profile?.address || "");
      setGender(profile?.gender || "");
    }
  }, [user, profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setError("");
    setLoading(true);
    
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        address,
        gender,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      
      // Force reload to trigger auth-context redirection
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <p className="text-[var(--color-muted)]">Please log in to set up your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-36 pb-12">
      <div className="w-full max-w-xl rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="text-center">
          <h1 className="font-display text-4xl text-[var(--color-ink)]">Complete Profile</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Please provide your details to continue.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!user.email} // Disable if fetched from Auth Provider
                className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] disabled:opacity-50"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Address (Optional)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
              placeholder="123 Wellness Ave, Suite 100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Gender (Optional)</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] appearance-none"
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--color-ink)] px-4 py-3 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-ink-soft)] disabled:opacity-70 mt-6"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
