import React from 'react'
import Button from '@material-ui/core/Button'

const ContainedButton = props => {
  return (
      <Button variant="contained" {...props} >
        { props.children }
      </Button>
  )
}

export default ContainedButton;