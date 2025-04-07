import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'

import { toggleRun } from '/src/modules/tour'

import '/src/assets/styles/Content.scss'

const Content = () => {
  const tourState = useSelector((state) => state.tour)
  const dispatch = useDispatch()

  return (
    <div className="content">
      <div className="start-btn-wrapper">
        <Button onClick={() => dispatch(toggleRun())}>
          ガイドツアースタート
        </Button>
      </div>
      {tourState.steps.map((step, i) => (
        <div
          key={i}
          className={`step${i + 1}-wrapper`}
          style={{ backgroundColor: tourState.bgColors[i] }}
        >
          <h5 className={`target${i + 1}`}>ステップ{i + 1}</h5>
        </div>
      ))}
    </div>
  )
}
export default Content
