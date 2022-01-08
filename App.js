import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Alert } from 'react-native';

function CharacterItem({ id, name, mass, eye_color, birth_year }) {
  return <View key={ id } style={ styles.characterContainer }>
    <Text style={ styles.characterName }>{ name }</Text>
    <Text>mass: { mass }</Text>
    <Text>eye color: { eye_color }</Text>
    <Text>birth year: { birth_year }</Text>
  </View>
}

export default function App() {
  const [characters, setCharacters] = useState([]);

  const fetchNewCharacter = ()=> {
    const newCharacterId = characters.length + 1;
    fetch( `https://swapi.dev/api/people/${ newCharacterId }/` )
      .then( res => {
        res.json().then( data => {
          const { name, mass, eye_color, birth_year } = data;
          const newCharacter = {
            id: newCharacterId,
            name,
            mass,
            eye_color,
            birth_year,
          }
          setCharacters([ ...characters, newCharacter ])
        } )
      })
  };

  return (
    <View style={styles.appContainer}>
      <Text style={ styles.header }>React Native Star Wars App</Text>
      <Button
        title="Fetch new character"
        onPress={ fetchNewCharacter }
      />
      <FlatList
        data={ characters }
        keyExtractor={ item => item.id }
        renderItem={({item}) => CharacterItem(item) }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  characterContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    borderStyle: 'dashed',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});
