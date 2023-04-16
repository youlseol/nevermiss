import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { OCR } from 'react-native-tesseract-ocr';

export default function Recognizer() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const recognizeTextFromImage = async (imagePath) => {
    const tessOptions = {
      whitelist: null,
      blacklist: null,
    };

    try {
      const recognizedText = await OCR.recognize(imagePath, 'eng', tessOptions);
      console.log('Recognized text:', recognizedText);
      return recognizedText;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const captureAndRecognizeText = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const text = await recognizeTextFromImage(data.uri);
      setRecognizedText(text);
    }
  };

  if (cameraPermission === null) {
    return <View />;
  }

  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef} />
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: 16,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            paddingHorizontal: 24,
            paddingVertical: 8,
          }}
          onPress={captureAndRecognizeText}>
          <Text style={{ fontSize: 18 }}>Capture & Recognize Text</Text>
        </TouchableOpacity>
      </View>
      {recognizedText ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            width: '100%',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Text style={{ color: 'white' }}>{recognizedText}</Text>
        </View>
      ) : null}
    </View>
  );
}
