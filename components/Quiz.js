import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {clearLocalNotification, setLocalNotification} from '../helpers/notificationHelper';

class Quiz extends Component {

    state = {
        currentCard: 0,
        correctAnswers: 0,
        showAnswer: false,
    };

    onCorrect = () => {
        const {currentCard, correctAnswers} = this.state;
        this.setState({currentCard: currentCard + 1, correctAnswers: correctAnswers + 1, showAnswer: false});
    };

    onIncorrect = () => {
        this.setState({currentCard: this.state.currentCard + 1});
    };

    startQuiz = () => {
        this.setState({currentCard: 0, correctAnswers: 0, showAnswer: false});
    };

    backToDeck = () => {
        this.props.navigation.goBack();
    }

    showAnswer = () => {
        this.setState({showAnswer: !this.state.showAnswer});
    };

    render() {
        const {currentCard, correctAnswers, showAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const isQuestionAvailable = currentCard < questions.length;
        const questionsLeft = questions.length - currentCard;

        if(!isQuestionAvailable) {
            clearLocalNotification().then(setLocalNotification());
        }

        return (
            <View style={{flex: 1}}>
                {isQuestionAvailable ? (
                    <View style={styles.container}>

                        <View style={{justifyContent: 'flex-start', flex: 1}}>
                            <View>
                                <Text>{questionsLeft} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={{flex: 4}}>
                            <View>
                                {showAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[currentCard].answer}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: 'green'}}>Show Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[currentCard].question}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: 'red'}}>Show Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.actionButtons}>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.onCorrect} style={[styles.buttonStyle, {backgroundColor: '#008000'}]}>
                                    <Text style={styles.buttonText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onIncorrect} style={[styles.buttonStyle, {backgroundColor: '#D4271B'}]}>
                                    <Text style={styles.buttonText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                ) : (
                    <View style={styles.container}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 20}}>Score: {correctAnswers}</Text>
                        </View>

                        <View style={styles.actionButtons}>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.startQuiz} style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.backToDeck} style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Back to Deck</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
    actionButtons: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 3
    }
});

export default Quiz;
