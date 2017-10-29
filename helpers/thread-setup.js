import api from './api'

const APP_URL = process.env.APP_URL

const domainWhitelisting = () => {
    api.callThreadAPI({
        setting_type: 'domain_whitelisting',
        whitelisted_domains: [APP_URL],
        domain_action_type: 'add'
    }, {
        fields: 'whitelisted_domains'
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

export default { domainWhitelisting, getStartedButton }