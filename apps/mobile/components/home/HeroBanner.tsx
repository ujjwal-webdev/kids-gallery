import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export function HeroBanner() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kid's Gallery 🎨</Text>
      <Text style={styles.subtitle}>Stationery, Gifts & More</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/products/index' as any)}>
        <Text style={styles.btnText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#ec4899', padding: 32, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#fce7f3', marginBottom: 20 },
  btn: { backgroundColor: '#fff', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  btnText: { color: '#ec4899', fontWeight: 'bold', fontSize: 16 },
});
