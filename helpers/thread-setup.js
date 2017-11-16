import api from './api'

const APP_URL = process.env.APP_URL

const domainWhitelisting = () => {
    api.callThreadAPI({
        setting_type: 'domain_whitelisting',
        whitelisted_domains: [APP_URL],
        domain_action_type: 'add'
    })
}

const getStartedButton = () => {
    api.callThreadAPI({
        setting_type: 'call_to_actions',
        thread_state: 'new_thread',
        call_to_actions: [{
            payload: 'get_started',
        }]
    })
}

const setHomeUrl = () => {
    api.callThreadAPI({
        url: APP_URL,
        webview_height_ratio: 'tall',
        webview_share_button: 'hide',
        in_test: false
    })
}

export default { domainWhitelisting, getStartedButton, setHomeUrl }