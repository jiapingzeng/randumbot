import React from 'react'
import ReactDOM from 'react-dom'

import App from "./app.jsx"

window.attachApp = (viewerId, threadType) => {
    const apiUri = 'https://${window.location.hostname}'
    let app
    if (viewerId) {
        app = (
            <App
              viewerId={viewerId}
              apiUri={apiUri}
              threadType={threadType}
            />
        )
    }
    ReactDOM.render(app, document.getElementById('content'));
}