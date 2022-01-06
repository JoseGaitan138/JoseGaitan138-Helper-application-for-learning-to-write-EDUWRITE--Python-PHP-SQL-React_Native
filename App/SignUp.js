import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  encodedData = () => {
    let data = new FormData();
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('name', this.state.name);
    return data;
  };

  signUp = () => {
    fetch('https://reactnative-app.000webhostapp.com/EduWrite/api/signup.php', {
      method: 'POST',
      body: this.encodedData(),
    })
      .then((res) => res.text())
      .then((res) => {
        if (res.includes('1')) {
          Alert.alert(
            'Usuario creado',
            'El usuario se ha creado exitosamente',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('SignIn'),
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(res);
        }
      })
      .catch((err) => console.error(err));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Registro</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => (this.state.name = text)}
            placeholder="Nombre..."
            placeholderTextColor="#000"
          />
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
          <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}>
            <Text style={styles.labelBtnSignUp}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#4494eb',
  },
  header: {
    marginTop: height * 0.12,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.1,
    color: '#fff',
  },
  form: {
    marginTop: height * 0.05,
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
  btnSignUp: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5cba5c',
    height: height * 0.08,
    borderRadius: 30,
    marginBottom: height * 0.02,
  },
  labelBtnSignUp: {
    color: '#fff',
    fontSize: width * 0.05,
  },
});
