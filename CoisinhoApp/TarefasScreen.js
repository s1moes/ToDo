import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TarefasScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [activeFilter, setActiveFilter] = useState('todas');

  useEffect(() => {
    // Carregar tarefas iniciais (simulado)
    const initialTasks = [
      {
        id: 1,
        task: 'Enviar relatório de vendas',
        priority: 'alta',
        state: false,
        dateCreated: new Date().toLocaleDateString(),
      },
      {
        id: 2,
        task: 'Responder emails',
        priority: 'média',
        state: true,
        dateCreated: new Date().toLocaleDateString(),
      },
      {
        id: 3,
        task: 'Agendar reunião com equipe',
        priority: 'baixa',
        state: false,
        dateCreated: new Date().toLocaleDateString(),
      },
    ];
    setTasks(initialTasks);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      task: newTask,
      priority: 'média',
      state: false,
      dateCreated: new Date().toLocaleDateString(),
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskState = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? {...task, state: !task.state} : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'pendentes':
        return tasks.filter(task => !task.state);
      case 'concluídas':
        return tasks.filter(task => task.state);
      default:
        return tasks;
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return { backgroundColor: '#ffebee', color: '#f44336' };
      case 'média':
        return { backgroundColor: '#fff8e1', color: '#ffc107' };
      case 'baixa':
        return { backgroundColor: '#e8f5e9', color: '#4caf50' };
      default:
        return { backgroundColor: '#e8f5e9', color: '#4caf50' };
    }
  };

  const renderTask = ({ item }) => {
    const priorityStyle = getPriorityStyle(item.priority);
    
    return (
      <View style={[styles.taskItem, item.state && styles.taskItemDone]}>
        <TouchableOpacity onPress={() => toggleTaskState(item.id)}>
          <Icon 
            name={item.state ? 'check-circle' : 'circle-o'} 
            size={24} 
            color={item.state ? '#4caf50' : '#333'} 
          />
        </TouchableOpacity>
        
        <Text style={[styles.taskText, item.state && styles.taskTextDone]}>
          {item.task}
        </Text>
        
        <View style={[styles.priorityBadge, { backgroundColor: priorityStyle.backgroundColor }]}>
          <Text style={[styles.priorityText, { color: priorityStyle.color }]}>
            {item.priority}
          </Text>
        </View>
        
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Icon name="trash" size={20} color="#f44336" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>
        <Text style={styles.subtitle}>
          Hoje, {new Date().toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.taskForm}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'todas' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('todas')}
        >
          <Text style={activeFilter === 'todas' ? styles.filterTextActive : styles.filterText}>
            Todas
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'pendentes' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('pendentes')}
        >
          <Text style={activeFilter === 'pendentes' ? styles.filterTextActive : styles.filterText}>
            Pendentes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'concluídas' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('concluídas')}
        >
          <Text style={activeFilter === 'concluídas' ? styles.filterTextActive : styles.filterText}>
            Concluídas
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={getFilteredTasks()}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Não existe tarefas</Text>
          </View>
        }
      />
      
      <View style={styles.taskStats}>
        <Text style={styles.statsText}>
          {tasks.length} tarefas totais
        </Text>
        <Text style={styles.statsText}>
          {tasks.filter(t => t.state).length} concluídas, {tasks.filter(t => !t.state).length} pendentes
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#898c9f',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterBtnActive: {
    backgroundColor: '#3f51b5',
    borderColor: '#3f51b5',
  },
  filterText: {
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskItemDone: {
    opacity: 0.7,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  priorityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 10,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  taskStats: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 10,
  },
  statsText: {
    color: '#777',
    fontSize: 14,
    marginBottom: 2,
  },
});

export default TarefasScreen;