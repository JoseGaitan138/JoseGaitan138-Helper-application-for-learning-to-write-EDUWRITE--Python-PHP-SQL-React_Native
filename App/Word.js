import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import CameraRoll from '@react-native-community/cameraroll';
import {ViewShot, captureRef} from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/Ionicons';
import UriLetters from '../../UriLetters/UriLetter';
import {removeValue, getData, storeData} from '../../helpers/SaveData';
import SoundPlayer from 'react-native-sound-player';

global.idUser;

const {width, height} = Dimensions.get('screen');

const Word = ({navigation, route}) => {
  const viewShot = useRef();
  const [photo, setPhoto] = useState('');
  const [word, setWord] = useState(route.params.text);
  const [letterOption, setLetterOption] = useState(route.params.letterOption);
  const [iterador, setIterador] = useState(0);
  const refCanvas = useRef();
  const [letter, setLetter] = useState(word[0]);
  const [timeAnimation, setTimeAnimation] = useState(6500);

  const [isActiveAnimation, setIsActiveAnimation] = useState(false);
  const [uriImage, setUriImage] = useState(null);
  const [learning, setLearning] = useState(route.params.learning);
  const [indexWord, setIndexWord] = useState(route.params.indexWord);
  const [letterId, setLetterId] = useState(route.params.letterId);

  const loadImageAnimation = (letterLoad) => {
    if (letterLoad.toLowerCase() == 'ñ' && letterOption == 1) {
      setTimeAnimation(5000);
    }
    let indexLetter = UriLetters.findIndex(
      (element) => element.letter === letterLoad.toLowerCase(),
    );
    let letterObj = UriLetters[indexLetter];
    if (letterOption === 1) {
      setUriImage(letterObj.uri);
    } else {
      setUriImage(letterObj.uri2);
    }
  };

  const deleteLetterDB = () => {
    fetch(
      `https://reactnative-app.000webhostapp.com/EduWrite/api/deleteLetterError.php?id=${letterId}`,
      {
        method: 'GET',
      },
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        navigation.navigate('Home');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadImageAnimation(letter);
  }, []);

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  const validate = async (resp) => {
    let letrasEsteciales = ['c', 'k', 'o', 's', 'u', 'v', 'x', 'y', 'z'];

    console.log(letrasEsteciales.length);

    for (let i = 0; i < letrasEsteciales.length; i++) {
      if (wordTemp[iterador].toLowerCase() == letrasEsteciales[i]) {
        wordTemp[iterador] = wordTemp[iterador].toLowerCase();
      }
    }

    let wordTemp = word;

    let data = resp.split(' ');

    if (wordTemp[iterador] == data[0] && Number(data[1]) >= 0.8) {
      setIterador(iterador + 1);
      setLetter(word[iterador]);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewShot, {
        format: 'png',
        quality: 0.9,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }
      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo')
        .then((uri) => {
          Alert.alert(
            '',
            'Image saved successfully.',
            [
              {
                text: 'OK',
                onPress: () => {
                  sendImages();
                },
              },
            ],
            {cancelable: false},
          );
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log('error', error);
    }
  };

  const createFormData = (image) => {
    var photo = {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    var body = new FormData();
    body.append('authToken', 'secret');
    body.append('photo', photo);
    return body;
  };

  const encodedData = () => {
    let body = new FormData();
    body.append('letter', letter);
    body.append('id', global.idUser);
    body.append('type', letterOption);
    return body;
  };

  const sendError = () => {
    fetch('https://reactnative-app.000webhostapp.com/EduWrite/api/errors.php', {
      method: 'POST',
      body: encodedData(),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const sendImages = () => {
    CameraRoll.getPhotos({
      first: 1,
    }).then((res) => {
      console.log(res.edges[0].node);

      fetch('http://192.168.100.8:8000/predictImage', {
        method: 'POST',
        headers: {
          'X-CSRFTOKEN': 'csrfCookie',
          'Content-Type': 'multipart/form-data',
        },
        body: createFormData(res.edges[0].node.image),
      })
        .then((response) => response.text())
        .then(async (response) => {
          let wordTemp = word;
          let temp = response.split(' ');
          let letra = temp[0]; // A
          let porcentaje = temp[1]; // 123123123131
          console.log('upload succes', response);
          Alert.alert('Upload success!');

          refCanvas.current.clear();
          let ind = iterador;

          let letrasEsteciales = [
            'c',
            'f',
            'k',
            'o',
            's',
            'u',
            'v',
            'x',
            'y',
            'z',
          ];

          for (let i = 0; i < letrasEsteciales.length; i++) {
            if (letra == letrasEsteciales[i] && letterOption == 1) {
              letra = letra.toUpperCase();
            }
          }

          console.log(letra);

          if (wordTemp[ind] == letra && Number(porcentaje) >= 0.7) {
            if (ind + 1 >= word.length) {
              if (learning) {
                let positioTemp = await getData();
                positioTemp.positionf = positioTemp.positionf.filter(
                  (value) => value.index !== indexWord,
                );
                storeData(positioTemp);
                deleteLetterDB();
              } else {
                navigation.navigate('Home');
              }
            } else {
              setIterador(ind + 1);
              setLetter(word[ind + 1]);
              loadImageAnimation(word[ind + 1]);
            }
          } else {
            Alert.alert("Puedes mejorarlo, vuelve a interlo.");
            if (!learning) {
              sendError();
            }
          }
        })
        .catch((error) => {
          console.log('upload error', error);
          Alert.alert('Upload failed!');
        });
    });
  };

  const setActiveAnimation = () => {
    setIsActiveAnimation(true);
    console.log(timeAnimation);
    setTimeout(() => {
      setIsActiveAnimation(false);
    }, timeAnimation);
  };

  const handleUploadPhoto = () => {
    downloadImage();
    refCanvas.current.clear();
  };

  const sonar = () => {
    try {
      if (letter == 'ñ') {
        let temp = 'n2';
        SoundPlayer.playSoundFile(temp, 'mp3');
      } else {
        SoundPlayer.playSoundFile(`${letter.toLowerCase()}`, 'mp3');
      }
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.letter}>{letter}</Text>
      <View
        collapsable={false}
        ref={viewShot}
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          height: '62%',
          borderWidth: 2,
          position: 'relative',
        }}>
        <SketchCanvas
          style={{flex: 1}}
          strokeColor={'black'}
          strokeWidth={40}
          ref={refCanvas}
        />
        {isActiveAnimation && <Image source={uriImage} style={styles.img} />}
      </View>
      <View style={styles.containerActions}>
        <TouchableOpacity style={styles.btn} onPress={sonar}>
          <Icon name="ear-outline" size={height * 0.06} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={setActiveAnimation}>
          <Icon name="bulb-outline" size={height * 0.06} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerEvaluate}>
        <TouchableOpacity
          onPress={handleUploadPhoto}
          style={styles.btnEvaluate}>
          <Text style={styles.labelBtn}>Evaluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    position: 'absolute',
    width,
    height: '100%',
  },
  letter: {
    padding: 0,
    margin: 0,
    fontSize: width * 0.2,
    textAlign: 'center',
  },
  containerActions: {
    marginTop: height * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: '#0275d8',
    width: width * 0.2,
    alignItems: 'center',
    borderRadius: 10,
  },
  containerEvaluate: {
    marginTop: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelBtn: {
    fontSize: width * 0.05,
    color: '#fff',
  },
  btnEvaluate: {
    height: height * 0.08,
    width: width * 0.3,
    backgroundColor: '#5cb85c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Word;
