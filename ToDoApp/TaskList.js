import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const TaskList = () => {
    const tasks = [{ id: '1', title: 'Task 1' }, { id: '2', title: 'Task 2' }];

    return (
        <View>
            <Text>Tarefas</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => <Text>{item.title}</Text>}
                keyExtractor={item => item.id}
            />
            <Button title="Adicionar Tarefa" onPress={() => {}} />
        </View>
    );
};

export default TaskList;