# RecipeApp User Story

## Login/Registration Page

### User Story 1
**Title:** Register with Username, Email, and Password  
**As a user, I want to register by entering my username, email, and password, so that I can create an account.**  
**Acceptance Criteria:**  
1. Users can enter valid details (username, email, password) and click “Sign Up” to create an account.  
2. An error message is shown if any input is invalid (e.g., invalid email format) or missing (e.g., empty fields).  
**Story Points:** 3  

### User Story 2
**Title:** Log In with Email and Password  
**As a user, I want to log in using my email and password, so that I can access my account.**  
**Acceptance Criteria:**  
1. Users can log in with correct email and password and are redirected to their dashboard.  
2. An error message is displayed if the credentials are incorrect (e.g., wrong password or unregistered email).  
**Story Points:** 2  

### User Story 3
**Title:** Receive Feedback for Missing Details  
**As a user, I want to receive feedback when I attempt to sign up or log in without entering details, so that I can fix the errors.**  
**Acceptance Criteria:**  
1. Error messages are displayed for missing fields (e.g., “Email is required”) on sign-up or login attempts.  
2. The feedback is clear and specific to the missing or incorrect field.  
**Story Points:** 2  

### User Story 4
**Title:** Store Details in Local Storage  
**As a user, I want my details to be stored in local storage, so that my data persists between sessions.**  
**Acceptance Criteria:**  
1. User details (e.g., username, email) are saved in local storage after successful registration.  
2. Stored details are used for authentication during login without requiring server interaction.  
**Story Points:** 3  

---

## Homepage

### User Story 5
**Title:** Personalized Greeting  
**As a user, I want a personalized greeting with my name and a title, so that I feel welcomed and encouraged to meditate.**  
**Acceptance Criteria:**  
1. Display “Hello, [username]” followed by the title “Find your perfect meditation” on the homepage.  
2. The greeting updates dynamically based on the logged-in user’s username.  
**Story Points:** 2  

### User Story 6
**Title:** View Popular Meditation Cards  
**As a user, I want to see popular meditation cards, so that I can explore options based on my preferences.**  
**Acceptance Criteria:**  
1. Display cards with images, titles, descriptions, categories (e.g., calmness, relaxation), and durations (e.g., 10 or 15 minutes).  
2. Cards are clickable to view detailed exercise pages.  
**Story Points:** 4  

### User Story 7
**Title:** Daily Featured Meditation  
**As a user, I want a daily featured meditation, so that I can quickly access a recommended session.**  
**Acceptance Criteria:**  
1. Showcase one meditation with an image, title, category, and duration in a dedicated section.  
2. The featured meditation updates daily and is prominently displayed.  
**Story Points:** 3  

### User Story 8
**Title:** Intuitive Navigation Icons  
**As a user, I want intuitive navigation icons, so that I can easily move around the app.**  
**Acceptance Criteria:**  
1. Display a logo in the top-left corner that links to the homepage.  
2. Display a settings icon in the top-right corner that links to the settings page.  
**Story Points:** 2  

---

## Detailed Screen

### User Story 9
**Title:** About Section for Exercises  
**As a user, I want an “About” section for each exercise, so that I can understand its benefits and purpose.**  
**Acceptance Criteria:**  
1. Display a brief description of the exercise (e.g., “Mindful Breathing”) below the banner image, explaining its focus and stress-reducing benefits.  
2. The description is concise and easy to read.  
**Story Points:** 2  

### User Story 10
**Title:** Instructions Section for Exercises  
**As a user, I want an “Instructions” section for each exercise, so that I can perform it correctly.**  
**Acceptance Criteria:**  
1. Provide step-by-step guidance on posture and breathing techniques below the “About” section.  
2. Instructions are numbered and clearly formatted for readability.  
**Story Points:** 3  

### User Story 11
**Title:** Add to Favorites Button  
**As a user, I want an “Add to Favorites” button, so that I can easily save an exercise for future practice.**  
**Acceptance Criteria:**  
1. Include a prominent “Add to Favorites” button at the bottom of the detailed page.  
2. Clicking the button adds the exercise to the user’s favorites list.  
**Story Points:** 2  

