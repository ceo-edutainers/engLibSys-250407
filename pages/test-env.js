// pages/test-env.js

export default function TestEnvPage() {
  console.log('✅ 서버 콘솔 테스트:', process.env.NEXT_PUBLIC_API_BASE_URL)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🌐 환경변수 테스트 페이지</h1>
      <p>
        <strong>process.env.NEXT_PUBLIC_API_BASE_URL:</strong>{' '}
        {process.env.NEXT_PUBLIC_API_BASE_URL || '❌ 환경변수 없음'}
      </p>
    </div>
  )
}
