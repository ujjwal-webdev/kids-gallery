import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', isLoading, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, variant === 'primary' ? styles.primary : styles.secondary, (disabled || isLoading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 12, padding: 14, alignItems: 'center' },
  primary: { backgroundColor: '#ec4899' },
  secondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' },
  disabled: { opacity: 0.5 },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondaryText: { color: '#374151' },
});
