import React, { createElement } from 'react'

export default class Coin extends React.Component {
    constructor(props) {
        super(props)
        console.log('coin' + this.props.side)
        this.state = {
            width: 360,
            side: this.props.side, // 0: tails, 1: edge1, 2: heads, 3: edge2
            backgroundPosition: 0,
            stopRotation: true
        }
    }

    componentDidMount() {
        if (this.state.stopRotation) {
            const pos = this.state.backgroundPosition
            this.setState({ backgroundPosition: pos - 360 * 60 })
            console.log(this.state.backgroundPosition)
            this.setDeceleratingTimeout(() => {
                this.rotateCoin()
            }, 2, 3000)
        } else {
            this.setLinearTimeout(() => {
                this.rotateCoin()
            }, 300)
        }
    }

    normalizeBackgroundPosition(p) {
        var n = p
        while (n < 0) {
            n+=360*12
        }
        return n
    }

    setLinearTimeout(callback, interval) {
        var internalCallback = function () {
            return function () {
                window.setTimeout(internalCallback, interval)
                callback()
            }
        }()
        window.setTimeout(internalCallback, 0)
    }

    setDeceleratingTimeout(callback, factor, times) {
        var internalCallback = function (tick, counter) {
            return function () {
                if (--tick >= 0) {
                    window.setTimeout(internalCallback, ++counter * factor)
                    callback()
                }
            }
        }(times, 0)
        window.setTimeout(internalCallback, factor)
    }

    rotateCoin() {
        const pos = this.state.backgroundPosition
        const stop = this.state.stopRotation
        if (!stop) {
            if (pos < 360 * 12) {
                this.setState({ backgroundPosition: pos + 360 })
            } else {
                this.setState({ backgroundPosition: 0 })
            }
        } else {
            const side = this.state.side
            let stopAt = side * 1080
            if (pos == stopAt) {
                console.log('side is ' + side + ' stopped at ' + stopAt)
                return false
            } else if (pos < 360 * 12) {
                this.setState({ backgroundPosition: pos + 360 })
            } else {
                this.setState({ backgroundPosition: 0 })
            }
        }
        return true
    }

    render() {
        const side = this.state.side
        const coinWidth = this.state.width
        let pos = this.state.backgroundPosition
        let style = {
            width: `${coinWidth}px`,
            height: `${coinWidth}px`,
            backgroundImage: 'url(/img/sprites.png)',
            backgroundPosition: `${this.normalizeBackgroundPosition(pos)}px`
        }
        return (
            <div>
                <div style={style}></div>
            </div>
        )
        /*
        return (
            <div className="coin-container">
                <h1>{text}</h1>
                
                <div className="coin"></div>
                <button onClick={() => this.handleClick()}>Flip</button>
                <div className="hidden" onClick={() => this.handleClick()}>{coin}</div>
            </div>
        )
        */
    }
}