import React from 'react'
import PropTypes from 'prop-types'
import {RichUtils} from 'draft-js'

export const InlineStyleBtn = ({styleType, editorState, onEditorChange}) => {
  /* inline style 適用 */
  const onStyleClick = (e) => {
    e.preventDefault()
    onEditorChange(RichUtils.toggleInlineStyle(editorState, styleType))
  }

  return (
    <button type='button' onClick={onStyleClick}>
      {styleType}
    </button>
  )
}

InlineStyleBtn.propTypes = {
  styleType: PropTypes.string,
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}