import React from 'react'
import ReactDOM from 'react-dom'

import App from "./app.jsx"

import '../public/style.css'

window.attachApp = (viewerId, threadType) => {
    const apiUri = `https://${window.location.hostname}`
    let app
    if (viewerId) {
        app = (
            <App
              viewerId={viewerId}
              apiUri={apiUri}
              threadType={threadType}
            />
        )
    } else {
        app = (
            <h1>Unsupported client</h1>
        )
    }
    ReactDOM.render(app, document.getElementById('content'));
}