### User Story 12
**Title:** Navigation Icons on Detailed Screen  
**As a user, I want navigation icons for sharing and going back, so that I can easily manage the exercise page.**  
**Acceptance Criteria:**  
1. Display a back icon at the top-left to return to the previous page.  
2. Display a share icon at the top-right to share the exercise.  
**Story Points:** 2  

---

## Add to Favorites Functionality

### User Story 13
**Title:** Add Item to Favorites  
**As a user, I want to add an item to my Favorites, so that I can save activities or articles I like for quick access later.**  
**Acceptance Criteria:**  
1. A heart icon with the text “Add to Favorites” is displayed next to each item.  
2. The outlined heart indicates the item is not in Favorites; tapping it adds the item and fills the heart icon, updating the text to “Remove from Favorites.”  
**Story Points:** 3  

### User Story 14
**Title:** Remove Item from Favorites  
**As a user, I want to remove an item from my Favorites, so that I can manage my saved content.**  
**Acceptance Criteria:**  
1. The “Remove from Favorites” button with a filled heart is displayed for items already in Favorites.  
2. Tapping the button removes the item, reverts the heart icon to outlined, and updates the text to “Add to Favorites.”  
**Story Points:** 2  

### User Story 15
**Title:** My Favorites Screen  
**As a user, I want a “My Favorites” screen, so that I can view and manage all my saved items in one place.**  
**Acceptance Criteria:**  
1. The “My Favorites” screen displays a list of saved items with their title, category, and duration.  
2. Users can tap any item to view details or start the activity.  
**Story Points:** 4  

---

## Daily Reminders

### User Story 16
**Title:** View Calendar for Reminders  
**As a user, I want to view the calendar for the current month and navigate between months, so that I can easily select dates for reminders.**  
**Acceptance Criteria:**  
1. Display the current month with all days visible in a calendar format.  
2. Provide navigation arrows to move between months seamlessly.  
**Story Points:** 4  

### User Story 17
**Title:** Select Date and Time for Reminder  
**As a user, I want to select a date and time for a reminder, so that I can schedule it properly.**  
**Acceptance Criteria:**  
1. Display default text “Selected Date: None” and “Selected Time: 20:44” when no date is chosen.  
2. Allow users to select a specific date from the calendar and a time via a time picker.  
**Story Points:** 3  

### User Story 18
**Title:** Add a Reminder  
**As a user, I want to add a reminder after selecting a time, so that I can schedule it for a future date and time.**  
**Acceptance Criteria:**  
1. After selecting a date and time, users can click the “Add Reminder” button to schedule the reminder.  
2. The reminder is saved and added to the reminders list.  
**Story Points:** 3  

### User Story 19
**Title:** View and Manage Reminders List  
**As a user, I want to see a list of all my reminders, so that I can manage them easily.**  
**Acceptance Criteria:**  
1. Display a list of all reminders with their selected date and time.  
2. Provide a red “Delete” button next to each reminder to remove it from the list.  
**Story Points:** 4  

---

## Sharing the Exercises

### User Story 20
**Title:** Share Exercises with Others  
**As a user, I want to easily share recommended exercises with friends or family, so that I can help others discover helpful activities.**  
**Acceptance Criteria:**  
1. Provide a clear share button/icon on the exercise detail page.  
2. Allow sharing via multiple platforms (e.g., social media, email, messaging apps) using a native sharing menu.  
**Story Points:** 3  

---

## Logout Functionality

### User Story 21
**Title:** Logout from Account  
**As a user, I want a clear and visible logout button, so that I can easily log out of my account when I’m done using the app.**  
**Acceptance Criteria:**  
1. Display a clear “Logout” button in the settings or navigation menu.  
2. Tapping the button logs the user out, clears session data, and redirects them to the login page.  
**Story Points:** 2  

---

## Change Settings

