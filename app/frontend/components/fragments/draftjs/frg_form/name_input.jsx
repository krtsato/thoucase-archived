import React from 'react'
import PropTypes from 'prop-types'

export const NameInput = ({frgName, setFrgVals, editorFocus}) => {
  /* frgName 更新 */
  const onNameChange = (e) => {
    const val = e.target.value
    setFrgVals((unChanged) => ({...unChanged, frgName: val}))
  }

  /* focus Enter 切替 */
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      editorFocus()
    }
  }

  return (
    <div className='frgName'>
      <label htmlFor='frgName'>
        フラグメント名
        <input
          id='frgName'
          type='text'
          required
          autoFocus
          value={frgName}
          onChange={onNameChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  )
}

NameInput.propTypes = {
  frgName: PropTypes.string,
  setFrgVals: PropTypes.func,
  editorFocus: PropTypes.func
}
