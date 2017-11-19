import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';


class Deck extends Component {

    state = {
        title: '',
        questions: []
    }

    componentDidMount() {
        this.setState({
            title: this.props.navigation.state.params.title
        })

    }

    render() {

        const {title} = this.state;
        const questions = this.props.decks[title] && this.props.decks[title].questions;
        return (
            
            (title ? <View style={styles.container}>
                <View style={styles.deckStyle}>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={{fontSize: 20}}>{questions.length} cards</Text>
                </View>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('NewCard', {title, questions})}
                 >
                 <Text style={styles.buttonText}>Add Card</Text>                 
                 </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Quiz', {title, questions})}
                 >
                 <Text style={styles.buttonText}>Start Quiz</Text>                 
                 </TouchableOpacity>

            </View> : <View><Text>No questions available</Text></View>
            )
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
    },
    deckStyle: {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#1194F6',
        padding: 10,
        borderRadius: 2,
        height: 40,
        margin: 10,
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    deckTitle: {
      fontSize: 35
    }
  })

function mapStateToProps(state, {navigation}) {
    return {
        decks: state,
        navigation: navigation
    };
}

export default connect(mapStateToProps)(Deck);
