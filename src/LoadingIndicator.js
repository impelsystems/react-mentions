import React from 'react'
import { defaultStyle } from './useStyles'

function LoadingIndicator({ style }) {
  const spinnerStyle = style('spinner')
  return (
    <div {...style}>
      <div {...spinnerStyle}>
        <div {...spinnerStyle(['element', 'element1'])} />
        <div {...spinnerStyle(['element', 'element2'])} />
        <div {...spinnerStyle(['element', 'element3'])} />
        <div {...spinnerStyle(['element', 'element4'])} />
        <div {...spinnerStyle(['element', 'element5'])} />
      </div>
    </div>
  )
}

const styled = defaultStyle({})

export default styled(LoadingIndicator)
