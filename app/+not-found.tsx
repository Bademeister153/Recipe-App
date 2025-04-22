import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!', headerShown: true }} />
      
      <View style={styles.content}>
        <MaterialIcons name="error-outline" size={80} color="#e74c3c" style={styles.icon} />
        
        <ThemedText style={styles.title}>This screen doesn't exist.</ThemedText>
        
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <ThemedText style={styles.homeButtonText}>Go to home screen!</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    marginTop: 20,
    padding: 15,
  },
  homeButtonText: {
    fontSize: 18,
    color: '#2089dc',
    textDecorationLine: 'underline',
  }
});
