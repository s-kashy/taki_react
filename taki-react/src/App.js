import React, {
    Component
} from 'react';
import {
    TakiEngine
} from './classes/TakiEngine.js'
import {
    Statistics
} from './classes/Statistics.js'
import ComputerPlayerComponent from './ComputerPlayerComponent'
import HumanPlayerComponent from './HumanPlayerComponent'
import DeckComponent from './DeckComponent'
import HeapComponent from './HeapComponent'
import ButtonComponent from './ButtonComponent'
import PlayerStatusComponent from './PlayerStatusComponent'
import * as consts from './Consts.js'
import WinnerComponent from './WinnerComponent'
import StatisticsComponent from './StatisticsComponent'
import './style.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            engine: new TakiEngine(),
            stats : new Statistics()
        };
        this.moves = []
        this.moveIndex = 0
        this.saveState()

        this.totalGameTimeInterval = setInterval(function(){
            this.state.stats.totalGameTime++
            this.refreshStatistics()
        }.bind(this), 1000)

        this.userClickOnDeck = this.userClickOnDeck.bind(this);
        this.userClickOnCard = this.userClickOnCard.bind(this);
        this.refreshGui = this.refreshGui.bind(this);
        this.userColorChoice=this.userColorChoice.bind(this);
        this.changeColorHeapTopCard=this.changeColorHeapTopCard.bind(this);
        this.userClickOnCloseTaki = this.userClickOnCloseTaki.bind(this);
        this.userClickOnQuit = this.userClickOnQuit.bind(this);
        this.playerAddTwoPlus = this.playerAddTwoPlus.bind(this);
        this.checkIfDeckIsEmpty = this.checkIfDeckIsEmpty.bind(this);
        this.checkEndOfGame = this.checkEndOfGame.bind(this);
        this.computerPlay=this.computerPlay.bind(this);
        this.computerPlayLogic=this.computerPlayLogic.bind(this);
        this.computerPlayLogicWithDelay=this.computerPlayLogicWithDelay.bind(this);
        this.afterComputerPlay=this.afterComputerPlay.bind(this);
        this.restartGame=this.restartGame.bind(this);
        this.nextMove=this.nextMove.bind(this);
        this.prevMove=this.prevMove.bind(this);
        this.saveState =this.saveState.bind(this)

        this.checkSingleCard=this.checkSingleCard.bind(this);
        this.guiUpdateStatistics=this.guiUpdateStatistics.bind(this);
        this.guiUpdateAverageTimeForHumanTurn=this.guiUpdateAverageTimeForHumanTurn.bind(this);
        this.updateStartTimeHumanTurn=this.updateStartTimeHumanTurn.bind(this);
        this.refreshStatistics=this.refreshStatistics.bind(this);
    }

    nextMove()
    {
        if(this.moveIndex >= this.moves.length-1)
        {
            alert('no more next')
            return
        }

        this.moveIndex++
        let winner =this.state.engine.winner;
        this.state = this.moves[this.moveIndex]
        this.state.engine.winner=winner;
        this.refreshGui()

        this.refreshStatistics()
    }

    prevMove()
    {
        if(this.moveIndex <= 0)
        {
            alert('no more prev')
            return
        }

        this.moveIndex--
        let winner =this.state.engine.winner;
        this.state = this.moves[this.moveIndex]
        this.state.engine.winner=winner;
        this.refreshGui()
        this.refreshStatistics()
    }

    saveState()
     {
        let objTemp=null;
        objTemp=JSON.parse(JSON.stringify(this.state));
        this.moves.push(objTemp)
    
        this.moveIndex++
    }

    updateStartTimeHumanTurn() {
        this.state.stats.amountOfTurnOfHumanPlayer++;
        this.state.stats.amountOfSecondsOfTurn = this.state.stats.totalGameTime;
    }

    restartGame(){
       this.state.stats=new Statistics();
       this.refreshStatistics()
       this.state.engine = new TakiEngine();
       this.totalGameTimeInterval = setInterval(function(){
        this.state.stats.totalGameTime++
       this.refreshStatistics()
    }.bind(this), 1000)
       this.refreshGui();
   }


    refreshStatistics(){
        this.setState({
            stats : this.state.stats
        })        
    }


   guiUpdateStatistics(id) {

        if (id == consts.STATS_TOTAL_TURN_VALUE) {
           this.state.stats.totalNumTurns++;

       } else if (id == consts.STATS_TIMES_WITH_SINGLE_VALUE) {
            this.state.stats.humanTimesWithSingleCard++;
        }
        this.refreshStatistics();

    }


