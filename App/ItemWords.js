import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Touchable,
  Alert
} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class ItemWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURI: this.props.imageURI,
      text: this.props.text,
      press: this.props.press,
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={this.state.press}>
        <View style={styles.containerCategory}>
          <Image source={this.state.imageURI} style={styles.img} />
          <Text style={styles.text}>{this.state.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerCategory: {
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
  text: {
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    textAlign: 'justify',
  },
  img: {
    width: width * 0.4,
    height: height * 0.14,
    resizeMode: 'contain',
  },
});
