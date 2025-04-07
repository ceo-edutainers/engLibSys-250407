import React from 'react'

const PayrollTable = () => {
  return (
    // 'hoemwork'
    // 'finished'
    // 'recess' ->休会
    // 'no-show'
    // illness-cancellation
    // 'cancelled'
    // 'leave-early'
    // same-day-cancellation
    // 'tutor-no-shows'
    <div className="col-lg-12 col-md-12 p-2 mt-5 mb-5">
      <table className="payroll-table">
        <thead>
          <tr>
            <th colSpan="2">Net payment amount (2024年7月1日〜7月31日)</th>
            <th>166,330(円)</th>

            <th>(UNIT)</th>
            <th>(Notes)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="2">内訳</td>
            <td>税計算前のトータル</td>
            <td>199,507</td>

            <td colSpan="2"></td>
          </tr>
          <tr>
            <td>
              レッスン基本給
              <br />
              (finished)
            </td>
            <td>116,800</td>

            <td>146</td>
            <td>session/25min</td>
          </tr>
          <tr>
            <td></td>
            <td>same-day-cancellation</td>
            <td>533</td>
            <td>20</td>
            <td>Eisuke 20分</td>
          </tr>
          <tr>
            <td></td>
            <td>student-no-shows</td>
            <td>533</td>
            <td>20</td>
            <td>Eisuke 20分</td>
          </tr>
          <tr>
            <td></td>
            <td>leave-early</td>
            <td>533</td>
            <td>20</td>
            <td>Eisuke 20分</td>
          </tr>
          <tr>
            <td></td>
            <td>illness-cancellation</td>
            <td>533</td>
            <td>20</td>
            <td>Eisuke 20分</td>
          </tr>
          <tr>
            <td></td>
            <td>cancelled</td>
            <td>533</td>
            <td>20</td>
            <td>Eisuke 20分</td>
          </tr>
          <tr>
            <td></td>
            <td>tutor-no-shows</td>
            <td>-2,400</td>
            <td>3</td>
            <td>session/25min</td>
          </tr>
          <tr>
            <td></td>
            <td>
              延長レッスン(分)
              <br />
              extended-lesson
            </td>
            <td>507</td>

            <td>19</td>
            <td>minutes</td>
          </tr>
          <tr>
            <td></td>
            <td>Trial Session</td>
            <td>9,600</td>

            <td>12</td>
            <td>session</td>
          </tr>
          <tr>
            <td></td>
            <td>Trial Enrollment Incentive</td>
            <td>8,000</td>

            <td>8</td>
            <td>1,000¥ pre 1 enrollment</td>
          </tr>

          <tr>
            <td></td>
            <td>ミーティング</td>
            <td>9,600</td>

            <td>480</td>
            <td>Meeting(分) 時給1,200</td>
          </tr>
          <tr>
            <td></td>
            <td>インタビュー、Mock Class</td>
            <td>20,267</td>

            <td>760</td>
            <td>Interview(分) 時給1,600</td>
          </tr>
          <tr>
            <td></td>
            <td>Discussionコース初めてビデオ</td>
            <td>3,500</td>

            <td>7</td>
            <td>Discussion初めてビデオ手当1 レッスン500円</td>
          </tr>
          <tr>
            <td></td>
            <td>HHG 当日キャンセル</td>
            <td>0</td>

            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>HHG Debating</td>
            <td>0</td>

            <td></td>
            <td>Lesson 2コマ</td>
          </tr>
          <tr>
            <td></td>
            <td>HHG Debating 手当</td>
            <td>0</td>

            <td></td>
            <td>50分レッスン</td>
          </tr>

          <tr>
            <td></td>
            <td>本保管手数料</td>
            <td>10,000</td>

            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>本発送料</td>
            <td>3,500</td>

            <td>14</td>
            <td>当月発送分 1発送料あたり250</td>
          </tr>
          <tr>
            <td></td>
            <td>書類発送</td>
            <td>0</td>

            <td></td>
            <td>当月発送分 1発送料あたり250</td>
          </tr>
          <tr className="payroll-table-yellow">
            <td></td>

            <td>健康保険(40歳未満)</td>
            <td>9,980</td>

            <td>社会保険合計(自動計算)</td>
            <td>29,477</td>
          </tr>
          <tr className="payroll-table-yellow">
            <td></td>
            <td>厚生年金保険</td>
            <td>18,300</td>

            <td>課税対象額(自動計算)</td>
            <td>170,030</td>
          </tr>
          <tr className="payroll-table-yellow">
            <td></td>
            <td>雇用保険</td>
            <td>1,197</td>

            <td>所得税</td>
            <td>3,700</td>
          </tr>
          <tr className="payroll-table-yellow">
            <td></td>
            <td></td>
            <td></td>

            <td>総控除額(自動計算)</td>
            <td>33,177</td>
          </tr>
          <tr className="payroll-table-gray">
            <td></td>

            <td></td>
            <td></td>
            <td>1コマ30分(通常レッスン、体験、インタビュー)</td>
            <td>800</td>
          </tr>
          <tr className="payroll-table-gray">
            <td></td>

            <td></td>
            <td></td>
            <td>その他仕事の時給 ミーティング、教材作成など</td>
            <td>1200</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PayrollTable
