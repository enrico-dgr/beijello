import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './input.css'
import error from '../../../../assets/images/exclamation (1).png';

class Input extends Component {
    constructor(props) {
        super(props)

        this.state = {
            onFocus: false,
        }
    }

    onChange = (e) => {
        this.props.onChangeCallback(e)
    }

    inputOnFocus = () => {
        this.setState({onFocus:true})
    }

    inputOnBlur = () => {
        this.setState({onFocus:false})

    }



    render() {
        return (
            <div className="input-container" style={{height: this.props.height}}>
                <input 
                    required={ this.props.required ? true : null }
                    type={this.props.type}
                    value={this.props.value}
                    className={'input ' + this.props.className}
                    onChange={this.onChange}
                    onBlur={this.inputOnBlur }
                    onFocus={this.inputOnFocus}
                />
                <span className='input-focus'></span>
                <label className={this.props.value && 'filled'} >
                    {this.props.label}
                </label>

                {!this.state.onFocus && this.props.errorFlag &&
                    <div className='errorMessage'>
                        <span className='errorIsRed'>{this.props.errorText}</span>
                        <img src={error} alt='exclamation' className='errorImg' />
                    </div>
                }
            </div>
        )
    }
}

Input.defaultProps = {
    label: 'input text',
    height: 80,
    onChangeCallback: () => undefined
}

Input.propTypes = {
    label: PropTypes.string,
    onChangeCallback: PropTypes.func
}

export default Input

