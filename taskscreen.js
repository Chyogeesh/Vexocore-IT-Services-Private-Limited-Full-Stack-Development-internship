import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import API from '../api';

export default function TaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      alert('Failed to fetch tasks');
    }
  };

  const addTask = async () => {
    if (!title.trim()) return alert('Title is required');
    try {
      const { data } = await API.post('/tasks', { title, description, status: 'pending' });
      setTasks([data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const { data } = await API.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      setTasks(tasks.map(t => (t._id === task._id ? data : t)));
    } catch (err) {
     ,

      alert('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const renderTask = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <TouchableOpacity onPress={() => toggleStatus(item)} style={{ flex: 1 }}>
        <Text style={{ textDecorationLine: item.status === 'completed' ? 'line-through' : 'none' }}>
          {item.title} - {item.status}
        </Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => deleteTask(item._id)} color="red" />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Task Manager</Text>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item._id}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
