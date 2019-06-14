import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {convertToRaw} from 'draft-js'
import {Redirect} from 'react-router-dom'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {setFlashStr} from 'components/layouts/axios/then_catch_funcs'

export const Footbox = ({onGenChange, reqMethod, frgId, frgName, crsId, editorState}) => {
  /* fragment 作成, 更新 */
  const [redrPath, setRedrPath] = useState(null)

  // start save process
  const onSaveClick = () => {
    const rawFrg = convertToRaw(editorState.getCurrentContent())
    const check = validCheck({frgName, rawFrg})

    // post or patch
    const axiosBy = (method) => {
      if (method === 'post') {
        return axiosRails.post(`/crystals/${crsId}/fragments`, {
          fragment: {name: frgName, content: rawFrg}
        })
      }
      return axiosRails.patch(`/fragments/${frgId}`, {
        fragment: {name: frgName, content: rawFrg, crystal_id: crsId}
      })
    }

    // validation, axios
    if (check[0]) {
      onGenChange(check[1]) // validation エラーメッセージ
    } else {
      axiosBy(reqMethod)
        .then((response) => {
          onGenChange(setFlashStr(response.headers.flash))
          setRedrPath(
            <Redirect
              to={{
                pathname: `/fragments/${response.data.id}`,
                state: response.data
              }}
            />
          ) // リダイレクト
        })
        .catch((error) => {
          onGenChange(setFlashStr(error.response.headers.flash))
        })
    }
  }

  return (
    <div className='frgFoot'>
      {redrPath}
      <button type='button' onClick={onSaveClick}>
        保存
      </button>
    </div>
  )
}

Footbox.propTypes = {
  onGenChange: PropTypes.func,
  reqMethod: PropTypes.string,
  frgId: PropTypes.number,
  frgName: PropTypes.string,
  crsId: PropTypes.number,
  editorState: PropTypes.object
}