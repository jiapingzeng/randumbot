import castArray from 'lodash/castArray'
import isEmpty from 'lodash/isEmpty'
import request from 'request'

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 5) => {
    if (!endPoint) {
        console.error('No endpoint specifed')
        return
    }
    if (retries < 0) {
        console.error('No retries left', { endPoint, messageDataArray, queryParams })
        return
    }
    const query = Object.assign({ access_token: PAGE_ACCESS_TOKEN }, queryParams)
    const [messageToSend, ...queue] = castArray(messageDataArray)
    request({
        uri: `https://graph.facebook.com/v2.10/me/${endPoint}`,
        qs: query,
        method: 'POST',
        json: messageToSend
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(`sent message to ${endPoint} endpoint: `, JSON.stringify(body))
            if (!isEmpty(queue)) {
                callAPI(endPoint, queue, queryParams)
            }
        } else {
            console.error(`Failed calling API endpoint ${endPoint}`, response.statusCode, response.statusMessage, body.error, queryParams)
            callAPI(endPoint, messageDataArray, queryParams, retries - 1)
        }
    })
}

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
    return callAPI('messages', messageDataArray, queryParams)
}

const callThreadAPI = (messageDataArray, queryParams = {}) => {
    return callAPI('thread_settings', messageDataArray, queryParams)
}

export default { callMessagesAPI, callThreadAPI }