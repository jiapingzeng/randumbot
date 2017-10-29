import sendApi from './send'

const handleReceivePostback = (event) => {
    const type = event.postback.payload
    const senderId = event.sender.id

    if (type === 'help') {
        sendApi.sendMessage(senderId, 'Idk')
    } else {
        sendApi.sendMessage(senderId, 'Unknown postback received: ${type}')
    }
}

const handleReceiveMessage = (event) => {
    const message = event.message
    const senderId = event.sender.id
    sendApi.sendReadReceipt(senderId)
    if (message.text) {
        sendApi.sendMessage(senderId, 'Ok')
    }
}

export default { handleReceivePostback, handleReceiveMessage }