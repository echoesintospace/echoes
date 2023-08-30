import Head from 'next/head'
import QuestionList from '@/components/QuestionList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Echoes into space</title>
        <meta property="og:title" content="AEchoes into space" key="title" />
        <meta property="og:description" content="Echoes into space, where all your questions may end up" key="title" />
      </Head>
      <div className="w-full h-full bg-gray-200">
          <div
            className="w-full flex flex-col justify-center items-center p-4"
            style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
          >
            <QuestionList/>
          </div>
      </div>
    </>
  )
}
