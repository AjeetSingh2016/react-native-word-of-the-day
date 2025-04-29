import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getWords, clearWords } from '../utils/storage';
import WordCard from '../components/WordCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HistoryScreen = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadWords();
    }, [])
  );

  const loadWords = async () => {
    try {
      setLoading(true);
      const savedWords = await getWords();
      setWords(savedWords);
    } catch (error) {
      console.error('Failed to load word history:', error);
      Alert.alert('Error', 'Failed to load word history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all word history?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearWords();
              setWords([]);
            } catch (error) {
              console.error('Failed to clear history:', error);
              Alert.alert('Error', 'Failed to clear history');
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadWords();
  };

  const renderWordItem = ({ item }) => (
    <WordCard
      word={item.word}
      definition={item.definition}
      example={item.example}
      date={item.viewedDate}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#2C3E50" barStyle="light-content" />
      <View style={styles.container}>
        {loading && !refreshing ? (
          <LoadingSpinner />
        ) : (
          <View style={styles.content}>
            {words.length > 0 ? (
              <>
                <FlatList
                  data={words}
                  renderItem={renderWordItem}
                  keyExtractor={(item, index) => `${item.word}-${index}`}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClearHistory}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.clearButtonText}>Clear History</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Image
                  source={{uri: 'https://via.placeholder.com/150?text=Empty'}}
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyTitle}>No Words Yet</Text>
                <Text style={styles.emptyText}>
                  Your word history will appear here once you view some words.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  clearButton: {
    backgroundColor: '#E74C3C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 60,
    backgroundColor: '#ECF0F1',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#95A5A6',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HistoryScreen;
