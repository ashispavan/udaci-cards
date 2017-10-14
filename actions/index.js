
export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

export const getDecks = decks => ({
    type: FETCH_DECKS,
    decks
});

export const addDeck = deck => ({
    type: ADD_NEW_DECK,
    deck
});

export const addQuestion = params => ({
    type: ADD_NEW_QUESTION,
    params
});