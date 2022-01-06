import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
global.idUser;
const {width, height} = Dimensions.get('screen');

import data from '../../data/resources';
import ItemWords from '../../components/ItemWords';
import {removeValue, getData, storeData} from '../../helpers/SaveData';

export default function Learning({navigation}) {
  const [positionf, setPositionF] = useState([]);
  const encodedData = () => {
    let body = new FormData();
    body.append('id', global.idUser);
    return body;
  };

  const fetchRequest = () => {
    fetch(
      'https://reactnative-app.000webhostapp.com/EduWrite/api/getErrors.php',
      {
        method: 'POST',
        body: encodedData(),
      },
    )
      .then((res) => res.text())
      .then((res) => {
        if (res == '0') {
          Alert.alert(
            'Sección aprendizaje',
            'No tienes palabras que practicar',
            [
              {text: 'OK', onPress: () => navigation.goBack()},
            ],
          );
        } else {
          let dataDB = JSON.parse(res);
          let letrasDB = dataDB.map((data) => data.letter);
          console.log(letrasDB);
          let iterator = 0;
          let position = [];
          let position2 = [];
          let position3 = [];
          let positionf = [];

          for (let index = 0; index < dataDB.length; index++) {
            const element = dataDB[index];
            for (let j = 0; j < data.length; j++) {
              const element2 = data[j];
              const word =
                element.type == 1
                  ? element2.text.toLocaleUpperCase()
                  : element2.text.toLocaleLowerCase();
              if (word.includes(element.letter)) {
                if (index == 0) {
                  position.push({
                    id: element.id,
                    index: j,
                  });
                }
                if (index == 1) {
                  position2.push({
                    id: element.id,
                    index: j,
                  });
                }
                if (index == 2) {
                  position3.push({
                    id: element.id,
                    index: j,
                  });
                }
              }
            }
          }

          if (position.length > 0) {
            for (let i = 0; i < 2; i++) {
              positionf.push(
                position[
                  Math.floor(Math.random() * (position.length - 1 - 0 + 1) + 0)
                ],
              );
            }
          }

          if (position2.length > 0) {
            for (let i = 0; i < 2; i++) {
              positionf.push(
                position2[
                  Math.floor(Math.random() * (position2.length - 1 - 0 + 1) + 0)
                ],
              );
            }
          }

          if (position3.length > 0) {
            for (let i = 0; i < 2; i++) {
              positionf.push(
                position3[
                  Math.floor(Math.random() * (position3.length - 1 - 0 + 1) + 0)
                ],
              );
            }
          }

          setPositionF(positionf);

          let positionTemp = {
            positionf,
          };
          storeData(positionTemp);
        }
      })
      .catch((err) => console.error(err));
  };

  const loadData = async () => {
    try {
      let positionTemp = await getData();
     
      if (positionTemp) {
        if (positionTemp.positionf.length !== 0) {
          setPositionF(positionTemp.positionf);
        } else {
          fetchRequest();
        }
      } else {
        fetchRequest();
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    //console.log(global.idUser, 'Id user');
    // Delete positions
    removeValue();
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Aprendizaje</Text>
        </View>
        <View style={styles.containerSection}>
          {positionf.map((value, index) => {
            return (
              <ItemWords
                key={index}
                imageURI={data[Number(value.index)].imageURI}
                text={data[Number(value.index)].text}
                press={() =>
                  navigation.navigate('OptionLetter', {
                    text: data[Number(value.index)].text,
                    learning: true,
                    indexWord: value.index,
                    letterId: value.id,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
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
