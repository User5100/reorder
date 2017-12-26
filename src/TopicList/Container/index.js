import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, array } from 'prop-types'
import List from '../Presentation'
import { spring } from 'react-motion'

import data from '../../../data'
import {
  clamp,
  reinsert
} from '../helpers'
import {
  loadTags,
  updateOrderOfTags
} from '../actions/creators'

class TopicList extends Component {
  
  state = {
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    originalPosOfLastPressed: {}
  }

  springConfig = { stiffness: 300, damping: 50 }

  getStyle = i => {
    var { originalPosOfLastPressed, isPressed, mouseY } = this.state
    if(originalPosOfLastPressed === i && isPressed) {
      return {
        scale: spring(1.1, this.springConfig),
        shadow: spring(16, this.springConfig),
        y: mouseY
      }
    } else {
      return {
        scale: spring(1, this.springConfig),
        shadow: spring(1, this.springConfig),
        y: spring(this.props.topics.indexOf(i) * 40, this.springConfig)
      }
    }
  }

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, originalPosOfLastPressed } = this.state
    const topics = this.props.topics
    if(isPressed) {
      const mouseY = pageY - topDeltaY
      const currentRow = clamp(Math.round(mouseY / 40), 0, topics.length - 1)
      let newTopics = topics
      if(currentRow !== topics.indexOf(originalPosOfLastPressed)){
        newTopics = reinsert(topics, topics.indexOf(originalPosOfLastPressed), currentRow)
      }

      this.setState({ mouseY })
      this.props.updateOrderOfTags(newTopics)
    }
  }

  handleMouseDown = (pos, { y }) => {
    this.setState({
      topDeltaY: y - y/2,
      mouseY: y,
      isPressed: true,
      originalPosOfLastPressed: pos,
    })
  }

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 })
  }

  componentDidMount() {
    this.props.loadTags(data.tags)

    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { mouseY, 
            isPressed, 
            originalPosOfLastPressed
          } = this.state

    return (
      <List
        getStyle={this.getStyle}
        mouseY={mouseY}
        isPressed={isPressed}
        originalPosOfLastPressed={originalPosOfLastPressed}
        topics={this.props.topics}
        handleMouseDown={this.handleMouseDown}
        handleTouchStart={this.handleTouchStart}
        springConfig={this.springConfig}
      />
    )
  }
}

TopicList.propTypes = {
  topics: array,
  updateOrderOfTags: func,
  loadTags: func
}

const mapState = state => state

const mapDispatch = dispatch => ({
  loadTags: topics => dispatch(loadTags(topics)),
  updateOrderOfTags: topics => dispatch(updateOrderOfTags(topics))
})

export const Unwrapped = TopicList

export default connect(mapState, mapDispatch)(TopicList)