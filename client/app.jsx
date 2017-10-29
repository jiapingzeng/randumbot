import React, { createElement } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Coin from './coin.jsx'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            history: []
        }
    }

    handleClick() {
        //window.alert(`button clicked ${window.location.hostname}`)
    }

    recordResult(r) {
        this.setState({
            history: this.state.history.concat([r])
        })
    }

    render() {
        const history = this.state.history
        const sides = history.map((side, i) => {
            let text
            switch (side) {
                case 0:
                    text = 'Heads'
                    break
                case 1:
                    text = 'Tails'
                    break
                case 2:
                    text = 'Edge'
                    break
            }
            return (
                <li key={i}>{text}</li>
            )
        })
        let page
        // need to figure out how to include history in tiny UI
        page = (
            <section>
                <h1>Tap on coin</h1>
                <Coin heads={0.49} tails={0.49} recordResult={(r) => this.recordResult(r)} />
                <ol>{/* sides */}</ol>
            </section>
        )
        return (
            <div id='app'>
                <ReactCSSTransitionGroup
                    transitionName='page'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {page}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}