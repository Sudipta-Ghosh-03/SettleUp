import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/src/state/authStore';

export default function Dashboard() {
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    const message = 'Signed out';
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
    // Navigation is handled by the effect, but explicit replacement helps with UX speed
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <View style={styles.card}>
        <Image source={{ uri: user.picture }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 32,
    color: '#eaeaea',
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#e94560',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#eaeaea',
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: '#8b8b9e',
    marginBottom: 24,
  },
  signOutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e94560',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  signOutText: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: '600',
  },
});
