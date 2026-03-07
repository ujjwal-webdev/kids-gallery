import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface ProductCardProps {
  product: { id: string; name: string; slug: string; sellingPrice: number; mrp: number; images: { url: string }[] };
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const discount = Math.round((1 - product.sellingPrice / product.mrp) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/products/${product.slug}` as any)}>
      <View style={styles.imageContainer}>
        <Text style={styles.placeholder}>🎁</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>₹{product.sellingPrice}</Text>
        {discount > 0 && <Text style={styles.discount}>{discount}% off</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#f3f4f6' },
  imageContainer: { height: 120, backgroundColor: '#fdf2f8', alignItems: 'center', justifyContent: 'center' },
  placeholder: { fontSize: 40 },
  info: { padding: 10 },
  name: { fontSize: 13, fontWeight: '500', color: '#111827', marginBottom: 4 },
  price: { fontSize: 15, fontWeight: 'bold', color: '#111827' },
  discount: { fontSize: 11, color: '#ec4899', marginTop: 2 },
});
