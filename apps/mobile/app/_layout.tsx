import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ title: "Products" }} />
        <Stack.Screen name="orders" options={{ title: "Orders" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
        <Stack.Screen name="wishlist" options={{ title: "Wishlist" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
