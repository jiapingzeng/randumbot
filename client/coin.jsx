import React, { createElement } from 'react'

export default class Coin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: this.props.width,
            side: this.props.side, // 0: tails, 1: edge1, 2: heads, 3: edge2
            backgroundPosition: 0,
            stopped: true,
            flipping: true
        }
    }

    componentDidMount() {
        const width = this.state.width
        const pos = this.state.backgroundPosition
        this.setState({ backgroundPosition: pos - width * 60 })
        this.setDeceleratingTimeout(() => {
            this.rotateCoin()
        }, 2, 3000)
    }

    normalizeBackgroundPosition(p) {
        const width = this.state.width
        var n = p
        while (n < 0) {
            n += width * 12
        }
        return n
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
        const stopped = this.state.stopped
        const width = this.state.width
        if (!stopped) {
            // rotate non-stop
            if (pos < width * 12) {
                this.setState({ backgroundPosition: pos + width })
            } else {
                this.setState({ backgroundPosition: 0 })
            }
        } else {
            // stop at side
            const side = this.state.side
            let stopAt = side * width * 3
            if (pos == stopAt) {
                this.setState({ flipping: false })
            } else if (pos < width * 12) {
                this.setState({ backgroundPosition: pos + width })
            } else {
                this.setState({ backgroundPosition: 0 })
            }
        }
    }

    sideToText(s) {
        switch (s) {
            case 0:
                return 'Tails'
            case 2:
                return 'Heads'
            case 1:
            case 3:
                return 'Edge'
        }
    }

    render() {
        const side = this.state.side
        const coinWidth = this.state.width
        const flipping = this.state.flipping
        let pos = this.state.backgroundPosition
        let style = {
            width: `${coinWidth}px`,
            height: `${coinWidth}px`,
            backgroundPosition: `${this.normalizeBackgroundPosition(pos)}px`
        }
        return (
            <div className='container'>
                <div id='coin' className='center' style={style}></div>
                <div className='center'>
                    <h1>{flipping ? 'Flipping...' : this.sideToText(side)}</h1>
                    <button className={flipping ? 'hidden button' : 'button'} onClick={() => window.location.reload()}>Flip again</button>
                </div>
            </div>
        )
    }
}