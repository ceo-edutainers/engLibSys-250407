import React from 'react'
// import Content from '@/components/shadowingSelfcourse/Content'
import { useSelector } from 'react-redux'
// React Joyrideのインポート
import Joyride from 'react-joyride'
const Tour = () => {
  // ReduxのStoreに格納されたガイドツアーの情報を取得
  // Storeの中身は以下URL参照
  // https://codesandbox.io/s/guidedtours01-6ivik?from-embed=&file=/src/modules/tour.js
  const TOUR_STEPS = [
    {
      target: '.tour-logo',
      content: 'This is our tour’s logo',
    },
    {
      target: '.tour-cart',
      content: 'View the cart you’ve added here',
    },
    {
      target: '.tour-contact',
      content: 'Contact the developer',
    },
    {
      target: '.tour-policy',
      content: 'We accept returns after 14 days max',
    },
  ]
  return (
    <div>
      <button className="btn btn-danger tour-logo">Test</button>
      {/* React Joyride本体 ここから */}
      <Joyride
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: 'green',
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: 'End tour',
          skip: 'Close tour',
        }}
      />

      {/* React Joyride本体 ここまで */}
      {/* ガイドするContentの中身。詳細は以下URL参照 */
      /* https://codesandbox.io/s/guidedtours01-6ivik?from-embed=&file=/src/components/Content.jsx */}
      {/* <Content /> */}
    </div>
  )
}
export default Tour