checkSingleCard() {
    if (this.state.engine.human.cards.length == 1) {
        this.guiUpdateStatistics(consts.STATS_TIMES_WITH_SINGLE_VALUE)
    }
}

guiUpdateAverageTimeForHumanTurn() {

    this.state.stats.totalSecondsOfTurnOfHumanPlayer += this.state.stats.totalGameTime - this.state.stats.amountOfSecondsOfTurn

    let res =this.state.stats.totalSecondsOfTurnOfHumanPlayer / (this.state.stats.amountOfTurnOfHumanPlayer + 1)
    this.state.stats.humanAvgTimeForGamePlay = parseFloat(Math.round(res * 100) / 100).toFixed(2);


    this.refreshStatistics();
}


userColorChoice(event){
    let id = event.target.id
    let choiceIdColor=id;
    this.state.engine.heap.changeTopColor(choiceIdColor);
 
    this.refreshGui();
    this.computerPlay()
}


changeColorHeapTopCard(color) {
    this.state.engine.heap.changeTopColor(color);

    this.refreshGui();

}


randomChoiceOfColor() {
    let x = Math.floor((Math.random() * 4));
    return consts.CARDS_COLOR[x];
}

takeCardFromDeck(humanOrComputer) {
    let card = this.state.engine.deck.pop();
    if (humanOrComputer == consts.HUMAN) {
        this.state.engine.human.addCard(card);
    } else {
        this.state.engine.computer.addCard(card);
    }
    this.checkIfDeckIsEmpty()
    this.refreshGui();
}

checkIfDeckIsEmpty()
{  
    if (this.state.engine.deck.cards.length == 0) {
        this.state.engine.moveHeapToDeck();
        alert('Deck is empty, moving heap to deck and shuffling...')
    }
}



computerPlayLogic() {
    let heapColor = this.state.engine.heap.topCard.color
    let heapValue = this.state.engine.heap.topCard.value;

    let id = this.state.engine.computer.getCardId(function(c) {
        return c.value == consts.TWO_PLUS && (c.color == heapColor || c.value == heapValue);
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card)
        this.state.engine.twoPlus++;
        this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE)

        if (!this.state.engine.human.hasTwoPlus()) {
            this.playerAddTwoPlus(consts.HUMAN);
        
            this.refreshGui();
        
            this.computerPlayLogicWithDelay();
        }
        return;
    }

    id = this.state.engine.computer.getCardId(function(c) {
        return c.value == consts.CHANGE_COLOR_CARD_VALUE;
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card)
        let color = this.randomChoiceOfColor();
        this.refreshGui();  
        this.changeColorHeapTopCard(color);
        return;
    }



    id = this.state.engine.computer.getCardId(function(c) {
        return c == consts.STOP_CARD_VALUE && c.color == heapColor
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card);
    
        this.refreshGui();
     
        this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
        this.refreshGui();
        this.computerPlayLogicWithDelay();
        return;
    }


    id = this.state.engine.computer.getCardId(function(c) {
        return c == consts.PLUS_CARD && c.color == heapColor;
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card);

        this.refreshGui();
        this.computerPlayLogicWithDelay();
        return;

    }

    id = this.state.engine.computer.getCardId(function(c) {
        return c == consts.SUPER_TAKI;
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card)
        this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
        this.changeColorHeapTopCard(heapColor);
      
        this.refreshGui();
   
        if (this.state.engine.top().value == consts.STOP_CARD_VALUE) {
            this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
            this.computerPlayLogicWithDelay();
        }


        return
    }
    id = this.state.engine.computer.getCardId(function(c) {
        return c == consts.TAKI_CARD_VALUE && c.color == heapColor
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card);
        let cards = this.state.engine.computer.removeAllCards(heapColor);
        this.state.engine.heap.putManyOnTop(cards);

        this.refreshGui();
    
        if (this.state.engine.top().value == consts.STOP_CARD_VALUE) {
            this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
            this.computerPlayLogicWithDelay();
        }

        return;
    }
    id = this.state.engine.computer.getCardId(function(c) {
        return c.color == heapColor
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card);
        this.refreshGui();
    
        return;
    }
    id =this.state.engine.computer.getCardId(function(c) {
        return c.value == heapValue;
    });
    if (id != -1) {
        let card = this.state.engine.computer.removeCard(id);
        this.state.engine.heap.putOnTop(card);
        this.refreshGui();
        
        return;
    }
    this.takeCardFromDeck(consts.COMPUTER)
    this.refreshGui();
}
///not understode
computerPlayLogicWithDelay() {
    setTimeout(this.computerPlayLogic, consts.COMPUTER_DELAY_IN_MS);
}

