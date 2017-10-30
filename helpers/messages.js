const APP_URL = process.env.APP_URL

const openAppButton = (buttonText = 'Okay') => {
    return {
        type: 'web_url',
        title: buttonText,
        url: APP_URL,
        messenger_extensions: true,
        webview_height_ratio: 'tall'
    }
}

const helpButton = () => {
    return {
        type: 'postback',
        title: 'How?',
        payload: 'help'
    }
}

const welcomeMessage = () => {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'Ready to try the RandumBot chat extension?',
                buttons: [
                    helpButton()
                ]
            }
        }
    }
}

const openAppMessage = () => {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'Let\'s try opening the web view',
                buttons: [
                    openAppButton()
                ]
            }
        }
    }
}

const shareMessage = (apiUri, title, imgSource) => {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [{
                    title: title,
                    image_url: `https://i.imgur.com/r1d2XyA.png`,
                    subtitle: 'I am a dum bot',
                    default_action: {
                        type: 'web_url',
                        url: apiUri,
                        messenger_extensions: true
                    },
                    buttons: [
                        openAppButton()
                    ]
                }]
            }
        }
    }
}

export default { welcomeMessage, openAppMessage, shareMessage }