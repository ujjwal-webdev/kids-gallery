import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#ec4899' }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: () => null }} />
      <Tabs.Screen name="categories" options={{ title: 'Categories', tabBarIcon: () => null }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarIcon: () => null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: () => null }} />
    </Tabs>
  );
}
