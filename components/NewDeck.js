import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Button, Alert} from 'react-native';
import { FormLabel, FormInput} from 'react-native-elements';
import {addNewDeck} from '../helpers/asyncHelper';
import {NavigationActions} from 'react-navigation';
import { TextField } from 'react-native-material-textfield';


class NewDeck extends Component {

    state = {
        text: ''
    }

    addDeck = () => {
        const value = this.state.text;
        if(!value) {
            Alert.alert("Error", "Title cannot be empty");
            return;
        }
        const newDeck = {[value]: {title: value, questions: []}};
        addNewDeck(newDeck).then(() => {
            Alert.alert('Success', 'New Deck Added',
            [
                {text: 'OK', onPress: () => this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({routeName: 'Home'})
                    ]
                  }))},
            ],)
        })
    }

    render() {
        return (
            
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextField  label="What is the title of your new Deck?" value={this.state.text} onChangeText={text => this.setState({text})} />
                <Button  onPress={this.addDeck}
                title='Submit' />
            </KeyboardAvoidingView>
            
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%'
    },
    buttonStyle: {

    }
  });

export default NewDeck;