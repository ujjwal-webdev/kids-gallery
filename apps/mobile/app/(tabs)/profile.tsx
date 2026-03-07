import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.loginBtnText}>Login / Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  loginBtn: { backgroundColor: '#ec4899', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
