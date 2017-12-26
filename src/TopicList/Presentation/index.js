import React, { Component } from 'react'
import { array, func, object } from 'prop-types'
import { Motion } from 'react-motion'

import TopicItem from '../../TopicItem/Container'

export default class TopicList extends Component {

  setStaticStyles = () => ({
    display: 'block'
  })

  setDynamicStyles = (motionStyles, topic) => {
    var { scale, shadow, y } = motionStyles

    return {
      boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
      WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
      zIndex: topic === this.props.originalPosOfLastPressed ? 99 : topic,
    }
  }

  applyTopicItemStyle = (motionStyles, topic) => {
    return Object.assign(
      {}, 
      this.setStaticStyles(), 
      this.setDynamicStyles(motionStyles, topic))
  }

  renderTopicItem = topic => (
    <Motion
      key={topic.id} 
      style={this.props.getStyle(topic)}>
      {motionStyles => (
        <TopicItem
          topic={topic}
          motionStyles={motionStyles}
          applyTopicItemStyle={this.applyTopicItemStyle}
          {...this.props}
        />
      )}
    </Motion>   
  )
  
  renderTopicList = topics => {
    return topics.map(topic => this.renderTopicItem(topic))
  }

  render() {
    let { topics } = this.props

    return (
      <aside>
        <form>
          {this.renderTopicList(topics)}
        </form>
      </aside>
    )
  }
}

TopicList.propTypes = {
  topics: array,
  originalPosOfLastPressed: object,
  getStyle: func
}

