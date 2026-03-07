import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text style={styles.empty}>Your cart is empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  empty: { color: '#9ca3af', textAlign: 'center', marginTop: 48 },
});
