import React, {useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {debounce} from 'lodash';

type Props = {
  placeHolder?: string;
  onChangeText: (value: string) => void;
  hasConnection: boolean | null;
};

export const SearchBar = ({
  placeHolder = 'Search...',
  onChangeText,
  hasConnection,
}: Props) => {
  const [text, setText] = useState<string>('');

  const onChange = (value: string) => {
    //TODO: When adding persistence remove this
    if (!hasConnection) {
      return;
    }
    setText(value);
    debouncedSearch(value);
  };

  const debouncedSearch = React.useRef(
    debounce(query => {
      return onChangeText(query);
    }, 750),
  ).current;

  const clearTextAndDismiss = () => {
    setText('');
    Keyboard.dismiss();
    return onChangeText('');
  };

  return (
    <View style={styles.container}>
      <MaterialIcon style={styles.icon} name="search" />
      <TextInput
        onFocus={() => {
          //TODO: When adding persistence remove this
          if (!hasConnection) {
            Keyboard.dismiss();
          }
        }}
        value={text}
        style={styles.input}
        onChangeText={onChange}
        placeholder={hasConnection ? placeHolder : 'No network connection'}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={clearTextAndDismiss}>
          <MaterialIcon style={styles.icon} name="clear" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  icon: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    padding: 10,
  },
});
