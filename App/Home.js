import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import Category from '../../components/Category';

import data from '../../data/resources';
const {width, height} = Dimensions.get('screen');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Categorias</Text>
          </View>
          <View style={styles.containerSectionlearning}>
            <Category
              imageURI={require('../../assets/categories/aprendisaje.png')}
              category="Aprendizaje"
              press={() => {
                this.props.navigation.navigate('Learning');
              }}
            />
          </View>
          <View style={styles.containerSection}>
            <Category
              imageURI={require('../../assets/categories/hogar.png')}
              category="Hogar"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Hogar',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Hogar',
                  data: dataTemp,
                });
              }}
            />
            <Category
              imageURI={require('../../assets/categories/colores.png')}
              category="Colores y emociones"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Colores y emociones',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Colores y emociones',
                  data: dataTemp,
                });
              }
              }
            />
          </View>
          <View style={styles.containerSection}>
            <Category
              imageURI={require('../../assets/categories/partes_cuerpo.png')}
              category="Partes del cuerpo"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Partes del cuerpo',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Partes del cuerpo',
                  data: dataTemp,
                });
              }
              }
            />
            <Category
              imageURI={require('../../assets/categories/profesiones.png')}
              category="Profesiones"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Profesiones',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Profesiones',
                  data: dataTemp,
                });
              }
              }
            />
          </View>
          <View style={styles.containerSection}>
            <Category
              imageURI={require('../../assets/categories/comida.png')}
              category="Comida"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Comida',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Comida',
                  data: dataTemp,
                });
              }
              }
            />
            <Category
              imageURI={require('../../assets/categories/deportes.png')}
              category="Deportes"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Deportes',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Deportes',
                  data: dataTemp,
                });
              }
              }
            />
          </View>
          <View style={styles.containerSectionAnimals}>
            <Category
              imageURI={require('../../assets/categories/animales.png')}
              category="Animales"
              press={() => {
                let dataTemp = data.filter(
                  (value) => value.category === 'Animales',
                );
                this.props.navigation.navigate('Words', {
                  category: 'Animales',
                  data: dataTemp,
                });
              }
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#fff',
  },
  containerTitle: {
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.1,
  },
  containerSectionlearning: {
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  containerSection: {
    marginTop: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  containerSectionAnimals: {
    marginTop: height * 0.05,
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
});
