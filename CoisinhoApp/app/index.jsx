import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Animated, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Shop = () => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Animation when component mounts
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const addItem = () => {
    if (itemName.trim()) {
      // Create new item with animation refs
      const newItem = { 
        id: Date.now().toString(), 
        name: itemName, 
        checked: false,
      };
      
      setItems((prevItems) => [...prevItems, newItem]);
      setItemName('');
    }
  };

  const toggleCheck = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Render right swipe actions
  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeItem(id)}
      >
        <Animated.View>
          <Ionicons name="trash" size={24} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Animation for new items
  const renderItem = ({ item, index }) => {
    const itemAnimationValue = new Animated.Value(0);
    
    React.useEffect(() => {
      Animated.timing(itemAnimationValue, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: itemAnimationValue,
          transform: [
            { 
              translateY: itemAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }
          ]
        }}
      >
        <Swipeable
          renderRightActions={() => renderRightActions(item.id)}
          friction={2}
          overshootRight={false}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleCheck(item.id)}
          >
            <View style={styles.itemContainer}>
              <Animated.View style={styles.checkboxContainer}>
                <Ionicons 
                  name={item.checked ? "checkmark-circle" : "ellipse-outline"} 
                  size={24} 
                  color={item.checked ? "#78C091" : "#D1D1D1"} 
                />
              </Animated.View>
              <Text style={[styles.itemText, item.checked && styles.checkedText]}>
                {item.name}
              </Text>
              <TouchableOpacity 
                onPress={() => removeItem(item.id)}
                style={styles.trashButton}
              >
                <Ionicons name="trash-outline" size={22} color="#FFACAC" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Animated.View style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}>
            <Text style={styles.title}>Lista de Compras</Text>
          </Animated.View>
          
          <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ 
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }]
          }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Adicionar item"
                value={itemName}
                onChangeText={setItemName}
                placeholderTextColor="#ACACAC"
                onSubmitEditing={addItem}
              />
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={addItem}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={{
                    transform: [{ scale: scaleAnim }]
                  }}
                >
                  <Ionicons name="add" size={26} color="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          <Animated.View style={[
            styles.listWrapper,
            {
              opacity: fadeAnim,
              transform: [{ 
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0]
                })
              }]
            }
          ]}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <Animated.View style={[
                  styles.emptyState,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                  }
                ]}>
                  <Ionicons name="basket-outline" size={62} color="#E0E0E0" />
                  <Text style={styles.emptyText}>Sua lista está vazia</Text>
                  <Text style={styles.emptySubText}>Adicione itens para começar</Text>
                </Animated.View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FCFCFC',
  },
  header: {
    marginBottom: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 22,
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#4A4A4A',
    height: '100%',
  },
  addButton: {
    backgroundColor: '#78C091',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#78C091',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  listWrapper: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  checkboxContainer: {
    padding: 4,
  },
  itemText: {
    flex: 1,
    fontSize: 17,
    color: '#4A4A4A',
    marginLeft: 12,
    fontWeight: '400',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#ACACAC',
  },
  trashButton: {
    padding: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9E9E9E',
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 15,
    color: '#BCBCBC',
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
});

export default Shop;