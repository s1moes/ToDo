import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import your screens
import TasksScreen from './src/screens/TasksScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tarefas') {
              iconName = 'tasks';
            } else if (route.name === 'Compras') {
              iconName = 'shopping-cart';
            } else if (route.name === 'Calendário') {
              iconName = 'calendar';
            } else if (route.name === 'Gastos') {
              iconName = 'money';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3f51b5',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Tarefas" component={TasksScreen} />
        <Tab.Screen name="Compras" component={ShoppingListScreen} />
        <Tab.Screen name="Calendário" component={CalendarScreen} />
        <Tab.Screen name="Gastos" component={ExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;