'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { Product } from '@kids-gallery/shared';

export function useProducts(query?: Record<string, string>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get('/products', { params: query })
      .then((res) => {
        setProducts(res.data.data || []);
        setTotal(res.data.pagination?.total || 0);
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(query)]);

  return { products, total, isLoading, error };
}
