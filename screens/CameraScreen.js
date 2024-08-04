import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Vision from 'expo-vision';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedText, setScannedText] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTextRecognized = ({ textBlocks }) => {
    const text = textBlocks.map((block) => block.value).join('\n');
    setScannedText(text);
    // Here you would add logic to process the text, identify food items, and compare with user preferences
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
        onTextRecognized={handleTextRecognized}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{scannedText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});

export default CameraScreen;
