const APP_URL = process.env.APP_URL

const createOpenAppButton = (buttonText = 'Okay') => {
    return {
        type: 'web_url',
        title: buttonText,
        url: APP_URL,
        messenger_extensions: true,
        webview_height_ratio: 'compact'
    }
}

const createHelpButton = () => {
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
                    createHelpButton()
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

export default { createOpenAppButton, createHelpButton, welcomeMessage, openAppMessage }