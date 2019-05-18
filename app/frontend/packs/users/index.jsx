import React from 'react'
import PropTypes from 'prop-types'
import {UsrList} from 'components/users/index/usr_list'

export const UsrIndex = ({onGenChange}) => {
  onGenChange({sninBool: !!localStorage.getItem('authToken')})

  return (
    <>
      <h2>users#index</h2>
      <UsrList onGenChange={onGenChange} />
    </>
  )
}

UsrIndex.propTypes = {
  onGenChange: PropTypes.func
}
