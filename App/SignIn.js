import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const {width, height} = Dimensions.get('screen');

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  encodedData = () => {
    let data = new FormData();
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    return data;
  };

  next = () => {
    fetch('https://reactnative-app.000webhostapp.com/EduWrite/api/signin.php', {
      method: 'POST',
      body: this.encodedData(),
    })
      .then((res) => res.text())
      .then((res) => {
        let data = res.split(',');
        let codeError = data[0];
        let message = data[1];
        if (codeError === '1') {
          global.idUser = data[1];
          Alert.alert(
            'Ingreso exitoso',
            'Presiona OK para continuar',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Home'),
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(message);
        }
      })
      .catch((err) => console.error(err));
    // this.props.navigation.navigate('Home');
  };

  signUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  sonar = () => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile('meme', 'mp3');
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.containerImage}>
            <Image
              source={require('../../assets/logo/logo.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => (this.state.email = text)}
              placeholder="Email..."
              placeholderTextColor="#000"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => (this.state.password = text)}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.btnSignIn} onPress={this.next}>
              <Text style={styles.labelBtnSignIn}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}>
              <Text style={styles.labelBtnSignUp}>Registrarse</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnSignUp} onPress={this.sonar}>
              <Text style={styles.labelBtnSignUp}>Sonar</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: '#1c2c44',
  },
  containerImage: {
    alignItems: 'center',
  },
  img: {
    width: width * 0.4,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  form: {
    marginHorizontal: width * 0.04,
  },
  input: {
    height: height * 0.1,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: width * 0.05,
    marginVertical: height * 0.01,
  },
  containerButtons: {
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  btnSignIn: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0275d8',
    height: height * 0.08,
    borderRadius: 30,
    marginBottom: height * 0.02,
  },
  labelBtnSignIn: {
    color: '#fff',
    fontSize: width * 0.05,
  },
  btnSignUp: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9534f',
    height: height * 0.08,
    borderRadius: 30,
    marginBottom: height * 0.02,
  },
  labelBtnSignUp: {
    color: '#fff',
    fontSize: width * 0.05,
  },
});
