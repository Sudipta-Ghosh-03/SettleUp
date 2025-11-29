import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform, ToastAndroid, Alert } from 'react-native';
import { useAuthStore, UserInfo } from '@/src/state/authStore';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

export const useGoogleAuth = () => {
  const { signIn } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    scopes: ['openid', 'profile', 'email'],
    selectAccount: true,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      }
    } else if (response?.type === 'error') {
      setErrorMessage(response.error?.message ?? 'Authentication failed');
    } else if (response?.type === 'dismiss') {
      // Optional: handle dismiss specifically if needed, 
      // but usually we just reset or do nothing.
      // setErrorMessage('Sign-in was cancelled'); 
    }
  }, [response]);

  const fetchUserInfo = async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
          throw new Error('Failed to fetch user info');
      }

      const user: UserInfo = await res.json();
      signIn(user);
      
      const message = `Signed in as ${user.name}`;
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert('Signed in', message);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setErrorMessage('Unable to load your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    await promptAsync();
  };

  return {
    handleGoogleLogin,
    loading,
    errorMessage,
    request,
  };
};
