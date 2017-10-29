import sendApi from './send'

const handleReceivePostback = (event) => {
    const type = event.postback.payload
    const senderId = event.sender.id

    if (type === 'get_started') {
        sendApi.sendWelcomeMessage(senderId)
    } else if (type === 'help') {
        sendApi.sendMessage(senderId, { text: 'Idk' })
    } else {
        sendApi.sendMessage(senderId, { text: `Unknown postback received: ${type}` })
    }
}

const handleReceiveMessage = (event) => {
    const message = event.message
    const senderId = event.sender.id
    sendApi.sendReadReceipt(senderId)
    if (message.text) {
        sendApi.sendMessage(senderId, { text: 'Ok' })
    }
}

export default { handleReceivePostback, handleReceiveMessage }