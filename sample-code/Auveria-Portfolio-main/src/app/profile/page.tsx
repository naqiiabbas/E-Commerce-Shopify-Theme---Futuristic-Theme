"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { X, Plus } from "lucide-react";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
  
  const [newEmail, setNewEmail] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setGender(profile.gender || "");
      setAdditionalEmails(profile.additionalEmails || []);
    }
  }, [user, profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: profile?.email || user.email, // Preserve primary email
        phone,
        address,
        gender,
        additionalEmails,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      
      setSuccess("Profile updated successfully!");
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      setLoading(false);
    }
  };

  const handleAddEmail = () => {
    if (!newEmail || !newEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (additionalEmails.includes(newEmail) || newEmail === profile?.email) {
      setError("This email is already added.");
      return;
    }
    setAdditionalEmails([...additionalEmails, newEmail]);
    setNewEmail("");
    setError("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setAdditionalEmails(additionalEmails.filter(e => e !== emailToRemove));
  };

  if (!user || !profile) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <p className="text-[var(--color-muted)]">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-36 pb-12">
      <div className="w-full max-w-2xl rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="text-center">
          <h1 className="font-display text-4xl text-[var(--color-ink)]">My Profile</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Manage your personal information and contact details.</p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-6 rounded-xl bg-green-500/10 p-4 text-sm text-green-600 border border-green-500/20 dark:text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="mt-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Primary Email (Unchangeable)</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-muted)] opacity-70 cursor-not-allowed"
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
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Gender</label>
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
          </div>

          {/* Additional Emails Section */}
          <div className="rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-6">
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Additional Emails</h3>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Add secondary contact emails to your profile.</p>
            
            <div className="mt-4 flex gap-3">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="secondary@example.com"
                className="flex-1 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
              />
              <button
                type="button"
                onClick={handleAddEmail}
                className="flex items-center justify-center rounded-xl bg-[var(--color-surface-strong)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-overlay-soft)] border border-[var(--color-border-strong)]"
              >
                <Plus size={18} className="mr-1" /> Add
              </button>
            </div>

            {additionalEmails.length > 0 && (
              <ul className="mt-4 space-y-2">
                {additionalEmails.map((email) => (
                  <li key={email} className="flex items-center justify-between rounded-lg bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-ink)] border border-[var(--color-border-soft)]">
                    <span className="truncate">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="text-[var(--color-muted)] hover:text-red-500 transition-colors p-1"
                      aria-label="Remove email"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--color-ink)] px-4 py-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-ink-soft)] disabled:opacity-70 mt-6"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
