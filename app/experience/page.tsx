"use client";

import Link from "next/link";
import Image from "next/image";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-2)' }}>Work Experience</h1>
        <p>
          Professional history and accomplishments
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
      
      <main className="max-w-4xl mx-auto">
        <div className="space-y-10">
          {/* NOAA Position */}
          <div className="p-6 rounded-lg" style={{ 
            backgroundColor: 'rgba(230, 167, 76, 0.05)', 
            border: '1px solid var(--accent-3)',
            boxShadow: '0 2px 8px rgba(116, 72, 15, 0.08)'
          }}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="flex items-start">
                <div className="hidden md:block mr-4 flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                  <Image 
                    src="/noaa_logo.png" 
                    alt="NOAA: National Oceanic & Atmospheric Administration logo" 
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--accent-2)' }}>
                    Lead Software Engineer
                  </h2>
                  <div className="flex items-center">
                    <div className="md:hidden mr-2 flex-shrink-0" style={{ width: '30px', height: '30px' }}>
                      <Image 
                        src="/noaa_logo.png" 
                        alt="NOAA logo" 
                        width={30}
                        height={30}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <h3 className="text-lg font-medium mb-1">
                      NOAA: National Oceanic & Atmospheric Administration
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div style={{ color: 'var(--accent-5)' }}>Nov 2022 - Present · 2 yrs 6 mos</div>
                <div className="text-sm">Seattle, Washington, United States · Remote</div>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Earned rapport from stakeholders by participating in at sea surveys as the role of a scientist, gaining first hand knowledge of user needs and pain points.</li>
              <li>Improved development timelines by creating prototypes as a communication tool for workflow and design verification with clients.</li>
              <li>Reduced tech debt by refactoring app using dated language and messy code into modern app using best practices.</li>
              <li>Boosted team understanding of product needs by documenting app architecture and technical design decisions.</li>
              <li>Smoothly transitioned the modernization of legacy systems by modularizing incoming new technology replacements.</li>
              <li>Released bug free version updates by thoroughly testing team members' merge requests.</li>
              <li>Created reputable full stack apps by combining SDLC and design thinking principles resulting in user-centered, intuitive workflows.</li>
              <li>Resolved complex user problems by implementing appropriate technical solutions supporting needs such as offline-first and graphically displaying data from oceanographic sensors.</li>
              <li>Fulfilled every role of developing an application from end to end including QA engineer, project manager, business analyst, UI/UX designer, system architect, customer support specialist, technical writer, and developer.</li>
              <li>Increased team breadth by mentoring and coaching junior developer.</li>
              <li>Organized and led user requirement gathering meetings to understand user needs for app development.</li>
              <li>Managed expectations by accurately estimating time to completion for version release iterations and communicating updates to clients.</li>
              <li>Reduced customer frustration by quickly responding to bug reports offering work around solutions when immediate fixes weren't available.</li>
              <li>Maintained thorough knowledge of app status by developing features alongside dev team.</li>
              <li>Communicated user needs to the dev team ensuring requirements were understood as well as the underlying pain points and needs, creating room for creative solutions and ideas from the team as a result.</li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js", "Python", "Express.js", "SQL", "Javascript", "MySQL", 
                  "Oracle Database", "SQLite", "Google Apps Script", "Node.js", "Vue.js", 
                  "Vuetify", "Software Documentation", "Internet Information Services (IIS)", 
                  "Mantine", "Software Development Life Cycle (SDLC)", "Full-Stack Development", 
                  "Design Thinking", "Software Design", "Balsamiq", "Wireframing", "Android Studio", "Jira"
                ].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-sm rounded"
                    style={{ 
                      backgroundColor: 'rgba(205, 173, 93, 0.2)',
                      border: '1px solid var(--accent-3)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* IBSS Position */}
          <div className="p-6 rounded-lg" style={{ 
            backgroundColor: 'rgba(230, 167, 76, 0.05)', 
            border: '1px solid var(--accent-3)',
            boxShadow: '0 2px 8px rgba(116, 72, 15, 0.08)'
          }}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--accent-2)' }}>
                  Software Developer [Contractor in support of NOAA]
                </h2>
                <h3 className="text-lg font-medium mb-1">
                  IBSS
                </h3>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div style={{ color: 'var(--accent-5)' }}>Aug 2021 - Nov 2022 · 1 yr 4 mos</div>
                <div className="text-sm">Seattle, Washington, United States</div>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Developed full stack enterprise applications replacing paper form-based workflows and providing smooth processes for users and managers, substantially reducing process times and overall stress of staff.</li>
              <li>Performed as project manager organizing the creation of new applications for enterprise use.</li>
              <li>Earned user trust by creating intuitive, reliable, high quality, and stable applications.</li>
              <li>Managed stakeholder expectations by communicating feature updates and demonstrating version release iterations, building a sense of product ownership.</li>
              <li>Gently guided clients through technical issues while offering solutions or work around approaches.</li>
              <li>Easily connected with clients using innate people skills.</li>
              <li>Sustained development best practices by using clean code principles.</li>
              <li>Built strong relationships by naturally connecting with clients and team.</li>
              <li>Improved team workflow by researching new ideas and tools.</li>
              <li>Increased overall team experience by volunteering for additional specialized training to improve application development.</li>
              <li>Supported government and scientific needs by creating applications designed to ease workflow and improve turn around times.</li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Javascript", "Vue.js", "Vuetify", "Design Thinking", "Back-End Web Development",
                  "Java", "Google Apps Script", "Full-Stack Development", "Front-End Development",
                  "Team Leadership", "Wireframing", "Balsamiq"
                ].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-sm rounded"
                    style={{ 
                      backgroundColor: 'rgba(205, 173, 93, 0.2)',
                      border: '1px solid var(--accent-3)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* GLASSWERKS Position */}
          <div className="p-6 rounded-lg" style={{ 
            backgroundColor: 'rgba(230, 167, 76, 0.05)', 
            border: '1px solid var(--accent-3)',
            boxShadow: '0 2px 8px rgba(116, 72, 15, 0.08)'
          }}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--accent-2)' }}>
                  Web Developer
                </h2>
                <h3 className="text-lg font-medium mb-1">
                  GLASSWERKS LA
                </h3>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div style={{ color: 'var(--accent-5)' }}>Nov 2018 - May 2019 · 7 mos</div>
                <div className="text-sm">Los Angeles, California, United States</div>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Helped develop and deploy customer order tracking web app used daily</li>
              <li>Used Elixir and TDD skills to test and deploy back end logic</li>
              <li>Implemented new features and bug fixes according to requirements</li>
              <li>Opened, reviewed, and approved pull requests using GitHub</li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="px-2 py-1 text-sm rounded"
                  style={{ 
                    backgroundColor: 'rgba(205, 173, 93, 0.2)',
                    border: '1px solid var(--accent-3)',
                  }}
                >
                  Elixir
                </span>
              </div>
            </div>
          </div>
          
          {/* Common Ledger Position */}
          <div className="p-6 rounded-lg" style={{ 
            backgroundColor: 'rgba(230, 167, 76, 0.05)', 
            border: '1px solid var(--accent-3)',
            boxShadow: '0 2px 8px rgba(116, 72, 15, 0.08)'
          }}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--accent-2)' }}>
                  Software Developer [Intern]
                </h2>
                <h3 className="text-lg font-medium mb-1">
                  Common Ledger
                </h3>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div style={{ color: 'var(--accent-5)' }}>Jun 2018 - Aug 2018 · 3 mos</div>
                <div className="text-sm">Wellington, New Zealand</div>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Assisted in developing and deploying a full stack web application used daily by the general public.</li>
              <li>Worked closely with developers to manage complex projects.</li>
              <li>Performed in a full stack environment using skills such as unit testing.</li>
              <li>Directed daily meetings to discuss updates and strategies using Scrum practices fulfilling the role of Scrum Master.</li>
              <li>Provided bug free code by critiquing personal work before submission.</li>
              <li>Learned new coding practices by listening attentively during peer programming sessions.</li>
              <li>Verified quality by presenting code to team or individuals for review.</li>
              <li>Used scalable cloud storage for all back end data.</li>
              <li>Created unique experiences by tailoring user interfaces to client needs.</li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Javascript", "Vue.js", "TypeScript", "Scrum", "Agile Methodologies", 
                  "Amazon Web Services (AWS)"
                ].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-sm rounded"
                    style={{ 
                      backgroundColor: 'rgba(205, 173, 93, 0.2)',
                      border: '1px solid var(--accent-3)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bair's Sports Grill Position */}
          <div className="p-6 rounded-lg" style={{ 
            backgroundColor: 'rgba(230, 167, 76, 0.05)', 
            border: '1px solid var(--accent-3)',
            boxShadow: '0 2px 8px rgba(116, 72, 15, 0.08)'
          }}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--accent-2)' }}>
                  Shift Lead / Bartender
                </h2>
                <h3 className="text-lg font-medium mb-1">
                  Bair's Sports Grill
                </h3>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div style={{ color: 'var(--accent-5)' }}>Jul 2013 - May 2018 · 4 yrs 11 mos</div>
                <div className="text-sm">Springfield, Missouri</div>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Used empathy and listening skills to resolve any customer grievances</li>
              <li>Multitasked between bartending, completing take away orders, and cleaning</li>
              <li>Supported Autism Awareness Day by creating and promoting new cocktail</li>
              <li>Responsible for creating bank deposits from daily monetary transactions</li>
              <li>Maintained secure environment by closing according to safety protocols</li>
              <li>Single handedly opened, operated and closed the bar and cocktail area of the restaurant</li>
              <li>Set standards for cleanliness and led by example</li>
              <li>Promoted products by listening and responding to customer preferences</li>
              <li>Built an efficient staff by training and directing new employees</li>
              <li>Increased guest visits by developing friendly relationships and establishing rapport</li>
              <li>Used proficiency of three different POS systems to provide fast service</li>
              <li>Created welcoming environment by warmly greeting guests</li>
              <li>Won annual contests by promoting and selling the most gift cards ($2,500 in 2016) during the holiday season.</li>
              <li>Responded to allergy and dietary restrictions by alerting kitchen staff</li>
              <li>Backed law enforcement protocols by verifying ages of bar patrons</li>
              <li>Embraced tasks with high energy and a positive attitude</li>
              <li>Earned employee of the month award</li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Customer Relationship Management (CRM)", "Bartending", "People Management", 
                  "Employee Training", "Sales"
                ].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-sm rounded"
                    style={{ 
                      backgroundColor: 'rgba(205, 173, 93, 0.2)',
                      border: '1px solid var(--accent-3)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Big Brothers Big Sisters Position */}
          <div className="p-6 rounded-lg" style={{ 
            backgroundColor: 'rgba(230, 167, 76, 0.05)', 
            border: '1px solid var(--accent-3)',
            boxShadow: '0 2px 8px rgba(116, 72, 15, 0.08)'
          }}>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--accent-2)' }}>
                  Development Lead [Intern]
                </h2>
                <h3 className="text-lg font-medium mb-1">
                  Big Brothers Big Sisters of the Ozarks
                </h3>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <div style={{ color: 'var(--accent-5)' }}>Jan 2017 - Jul 2017 · 7 mos</div>
                <div className="text-sm">Springfield, MO</div>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Acquired new donor leads still used for current fundraising events</li>
              <li>Established connections with board members using interpersonal skills</li>
              <li>Raised more money in auction items than any other employee, by $10,455</li>
              <li>Volunteered for tasks even those outside of comfort zone</li>
              <li>Assisted in planning signature fundraising events</li>
              <li>Led role playing exercises for team on how to engage potential donors</li>
              <li>Used passion for agency's cause to obtain funds such as a single pledge for $10,000</li>
              <li>Obtained free air time by networking with local tv station</li>
              <li>Raised $13,455 for silent auction surpassing self provided goal by $10,000</li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Communication", "Sales", "Customer Engagement", "Fundraising", "Nonprofit Volunteering"
                ].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-sm rounded"
                    style={{ 
                      backgroundColor: 'rgba(205, 173, 93, 0.2)',
                      border: '1px solid var(--accent-3)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-16 pt-8 text-center text-sm" style={{ borderTop: '1px solid var(--accent-3)', color: 'var(--accent-4)' }}>
        <p>© {new Date().getFullYear()} Autumn&apos;s Cozy Corner | Created with Next.js among the falling leaves 🍁</p>
      </footer>
    </div>
  );
}