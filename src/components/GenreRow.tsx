import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  genres: string[];
  smallCards?: boolean;
};

export const GenreRow = ({genres, smallCards = false}: Props) => {
  const GenreCard = (genre: string) => {
    return (
      <View style={styles.card}>
        <Text style={[styles.text, smallCards ? styles.small : styles.large]}>
          {genre}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.genreRow}>
      {genres.map((genre: string, index: number) => {
        return (
          <View key={index} style={styles.genreCard}>
            {GenreCard(genre)}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  genreRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  genreCard: {
    marginRight: 4,
    marginBottom: 2,
  },
  card: {
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 14,
    color: 'white',
  },
  large: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  },
  small: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 12,
  },
});
