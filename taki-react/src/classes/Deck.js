import {Card} from './Card.js'
import * as consts from '../Consts.js'

export class Deck {
    constructor() {
        this.cards = [];
        let id = "1";
        for (let i = 0; i < consts.CARDS_VALUE.length - 1; i++) {
            for (let j = 0; j < consts.CARDS_COLOR.length; j++) {
                var card1 = new Card((id++).toString(), consts.CARDS_COLOR[j], consts.CARDS_VALUE[i]);
                var card2 = new Card((id++).toString(), consts.CARDS_COLOR[j], consts.CARDS_VALUE[i]);
                this.cards.push(card1);
                this.cards.push(card2);
            }
        }
        for (let i = 0; i < 4; i++) {
            this.cards.push(new Card((id++).toString(), consts.WHITE_COLOR, consts.CHANGE_COLOR_CARD_VALUE));
        }
        for (let i = 0; i < 2; i++) {
            this.cards.push(new Card((id++).toString(), consts.WHITE_COLOR, consts.SUPER_TAKI));
        }
      
    }


    shuffle() {
        let i = 0;
        let j = 0;
        let temp = null;

        for (i = this.cards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    pop() {
        return this.cards.pop();
    }

    removeFirstNumber() {
        for (let i = 0; i < this.cards.length; i++) {
            if (!isNaN(this.cards[i].value)) {
                return this.cards.splice(i, 1)[0];
            }
        }
        console.error("removeFirstNumber: No card numbers in deck")
    }

     push(card) {
        this.deck.push(card);
    }

}