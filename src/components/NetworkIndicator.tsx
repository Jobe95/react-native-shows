import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  isConnected: boolean | null;
};

export const NetworkIndicator = ({isConnected}: Props) => {
  return (
    <View
      style={[
        styles.connectionIcon,
        {backgroundColor: isConnected ? 'green' : 'red'},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  connectionIcon: {
    marginRight: 10,
    marginLeft: 10,
    height: 14,
    width: 14,
    borderRadius: 10,
  },
});
