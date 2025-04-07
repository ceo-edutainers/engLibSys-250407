import react, { useState, useEffect } from 'react'
import axios from 'axios'
import 'balloon-css' //tooltip balloon , usage:https://kazzkiq.github.io/balloon.css/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faTimes,
  faSave,
  faBullseye,
  faTrashAlt,
  faStop,
  faTrash,
  faLockOpen,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'

const StepBarOST = ({ cStep }) => {
  return (
    <>
      {cStep == 'menu' ? (
        <></>
      ) : (
        <div
          className="QuizBigShowandtell mb-0 mt-1 mb-0 p-0"
          style={{
            backgroundColor: 'white',
            border: 0,
            color: '#dedede',
            // borderRadius: '10px',
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-12 col-md-12"
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {cStep == 'Step1OST' && (
                  <div>
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP1
                    </font>
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>Step2</b>
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>Step3</b>&nbsp;
                    {/* <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>Step4</b> */}
                  </div>
                )}
                {cStep == 'Step2OST' && (
                  <div>
                    <b>Step1</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP2
                    </font>
                    &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>Step3</b>&nbsp;
                    {/* <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>Step4</b> */}
                  </div>
                )}
                {cStep == 'Step3OST' && (
                  <div>
                    Step1&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;Step2&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP3
                    </font>
                    {/* &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;Step43 */}
                  </div>
                )}
                {cStep == 'Step4OST' && (
                  <div>
                    <b>Step1</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;<b>Step2</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <b>Step3</b>&nbsp;
                    <FontAwesomeIcon
                      icon={faArrowAltCircleRight}
                      size="1x"
                      color="darkgray"
                    />
                    &nbsp;
                    <font
                      style={{
                        fontWeight: '900',
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      STEP4
                    </font>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StepBarOST
