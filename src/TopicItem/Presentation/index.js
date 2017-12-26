import React from 'react'
import { object, func, string } from 'prop-types'

const Input = props => {
  return (
    <input
      data-test={`${props.topic.id}-input`}
      type={props.getInputType()}
      onClick={props.handleClick}
      onMouseDown={props.handleMouseDown}
      onChange={props.handleChange}
      onKeyPress={props.handleKeyPress}
      onBlur={props.handleBlur}
      style={props.styles}
      value={props.tag}
    /> 
  )
}

Input.propTypes = {
  getInputType: func,
  handleClick: func,
  handleMouseDown: func,
  handleChange: func,
  handleKeyPress: func,
  handleBlur: func,
  styles: object,
  tag: string,
  topic: object
}

export default Input