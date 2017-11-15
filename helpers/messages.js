const APP_URL = process.env.APP_URL

const openAppButton = (apiUri = APP_URL, buttonText = 'Okay') => {
    return {
        type: 'web_url',
        title: buttonText,
        url: apiUri,
        messenger_extensions: true,
        webview_height_ratio: 'compact'
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

const shareMessage = (apiUri, title, imageUrl) => {
    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'generic',
                elements: [{
                    title: title,
                    image_url: imageUrl,
                    subtitle: 'I just flipped a coin for ya!',
                    default_action: {
                        type: 'web_url',
                        url: apiUri,
                        messenger_extensions: true
                    }
                }]
            }
        }
    }
}

export default { welcomeMessage, openAppMessage, shareMessage }