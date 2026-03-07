import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CartItemProps {
  item: { productId: string; name: string; price: number; quantity: number };
  onRemove: (id: string) => void;
}

export function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}><Text style={{ fontSize: 28 }}>🎁</Text></View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price} × {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.productId)}><Text style={styles.remove}>✕</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#f3f4f6' },
  placeholder: { width: 56, height: 56, backgroundColor: '#fdf2f8', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '500', color: '#111827' },
  price: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  remove: { color: '#9ca3af', fontSize: 16, padding: 8 },
});
