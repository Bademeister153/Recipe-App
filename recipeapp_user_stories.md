# RecipeApp User Story

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

