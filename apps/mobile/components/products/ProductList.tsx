import { FlatList } from 'react-native';
import { ProductCard } from './ProductCard';
import { Spinner } from '../ui/Spinner';

type Product = { id: string; name: string; slug: string; sellingPrice: number; mrp: number; images: { url: string }[] };

interface ProductListProps { products: Product[]; isLoading?: boolean; }

export function ProductList({ products, isLoading }: ProductListProps) {
  if (isLoading) return <Spinner />;
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(p) => p.id}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
}
