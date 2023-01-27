import React, { lazy, Suspense } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform, SafeAreaView } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';

const PlaceholderImage = require('./assets/background-image.png');

export default function App() {

  if(Platform.OS === 'web'){
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <Text style={{ color: '#fff' }}>Open up App.js to start working on your app!</Text>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
  } else {
    const WebView = lazy(() => import('react-native-webview'));
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Suspense fallback={<Text style={{ color: '#fff' }}>Page is Loading...</Text>}>
          <View style={styles.container}>
            <WebView source={{ uri: 'https://vite-fe.vercel.app/' }} />
          </View>
        </Suspense>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
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
