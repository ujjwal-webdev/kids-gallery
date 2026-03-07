import { View, Text, StyleSheet } from 'react-native';
import { ProductList } from '../products/ProductList';

export function FeaturedProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Products</Text>
      <ProductList products={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
});