### User Story 22
**Title:** Switch Between Light and Dark Themes  
**As a user, I want to switch between light and dark themes, so that I can reduce eye strain and customize the app’s visual experience.**  
**Acceptance Criteria:**  
1. Provide a “Theme” toggle or switch in the settings section for light and dark mode options.  
2. Allow seamless switching between themes with immediate visual updates, no refresh required.  
**Story Points:** 3  

-----------------------


# User Stories für eine Essensrezepte-App

## Login/Registration Page

### **Registrieren mit Benutzername, E-Mail und Passwort**  
**Als Kochbegeisterter möchte ich mich mit meinem Benutzernamen, meiner E-Mail und einem Passwort registrieren, damit ich ein Konto erstellen kann, um meine Rezepte zu speichern und zu verwalten.**  
**Akzeptanzkriterien:**  
- Nutzer können gültige Daten (Benutzername, E-Mail, Passwort) eingeben und auf „Registrieren“ klicken, um ein Konto zu erstellen.  
- Eine Fehlermeldung erscheint, wenn Eingaben ungültig (z. B. falsches E-Mail-Format) oder leer sind.  
**Story Points:** 3  

### **Einloggen mit E-Mail und Passwort**  
**Als wiederkehrender Nutzer möchte ich mich mit meiner E-Mail und meinem Passwort einloggen, damit ich auf meine gespeicherten Rezepte und Einstellungen zugreifen kann.**  
**Akzeptanzkriterien:**  
- Nutzer können sich mit korrekter E-Mail und Passwort einloggen und werden zur Rezepte-Startseite weitergeleitet.  
- Eine Fehlermeldung wird angezeigt, wenn die Anmeldedaten falsch sind (z. B. falsches Passwort oder unbekannte E-Mail).  
**Story Points:** 2  

### **Rückmeldung bei fehlenden Angaben**  
**Als Nutzer möchte ich Rückmeldung erhalten, wenn ich mich ohne vollständige Angaben registrieren oder einloggen möchte, damit ich meine Fehler korrigieren kann.**  
**Akzeptanzkriterien:**  
- Fehlermeldungen werden bei leeren Feldern angezeigt (z. B. „E-Mail erforderlich“).  
- Die Rückmeldung ist klar und spezifisch für das fehlende oder falsche Feld.  
**Story Points:** 2  

### **Daten im lokalen Speicher sichern**  
**Als Nutzer möchte ich, dass meine Daten im lokalen Speicher gespeichert werden, damit ich schnell auf mein Konto zugreifen kann, ohne meine Daten erneut einzugeben.**  
**Akzeptanzkriterien:**  
- Nach erfolgreicher Registrierung werden Nutzerdaten (z. B. Benutzername, E-Mail) im lokalen Speicher gesichert.  
- Gespeicherte Daten werden beim Login zur Authentifizierung genutzt, ohne Serverinteraktion.  
**Story Points:** 3  

---

## Homepage

### **Persönliche Begrüßung**  
**Als Hobbykoch möchte ich eine persönliche Begrüßung mit meinem Namen und einem Slogan sehen, damit ich motiviert bin, neue Rezepte zu entdecken.**  
**Akzeptanzkriterien:**  
- Anzeige von „Hallo, [Benutzername]“ gefolgt von „Entdecke dein nächstes leckeres Gericht“ auf der Startseite.  
- Die Begrüßung passt sich dynamisch an den eingeloggten Nutzer an.  
**Story Points:** 2  

### **Beliebte Rezeptkarten anzeigen**  
**Als Foodie möchte ich beliebte Rezeptkarten sehen, damit ich Inspiration basierend auf meinen Vorlieben finde.**  
**Akzeptanzkriterien:**  
- Anzeige von Karten mit Bildern, Titeln, Beschreibungen, Kategorien (z. B. vegetarisch, schnelle Gerichte) und Kochzeiten (z. B. 20 oder 30 Minuten).  
- Karten sind anklickbar und führen zur Detailseite des Rezepts.  
**Story Points:** 4  

