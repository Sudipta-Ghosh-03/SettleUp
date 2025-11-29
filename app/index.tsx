import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/src/state/authStore';
import { useGoogleAuth } from '@/src/hooks/useGoogleAuth';

export default function Index() {
  const user = useAuthStore((state) => state.user);
  const { handleGoogleLogin, loading, errorMessage, request } = useGoogleAuth();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  if (user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.redirectText}>Bringing you to your dashboard…</Text>
      </View>
    );
  }

  if (loading) {
     return (
       <View style={styles.container}>
         <ActivityIndicator size="large" color="#e94560" />
       </View>
     );
   }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>⚡</Text>
        <Text style={styles.title}>SettleUp</Text>
        <Text style={styles.subtitle}>Split expenses with friends</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.googleButton, (!request || loading) && styles.buttonDisabled]}
          onPress={handleGoogleLogin}
          disabled={!request || loading}
        >
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Text style={styles.footer}>
        By continuing, you agree to our Terms of Service
      </Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#eaeaea',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b8b9e',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  googleIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: '#5a5a6e',
    textAlign: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 16,
    textAlign: 'center',
  },
  redirectText: {
    marginTop: 16,
    color: '#eaeaea',
  },
});
