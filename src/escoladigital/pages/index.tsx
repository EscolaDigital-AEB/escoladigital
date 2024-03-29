import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    
    <div className="min-h-full min-w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 ">
    
      <Head>
      <title>AEB@Digital</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Header />
       
    </div>
  )
}
