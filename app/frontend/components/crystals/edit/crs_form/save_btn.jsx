import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {FlashContext, InvldContext} from 'components/layouts/app/context'
import {axiosRails} from 'components/layouts/axios/instances'
import {validCheck} from 'components/layouts/axios/validate'
import {transFlash} from 'components/layouts/axios/then_catch_funcs'

export const SaveBtn = ({crsVals}) => {
  const {crsId, crsName, shwId} = crsVals
  const {setFlashMsg} = useContext(FlashContext)
  const {setInvldMsg} = useContext(InvldContext)
  const [redrPath, setRedrPath] = useState(null)

  const onSaveClick = () => {
    const check = validCheck({crsName})

    // validation, axios
    if (check[0]) {
      setInvldMsg(check[1]) // validation エラーメッセージ
    } else {
      axiosRails
        .patch(`/crystals/${crsId}`, {
          crystal: {name: crsName, showcase_id: shwId}
        })
        .then((response) => {
          setFlashMsg(transFlash(response.headers.flash))
          setRedrPath(
            <Redirect
              to={{
                pathname: `/crystals/${response.data.id}`,
                state: response.data
              }}
            />
          ) // リダイレクト
        })
        .catch((error) => {
          setFlashMsg(transFlash(error.response.headers.flash))
        })
    }
  }

  return (
    <>
      {redrPath}
      <button type='button' onClick={onSaveClick}>
        保存
      </button>
    </>
  )
}

SaveBtn.propTypes = {
  crsVals: PropTypes.object
}
