'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/api';

interface ReviewUser {
  id: string;
  name: string;
  avatar?: string;
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  title?: string;
  comment?: string;
  images: string[];
  isVerified: boolean;
  createdAt: string;
  user: ReviewUser;
}

interface ReviewSectionProps {
  productId: string;
  initialAvgRating: number;
  initialReviewCount: number;
}

export function ReviewSection({ productId, initialAvgRating, initialReviewCount }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(initialReviewCount);
  const [hasMore, setHasMore] = useState(false);

  const avgRating = initialAvgRating;

  const fetchReviews = useCallback(async (pageNum: number, sort: string, append = false) => {
    try {
      setLoading(true);
      const sortParam = sort === 'highest' ? 'rating_desc' : sort === 'lowest' ? 'rating_asc' : undefined;
      const params: Record<string, string | number> = { page: pageNum, limit: 5 };
      if (sortParam) params.sortBy = sortParam;

      const res = await apiClient.get(`/reviews/product/${productId}`, { params });
      const data = res.data?.data || [];
      const totalCount = res.data?.pagination?.total || 0;

      if (append) {
        setReviews((prev) => [...prev, ...data]);
      } else {
        setReviews(data);
      }
      setTotal(totalCount);
      setPage(pageNum);
      setHasMore(pageNum * 5 < totalCount);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews(1, sortBy);
  }, [fetchReviews, sortBy]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    // fetchReviews is triggered by the useEffect above
  };

  // Star distribution (estimate from avgRating & total if we don't have individual counts)
  const StarBar = ({ star, pct }: { star: number; pct: number }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-8 text-right font-medium text-secondary">{star}★</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right text-xs text-secondary">{Math.round(pct)}%</span>
    </div>
  );

  // Estimate distribution from reviews we have
  const starCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => { if (r.rating >= 1 && r.rating <= 5) starCounts[r.rating - 1]++; });
  const reviewCountForDist = reviews.length || 1;

  return (
    <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-8 md:p-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Customer Reviews</h2>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Rating Summary */}
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="text-center sm:text-left">
          <div className="text-6xl font-black text-on-surface">{avgRating > 0 ? avgRating.toFixed(1) : '—'}</div>
          <div className="flex items-center gap-0.5 justify-center sm:justify-start mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`material-symbols-outlined text-[20px] ${i <= Math.round(avgRating) ? 'text-amber-400' : 'text-gray-200'}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >star</span>
            ))}
          </div>
          <p className="text-sm text-secondary mt-1">{total} review{total !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex-1 space-y-1.5 w-full sm:max-w-xs">
          {[5, 4, 3, 2, 1].map((star) => (
            <StarBar key={star} star={star} pct={total > 0 ? (starCounts[star - 1] / reviewCountForDist) * 100 : 0} />
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 && !loading ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-[48px] text-gray-300 block mb-3">rate_review</span>
          <p className="text-secondary font-medium">No reviews yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {review.user.name ? review.user.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface text-sm">{review.user.name || 'Customer'}</p>
                    <p className="text-xs text-secondary">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`material-symbols-outlined text-[18px] ${i <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >star</span>
                ))}
              </div>

              {review.title && (
                <h4 className="font-bold text-on-surface mt-3">{review.title}</h4>
              )}
              {review.comment && (
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => fetchReviews(page + 1, sortBy, true)}
              disabled={loading}
              className="w-full py-3 text-primary font-bold border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More Reviews'}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
