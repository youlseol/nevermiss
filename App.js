import React, { lazy, Suspense } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform, SafeAreaView, Pressable  } from 'react-native';
import Button from './components/Button';
// import ImageViewer from './components/ImageViewer';
// import WebView from 'react-native-webview';
import * as Location from 'expo-location';
import Speech from './Screens/Speech';

const PlaceholderImage = require('./assets/background-image.png');

export default function App() {
  // const [location1, setLocation1] = React.useState("Waitinig...");
  // const [errorMsg1, setErrorMsg1] = React.useState(null);
  
  // React.useEffect(() => {   
  //   (async () => {  
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg1('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation1(location); 
  //   })();
  // }, []);
 
  // const onPressFunction = async () => {
  //   let { status, requestPermission } = await Location.useForegroundPermissions();
  //   if (status !== 'granted') {
  //     setErrorMsg1('Permission to access location was denied1');
  //     return;
  //   }

  //   let location1 = await Location.getCurrentPositionAsync({});
  //   setLocation1(location1);
  // }

  // if(Platform.OS === 'web'){
  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View> */}
      <View style={styles.container}>
        {/* <Text style={styles.paragraph}>forground location {text1}</Text> */}
        {/* <Text style={{ color: '#fff' }}>{location1}</Text>
        <Text style={{ color: '#fff' }}>{errorMsg1}</Text> */}
        <Speech />
      </View>
      {/* <View style={styles.footerContainer}>
        <Button theme="primary" label="Set current location" onPress={onPressFunction} />
      </View> */}
      <StatusBar style="auto" />
    </View>
  );
  // } else {
  //   // FIXME: lazy 사용 시 로딩 안 됨
  //   // FIXME: WebApp loading 안 됨
  //   return (
  //           <WebView 
  //             allowsFullscreenVideo // Youtube FullScreen
  //             textZoom={100} //Erratic TextSize
  //             javaScriptEnabled={true} //JS Support
  //             domStorageEnabled={true} //Cache
  //             //source={{ uri: 'https://vite-fe.vercel.app/' }} />
  //             //source={{ uri: 'https://clever-macaron-e3c43a.netlify.app/' }} />
  //             //source={{ uri: 'https://next-e-commerce-example.vercel.app/' }} />
  //             source={{ uri: 'https://poc-fe-murex.vercel.app/' }} />
  //   );
  // }
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
