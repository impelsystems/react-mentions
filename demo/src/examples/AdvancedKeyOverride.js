import React from 'react'
import { compose, withHandlers } from 'recompose'

import { MentionsInput, Mention } from '../../../src'

import { provideExampleValue } from './higher-order'

import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'

import { merge } from '../../../src/utils'

const style = merge({}, defaultStyle, {
  suggestions: {
    list: {
      maxHeight: 100,
      overflow: 'auto',
      position: 'absolute',
      bottom: 14,
    },
  },
})

const KEY = { TAB: 9, RETURN: 13, ESC: 27, UP: 38, DOWN: 40, RIGHT: 39, LEFT: 27 }
const onKeyDownOverride = (ev, { clearSuggestions, shiftFocus, selectFocused, state }) => {
  
  console.log("onKeyDownOverride", ev.keyCode, state)

  switch (ev.keyCode) {
    case KEY.ESC: {
      clearSuggestions()
      return
    }
    case KEY.DOWN: {
      shiftFocus(+1)
      return
    }
    case KEY.UP: {
      shiftFocus(-1)
      return
    }
    case KEY.RIGHT: {
      console.log("Right clicked, do something custom")
      return
    }
    case KEY.RETURN: {
      selectFocused()
      return
    }
    case KEY.TAB: {
      selectFocused()
      return
    }
    default: {
      return
    }
  }

}

function AdvancedKeyOverride({ value, data, onChange, onBlur, onAdd }) {
  let inputEl = React.createRef()
  return (
    <div className="advanced">
      <h3>Key press override in suggestions</h3>

      <MentionsInput
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
        onKeyDownOverride={onKeyDownOverride}
        inputRef={inputEl}
      >
        <Mention
          markup="{{__id__}}"
          displayTransform={id => `<-- ${id} -->`}
          data={data}
          onAdd={onAdd}
          style={defaultMentionStyle}
        />
      </MentionsInput>

      <button
        onClick={() => {
          inputEl.current.focus()
        }}
      >
        focus programmatically
      </button>
    </div>
  )
}

export default compose(
  provideExampleValue('Hi {{johndoe}}!'),
  withHandlers({
    onBlur: () => (ev, clickedOnSuggestion) => {
      if (!clickedOnSuggestion) {
        console.log('finished editing')
      }
    },
  })
)(AdvancedKeyOverride)
