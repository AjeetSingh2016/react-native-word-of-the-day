import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWordOfTheDay } from '../services/wordService';
import { saveWord } from '../utils/storage';
import WordCard from '../components/WordCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = async () => {
    try {
      setLoading(true);
      setError(null);

      const wordData = await fetchWordOfTheDay();
      setCurrentWord(wordData);

      const saved = await saveWord(wordData);
      if (!saved) {
        setError('Failed to save word to history');
      }

      setLoading(false);
    } catch (error) {
      setError('Failed to load word of the day');
      console.error(error);
      setLoading(false);
    }
  };

  const goToHistory = () => {
    navigation.navigate('History');
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#2C3E50" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Word of the Day</Text>
          <Text style={styles.subheader}>Expand your vocabulary daily</Text>
        </View>

        {loading ? (
          <LoadingSpinner />
        ) : currentWord ? (
          <View style={styles.cardContainer}>
            <WordCard
              word={currentWord.word}
              definition={currentWord.definition}
              example={currentWord.example}
            />
          </View>
        ) : (
          <Text style={styles.errorText}>Could not load word of the day</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={loadNewWord}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>New Word</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={goToHistory}
            activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#95A5A6',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#2980B9',
  },
  secondaryButton: {
    backgroundColor: '#ECF0F1',
    borderColor: '#2980B9',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#2980B9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});

export default HomeScreen;
