
import { Alert, Button, Card } from 'flowbite-react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layoutold';

const About = () => {

  const router = useRouter()

  function gotoQuestions() {
    router.push('/')
  }

    return (
      <>
      <Head>
        <title>About</title>
        <meta property="og:title" content="About" key="title" />
        <meta property="og:description" content="About Echoes into space" key="title" />
      </Head>
      <div className="w-full h-full bg-gray-200">
          <div
            className="w-full flex flex-col justify-center items-center p-4"
            style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
          >
          <Card 
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://random.imagecdn.app/300/200"
            className="w-full h-full" href="#">

            <p className="font-normal text-gray-700 dark:text-gray-400">
            There is a lot of information out there. Most of it is misleading - it is designed to tear us apart, and polarise us, and confuse us. I hope this site will be helpful as an antidote to all of that. To bring peace, and understanding, and clarity, in a world of chaos and conflict and confusion.
            </p>
            
            <p className="font-normal text-gray-700 dark:text-gray-400">
            This is a simple site to help. If you have a question, I will do my best to answer it as accurately as possible, and I will keep my own opinions, biases, and assumptions out of it as much as I can.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            The hope is, is that my answer may bring you some peace, and some understanding.
            </p>

            <Button
              onClick={() => {
                gotoQuestions()
              }}
            >
                <div className="flex gap-3 md:order-2">Go to the question list</div>
            </Button>
          </Card>
          </div>
      </div>  
</>
    );
};

export const metadata = {
  title: 'About',
  descriptin: 'About Echoes into space'
}

export default About;
