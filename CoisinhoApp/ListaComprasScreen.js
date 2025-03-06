import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListaComprasScreen = () => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    // Carregar itens iniciais (simulado)
    // Na versão final, você pode substituir por uma chamada API
    const initialItems = [
      { id: 1, produto: 'Leite', isChecked: false },
      { id: 2, produto: 'Pão', isChecked: true },
      { id: 3, produto: 'Ovos', isChecked: false },
    ];
    setShoppingItems(initialItems);
  }, []);

  const addItem = () => {
    if (!newItem.trim()) return;
    
    const item = {
      id: Date.now(),
      produto: newItem,
      isChecked: false,
    };
    
    setShoppingItems([item, ...shoppingItems]);
    setNewItem('');
    
    // Aqui você pode adicionar a lógica para salvar no servidor
    // postCompra(item.produto, item.isChecked);
  };

  const toggleItemCheck = (id) => {
    const updatedItems = shoppingItems.map(item => 
      item.id === id ? {...item, isChecked: !item.isChecked} : item
    );
    setShoppingItems(updatedItems);
    
    // Aqui você pode adicionar a lógica para atualizar no servidor
  };
};