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
            return 0
        } else if (r < h + t) {
            // heads
            return 2
        } else {
            // edge
            if (Math.floor(r * 100) % 2 == 0) {
                return 1
            } else {
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
        invite = (
            <Invite
                title={`${side}!`}
                apiUri={apiUri}
                imageUrl={`${window.location.protocol}//${window.location.hostname}/img/${side.toString().toLowerCase()}.png`}
                sharingMode={sharingMode}
                buttonText={buttonText}
            />
        )
        let coinWidth = window.innerWidth > 720 ? 360 : window.innerWidth * 0.5
        return (
            <div id='app'>
                <br />
                <br />
                <Coin width={coinWidth} side={result} />
                <div className='center'>
                    <h4>Disclaimer: Highly beta build, probably won't work properly</h4>
                </div>
                <div>{invite}</div>
            </div>
        )
    }

}