### **Täglich empfohlenes Rezept**  
**Als vielbeschäftigter Koch möchte ich ein täglich empfohlenes Rezept sehen, damit ich schnell eine Idee für den Tag finde.**  
**Akzeptanzkriterien:**  
- Ein Rezept mit Bild, Titel, Kategorie und Kochzeit wird in einem eigenen Bereich hervorgehoben.  
- Das empfohlene Rezept aktualisiert sich täglich und ist prominent platziert.  
**Story Points:** 3  

### **Intuitive Navigationssymbole**  
**Als Nutzer möchte ich intuitive Navigationssymbole, damit ich die Funktionen der App leicht erkunden kann.**  
**Akzeptanzkriterien:**  
- Ein Logo oben links verlinkt zur Startseite.  
- Ein Einstellungs-Symbol oben rechts verlinkt zur Einstellungsseite.  
**Story Points:** 2  

---

## Detailansicht

### **Über-Bereich für Rezepte**  
**Als neugieriger Koch möchte ich einen „Über“-Bereich für jedes Rezept, damit ich mehr über Herkunft oder Vorteile erfahre.**  
**Akzeptanzkriterien:**  
- Eine kurze Beschreibung (z. B. „Würziges Thai-Curry“) wird unter dem Bannerbild angezeigt und erklärt Herkunft oder Geschmack.  
- Die Beschreibung ist prägnant und ansprechend.  
**Story Points:** 2  

### **Anleitungsbereich für Rezepte**  
**Als Anfängerkoch möchte ich einen „Anleitung“-Bereich für jedes Rezept, damit ich es korrekt zubereiten kann.**  
**Akzeptanzkriterien:**  
- Schritt-für-Schritt-Anleitungen mit Zutaten und Methoden werden unter dem „Über“-Bereich angezeigt.  
- Anleitungen sind nummeriert und übersichtlich formatiert.  
**Story Points:** 3  

### **Zu Favoriten hinzufügen**  
**Als organisierter Koch möchte ich einen „Zu Favoriten hinzufügen“-Button, damit ich geliebte Rezepte für später speichern kann.**  
**Akzeptanzkriterien:**  
- Ein prominenter „Zu Favoriten hinzufügen“-Button befindet sich am Ende der Detailseite.  
- Ein Klick fügt das Rezept zur Favoritenliste hinzu.  
**Story Points:** 2  

### **Navigationssymbole auf Rezeptseite**  
**Als Nutzer möchte ich Navigationssymbole zum Teilen und Zurückkehren, damit ich die Rezeptseite leicht verwalten kann.**  
**Akzeptanzkriterien:**  
- Ein Zurück-Symbol oben links führt zur vorherigen Seite.  
- Ein Teilen-Symbol oben rechts ermöglicht das Teilen des Rezepts.  
**Story Points:** 2  

---

## Favoriten-Funktionalität

### **Rezept zu Favoriten hinzufügen**  
**Als Food-Enthusiast möchte ich ein Rezept zu meinen Favoriten hinzufügen, damit ich es später schnell wiederfinde.**  
**Akzeptanzkriterien:**  
- Ein Herz-Symbol mit „Zu Favoriten hinzufügen“ wird bei jedem Rezept angezeigt.  
- Ein leeres Herz zeigt an, dass das Rezept nicht favorisiert ist; ein Klick fügt es hinzu und füllt das Herz, Text ändert sich zu „Aus Favoriten entfernen“.  
**Story Points:** 3  

### **Rezept aus Favoriten entfernen**  
**Als Nutzer möchte ich ein Rezept aus meinen Favoriten entfernen, damit meine Liste aktuell bleibt.**  
**Akzeptanzkriterien:**  
- Ein gefülltes Herz mit „Aus Favoriten entfernen“ wird bei favorisierten Rezepten angezeigt.  
- Ein Klick entfernt das Rezept, das Herz wird leer, Text ändert sich zu „Zu Favoriten hinzufügen“.  
**Story Points:** 2  

### **Meine Favoriten-Seite**  
**Als Koch möchte ich eine „Meine Favoriten“-Seite, damit ich alle gespeicherten Rezepte an einem Ort sehen und verwalten kann.**  
**Akzeptanzkriterien:**  
- Die Seite zeigt eine Liste mit Titel, Kategorie und Kochzeit der gespeicherten Rezepte.  
- Nutzer können Rezepte anklicken, um Details zu sehen oder zu kochen.  
**Story Points:** 4  

