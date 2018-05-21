import {Deck} from './Deck.js'
import {Player} from './Player.js'
import {Heap} from './Heap.js'
import * as consts from '../Consts.js'

export class TakiEngine {
    constructor() {
        this.heap = new Heap()
        this.deck = new Deck()
        this.human = new Player()
        this.computer = new Player()
        this.isHumanTurn= true
        this.deckDisabled=false
        this.blockPlayer =false
        this.takiIsOpen = false
        this.winner=null
        this.hasCard=false;
        this.twoPlus=0
        this.deck.shuffle();
        this.dealCards() 
        this.oneCardFromDeckToHeap();       
    }   

    moveHeapToDeck(){
        let cards = this.heap.cards.splice(0, this.heap.cards.length - 1)
        for (let i = 0; cards.length; i++) {
            if (cards[i].value == consts.CHANGE_COLOR_CARD_VALUE) {
                cards[i].color = consts.WHITE_COLOR;
            }
            this.deck.push(cards[i]);
        }
        this.deck.shuffle(); 
    }

    oneCardFromDeckToHeap() {
        let card = this.deck.removeFirstNumber();
        this.heap.putOnTop(card);
    }
    canTakeCard(topHeap){

        for(let i=0;i<this.human.cards.length;i++){
            if (topHeap.color ==this.human.cards[i].color ||topHeap.value ==this.human.cards[i].value){
                return true;
            }
        }
        return false;

    }

    canPlayWith(card) {
        let heapTopCard = this.heap.top();


        if (this.takiIsOpen) {
            return heapTopCard.color == card.color
        }
        
        if (this.twoPlus > 0) {
            if (card.value == consts.TWO_PLUS) {
                return true;
            }

            return false;
        }
        if (card.value == consts.SUPER_TAKI) {
            return true;
        }
        if (card.value == consts.CHANGE_COLOR_CARD_VALUE) {
            return true;
        }
        if (heapTopCard.color == card.color) {
            return true;
        }
        if (heapTopCard.value == card.value) {
            return true;
        }
        return false;
    }

    dealCards() {
        for (let i = 0; i < consts.INIT_NUM_CARDS; i++) {
            this.human.addCard(this.deck.pop());
            this.computer.addCard(this.deck.pop());
        }

    }
}