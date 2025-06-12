
# 📱 SpeechTrainer Frontend

The frontend of **SpeechTrainer** is a React Native application built with **Expo**. It provides an intuitive interface for users to select speaking subjects, record their answers, and review past recordings.

---

## 🚀 Features

- 🎙️ Record audio responses to randomly selected speaking topics.
- 📂 View past recordings and playback.
- 📊 Visual overview of answers over the past 7 days.
- 🔍 Detailed view of individual subjects and associated answers.
- 🌙 Light and pastel color theme optimized for readability.

---

## 🛠️ Tech Stack

- **React Native** with **Expo**
- **Zustand** for state management
- **expo-file-system** and **expo-audio** for audio recording and playback
- **expo-router** for navigation
- **Typescript** for type safety

---

## 📁 Project Structure (Frontend)

```
frontend/
├── components/        # Reusable components like CardDisplay, ReviewModal
├── screens/           # Main screen components (Home, Record, Subject Bank)
├── stores/            # Zustand stores (answers, subjects)
├── services/          # API calls and file utilities
├── utils/             # Helper functions and constants
├── models/            # Type definitions
├── app/               # Expo router pages
├── App.tsx            # Entry point
└── ...
```

---

## 🧪 Development & Testing

1. Install dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
npx expo start
```

3. Make sure the backend is running and accessible at the configured API URL in your `.env` or config file.

---

## 🔄 State Management

- `useAnswerStore`: handles fetching, creating, updating, and deleting answers.
- `useSubjectStore`: manages subjects including fetching and creating new entries.

---

## ✨ Future Improvements

- Integrate better audio waveform UI.
- Add swipe gestures and transitions.
- Implement answer scoring or AI feedback integration.

---


## TCP Problems with Android Studio 
### Presentation of the problem
Some ptoblem may arise when try to lanuch the project in developpement mode. A lingering emulator may go on and off (namely emulator-xxxx) even when the emulator server is turned on and off using the following command :
```bash
adb kill-server 
adb start serverd
```
When checking to se the list of emulator, (emulator-xxxx) will cerntainly appears as offline but this then makes the machine actively refused the connection (for unknown reasons). 
```bash 
# Show the emulators and connected devices
adb devices
```

### Solution found 
The way to bypass this problem is to first use the following command to first find what is used in the port and then kill the .exe that is using the port before building the project. 
The following commands need to be used in the powershell as administrator.
```bash
abd devices #See of the emulator is offline
netstat -ano | findstr :[port + 1] # the port which is used by the emulator + 1
taskkill /pid [pid] /F #Terminated using the pid of the task that is using the port

```

## 🧑‍💻 Developer Notes

- Answers and subjects are synced with the backend using `answerService` and `subjectService`.
- Audio files are stored locally in the device under `expo-file-system`.
- Make sure proper permissions are granted for audio recording.

---

Built with ❤️ using React Native and Zustand.



## Extra
.env example
```
API_KEY=
API_URL=
API_PORT=

```