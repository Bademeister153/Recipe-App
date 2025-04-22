import { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Platform, Alert, Switch, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konfiguriere, wie die Benachrichtigungen erscheinen sollen
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface ReminderItem {
  id: string;
  title: string;
  message: string;
  date: Date;
  enabled: boolean;
}

export default function RemindersScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderItem | null>(null);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  
  useEffect(() => {
    // Lade gespeicherte Erinnerungen
    loadReminders();
    
    // Registriere Benachrichtigungskanäle für Android
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    // Frage Benachrichtigungsberechtigungen ab
    requestPermissions();
    
    // Höre auf ankommende Benachrichtigungen
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Benachrichtigung erhalten:', notification);
    });
    
    // Höre auf Interaktionen mit Benachrichtigungen
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Benachrichtigungsinteraktion:', response);
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);
  
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    const granted = status === 'granted';
    setPermissionGranted(granted);
    
    if (!granted) {
      Alert.alert(
        'Berechtigung erforderlich',
        'Um Erinnerungen zu erhalten, benötigt die App die Berechtigung, Benachrichtigungen zu senden.',
        [{ text: 'OK' }]
      );
    }
    
    return granted;
  };
  
  const loadReminders = async () => {
    try {
      const savedReminders = await AsyncStorage.getItem('@recipe_app_reminders');
      if (savedReminders) {
        const parsedReminders = JSON.parse(savedReminders);
        // Konvertiere String-Datumsangaben zurück in Date-Objekte
        const remindersWithDates = parsedReminders.map((reminder: any) => ({
          ...reminder,
          date: new Date(reminder.date)
        }));
        setReminders(remindersWithDates);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Erinnerungen:', error);
    }
  };
  
  const saveReminders = async (updatedReminders: ReminderItem[]) => {
    try {
      await AsyncStorage.setItem('@recipe_app_reminders', JSON.stringify(updatedReminders));
    } catch (error) {
      console.error('Fehler beim Speichern der Erinnerungen:', error);
    }
  };
  
  const scheduleNotification = async (reminder: ReminderItem) => {
    if (!permissionGranted) {
      const granted = await requestPermissions();
      if (!granted) return;
    }
    
    // Lösche zuerst die vorhandene Benachrichtigung für diese Erinnerung
    await Notifications.cancelScheduledNotificationAsync(reminder.id);
    
    // Wenn die Erinnerung deaktiviert ist, beenden wir hier
    if (!reminder.enabled) return;
    
    // Plane eine neue Benachrichtigung
    await Notifications.scheduleNotificationAsync({
      identifier: reminder.id,
      content: {
        title: reminder.title,
        body: reminder.message,
        sound: true,
        data: { reminderData: reminder },
      },
      trigger: reminder.date,
    });
    
    console.log(`Benachrichtigung geplant für ${reminder.date.toLocaleString()}: ${reminder.title}`);
  };
  
  const handleToggleReminder = async (id: string, newEnabledState: boolean) => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === id) {
        const updatedReminder = { ...reminder, enabled: newEnabledState };
        scheduleNotification(updatedReminder);
        return updatedReminder;
      }
      return reminder;
    });
    
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  };
  
  const handleSaveReminder = async () => {
    if (!reminderTitle.trim()) {
      Alert.alert('Fehler', 'Bitte gib einen Titel für die Erinnerung ein.');
      return;
    }
    
    // Prüfe, ob das Datum in der Vergangenheit liegt
    if (reminderDate.getTime() < Date.now()) {
      Alert.alert('Fehler', 'Das Datum muss in der Zukunft liegen.');
      return;
    }
    
    let newReminderId = '';
    let updatedReminders: ReminderItem[] = [];
    
    if (editingReminder) {
      // Bearbeiten einer vorhandenen Erinnerung
      newReminderId = editingReminder.id;
      updatedReminders = reminders.map(reminder => {
        if (reminder.id === editingReminder.id) {
          return {
            ...reminder,
            title: reminderTitle,
            message: reminderMessage,
            date: reminderDate,
          };
        }
        return reminder;
      });
    } else {
      // Erstellen einer neuen Erinnerung
      newReminderId = Date.now().toString();
      const newReminder: ReminderItem = {
        id: newReminderId,
        title: reminderTitle,
        message: reminderMessage,
        date: reminderDate,
        enabled: true,
      };
      updatedReminders = [...reminders, newReminder];
    }
    
    setReminders(updatedReminders);
    await saveReminders(updatedReminders);
    
    // Plane die Benachrichtigung für diese Erinnerung
    const reminder = updatedReminders.find(r => r.id === newReminderId);
    if (reminder) {
      await scheduleNotification(reminder);
    }
    
    // Zurücksetzen des Forms
    resetForm();
  };
  
  const resetForm = () => {
    setReminderTitle('');
    setReminderMessage('');
    setReminderDate(new Date());
    setShowDatePicker(false);
    setEditingReminder(null);
    setModalVisible(false);
  };
  
  const handleEdit = (reminder: ReminderItem) => {
    setEditingReminder(reminder);
    setReminderTitle(reminder.title);
    setReminderMessage(reminder.message);
    setReminderDate(reminder.date);
    setModalVisible(true);
  };
  
  const handleDelete = async (id: string) => {
    Alert.alert(
      'Erinnerung löschen',
      'Möchtest du diese Erinnerung wirklich löschen?',
      [
        { 
          text: 'Abbrechen', 
          style: 'cancel' 
        },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            // Lösche die geplante Benachrichtigung
            await Notifications.cancelScheduledNotificationAsync(id);
            
            // Entferne die Erinnerung aus dem Zustand
            const updatedReminders = reminders.filter(reminder => reminder.id !== id);
            setReminders(updatedReminders);
            saveReminders(updatedReminders);
          }
        }
      ]
    );
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || reminderDate;
    setShowDatePicker(Platform.OS === 'ios');
    setReminderDate(currentDate);
  };

  // Füge eine Stunde zum aktuellen Datum hinzu
  const addHourToDate = () => {
    const newDate = new Date(reminderDate);
    newDate.setHours(newDate.getHours() + 1);
    setReminderDate(newDate);
  };

  // Füge einen Tag zum aktuellen Datum hinzu
  const addDayToDate = () => {
    const newDate = new Date(reminderDate);
    newDate.setDate(newDate.getDate() + 1);
    setReminderDate(newDate);
  };

  // Manuelle Zeit-Einstellung
  const setTime = (hours: number, minutes: number) => {
    const newDate = new Date(reminderDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setReminderDate(newDate);
    setShowDatePicker(false);
  };
  
  const handleBack = () => {
    router.back();
  };
  
  // Test-Funktion für sofortige Benachrichtigung
  const sendTestNotification = async () => {
    if (!permissionGranted) {
      const granted = await requestPermissions();
      if (!granted) return;
    }
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test-Benachrichtigung',
        body: 'Dies ist eine Test-Erinnerung von Recipe Buddy!',
        sound: true,
      },
      trigger: null, // Sofort senden
    });
    
    Alert.alert('Test gesendet', 'Die Test-Benachrichtigung wurde gesendet!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Erinnerungen</ThemedText>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="black" />
        </TouchableOpacity>
      </ThemedView>
      
      <ScrollView style={styles.content}>
        {/* Test-Button für Benachrichtigungen */}
        <TouchableOpacity 
          style={styles.testButton}
          onPress={sendTestNotification}
        >
          <MaterialIcons name="notifications" size={20} color="white" />
          <ThemedText style={styles.testButtonText}>Test-Benachrichtigung senden</ThemedText>
        </TouchableOpacity>
        
        {/* Liste aller Erinnerungen */}
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <View key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderHeader}>
                <ThemedText style={styles.reminderTitle}>{reminder.title}</ThemedText>
                <Switch
                  trackColor={{ false: '#767577', true: '#7BAA87' }}
                  thumbColor={reminder.enabled ? '#f5dd4b' : '#f4f3f4'}
                  onValueChange={(newValue) => handleToggleReminder(reminder.id, newValue)}
                  value={reminder.enabled}
                />
              </View>
              
              {reminder.message ? (
                <ThemedText style={styles.reminderMessage}>{reminder.message}</ThemedText>
              ) : null}
              
              <View style={styles.reminderFooter}>
                <View style={styles.dateContainer}>
                  <MaterialIcons name="event" size={16} color="#666" />
                  <ThemedText style={styles.dateText}>
                    {reminder.date.toLocaleDateString()} {reminder.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </ThemedText>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => handleEdit(reminder)} style={styles.actionButton}>
                    <MaterialIcons name="edit" size={20} color="#555" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(reminder.id)} style={styles.actionButton}>
                    <MaterialIcons name="delete" size={20} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="notifications-none" size={64} color="#c3d4a5" />
            <ThemedText style={styles.emptyText}>
              Keine Erinnerungen vorhanden
            </ThemedText>
            <ThemedText style={styles.emptySubText}>
              Tippe auf + um deine erste Erinnerung zu erstellen
            </ThemedText>
          </View>
        )}
      </ScrollView>
      
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                {editingReminder ? 'Erinnerung bearbeiten' : 'Neue Erinnerung'}
              </ThemedText>
              <TouchableOpacity onPress={resetForm} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Titel</ThemedText>
              <TextInput
                style={styles.input}
                value={reminderTitle}
                onChangeText={setReminderTitle}
                placeholder="Titel der Erinnerung"
              />
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Nachricht (optional)</ThemedText>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={reminderMessage}
                onChangeText={setReminderMessage}
                placeholder="Zusätzliche Informationen"
                multiline
              />
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Datum & Uhrzeit</ThemedText>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialIcons name="event" size={20} color="#666" />
                <ThemedText style={styles.dateInputText}>
                  {reminderDate.toLocaleDateString()} {reminderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </ThemedText>
              </TouchableOpacity>
              
              {showDatePicker && (
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showDatePicker}
                  onRequestClose={() => {
                    setShowDatePicker(false);
                  }}
                >
                  <View style={styles.datePickerOverlay}>
                    <View style={styles.datePickerContent}>
                      <View style={styles.modalHeader}>
                        <ThemedText style={styles.modalTitle}>Datum & Uhrzeit wählen</ThemedText>
                        <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.closeButton}>
                          <MaterialIcons name="close" size={24} color="#555" />
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.currentDateContainer}>
                        <ThemedText style={styles.currentDateText}>
                          {reminderDate.toLocaleDateString()} {reminderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </ThemedText>
                      </View>
                      
                      <View style={styles.quickOptionsContainer}>
                        <TouchableOpacity 
                          style={styles.quickOption}
                          onPress={() => setReminderDate(new Date(Date.now() + 30*60*1000))}
                        >
                          <ThemedText style={styles.quickOptionText}>In 30 Min</ThemedText>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                          style={styles.quickOption}
                          onPress={() => setReminderDate(new Date(Date.now() + 60*60*1000))}
                        >
                          <ThemedText style={styles.quickOptionText}>In 1 Stunde</ThemedText>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                          style={styles.quickOption}
                          onPress={addDayToDate}
                        >
                          <ThemedText style={styles.quickOptionText}>+ 1 Tag</ThemedText>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.timePickerContainer}>
                        <ThemedText style={styles.pickerSectionTitle}>Uhrzeit</ThemedText>
                        <View style={styles.timeButtons}>
                          {[8, 12, 15, 18, 20].map(hour => (
                            <TouchableOpacity 
                              key={`hour-${hour}`}
                              style={styles.timeButton}
                              onPress={() => setTime(hour, 0)}
                            >
                              <ThemedText style={styles.timeButtonText}>{hour}:00</ThemedText>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <ThemedText style={styles.saveButtonText}>Bestätigen</ThemedText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
                <ThemedText style={styles.cancelButtonText}>Abbrechen</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveReminder} style={styles.saveButton}>
                <ThemedText style={styles.saveButtonText}>Speichern</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  testButton: {
    backgroundColor: '#7BAA87',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  testButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reminderCard: {
    backgroundColor: '#c3d4a5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  reminderMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  reminderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 6,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateInputText: {
    marginLeft: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#7BAA87',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  datePickerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  currentDateContainer: {
    marginBottom: 16,
  },
  currentDateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  quickOptionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timePickerContainer: {
    marginBottom: 16,
  },
  pickerSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  timeButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minWidth: 60,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 