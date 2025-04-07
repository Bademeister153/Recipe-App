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
