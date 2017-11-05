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

                        <View style={[styles.group, {justifyContent: 'flex-start', flex: 1}]}>
                            <View>
                                <Text>{questionsLeft} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={[styles.group, {flex: 4}]}>
                            <View>
                                {showAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[currentCard].answer}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#70dd2f'}}>Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[currentCard].question}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#ff463f'}}>Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.onCorrect}>
                                    <Text style={{
                                        backgroundColor: '#70dd2f',
                                        justifyContent: 'center',
                                        height: 30,
                                        textAlign: 'center',
                                        width: 200
                                    }}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onIncorrect}>
                                    <Text style={{
                                        backgroundColor: '#ff463f',
                                        justifyContent: 'center',
                                        height: 30,
                                        textAlign: 'center',
                                        width: 200,
                                        marginTop: 20
                                    }}>Incorrect</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                ) : (
                    <View style={styles.container}>
                        <Text>Score: {correctAnswers}</Text>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.startQuiz}>
                                    <Text style={{
                                        backgroundColor: '#70dd2f',
                                        justifyContent: 'center',
                                        height: 30,
                                        textAlign: 'center',
                                        width: 200
                                    }}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.backToDeck}>
                                    <Text style={{
                                        backgroundColor: '#ff463f',
                                        justifyContent: 'center',
                                        height: 30,
                                        textAlign: 'center',
                                        width: 200,
                                        marginTop: 20
                                    }}>Back to Deck</Text>
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
    }
});

export default Quiz;
