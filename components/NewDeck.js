import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

class NewDeck extends Component {
    render() {
        return (
            
            <View style={styles.container}>
                <Text>Add New Deck Here</Text>
            </View>
            
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default NewDeck;