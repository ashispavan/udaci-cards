import React from 'react';
import {View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, Alert} from 'react-native';
import {connect} from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import {addQuestion} from '../actions/index';
import {addCardToDeck} from '../helpers/asyncHelper';



class NewCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    addQuestion = () => {
        const {question, answer} = this.state;
        if (question === '') {
            Alert.alert('Error', 'Question cannot be empty');
            return;
        }
        if (answer === '') {
            Alert.alert('Error', 'Answer cannot be empty');
            return;
        }
        const {title, questions} = this.props.navigation.state.params;

        const params = {question, answer, title, questions};
        this.props.dispatch(addQuestion(params));
        addCardToDeck({
            card: {question, answer},
            deck: title
        });

        Alert.alert('Success', 'New Card Added to Deck',
        [
            {
                text: 'OK', onPress: () =>
                this.props.navigation.goBack()
            }
        ],);

    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={style.container}>
                <TextField  label="Question" value={this.state.question} onChangeText={(text) => this.setState({question: text})} />
                <TextField label="Answer" value={this.state.answer} onChangeText={(text) => this.setState({answer: text})} />                
                <Button style={style.submitButton} onPress={this.addQuestion} title="Submit" />
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '75%'
    },
    submitButton: {
        marginTop: '50'
    }
});

function mapStateToProps(state, {navigation}) {
    return {
        navigation,
        decks: state
    }
}

export default connect(mapStateToProps)(NewCard);
