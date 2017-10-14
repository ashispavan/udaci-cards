import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Button, Alert} from 'react-native';
import { FormLabel, FormInput} from 'react-native-elements';
import {addNewDeck} from '../helpers/asyncHelper';

class NewDeck extends Component {

    state = {
        text: ''
    }

    addDeck = () => {
        const value = this.state.text;
        const newDeck = {[value]: {title: value, questions: []}};
        addNewDeck(newDeck).then(() => {
            Alert.alert('Success', 'New Deck Added',
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Deck', {
                    title: value,
                    questions : []
                })},
            ],)
        })
    }

    render() {
        return (
            
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text>What is the title of your new Deck?</Text>
                <FormInput value={this.state.text} onChangeText={text => this.setState({text})} />
                <Button onPress={this.addDeck}
                title='Submit' />
            </KeyboardAvoidingView>
            
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