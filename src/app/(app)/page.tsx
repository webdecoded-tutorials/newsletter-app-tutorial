import { Background } from '@/components/Background'
import { Links } from '@/components/Links'
import { Logos } from '@/components/Logos'
import Link from 'next/link'
import React from 'react'
import SubscribeBtn from '@/components/newsletter/subscribeBtn'
import TopPosts from '@/components/newsletter/topPosts'


export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/pattern.png')] bg-contain bg-no-repeat bg-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 flex flex-col">
                <h1 className="text-3xl font-bold tracking-tigher sm:text-4xl md:text-5xl max-w-[700px] lg:text-6xl">Stay Informed with Our Newsletter</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl "> Get the latest updates, news, and exclusive content delivered straight to your inbox. </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SubscribeBtn />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tigher sm:text-4xl md:text-5xl lg:text-6xl text-center">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg border">
                <h3 className="text-xl font-bold">Weekly Updates</h3>
                <p className="text-sm text-gray-700 text-center">                  Receive curated content every week, keeping you informed and inspired.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg border">
                <h3 className="text-xl font-bold">Exclusive Insights</h3>
                <p className="text-sm text-gray-700 text-center">Gain access to expert analysis and insider knowledge in your field.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg border">
                <h3 className="text-xl font-bold">Community Access</h3>
                <p className="text-sm text-gray-700 text-center">Join a network of like-minded professionals and enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <TopPosts />
        </section>
      </main>
      <footer className="mt-4 p-3 flex items-center justify-center text-slate-700">Web Weekly</footer>
    </div>
  )
}
