import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {ShowModel} from '../models/ShowModel';
import RenderHTML from 'react-native-render-html';
import {GenreRow} from '../components';
import {ScrollView} from 'react-native-gesture-handler';

export const DetailPage = () => {
  const router = useRoute();
  const {width} = useWindowDimensions();
  const show = router.params as ShowModel | null;

  return !show ? (
    <ActivityIndicator style={styles.loader} />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{show.name}</Text>
        <View style={{marginBottom: 10}}>
          <GenreRow genres={show.genres} />
        </View>
        <Image style={styles.img} source={{uri: show.image.original}} />
        <RenderHTML contentWidth={width} source={{html: show.summary}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  genreCard: {
    marginRight: 8,
    marginBottom: 10,
  },
  img: {
    borderRadius: 10,
    aspectRatio: 3 / 4,

    resizeMode: 'cover',
  },
});
