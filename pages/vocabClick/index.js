// import React, { useState } from 'react'
// import Modal from 'react-modal'

// function App() {
//   const sentence = `"Let's eat quickly and find some shelter," said Biff. Everyone agreed. They ate the fish, which was delicious, and gathered their things. They had to find a dry place to stay for the night. Little Fox led the way, his nose sniffing the air. They found a large cave just as the rain started to pour down harder. "This will be our shelter for the night," said Little Fox.

// Inside the cave, they laid out their survival kits and used the plastic sheet from Wilf's rucksack to cover the entrance, keeping the wind and rain out. They were all tired, but safe and dry. Biff lit the torch to give them some light, and they sat around, sharing stories of their adventures. Chip pulled out his notebook and started sketching the scene. Amy, still nursing her leg, leaned back against a rock, grateful for the escape from the rain.

// As they settled in, the magic key began to glow again, indicating that their adventure was not over yet. "Looks like the key is ready to take us somewhere new," said Wilf, looking at the glowing object with anticipation. "I hope it's somewhere dry," Amy joked, trying to lighten the mood. They all laughed, knowing that wherever the magic key took them next, they would face it together. The key glowed brighter, and then, in a flash of light, they were gone, whisked away to their next adventure.`

//   const DB_CONN_URL = process.env.DB_CONN_URL
//   const [modalIsOpen, setIsOpen] = useState(false)
//   const [selectedWord, setSelectedWord] = useState('')
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

//   const [selectedWords, setSelectedWords] = useState([])
//   const [vocaSearchView, setVocaSearchView] = useState(false)
//   // const [searchedWord, setSearchedWord] = useState('happy')

//   function wordListView(word) {
//     // var url = DB_CONN_URL + '/memory-word-list/' //<- eiken new dbにあるものだけ持ってくる
//     //以下はこの課題で生徒が保存した全ての単語リストを持ってくる

//     var url = DB_CONN_URL + '/get-word-from-dictionary/'

//     var Url = url + word

//     alert(Url)
//     const fetchData3 = async () => {
//       try {
//         const response = await axios.get(Url)
//         console.log('length', response.data.length)
//         if (response.data.length > 0) {
//           setNoWordAlert(false)
//           setSelectedWords(response.data)
//         } else {
//           // SetCantFindWord(true)
//           setNoWordAlert(true)
//         }
//       } catch (error) {
//         alert('wordListView Error 1')
//       }
//     }
//     fetchData3()
//   }
//   // 모달을 단어 위치 근처에서 열기
//   function handleWordClick(word, event) {
//     const { clientX, clientY } = event // 클릭 위치 추출
//     setModalPosition({
//       top: clientY + 10, // 클릭된 위치보다 조금 아래에 위치하도록 조정
//       left: clientX + 10, // 클릭된 위치보다 조금 오른쪽에 위치하도록 조정
//     })
//     // setSearchWord(word)
//     wordListView(word)
//     // setSearchedWord(word)
//     setVocaSearchView(!vocaSearchView)
//     setIsOpen(true)
//   }

//   function closeModal() {
//     setIsOpen(false)
//   }
//   // const handleKeyPress = (event, word) => {
//   //   if (event.key === 'Enter') {
//   //     setSearchWord(word)
//   //     wordListView(word)
//   //     setSearchedWord(word)
//   //     setVocaSearchView(!vocaSearchView)
//   //   }
//   // }

//   const words = sentence.split(' ').map((word, index) => (
//     <span
//       key={index}
//       style={{
//         cursor: 'pointer',
//         marginRight: '5px',
//         color: 'blue',
//         fontSize: '20px',
//       }}
//       onClick={(e) => handleWordClick(word, e)}
//     >
//       {word + ' '}
//     </span>
//   ))

//   // Modal 스타일을 동적으로 설정
//   const modalStyles = {
//     content: {
//       position: 'absolute',
//       top: `${modalPosition.top}px`,
//       left: `${modalPosition.left}px`,
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//       border: '1px solid #ccc',
//       background: '#fff',
//       overflow: 'auto',
//       WebkitOverflowScrolling: 'touch',
//       borderRadius: '4px',
//       outline: 'none',
//       padding: '20px',
//     },
//   }

//   return (
//     <div
//       style={{
//         width: '80%',
//         padding: '20px',
//         overflowWrap: 'break-word',
//         wordBreak: 'keep-all',
//       }}
//     >
//       <p>{words}</p>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={modalStyles}
//         contentLabel="Word Details"
//       >
//         {selectedWords.map((val, key) => {
//           var imgurl =
//             'https://englib.s3.ap-northeast-1.amazonaws.com/img_voca5000/'
//           var img1 = imgurl + val.img_ex1
//           var img2 = imgurl + val.img_ex2
//           var img3 = imgurl + val.img_ex3
//           return (
//             <>
//               <div className="dictionaryBox">
//                 <h6>
//                   <FontAwesomeIcon icon={faDotCircle} size="1x" color="black" />
//                   &nbsp; engLib Dictionary
//                 </h6>
//                 <hr />

//                 <h1 style={{ fontSize: '21px', fontWeight: '800' }}>
//                   <FontAwesomeIcon
//                     icon={faAssistiveListeningSystems}
//                     size="1x"
//                     color="black"
//                   />
//                   &nbsp;&nbsp;{val.word}
//                   {/* <span
//                               onClick={() => {
//                                 playAudio()
//                               }}
//                             >
//                               <FcSpeaker size="26px" />
//                             </span> */}
//                 </h1>
//                 <p
//                   style={{
//                     color: '#808B96',
//                     fontStyle: 'italic',
//                     marginLeft: '30px',
//                     fontSize: '15spx',
//                   }}
//                 >
//                   {/* {data.meanings[0].partOfSpeech} */}
//                   {val.form}
//                 </p>
//                 <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
//                   {/* {data.meanings[0].definitions[0].definition} */}
//                 </p>
//                 <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
//                   {val.meaning_jp1 ? val.meaning_jp1 : val.coreMeaning}
//                 </p>
//                 <p style={{ color: '#2C3E50', marginLeft: '20px' }}>
//                   {/* {data.meanings[0].definitions[0].example} */}
//                 </p>
//                 {(val.ex1 || val.ex2 || val.ex3) && <hr />}

//                 <div className="row">
//                   <div className="col-lg-4 col-md-12">
//                     {val.ex1 && (
//                       <>
//                         <img
//                           src={img1}
//                           style={{
//                             border: '0.01em solid #ececec',
//                             borderRadius: '10px',
//                           }}
//                         />
//                         <p style={{ textAlign: 'center' }}>{val.ex1}</p>
//                       </>
//                     )}
//                   </div>
//                   <div className="col-lg-4 col-md-12">
//                     {val.ex1 && (
//                       <>
//                         <img
//                           src={img2}
//                           style={{
//                             border: '0.01em solid #ececec',
//                             borderRadius: '10px',
//                           }}
//                         />
//                         <p style={{ textAlign: 'center' }}>{val.ex2}</p>
//                       </>
//                     )}
//                   </div>
//                   <div className="col-lg-4 col-md-12">
//                     {val.ex1 && (
//                       <>
//                         <img
//                           src={img3}
//                           style={{
//                             border: '0.01em solid #ececec',
//                             borderRadius: '10px',
//                           }}
//                         />
//                         <p style={{ textAlign: 'center' }}>{val.ex3}</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )
//         })}
//         <p>{selectedWord}</p>
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   )
// }

// export default App
// pages/vocabClick.jsx
export default function VocabClickPage() {
  return <div>Coming soon...</div>
}
