import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WordCard = ({word, definition, example, date = null}) => {
  return (
    <View style={styles.card}>
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{word}</Text>
        {date && (
          <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Definition:</Text>
        <Text style={styles.definition}>{definition}</Text>

        {example && (
          <>
            <Text style={[styles.sectionTitle, {marginTop: 12}]}>Example:</Text>
            <Text style={styles.example}>"{example}"</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffff',
    borderRadius: 16,
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  wordContainer: {
    backgroundColor: '#2980B9',
    padding: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  divider: {
    height: 2,
    backgroundColor: '#ECF0F1',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 4,
  },
  definition: {
    fontSize: 17,
    lineHeight: 24,
    color: '#2C3E50',
  },
  example: {
    fontSize: 17,
    fontStyle: 'italic',
    lineHeight: 24,
    color: '#95A5A6',
  },
  date: {
    fontSize: 14,
    color: '#ECF0F1',
    fontWeight: '500',
  },
});

export default WordCard;
