
import * as consts from '../Consts.js'
export class Player {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(id) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == id) {
                return this.cards.splice(i, 1)[0];
            }
        }
        return null
    }

    hasTwoPlus() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].value ==consts.TWO_PLUS) {
                return true;
            }
        }
        return false;
    }

    getCard(id) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].id == id) {
                return this.cards[i]
            }
        }
        return null
    }

    getCardId(predicate) {
        for (let i = 0; i < this.cards.length; i++) {
            if (predicate(this.cards[i])) {
                return this.cards[i].id
            }
        }
        return -1
    }

    removeCardWithColor(color) {
        for (let i = 0; i < this.cards.length; i++) {
            if (color == this.cards[i].color) {
                return this.removeCard(this.cards[i].id)
            }
        }
        return null
    }

    removeAllCards(color) {
        let removedCards = []
        let card = this.removeCardWithColor(color)
        while (card != null) {
            removedCards.push(card)
            card = this.removeCardWithColor(color)
        }
        return removedCards
    }
}