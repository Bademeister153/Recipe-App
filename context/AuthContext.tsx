import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, updateProfile, updatePassword } from 'firebase/auth';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konstanten für AsyncStorage-Schlüssel
const AUTH_USER_KEY = '@recipe_app_auth_user';
const USER_PROFILE_KEY = '@recipe_app_user_profile';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  updateUserProfile: (profileData: ProfileUpdateData) => Promise<{ success: boolean; error?: string }>;
}

interface StoredUserData {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

interface ProfileUpdateData {
  displayName?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any; // Erlaubt zusätzliche Felder
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // AsyncStorage-Funktionen
  const storeUserData = async (userData: StoredUserData | null) => {
    try {
      if (userData) {
        await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
        console.log('Benutzerdaten in AsyncStorage gespeichert');
      } else {
        await AsyncStorage.removeItem(AUTH_USER_KEY);
        console.log('Benutzerdaten aus AsyncStorage entfernt');
      }
    } catch (e) {
      console.error('Fehler beim Speichern/Entfernen von Benutzerdaten:', e);
    }
  };

  const loadUserData = async (): Promise<StoredUserData | null> => {
    try {
      const userDataString = await AsyncStorage.getItem(AUTH_USER_KEY);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log('Benutzerdaten aus AsyncStorage geladen');
        return userData;
      }
    } catch (e) {
      console.error('Fehler beim Laden von Benutzerdaten:', e);
    }
    return null;
  };

  // Lädt den Benutzer beim Start der App
  useEffect(() => {
    let unsubscribe: () => void;
    
    const setupAuth = async () => {
      try {
        // Zuerst Daten aus AsyncStorage laden
        const storedUserData = await loadUserData();
        
        // Firebase Auth-Änderungen überwachen
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          console.log('Auth-Status geändert:', firebaseUser ? 'Angemeldet' : 'Abgemeldet');
          
          if (firebaseUser) {
            // Benutzer ist angemeldet
            setUser(firebaseUser);
            
            // Daten im AsyncStorage speichern
            await storeUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            });
          } else {
            // Wenn kein Firebase-Benutzer, aber gespeicherte Daten
            if (storedUserData && !user) {
              console.log('Anmeldedaten gefunden, versuche automatische Anmeldung...');
              
              try {
                // Wenn wir die gespeicherten Daten haben, versuche den Benutzer darüber anzumelden
                // Dies ist ein workaround, da wir hier die UID haben, aber keine Anmeldedaten
                setIsLoading(true);
                
                // Erstelle ein temporäres Benutzer-Objekt für die UI
                const tempUser = {
                  uid: storedUserData.uid,
                  email: storedUserData.email,
                  displayName: storedUserData.displayName,
                  emailVerified: false,
                  isAnonymous: false,
                  metadata: {},
                  providerData: [],
                  refreshToken: '',
                  tenantId: null,
                  phoneNumber: null,
                  photoURL: null,
                  providerId: 'firebase',
                  delete: async () => {},
                  getIdToken: async () => '',
                  getIdTokenResult: async () => ({ token: '', claims: {}, expirationTime: '', authTime: '', issuedAtTime: '', signInProvider: null, signInSecondFactor: null }),
                  reload: async () => {},
                  toJSON: () => ({ uid: storedUserData.uid })
                } as unknown as User;
                
                // Setze den Benutzer mit den Daten aus dem Speicher
                console.log('Verwende temporären Benutzer aus gespeicherten Daten');
                setUser(tempUser);
              } catch (error) {
                console.error('Fehler bei der automatischen Anmeldung:', error);
                setUser(null);
                await storeUserData(null);
              } finally {
                setIsLoading(false);
              }
            } else {
              // Keine gespeicherten Daten oder bereits abgemeldet
              setUser(null);
              await storeUserData(null);
            }
          }
          
          // Lade-Status beenden
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Fehler beim Einrichten der Auth:', error);
        setIsLoading(false);
      }
    };

    setupAuth();
    
    // Cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Benutzer erfolgreich angemeldet:', userCredential.user.email);
    } catch (e: any) {
      setError(e.message || 'Ein Fehler ist bei der Anmeldung aufgetreten');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Benutzer erfolgreich registriert:', userCredential.user.email);
      if (firstName && lastName) {
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
      }
    } catch (e: any) {
      setError(e.message || 'Ein Fehler ist bei der Registrierung aufgetreten');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      await storeUserData(null);
      // Auch das benutzerdefinierte Profil löschen
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      console.log('Benutzer erfolgreich abgemeldet');
    } catch (e: any) {
      setError(e.message || 'Ein Fehler ist bei der Abmeldung aufgetreten');
      throw e;
    }
  };

  // Funktion zum Aktualisieren des Benutzerprofils
  const updateUserProfile = async (profileData: ProfileUpdateData) => {
    try {
      // Verify the user is logged in
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Name in seine Bestandteile zerlegen, wenn vorhanden
      let firstName = '';
      let lastName = '';
      
      if (profileData.displayName) {
        const nameParts = profileData.displayName.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
        
        // Aktualisiere auch die Firebase-Daten
        if (auth.currentUser) {
          try {
            await updateProfile(auth.currentUser, {
              displayName: profileData.displayName
            });
            console.log('Firebase-Profil aktualisiert');
          } catch (e) {
            console.warn('Firebase-Profil konnte nicht aktualisiert werden:', e);
          }
        }
      }
      
      // Vor- und Nachname erhalten, wenn in den profileData explizit übergeben
      if (profileData.firstName) {
        firstName = profileData.firstName;
      }
      
      if (profileData.lastName) {
        lastName = profileData.lastName;
      }
      
      // Speichere alle Daten in AsyncStorage
      try {
        const storedProfileData = await AsyncStorage.getItem(USER_PROFILE_KEY);
        let existingData = {};
        
        if (storedProfileData) {
          existingData = JSON.parse(storedProfileData);
        }
        
        // Zusammenführen der Daten
        const updatedData = {
          ...existingData,
          ...profileData,
          firstName,
          lastName,
          uid: user.uid,
          email: user.email
        };
        
        await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedData));
        
        // User-Objekt bleibt unverändert
        return { success: true };
      } catch (error) {
        console.error('Fehler beim Speichern der Profildaten:', error);
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unbekannter Fehler'
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      error,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth muss innerhalb eines AuthProviders verwendet werden');
  }
  return context;
} 