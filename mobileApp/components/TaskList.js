// components/TaskList.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const TaskList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { id: Math.random().toString(), text: task }]);
            setTask('');
        }
    };

    return (
        <View>
            <TextInput value={task} onChangeText={setTask} placeholder="Add a Task" />
            <Button title="Add" onPress={addTask} />
            <FlatList 
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Text>{item.text}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default TaskList;