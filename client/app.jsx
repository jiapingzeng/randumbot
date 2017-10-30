import React, { createElement } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Coin from './coin.jsx'
import Invite from './invite.jsx'

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

    sideToText(s) {
        switch (side) {
            case 0:
                return 'Heads'
            case 1:
                return 'Tails'
            case 2:
                return 'Edge'
        }
    }

    render() {
        // generate page
        const history = this.state.history
        const current = history[history.length - 1]
        const sides = history.map((side, i) => {
            return (
                <li key={i}>{this.sideToText(side)}</li>
            )
        })

        // invite button
        let invite, sharingMode, buttonText
        if (threadType === 'USER_TO_PAGE') {
            sharingMode = 'broadcast';
            buttonText = 'Invite your friends to this list';
        } else {
            sharingMode = 'current_thread';
            buttonText = 'Send to conversation';
        }
        invite = (
            <Invite
                title={`${this.sideToText(current)}!`}
                apiUri={apiUri}
                sharingMode={sharingMode}
                buttonText={buttonText}
            />
        )

        let page
        // need to figure out how to include history in tiny UI
        page = (
            <section>
                <h1>Tap on coin</h1>
                <Coin heads={0.49} tails={0.49} recordResult={(r) => this.recordResult(r)} />
                <ol>{/* sides */}</ol>
                {invite}
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