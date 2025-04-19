"use client";

import Guestbook from "../components/Guestbook";
import Link from "next/link";

export default function GuestbookPage() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-2)' }}>Autumn&apos;s Guestbook</h1>
        <p>
          Like leaves in a scrapbook, leave your thoughts behind to show you were here!
        </p>
        <div className="mt-4">
          <Link 
            href="/" 
            className="text-sm font-medium inline-flex items-center"
            style={{ color: 'var(--accent-5)' }}
          >
            <span style={{ marginRight: '4px' }}>←</span> Back to Home
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col items-center justify-center">
        <Guestbook />
      </main>
      
      <footer className="mt-16 pt-8 text-center text-sm" style={{ borderTop: '1px solid var(--accent-3)', color: 'var(--accent-4)' }}>
        <p>© {new Date().getFullYear()} Autumn&apos;s Cozy Corner | Created with Next.js among the falling leaves 🍁</p>
      </footer>
    </div>
  );
}