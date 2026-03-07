import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const categories = [
  { name: 'Stationery', slug: 'stationery', emoji: '✏️' },
  { name: 'Kids Gifts', slug: 'gift-items-kids', emoji: '🎁' },
  { name: 'Party Supplies', slug: 'party-supplies', emoji: '🎉' },
  { name: 'Art & Craft', slug: 'art-craft', emoji: '🖌️' },
  { name: 'School', slug: 'school-essentials', emoji: '🎒' },
  { name: 'Gifts', slug: 'occasion-gifts', emoji: '🎊' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { flex: 1, margin: 6, padding: 20, backgroundColor: '#fdf2f8', borderRadius: 12, alignItems: 'center' },
  emoji: { fontSize: 32, marginBottom: 8 },
  name: { fontSize: 13, fontWeight: '600', textAlign: 'center', color: '#374151' },
});
