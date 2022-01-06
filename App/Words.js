import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import ItemWords from '../../components/ItemWords';

const {width, height} = Dimensions.get('screen');


export default class Words extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: this.props.route.params.category,
      data: this.props.route.params.data,
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{this.state.category}</Text>
          </View>
          <View style={styles.containerSection}>
            {this.state.data.map((value, index) => {
              return (
                <ItemWords
                  key={index}
                  imageURI={value.imageURI}
                  text={value.text}
                  press={() => this.props.navigation.navigate('OptionLetter',{text: value.text})}
                />
              );
            })}
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
  containerSection: {
    marginTop: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});
