import { createContext } from 'react'

//Local Test用
export const QuizContext = createContext('')
//上記のCodeにすると Vercelがエラーになって、localhostはエラーなし。

//以下のCodeにすると localhostがエラーになって、Vercelはエラーなし。
//Vercel Serverにアップロードする時は上のコードを消して、こちらにする。
// const QuizContext = createContext('')
// export default QuizContext
