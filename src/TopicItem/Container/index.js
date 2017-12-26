import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, array } from 'prop-types'
import { isEnter } from '../helpers'
import Input from '../Presentation'
import { updateTag } from '../actions/creators'

class TopicItem extends Component {

  state = {
    isInputTypeText: false,
    tag: this.props.topic.tag
  }

  updateTopic = (...properties) => {
    return Object.assign(
      {}, 
      this.props.topic, 
      ...properties)
  }

  getInputType = () => {
    let { isInputTypeText } = this.state

    if(isInputTypeText) {
      return 'text'
    } else {
      return 'button'
    }
  }

  toggleIsInputTypeText = () => {
    this.setState(({ isInputTypeText }) => (
      { isInputTypeText: !isInputTypeText }
    ))
  }

  handleMouseDown = event => {
    this.props.handleMouseDown(this.props.topic, this.props.motionStyles)
  }

  handleClick = event => {
    var { isInputTypeText } = this.state
    if(!isInputTypeText) {
      this.toggleIsInputTypeText()
    }
  }

  handleChange = event => {
    let { value: tag } = event.target
    this.setState({ tag })
  }

  handleKeyPress = event => {
    let { key } = event
    if(isEnter(key)) {
      event.preventDefault()
      this.toggleIsInputTypeText()

      let topic = this.updateTopic({ tag: this.state.tag })
      this.props.updateTopic(this.updateTopic({ tag: this.state.tag }))
    }   
  }

  handleBlur = event => {
    var { isInputTypeText } = this.state
    if(isInputTypeText) {
      this.toggleIsInputTypeText()

      let topic = this.updateTopic({ tag: this.state.tag })
      this.props.updateTopic(topic)
    }
  }

  render() {
    let styles = this.props.applyTopicItemStyle(this.props.motionStyles, this.props.topic)
    return (
      <Input
        getInputType={this.getInputType}
        handleClick={this.handleClick}
        handleMouseDown={this.handleMouseDown}
        handleChange={this.handleChange}
        handleKeyPress={this.handleKeyPress}
        handleBlur={this.handleBlur}
        styles={styles}
        tag={this.state.tag}
        topic={this.props.topic}
      /> 
    )
  }
}

TopicItem.propTypes = {
  topics: array,
  topic: object,
  handleMouseDown: func,
  applyTopicItemStyle: func,
  motionStyles: object,
  updateTopic: func
}

const mapState = state => state

const mapDispatch = dispatch => ({
  updateTopic: topic => dispatch(updateTag(topic))
})

export const Unwrapped = TopicItem

export default connect(mapState, mapDispatch)(TopicItem)