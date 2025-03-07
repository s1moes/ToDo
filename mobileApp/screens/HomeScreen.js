// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Go to Tasks" onPress={() => navigation.navigate('Tasks')} />
            <Button title="Go to Shopping List" onPress={() => navigation.navigate('Shopping List')} />
        </View>
    );
};

export default HomeScreen;