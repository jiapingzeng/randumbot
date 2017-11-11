import React, { createElement } from 'react'

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
        switch (s) {
            case 0:
                return 'Tails'
            case 2:
                return 'Heads'
            case 1:
            case 3:
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
        const { apiUri, viewerId, threadType } = this.props
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
                <Coin heads={0.49} tails={0.49} side={2} recordResult={(r) => this.recordResult(r)} />
                <button onClick={() => window.location.reload()}>Flip</button>
                <p>Disclaimer: Highly beta build, visual (coin will always flip to heads) does not match actual result and share might also show different results</p>
                <ol>{sides}</ol>
                <div>{invite}</div>
            </section>
        )
        return (
            <div id='app'>
                {page}
            </div>
        )
    }
}