import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {EditorState, AtomicBlockUtils} from 'draft-js'
import {InlineStyleButton} from 'components/fragments/rich_editor/toolbox/inline_style_button'
import {BlockStyleButton} from 'components/fragments/rich_editor/toolbox/block_style_button'
import {AtomicButton} from 'components/fragments/rich_editor/toolbox/atomic_button'
import {UrlInput} from 'components/fragments/rich_editor/toolbox/url_input'

export const Toolbox = (props) => {
  const {editorState, onEditorChange} = props
  const [mediaUrlParams, setMediaUrlState] = useState({
    showUrlInput: false,
    urlType: '',
    urlVal: ''
  })

  /* メディアURL 更新準備 */
  this.onAddMediaUrlInput = (mediaType) => {
    setMediaUrlState({showUrlInput: true, urlType: mediaType, urlVal: ''})
  }

  /* メディアURL 更新 */
  this.onAddMediaUrl = (mediaUrl) => {
    setMediaUrlState((mediaUrlParams) => ({
      ...mediaUrlParams,
      urlVal: mediaUrl
    }))
  }

  /* メディア更新 */
  this.onMediaChange = () => {
    const {urlType, urlVal} = mediaUrlParams
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      {urlVal: urlVal}
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    // 引数なしでできるか検証
    setMediaUrlState((mediaUrlParams) => ({
      ...mediaUrlParams,
      showUrlInput: false,
      urlVal: ''
    }))

    // エディタステイト 更新
    onEditorChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    )
  }

  return (
    <div>
      <InlineStyleButton styleType={'BOLD'} {...props} />
      <InlineStyleButton styleType={'ITALIC'} {...props} />
      <BlockStyleButton styleType={'paragraph'} {...props} />
      <BlockStyleButton styleType={'inSection'} {...props} />
      <BlockStyleButton styleType={'header-one'} {...props} />
      <BlockStyleButton styleType={'header-two'} {...props} />
      <BlockStyleButton styleType={'header-three'} {...props} />
      <BlockStyleButton styleType={'ordered-list-item'} {...props} />
      <BlockStyleButton styleType={'unordered-list-item'} {...props} />
      <BlockStyleButton styleType={'blockquote'} {...props} />
      <BlockStyleButton styleType={'code-block'} {...props} />
      <AtomicButton
        mediaType={'image'}
        onAddMediaUrlInput={this.onAddMediaUrlInput}
      />
      <AtomicButton
        mediaType={'audio'}
        onAddMediaUrlInput={this.onAddMediaUrlInput}
      />
      <AtomicButton
        mediaType={'video'}
        onAddMediaUrlInput={this.onAddMediaUrlInput}
      />
      <UrlInput
        showUrlInput={mediaUrlParams.showUrlInput}
        urlVal={mediaUrlParams.urlVal}
        onAddMediaUrl={this.onAddMediaUrl}
        onMediaChange={this.onMediaChange}
      />
    </div>
  )
}

Toolbox.propTypes = {
  editorState: PropTypes.object,
  onEditorChange: PropTypes.func
}