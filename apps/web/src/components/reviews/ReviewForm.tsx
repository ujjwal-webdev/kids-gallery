'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import Link from 'next/link';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!hasHydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-8 text-center">
        <span className="material-symbols-outlined text-[48px] text-gray-300 block mb-3">login</span>
        <p className="text-secondary font-medium mb-4">Sign in to leave a review</p>
        <Link
          href={`/auth/login?redirect=/products`}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
        <span className="material-symbols-outlined text-[48px] text-green-500 block mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        <p className="font-bold text-green-700 text-lg">Thank you for your review!</p>
        <p className="text-green-600 text-sm mt-1">Your feedback helps other parents make great choices.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await apiClient.post(`/reviews/product/${productId}`, {
        rating,
        title: title.trim() || undefined,
        comment: comment.trim() || undefined,
      });
      setSuccess(true);
      onReviewSubmitted?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-8 md:p-12">
      <h3 className="text-2xl font-extrabold text-on-surface mb-6">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star Rating Selector */}
        <div>
          <label className="text-sm font-bold text-secondary uppercase tracking-wider block mb-2">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-125 active:scale-95"
              >
                <span
                  className={`material-symbols-outlined text-[36px] ${
                    star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-200'
                  } transition-colors`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >star</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title (optional) */}
        <div>
          <label className="text-sm font-bold text-secondary uppercase tracking-wider block mb-2">Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience..."
            maxLength={100}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="text-sm font-bold text-secondary uppercase tracking-wider block mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you liked or didn't like..."
            rows={4}
            maxLength={1000}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || rating === 0}
          className="bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
        >
          {submitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              Submitting...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">send</span>
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
