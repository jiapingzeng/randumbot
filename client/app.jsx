import React, { createElement } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class App extends React.Component {
    render() {
        let page
        page = (
            <h1>test</h1>
        )
        return (
            <div id='app'>
                <ReactCSSTransitionGroup
                    transitionName='page'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {page}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}