import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {ShowModel} from '../models/ShowModel';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {GenreRow} from './GenreRow';
import RenderHTML from 'react-native-render-html';
import {numberOfLettersAndEllipsis} from '../utils/helpers';

type Props = {
  show: ShowModel;
};

export const ShowItem = ({show}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {width} = useWindowDimensions();

  const onPress = () => {
    navigation.navigate('Detail', show);
  };

  const favoritePress = () => {
    console.log('TODO: Implement favorite func');
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.img}
          source={{uri: show.image?.medium ?? show.image?.original}}
        />
        <View style={styles.content}>
          <View>
            <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold'}}>
              {show.name}
            </Text>
            <RenderHTML
              contentWidth={width}
              source={{html: numberOfLettersAndEllipsis(show.summary, 50)}}
            />
          </View>
          <GenreRow genres={show.genres} smallCards={true} />
        </View>
      </View>
      <TouchableOpacity style={styles.iconPos} onPress={favoritePress}>
        <MaterialIcon size={24} color="grey" name="favorite-border" />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'flex-start',
    flex: 1,
  },
  img: {
    height: 150,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  iconPos: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    height: '100%',
    justifyContent: 'space-evenly',
  },
});
