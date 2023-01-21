import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import { WebView } from 'react-native-webview';

const PlaceholderImage = require('./assets/background-image.png');

export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.imageContainer}>
  //       <ImageViewer placeholderImageSource={PlaceholderImage} />
  //     </View>
  //     <Text style={{ color: '#fff' }}>Open up App.js to start working on your app!</Text>
  //     <View style={styles.footerContainer}>
  //       <Button theme="primary" label="Choose a photo" />
  //       <Button label="Use this photo" />
  //     </View>
  //     <StatusBar style="auto" />
  //   </View>
  // );
  return (
    <WebView
      source={{ uri: 'https://www.naver.com' }}
    />
  );
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
