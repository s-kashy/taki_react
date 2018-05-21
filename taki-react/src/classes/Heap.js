
export class Heap {
    constructor() {
        this.cards = []
        this.topCard = null
    }


    putOnTop(card) {
        this.cards.push(card);
        this.topCard=card
    }

    putManyOnTop(cards) {
        for (let i = 0; i < this.cards.length; i++) {
            this.putOnTop(cards[i]);
        }
    }

    top() {
        return this.topCard;
    }

    changeTopColor(color) {
        this.topCard.color = color;
    }

    secondFromTheTop() {
        return this.cards[this.cards.length - 2];
    }
}