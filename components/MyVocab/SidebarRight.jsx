import react, { useState, useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { VocaContext } from '@/components/MyVocab/Contexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAssistiveListeningSystems,
  faCircle,
  faCircleNotch,
  faDotCircle,
  faMicrophone,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
const SidebarRight = () => {
  const DB_CONN_URL = process.env.DB_CONN_URL
  const { myMbn, setMyMbn, userName, setUserName, searchWord, setSearchWord } =
    useContext(VocaContext)

  const [myVocaList, setMyVocaList] = useState([])

  useEffect(() => {
    // alert('myMbn1' + myMbn)
    wordListView2()
  }, [])
  function wordListView2() {
    // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
    //以下はこの課題で生徒が保存した全ての単語リストを持ってくる

    var url = DB_CONN_URL + '/memory-word-list-by-member/'

    var Url = url + myMbn
    // alert(myMbn)
    const fetchData3 = async () => {
      try {
        const response = await axios.get(Url)

        // alert(response.data.length)
        if (response.data.length > 0) {
          setMyVocaList(response.data)
        }
      } catch (error) {
        alert('wordListView Error2')
      }
    }
    fetchData3()
  }
  function handleRegWordDel(autoid) {
    var url = DB_CONN_URL + '/memory-word-del-by-autoid/'

    var Url = url + homework_id + '&' + autoid
    // var Url = url + homework_id + '&' + word
    axios.put(Url).then((response) => {
      //errorの場合

      wordListView2()
    })
  }

  return (
    <div className="courses-sidebar-sticky ml-0 pl-0">
      <div className="courses-sidebar-information">
        <div className="btn-box  mb-3 ">
          <Link href="#">
            <a className="default-btn">
              {/* <i className="flaticon-shopping-cart"></i> */}
              My Vocab
              <span></span>
            </a>
          </Link>
        </div>
        <ul className="info">
          {myVocaList.map((val2, key2) => {
            return (
              <>
                <li style={{ paddingLeft: 0, marginLeft: 0 }}>
                  <div className="d-flex justify-content-between align-items-left pl-0 ml-0">
                    <span style={{ textAlign: 'left' }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="darkorange"
                        className="mr-1"
                        onClick={() => {
                          handleRegWordDel(val2.autoid)
                        }}
                      />
                      &nbsp; {val2.word}
                      <span>
                        <p style={{ fontSize: '14px' }}>
                          {val2.form && <>nbsp;[{val2.form}] &nbsp;</>}

                          {val2.meaning_jp1
                            ? val2.meaning_jp1
                            : val2.coreMeaning}
                        </p>
                      </span>
                    </span>
                  </div>
                </li>
              </>
            )
          })}
        </ul>

        {/* <div className="courses-share">
          <div className="share-info">
            <span>
              Share This Course <i className="flaticon-share"></i>
            </span>

            <ul className="social-link">
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="d-block" target="_blank">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default SidebarRight
