// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TaskList from './components/TaskList';
import ShoppingList from './components/ShoppingList';  // Make sure to create this component

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Tasks" component={TaskList} />
                <Stack.Screen name="Shopping List" component={ShoppingList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;