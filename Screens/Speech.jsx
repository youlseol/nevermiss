import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Clipboard from '@react-native-clipboard/clipboard';
import { Audio } from 'expo-av';

export default function Speech() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ crop: { originX: 0, originY: 0, width: result.width, height: result.height } }],
        { base64: true }
      );
      Clipboard.setString(manipResult.base64);
    }
  };

  const playTextToSpeech = async () => {
    const base64Image = await Clipboard.getString();
    const formData = new FormData();
    formData.append('image', base64Image);

    const response = await fetch('https://port-0-pyspeech-6g2llfrrwz2k.sel3.cloudtype.app/tts', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(sound);

      await sound.playAsync();
    } else {
      alert('오류가 발생했습니다.');
    }
  };

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>카메라에 액세스할 수 없습니다.</Text>;
  }
  return (
    <View style={styles.container}>
      <Button title="카메라로 찍기" onPress={pickImage} />
      {image && <Button title="텍스트를 음성으로 변환" onPress={playTextToSpeech} />}
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
     // Styles that are unchanged from previous step are hidden for brevity. 
     footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },
  });
  