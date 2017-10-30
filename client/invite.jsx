import React from 'react'

import messages from '../helpers/messages'

const Invite = ({ title, apiUri, sharingMode, buttonText, imgSource = 'randumbot.png' }) => {
    const share = () => {
        window.MessengerExtentions.beginShareFlow(
            function success(response) {
                if (response.is_sent) {
                    window.MessengerExtensions.requestCloseBrowser(null, null)
                }
            }, function error(errorCode, errorMessage) {
                console.error({ errorCode, errorMessage })
            }, messages.shareMessage(apiUri, title, imgSource),
            sharingMode
        )
    }

    return (
        <div id='invite'>
            <button onClick={share()}>
                {buttonText}
            </button>
        </div>
    )
}

Invite.PropTypes = {
    share: React.PropTypes.func.isRequired
}

export default Invite