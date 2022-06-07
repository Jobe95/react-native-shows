import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getShows, searchShows} from '../api/tvMazeApi';
import {NetworkIndicator, SearchBar, ShowItem} from '../components';
import {SearchShowModel} from '../models/SearchShowModel';
import {ShowModel} from '../models/ShowModel';
import NetInfo from '@react-native-community/netinfo';

export const HomePage = () => {
  const listRef = useRef<FlatList>(null);
  // Todo: Use with endless scroll
  const [page, setPage] = useState<number>(0);
  const [shows, setShows] = useState<ShowModel[]>([]);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchShows(0);
  }, []);

  useEffect(() => {
    const unsubsscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);
    });

    return () => unsubsscribe();
  }, []);

  const fetchShows = async (page: number) => {
    const response = await getShows(page);

    // Reached the end of list
    if (response.status === 404) {
      setIsError(false);
      return;
    }
    // Successfull response
    if (response.status === 200) {
      setIsError(false);
      setShows(response.data);
      return;
    }
    setIsError(true);
    // We have an error
  };

  const fetchShowsBySearch = async (query: string) => {
    const response = await searchShows(query.trim());
    if (response.status === 200) {
      const results = response.data.map((value: SearchShowModel) => value.show);
      setShows([...results]);
    }
  };

  const searchQueryChange = async (query: string) => {
    // When query changes scroll to top of list
    listRef.current?.scrollToOffset({animated: false, offset: 0});
    // If query is empty then fetch original list and reset page
    if (query.trim() === '') {
      setPage(0);
      fetchShows(0);
      return;
    }
    fetchShowsBySearch(query);
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyList}>
        <Text>No results</Text>
      </View>
    );
  };

  const renderSuccessState = () => {
    return (
      <FlatList
        ref={listRef}
        data={shows}
        renderItem={({item}) => <ShowItem show={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
      />
    );
  };

  const renderErrorState = () => {
    return (
      <View style={styles.center}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          A problem occured
        </Text>
        <Button
          onPress={() => {
            fetchShows(0);
          }}
          title="Try again"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isError ? (
        renderErrorState()
      ) : (
        <View style={{margin: 10}}>
          <View style={styles.topRow}>
            <SearchBar
              hasConnection={isConnected}
              onChangeText={searchQueryChange}
            />
            <NetworkIndicator isConnected={isConnected} />
          </View>
          {shows.length < 1 ? renderEmptyState() : renderSuccessState()}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  topRow: {
    width: '100%',
    flexDirection: 'row',
  },
  emptyList: {
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
