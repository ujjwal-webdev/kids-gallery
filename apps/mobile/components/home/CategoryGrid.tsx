import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const cats = [
  { name: 'Stationery', emoji: '✏️' },
  { name: 'Kids Gifts', emoji: '🎁' },
  { name: 'Party', emoji: '🎉' },
  { name: 'Art & Craft', emoji: '🖌️' },
];

export function CategoryGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <FlatList
        data={cats}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(c) => c.name}
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
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  card: { width: 80, alignItems: 'center', marginRight: 12, padding: 12, backgroundColor: '#fdf2f8', borderRadius: 12 },
  emoji: { fontSize: 28, marginBottom: 6 },
  name: { fontSize: 11, fontWeight: '600', textAlign: 'center', color: '#374151' },
});
