import AsyncStorage from '@react-native-async-storage/async-storage';

const WORDS_STORAGE_KEY = '@word_of_the_day_history';

// Save a word to history
export const saveWord = async wordData => {
  try {
    // Get existing words
    const existingWords = await getWords();

    // Add new word with current date
    const wordWithDate = {
      ...wordData,
      viewedDate: new Date().toISOString(),
    };

    // Add to beginning of array to show newest first
    const updatedWords = [wordWithDate, ...existingWords];

    // Save to storage
    await AsyncStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(updatedWords));
    return true;
  } catch (error) {
    console.error('Error saving word:', error);
    return false;
  }
};

// Get all saved words
export const getWords = async () => {
  try {
    const wordsJson = await AsyncStorage.getItem(WORDS_STORAGE_KEY);
    return wordsJson ? JSON.parse(wordsJson) : [];
  } catch (error) {
    console.error('Error retrieving words:', error);
    return [];
  }
};

// Clear all saved words
export const clearWords = async () => {
  try {
    await AsyncStorage.removeItem(WORDS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing words:', error);
    return false;
  }
};
