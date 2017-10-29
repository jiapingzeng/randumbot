import castArray from 'lodash/castArray'

import messages from './messages'
import api from './api'

const APP_URL = process.env.APP_URL

const typingOn = (recipientId) => {
    return {
        recipient: {
            id: recipientId
        },
        sender_action: 'typing_on'
    }
}

const typingOff = (recipientId) => {
    return {
        recipient: {
            id: recipientId
        },
        sender_action: 'typing_off'
    }
}

const messageToJson = (recipientId, messagePayload) => {
    return {
        recipient: {
            id: recipientId
        },
        message: messagePayload
    }
}

const sendMessage = (recipientId, messagePayloads) => {
    const messagePayloadArray = castArray(messagePayloads).map((messagePayload) => messageToJson(recipientId, messagePayload))
    api.callMessagesAPI([
        typingOn(recipientId),
        ...messagePayloadArray,
        typingOff(recipientId)
    ])
}

const sendReadReceipt = (recipientId) => {
    const messageData = {
        recipient: {
            id: recipientId
        },
        sender_action: 'mark_seen'
    }
    api.callMessagesAPI(messageData)
}

const sendWelcomeMessage = (recipientId) => {
    sendMessage(recipientId, messages.welcomeMessage())
}

export default { sendMessage, sendReadReceipt, sendWelcomeMessage }