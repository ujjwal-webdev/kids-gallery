import { ActivityIndicator, View } from 'react-native';

export function Spinner({ size = 'large' }: { size?: 'small' | 'large' }) {
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={size} color="#ec4899" /></View>;
}
