import React, { useEffect } from 'react'

const StepTitle = ({ pageTitle, pageTitleSub }) => {
  return (
    <>
      <h3
        style={{
          fontWeight: '600',
          color: 'black',
          paddingRight: '10px',
          paddingLeft: '10px',
          paddingTop: 0,
          marginToop: 0,
        }}
        dangerouslySetInnerHTML={{ __html: pageTitle }}
      ></h3>
      <h6
        style={{ fontWeight: '600' }}
        dangerouslySetInnerHTML={{ __html: pageTitleSub }}
      ></h6>
    </>
  )
}

export default StepTitle
