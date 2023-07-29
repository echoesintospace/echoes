import Head from 'next/head'
import QuestionList from '@/components/QuestionList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Echoes into Space</title>
        <meta name="description" content="Ask a question. A question you've always wanted to ask. You might get an answer. Or it might just be an echo into space." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
