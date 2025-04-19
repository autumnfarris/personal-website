"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--accent-2)' }}>Autumn Farris</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Full Stack Developer
        </p>
      </header>
      
      <main className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-12">
          <div>
            <p className="mb-6">
              Hello! I&apos;m Autumn, a versatile full stack developer with a unique skillset combining real-world experience and academic excellence in both computer science and communication.
            </p>
            
            <p className="mb-6">
              I focus on software development best practices, building relationships with customers, and creating intuitive applications to maximize positive user experience. I&apos;m open to opportunities in any time zone.
            </p>

            <p className="mb-6">
              <span className="font-medium">Skills:</span> Javascript/JSON/JQuery, SQL, Python, Node.js/Express, Vue.js, React, MySQL, SQLite, Oracle, Java, RegEx, Bootstrap, Mantine, Vuetify, Google Apps Script, Html/CSS/SCSS, Elixir, Jira, GitHub, GitLab, Technical Design Documentation, Communication
            </p>
            
            <p className="mb-6">
              <span className="font-medium">Education:</span><br />
              • Computer Information Systems, B.S.<br />
              • Communication, B.S.
            </p>
            
            <p className="mb-6">
              <span className="font-medium">Certifications:</span><br />
              • Mastering Design Thinking, MIT<br />
              • Software Architecture Principles and Practices, Carnegie Mellon
            </p>
            
            <p className="mb-6">
              <a 
                href="https://www.linkedin.com/in/autumnfarris/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium"
                style={{ color: 'var(--accent-4)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/experience" 
                className="inline-block px-6 py-3 rounded-md transition-colors font-medium"
                style={{ 
                  backgroundColor: 'var(--accent-4)', 
                  color: '#FFF8F0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-5)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-4)'}
              >
                Work Experience
              </Link>
              <Link 
                href="/guestbook" 
                className="inline-block px-6 py-3 rounded-md transition-colors font-medium"
                style={{ 
                  backgroundColor: 'var(--accent-5)', 
                  color: '#FFF8F0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-4)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-5)'}
              >
                Sign My Guestbook
              </Link>
              <Link 
                href="/game" 
                className="inline-block px-6 py-3 rounded-md transition-colors font-medium"
                style={{ 
                  backgroundColor: 'var(--accent-1)', 
                  color: '#FFF8F0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-3)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-1)'}
              >
                Play Woodland Chase
              </Link>
            </div>
          </div>
          <div className="relative w-[280px] aspect-[3/4] rounded-lg overflow-hidden shadow-lg mx-auto md:mt-16" 
               style={{ 
                 boxShadow: '0 4px 12px rgba(116, 72, 15, 0.25)', 
                 border: '3px solid var(--accent-3)'
               }}>
            <Image 
              src={`/autumn_new.jpg?v=${new Date().getTime()}`} 
              alt="Autumn Farris, Full Stack Developer" 
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center top"
              }}
              priority
            />
          </div>
        </div>
      </main>
      
      <footer className="mt-16 pt-8 text-center text-sm" style={{ borderTop: '1px solid var(--accent-3)', color: 'var(--accent-4)' }}>
        <p>© {new Date().getFullYear()} Autumn&apos;s Cozy Corner | Created with Next.js among the falling leaves 🍁</p>
      </footer>
    </div>
  );
}