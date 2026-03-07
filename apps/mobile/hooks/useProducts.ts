import { useState, useEffect } from 'react';
import apiClient from '../lib/api';

export function useProducts(query?: Record<string, string>) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/products', { params: query })
      .then((res) => setProducts(res.data.data || []))
      .catch(() => setError('Failed to load'))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(query)]);

  return { products, isLoading, error };
}
