import React, { createElement } from 'react'

import Coin from './coin.jsx'
import Invite from './invite.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick() {
        //window.alert(`button clicked ${window.location.hostname}`)
    }

    // chances of heads and tails (should add up to 1)
    // 1-(h+t) is the chance of the coin landing on its edge
    flipCoin(h, t) {
        const r = Math.random()
        if (r < h) {
            // tails
            console.log('app tails')
            return 0
        } else if (r < h + t) {
            // heads
            console.log('app heads')
            return 2
        } else {
            // edge
            if (Math.floor(r * 100) % 2 == 0) {
                console.log('app edge 1')
                return 1
            } else {
                console.log('app edge 2')
                return 3
            }
        }
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
        const result = this.flipCoin(0.49, 0.49)
        const side = this.sideToText(result)
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
        console.log(`/img/${side.toString().toLowerCase()}.png`)
        invite = (
            <Invite
                title={side}
                apiUri={apiUri}
                imageUrl={`/img/${side.toString().toLowerCase()}.png`}
                sharingMode={sharingMode}
                buttonText={buttonText}
            />
        )
        return (
            <div id='app'>
                <Coin side={result} />
                <button onClick={() => window.location.reload()}>Flip again</button>
                <p>Disclaimer: Highly beta build things probably won't work properly</p>
                <div>{invite}</div>
            </div>
        )
    }
}