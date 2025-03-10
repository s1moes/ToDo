import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Shop = () => {
  const [number, onChangeNumber] = React.useState('');
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 25,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Shop;