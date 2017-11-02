import React, { createElement } from 'react'

export default class Coin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            side: 0 // 0: heads, 1: tails, 2: edge
        }
    }

    handleClick() {
        this.flipCoin(this.props.heads, this.props.tails)
    }

    // chances of heads and tails (should add up to 1)
    // 1-(h+t) is the chance of the coin landing on its edge
    flipCoin(h, t) {
        const r = Math.random()
        if (r < h) {
            // heads
            this.setState({ side: 0 })
        } else if (r < h + t) {
            // tails
            this.setState({ side: 1 })
        } else {
            // edge
            this.setState({ side: 2 })
        }
        this.props.recordResult(this.state.side)
    }

    render() {
        const side = this.state.side
        let text, coin
        if (this.state.side == 0) {
            text = "Heads"
            coin = (
                <div>
                    <img src="/img/front.png" />
                </div>
            )
        } else if (this.state.side == 1) {
            text = "Tails"
            coin = (
                <div>
                    <img src="/img/back.png" />
                </div>
            )
        } else {
            text = "Edge"
            coin = (
                <div>
                    <img src="/img/edge.png" />
                </div>
            )
        }
        return (
            <div className="coin-container">
                <h1>{text}</h1>
                <div className="coin"></div>
                <button onClick={() => this.handleClick()}>Flip</button>
                <div className="hidden" onClick={() => this.handleClick()}>{coin}</div>
            </div>
        )
    }
}