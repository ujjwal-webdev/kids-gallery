'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';

interface AddressData {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  type: string;
  isDefault: boolean;
}

interface ProfileData {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  avatar: string | null;
  addresses: AddressData[];
}

const EMPTY_ADDRESS = {
  name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pinCode: '', type: 'HOME',
};

export function ProfilePageContent() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const storeUser = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Profile editing
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Address editing
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [savingAddress, setSavingAddress] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);

  // Auth guard — wait for Zustand to rehydrate before deciding
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/auth/login?redirect=/profile');
    }
  }, [hasHydrated, isAuthenticated, router]);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/users/profile');
      setProfile(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) fetchProfile();
  }, [hasHydrated, isAuthenticated, fetchProfile]);

  /* === Profile Actions === */
  const startEditProfile = () => {
    setProfileForm({
      name: profile?.name || '',
      email: profile?.email || '',
    });
    setEditingProfile(true);
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      const res = await apiClient.put('/users/profile', {
        name: profileForm.name || undefined,
        email: profileForm.email || undefined,
      });
      setProfile((prev) => prev ? { ...prev, name: res.data.data.name, email: res.data.data.email } : prev);
      // Update store user
      if (storeUser) {
        setAuth({ ...storeUser, name: res.data.data.name, email: res.data.data.email }, useAuthStore.getState().token!);
      }
      setEditingProfile(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  /* === Address Actions === */
  const startEditAddress = (addr: AddressData) => {
    setAddingAddress(false);
    setEditingAddressId(addr.id);
    setAddressForm({
      name: addr.name,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '',
      city: addr.city,
      state: addr.state,
      pinCode: addr.pinCode,
      type: addr.type,
    });
  };

  const startAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm(EMPTY_ADDRESS);
    setAddingAddress(true);
  };

  const cancelAddressEdit = () => {
    setEditingAddressId(null);
    setAddingAddress(false);
  };

  const saveAddress = async () => {
    setSavingAddress(true);
    try {
      if (editingAddressId) {
        await apiClient.put(`/users/addresses/${editingAddressId}`, addressForm);
      } else {
        await apiClient.post('/users/addresses', addressForm);
      }
      await fetchProfile();
      cancelAddressEdit();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save address');
    } finally {
      setSavingAddress(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!confirm('Delete this address?')) return;
    setDeletingAddressId(id);
    try {
      await apiClient.delete(`/users/addresses/${id}`);
      await fetchProfile();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete address');
    } finally {
      setDeletingAddressId(null);
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      await apiClient.patch(`/users/addresses/${id}/default`);
      await fetchProfile();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to set default');
    }
  };

  if (!hasHydrated || !isAuthenticated) return <div className="min-h-screen bg-[#fff9eb]" />;

  if (loading) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-8">My Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-8">My Profile</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-red-400 text-[48px] mb-4 block">error</span>
          <p className="text-red-700 font-medium mb-4">{error || 'Profile not found'}</p>
          <button onClick={fetchProfile} className="text-primary font-bold hover:underline">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface">My Profile</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 font-semibold text-sm hover:text-red-600 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              Personal Info
            </h2>
            {!editingProfile && (
              <button onClick={startEditProfile} className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Edit
              </button>
            )}
          </div>

          {editingProfile ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest"
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={saveProfile}
                  disabled={savingProfile}
                  className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-50 flex items-center gap-1"
                >
                  {savingProfile ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditingProfile(false)}
                  className="text-secondary font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <InfoRow icon="badge" label="Name" value={profile.name || '—'} />
              <InfoRow icon="phone" label="Phone" value={profile.phone} />
              <InfoRow icon="email" label="Email" value={profile.email || '—'} />
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-bold text-lg text-on-surface mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">grid_view</span>
            Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickLink icon="shopping_bag" label="My Orders" href="/orders" />
            <QuickLink icon="favorite" label="Wishlist" href="/wishlist" />
            <QuickLink icon="shopping_cart" label="Cart" href="/cart" />
            <QuickLink icon="storefront" label="Shop" href="/products" />
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="mt-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Saved Addresses
            </h2>
            {!addingAddress && !editingAddressId && (
              <button onClick={startAddAddress} className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">add</span>
                Add New
              </button>
            )}
          </div>

          {/* Add / Edit address form */}
          {(addingAddress || editingAddressId) && (
            <div className="bg-surface-container rounded-2xl p-5 mb-5 border border-gray-100">
              <h3 className="font-bold text-sm text-on-surface mb-4">
                {editingAddressId ? 'Edit Address' : 'New Address'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AddrInput label="Name" value={addressForm.name} onChange={(v) => setAddressForm((p) => ({ ...p, name: v }))} />
                <AddrInput label="Phone" value={addressForm.phone} onChange={(v) => setAddressForm((p) => ({ ...p, phone: v }))} />
                <div className="sm:col-span-2">
                  <AddrInput label="Address Line 1" value={addressForm.addressLine1} onChange={(v) => setAddressForm((p) => ({ ...p, addressLine1: v }))} />
                </div>
                <div className="sm:col-span-2">
                  <AddrInput label="Address Line 2 (Optional)" value={addressForm.addressLine2} onChange={(v) => setAddressForm((p) => ({ ...p, addressLine2: v }))} />
                </div>
                <AddrInput label="City" value={addressForm.city} onChange={(v) => setAddressForm((p) => ({ ...p, city: v }))} />
                <AddrInput label="State" value={addressForm.state} onChange={(v) => setAddressForm((p) => ({ ...p, state: v }))} />
                <AddrInput label="PIN Code" value={addressForm.pinCode} onChange={(v) => setAddressForm((p) => ({ ...p, pinCode: v }))} />
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Type</label>
                  <select
                    value={addressForm.type}
                    onChange={(e) => setAddressForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-primary bg-white"
                  >
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={saveAddress}
                  disabled={savingAddress}
                  className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-50"
                >
                  {savingAddress ? 'Saving...' : 'Save Address'}
                </button>
                <button
                  onClick={cancelAddressEdit}
                  className="text-secondary font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Address list */}
          {profile.addresses.length === 0 && !addingAddress ? (
            <p className="text-secondary text-sm text-center py-6">No saved addresses yet.</p>
          ) : (
            <div className="space-y-3">
              {profile.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`rounded-xl border p-4 relative transition-all ${
                    addr.isDefault ? 'border-primary/40 bg-primary/[0.03]' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-on-surface">{addr.name}</span>
                        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold">
                          {addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{addr.addressLine1}</p>
                      {addr.addressLine2 && <p className="text-sm text-gray-600">{addr.addressLine2}</p>}
                      <p className="text-sm text-gray-600">{addr.city}, {addr.state} — {addr.pinCode}</p>
                      <p className="text-xs text-secondary mt-1">📞 {addr.phone}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => startEditAddress(addr)}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      Edit
                    </button>
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs font-semibold text-gray-500 hover:text-primary hover:underline flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      disabled={deletingAddressId === addr.id}
                      className="text-xs font-semibold text-red-400 hover:text-red-600 hover:underline flex items-center gap-0.5 ml-auto disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                      {deletingAddressId === addr.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* === Helper Components === */

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-surface-container rounded-lg flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
      </div>
      <div>
        <p className="text-xs text-secondary">{label}</p>
        <p className="text-sm font-semibold text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function QuickLink({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group"
    >
      <div className="w-9 h-9 bg-surface-container-high rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
      </div>
      <span className="text-sm font-semibold text-on-surface">{label}</span>
    </Link>
  );
}

function AddrInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-on-surface mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
        placeholder={label}
      />
    </div>
  );
}
