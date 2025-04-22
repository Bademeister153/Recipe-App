import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const { user, isLoading } = useAuth();

  // Diesen useEffect immer aufrufen, unabhängig davon, ob isLoading true oder false ist
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Auth-Status beim App-Start:', { isLoading, isAuthenticated: !!user });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [user, isLoading]);

  // Während der Auth-Status geladen wird, zeige einen Lade-Indikator an
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7BAA87" />
        <ThemedText style={styles.loadingText}>Wird geladen...</ThemedText>
      </View>
    );
  }

  // Wenn ein Benutzer angemeldet ist, leite zu Tabs weiter, sonst zum Login
  if (user) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href={"/login" as any} />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16
  }
}); 