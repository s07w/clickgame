import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
    state = {
        cards,
        clickedCardIds: [],
        score: 0,
        goal: 9,
        status: ""
    };

    shuffleScoreCard = id => {
        let clickedCardIds = this.state.clickedCardIds;

        if (clickedCardIds.includes(id)) {
            this.setState({ clickedCardIds: [], score: 0, status: "Game over! Click to play again"});
            return;
        } else {
            clickedCardIds.push(id)

            if(clickedCardIds.length === 9) {
                this.setState({score: 9, status: " 🎉 You won! Nice job. Click to play again. 🎊", clickedCardIds: []});
                console.log("Winner");
                return;
            }

            this.setState({cards, clickedCardIds, score: clickedCardIds.length, status: "" });

            for (let i = cards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }
    }

    render() {
        return (
            <div className = "App">
                <header className="App-header">
                    <h1 className="App-title">Clicky Game</h1>
                    <p className="App-intro">
                    Try not to click the same image twice
                    </p>
                </header>
                <Score total={this.state.score}
                goal={9}
                status={this.state.status}
                />
                <Wrapper>
                    {this.state.cards.map(card => (
                        <Card
                            shuffleScoreCard = {this.shuffleScoreCard}
                            id={card.id}
                            key={card.id}
                            image={card.image}
                            />
                    ))}
                </Wrapper>
            </div>
        );
    }
}

export default App;