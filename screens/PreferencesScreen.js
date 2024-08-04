import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PreferencesScreen = () => {
  const [preferences, setPreferences] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
  });

  const handleSave = () => {
    // Here you would add logic to save preferences to storage or API
    console.log('Saved preferences:', preferences);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Food Preferences</Text>
      {Object.keys(preferences).map((meal) => (
        <View key={meal} style={styles.inputContainer}>
          <Text style={styles.label}>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</Text>
          <TextInput
            style={styles.input}
            multiline
            value={preferences[meal]}
            onChangeText={(text) => setPreferences({ ...preferences, [meal]: text })}
            placeholder={`Enter your ${meal} preferences`}
          />
        </View>
      ))}
      <Button title="Save Preferences" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
});

export default PreferencesScreen;