afterComputerPlay() {
   this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
   this.state.engine.isHumanTurn=true;
   this.updateStartTimeHumanTurn();
   this.saveState();

   this.refreshGui();

}

computerPlay() {
    this.state.engine.isHumanTurn = false;
    this.saveState()
    this.refreshGui()

    this.guiUpdateAverageTimeForHumanTurn();

    setTimeout(function() {
        this.computerPlayLogic()
        this.afterComputerPlay()
    }.bind(this), consts.COMPUTER_DELAY_IN_MS);
}

userClickOnDeck() {
        if(this.state.engine.winner!=null)
        {
            return;
        }
    if (this.state.engine.deckDisabled || !this.state.engine.isHumanTurn)
     return;
 let card=this.state.engine.heap.top();
 if (this.state.engine.canTakeCard(card)){
    alert("You can't take a card from the deck when you have a card you can play !!");
    return;
}
this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
this.takeCardFromDeck(consts.HUMAN);

this.refreshGui()
this.computerPlay();
}

userClickOnCard(event) {
        if(this.state.engine.winner!=null)
        {
            return;
        }
    if (!this.state.engine.isHumanTurn) {
        return;
    }

    let id = event.target.id
    let card = this.state.engine.human.getCard(id);
            console.log(card)
    if (!this.state.engine.canPlayWith(card)) {
        alert("Illegal move");
        return
    }

    this.state.engine.heap.putOnTop(card);
    this.state.engine.human.removeCard(id);
    this.checkSingleCard()

    if (card.value == consts.CHANGE_COLOR_CARD_VALUE) {
        this.state.engine.deckDisabled = true;
    } else if (card.value == consts.TAKI_CARD_VALUE) {
        this.state.engine.takiIsOpen = true;
        this.state.engine.deckDisabled = true;
    } else if (card.value == consts.STOP_CARD_VALUE && !this.state.engine.takiIsOpen) {
       this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
   } else if (card.value == consts.PLUS_CARD && !this.state.engine.takiIsOpen) {
            // nothing to do here...
        } else if (card.value == consts.TWO_PLUS) {
            this.state.engine.twoPlus++;
            this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
            if (this.state.engine.computer.hasTwoPlus()) {

                this.computerPlay();
            } else {
                this.playerAddTwoPlus(consts.COMPUTER);
            }
        } else if (card.value == consts.SUPER_TAKI) {

           this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
           this.changeColorHeapTopCard(this.state.engine.heap.secondFromTheTop().color);
           this.state.engine.takiIsOpen = true;
           this.state.engine.deckDisabled = true;

       } else if (!this.state.engine.takiIsOpen) {
            // regular card
            this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
            this.computerPlay();
        }

        this.refreshGui()
    }

    playerAddTwoPlus(humanOrComputer){
        for(let i=0;i<this.state.engine.twoPlus*2;i++){
            this.takeCardFromDeck(humanOrComputer);
        }
        this.state.engine.twoPlus=0;
        this.refreshGui();
    }

    refreshGui() {
        this.setState({
            engine: this.state.engine
        })
    }

    userClickOnCloseTaki(){
        if(this.state.engine.winner!=null)
        {
            return;
        }
        this.state.engine.takiIsOpen=false;
        this.state.engine.deckDisabled=false;
        this.refreshGui();

        let heapTopCard = this.state.engine.heap.topCard;
        if (heapTopCard.value == consts.STOP_CARD_VALUE) {
          this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
      } else if (heapTopCard.value == consts.PLUS_CARD) {
            // nothing to do here...
        } else {
           this.guiUpdateStatistics(consts.STATS_TOTAL_TURN_VALUE);
           this.computerPlay();
       }
   }


   userClickOnQuit(){
    this.state.engine.winner=consts.COMPUTER;
    this.refreshGui();
}

