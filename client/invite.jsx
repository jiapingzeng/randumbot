import React from 'react'

import messages from '../helpers/messages'

const Invite = ({ title, apiUri, sharingMode, buttonText, imgSource = 'randumbot.png' }) => {
    const shareCoin = () => {
        window.MessengerExtensions.beginShareFlow(
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
            <button onClick={shareCoin}>
                {buttonText}
            </button>
        </div>
    )
}

/*Invite.PropTypes = {
    shareCoin: React.PropTypes.func.isRequired
}*/

export default Invite