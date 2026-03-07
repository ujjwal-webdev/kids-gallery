import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Kid's Gallery 🎨</Text>
        <Text style={styles.heroSubtitle}>Stationery, Gifts & More</Text>
      </View>
      {/* TODO: HeroBanner, CategoryGrid, FeaturedProducts */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  hero: { backgroundColor: '#ec4899', padding: 32, alignItems: 'center' },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: '#fce7f3' },
});
