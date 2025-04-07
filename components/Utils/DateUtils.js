export const getLastSevenDays = () => {
  const days = []
  const today = new Date()

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // 日本式の曜日取得
    const dayOfWeek = date.toLocaleDateString('ja-JP', { weekday: 'short' })

    // YYYY-MM-DD 形式に日付をフォーマット
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0ベースなので +1
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    days.push({
      date: formattedDate,
      day: dayOfWeek,
    })
  }

  return days
}
