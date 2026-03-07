import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{slug}</Text>
      {/* TODO: Product detail */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
