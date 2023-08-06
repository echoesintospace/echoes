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

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
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