checkEndOfGame(){
    if (this.state.engine.winner != null){
        return consts.COMPUTER;
    }
    let resHuman = this.state.engine.human.cards.length;
    let resComputer = this.state.engine.computer.cards.length;
    if (resHuman == 0) {
        return consts.HUMAN
    } else if (resComputer == 0) {
        return consts.COMPUTER
    }
    return null
}

render() {
    let winner = this.checkEndOfGame()
    let retVal = []
    if(winner != null)
    {
        clearInterval(this.totalGameTimeInterval)

        retVal.push((<div key ="WinnerDiv">
            <WinnerComponent name={winner} />
            <ButtonComponent key="RestartGame" className="startAgain"  onButtonClick={this.restartGame} name="Restart Game" visible={true} />
            </div>));
    }
             retVal.push(( <div id = "con" >
            <PlayerStatusComponent name="Computer Player" numCards={this.state.engine.computer.cards.length} yourTurn={!this.state.engine.isHumanTurn} />
            <ComputerPlayerComponent card = {
            this.state.engine.computer.cards} />

            <div id = "middle" >

            < div id = "leftMain" >
            <HeapComponent topCard={ this.state.engine.heap.topCard} clickOnColor={this.userColorChoice} />
            </div>
            <ButtonComponent key="prevMove" className="selector"  onButtonClick={this.prevMove} name="Prev Move" visible={this.state.engine.winner!=null} />
            <ButtonComponent key="NextMove" className="selector"  onButtonClick={this.nextMove} name="Next Move" visible={this.state.engine.winner!=null} />

            < div id = "rightMain" >

            < DeckComponent onCardClick = {this.userClickOnDeck } /> <  /div>
            < /div> 
            <PlayerStatusComponent name="Human Player" numCards={this.state.engine.human.cards.length} yourTurn={this.state.engine.isHumanTurn} />
            < HumanPlayerComponent card = {this.state.engine.human.cards }onCardClick = { this.userClickOnCard }  /> 
            <ButtonComponent key="closeTaki" className="selector" onButtonClick={this.userClickOnCloseTaki} name="Close Taki" visible={this.state.engine.takiIsOpen} />
            
            <ButtonComponent key="Quit" className="selector" onButtonClick={this.userClickOnQuit} name="Quit" visible={this.state.engine.winner==null} />
            <div >
            <StatisticsComponent totalNumTurns={this.state.stats.totalNumTurns} humanTimesWithSingleCard={this.state.stats.humanTimesWithSingleCard}
            humanAvgTimeForGamePlay={this.state.stats.humanAvgTimeForGamePlay}  
            totalGameTime={this.state.stats.totalGameTime}  />
            </div>
            </div>

            ));


    return retVal
}

}

export default App;