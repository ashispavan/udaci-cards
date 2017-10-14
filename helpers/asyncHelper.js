import {AsyncStorage} from 'react-native';

export const DECKS_KEY = 'cards';

let data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer:
                    'The combination of a function and the lexical environment within which that function was declared.',
            }
        ]
    }
};

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY).then(results => {
        console.log(JSON.parse(results));
        return results === null ? initialData() : JSON.parse(results)
    });
}


export function initialData() {
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    return data;
}


