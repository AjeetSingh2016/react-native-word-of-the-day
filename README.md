# Word of the Day

A React Native mobile application that presents users with a new word and its definition each day to help expand their vocabulary.

## Overview

Word of the Day is a simple yet effective Android application designed to enhance vocabulary through daily word learning. Each day, users receive a new word along with its pronunciation, definition, usage examples, and etymology.

## Features

- 📱 Daily word updates
- 📚 Word definitions, usage examples, and phonetic pronunciation
- 🔍 Search previous words
- 📅 Calendar view to explore past words
- 💾 Offline access to previously viewed words
- 🌙 Dark/Light theme support

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) >= 11
- [Android Studio](https://developer.android.com/studio)
- Android SDK

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/wordOfTheDay.git
cd wordOfTheDay
```

2. Install dependencies
```bash
npm install
```

3. Start Metro, the JavaScript bundler
```bash
npm start
```

4. Run the application on Android
```bash
npm run android
```

## Project Structure

```
wordOfTheDay/
├── android/                # Android native code
├── ios/                    # iOS native code (not in focus for this project)
├── src/                    # Source files
│   ├── components/         # Reusable components
│   ├── screens/            # Screen components
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── navigation/         # Navigation configurations
│   └── contexts/           # React contexts
├── __tests__/              # Test files
└── Home.js                 # Home point
└── App.js                  # Entry point
```

## Development

### Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Data Storage

The app uses AsyncStorage for persisting word history and user preferences locally on the device.

## Troubleshooting

### Common Issues

1. **Build failures**: Make sure your Android SDK is properly configured and you have accepted all licenses.
   ```bash
   cd android && ./gradlew clean
   ```

2. **Metro bundler issues**: Try clearing the cache:
   ```bash
   npm start -- --reset-cache
   ```

3. **Dependency issues**: Make sure all dependencies are correctly installed:
   ```bash
   rm -rf node_modules
   npm install
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Word definitions provided by [Dictionary API]
- Icons from [Icon Library]
- Inspiration from similar vocabulary-building applications

---

Feel free to contribute to this project by submitting issues or pull requests!