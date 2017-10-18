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

export function initialData() {
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    return data;
}


export function addNewDeck(deck) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(deck));
}

export function addCardToDeck({deck, card}) {
    return AsyncStorage.getItem(DECKS_KEY, (error, result) => {
        let decks = JSON.parse(result);

        let questions = JSON.parse(JSON.stringify(decks[deck].questions));
        questions.push(card);

        const newCard = JSON.stringify({
            [deck]: {title: deck, questions: questions},
        });

        AsyncStorage.mergeItem(DECKS_KEY, newCard);
    });
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY).then(results => {
        return results === null ? initialData() : JSON.parse(results)
    });
}




