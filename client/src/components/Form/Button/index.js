import React from 'react'
import Button from '@material-ui/core/Button'

const ContainedButton = props => {
  const { color, ...restProps } = props
  return (
      <Button variant="contained" color={ color || 'primary' } { ...restProps } >
        { props.children }
      </Button>
  )
}

export default ContainedButton;