---

## Tägliche Erinnerungen

### **Kalender für Mahlzeitenplanung**  
**Als Planer möchte ich den Kalender des aktuellen Monats sehen und zwischen Monaten navigieren, damit ich Mahlzeiten-Erinnerungen planen kann.**  
**Akzeptanzkriterien:**  
- Der aktuelle Monat wird im Kalenderformat angezeigt, alle Tage sichtbar.  
- Navigationspfeile ermöglichen nahtloses Wechseln zwischen Monaten.  
**Story Points:** 4  

### **Datum und Uhrzeit für Erinnerung auswählen**  
**Als vielbeschäftigter Koch möchte ich Datum und Uhrzeit für eine Mahlzeiten-Erinnerung wählen, damit ich meinen Kochplan festlegen kann.**  
**Akzeptanzkriterien:**  
- Standardtext „Ausgewähltes Datum: Keins“ und „Ausgewählte Zeit: 18:00“ wird angezeigt, wenn nichts gewählt ist.  
- Nutzer können ein Datum im Kalender und eine Zeit per Zeitwähler auswählen.  
**Story Points:** 3  

### **Mahlzeiten-Erinnerung hinzufügen**  
**Als Nutzer möchte ich nach Auswahl einer Zeit eine Erinnerung hinzufügen, damit ich das Kochen für ein zukünftiges Datum plane.**  
**Akzeptanzkriterien:**  
- Nach Datum- und Zeitauswahl können Nutzer auf „Erinnerung hinzufügen“ klicken.  
- Die Erinnerung wird gespeichert und mit Rezeptname (falls vorhanden) zur Liste hinzugefügt.  
**Story Points:** 3  

### **Liste der Mahlzeiten-Erinnerungen verwalten**  
**Als organisierter Nutzer möchte ich eine Liste aller Erinnerungen sehen, damit ich meine Kochpläne einfach verwalten kann.**  
**Akzeptanzkriterien:**  
- Eine Liste zeigt alle Erinnerungen mit Datum, Uhrzeit und zugehörigem Rezept (falls vorhanden).  
- Ein roter „Löschen“-Button neben jeder Erinnerung entfernt sie aus der Liste.  
**Story Points:** 4  

---

## Rezepte teilen

### **Rezepte mit anderen teilen**  
**Als sozialer Koch möchte ich Rezepte einfach mit Freunden oder Familie teilen, damit ich sie zum Kochen inspiriere.**  
**Akzeptanzkriterien:**  
- Ein klarer Teilen-Button/Symbol wird auf der Rezept-Detailseite angezeigt.  
- Teilen ist über mehrere Plattformen (z. B. Social Media, E-Mail, Messenger) via nativem Menü möglich.  
**Story Points:** 3  

---

## Logout-Funktionalität

### **Aus dem Konto ausloggen**  
**Als datenschutzbewusster Nutzer möchte ich einen klaren Logout-Button, damit ich mich sicher ausloggen kann, wenn ich fertig bin.**  
**Akzeptanzkriterien:**  
- Ein „Logout“-Button ist im Einstellungs- oder Navigationsmenü sichtbar.  
- Ein Klick loggt den Nutzer aus, löscht Sitzungsdaten und leitet zur Login-Seite weiter.  
**Story Points:** 2  

---

## Einstellungen ändern

### **Zwischen Hell- und Dunkelmodus wechseln**  
**Als Nutzer möchte ich zwischen Hell- und Dunkelmodus wechseln, damit ich die App bei verschiedenen Lichtverhältnissen angenehm nutzen kann.**  
**Akzeptanzkriterien:**  
- Ein „Themen“-Schalter in den Einstellungen bietet Hell- und Dunkelmodus-Optionen.  
- Der Wechsel zwischen Themen erfolgt nahtlos mit sofortiger visueller Aktualisierung.  
**Story Points:** 3  

