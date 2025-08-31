import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import API from '../api';
import * as Notifications from 'expo-notifications';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const { token } = await Notifications.getExpoPushTokenAsync();
      const { data } = await API.post('/auth/register', { email, password, fcmToken: token.data });
      localStorage.setItem('token', data.token); // Use AsyncStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      navigation.navigate('Tasks');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
