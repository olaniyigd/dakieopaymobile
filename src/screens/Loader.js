import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const InfiniteRoundedLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderBackground}>
        <ActivityIndicator size="large" color="#23265A" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    padding: 20,
    borderRadius: 10,
  },
});

export default InfiniteRoundedLoader;
