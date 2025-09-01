'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

let isProduction = process.env.NODE_ENV === 'production';

const experiences = [
  {
    title: 'Lead Software Engineer',
    company: 'NOAA: National Oceanic & Atmospheric Administration',
    location: 'Seattle, Washington, United States · Remote',
    duration: 'Nov 2022 - Present · 2 yrs 6 mos',
    logo: isProduction ? '/personal-website/noaa_logo.png' : '/noaa_logo.png',
    achievements: [
      'Earned rapport from stakeholders by participating in at sea surveys as the role of a scientist, gaining first hand knowledge of user needs and pain points.',
      'Improved development timelines by creating prototypes as a communication tool for workflow and design verification with clients.',
      'Reduced tech debt by refactoring app using dated language and messy code into modern app using best practices.',
      'Boosted team understanding of product needs by documenting app architecture and technical design decisions.',
      'Smoothly transitioned the modernization of legacy systems by modularizing incoming new technology replacements.',
      'Released bug free version updates by thoroughly testing team members\' merge requests.',
      'Created reputable full stack apps by combining SDLC and design thinking principles resulting in user-centered, intuitive workflows.',
      'Resolved complex user problems by implementing appropriate technical solutions supporting needs such as offline-first and graphically displaying data from oceanographic sensors.',
      'Increased team breadth by mentoring and coaching junior developer.',
      'Managed expectations by accurately estimating time to completion for version release iterations and communicating updates to clients.'
    ],
    skills: [
      'React.js', 'Python', 'Express.js', 'SQL', 'Javascript', 'MySQL', 
      'Oracle Database', 'SQLite', 'Google Apps Script', 'Node.js', 'Vue.js', 
      'Vuetify', 'Software Documentation', 'IIS', 'Mantine', 'SDLC', 
      'Full-Stack Development', 'Design Thinking', 'Software Design', 'Balsamiq', 
      'Wireframing', 'Android Studio', 'Jira'
    ]
  },
  {
    title: 'Software Developer [Contractor in support of NOAA]',
    company: 'IBSS',
    location: 'Seattle, Washington, United States',
    duration: 'Aug 2021 - Nov 2022 · 1 yr 4 mos',
		logo: isProduction ? '/personal-website/ibss.png' : '/ibss.png',
    achievements: [
      'Developed full stack enterprise applications replacing paper form-based workflows and providing smooth processes for users and managers, substantially reducing process times and overall stress of staff.',
      'Performed as project manager organizing the creation of new applications for enterprise use.',
      'Earned user trust by creating intuitive, reliable, high quality, and stable applications.',
      'Managed stakeholder expectations by communicating feature updates and demonstrating version release iterations, building a sense of product ownership.',
      'Gently guided clients through technical issues while offering solutions or work around approaches.',
      'Sustained development best practices by using clean code principles.',
      'Built strong relationships by naturally connecting with clients and team.',
      'Improved team workflow by researching new ideas and tools.',
      'Supported government and scientific needs by creating applications designed to ease workflow and improve turn around times.'
    ],
    skills: [
      'Javascript', 'Vue.js', 'Vuetify', 'Design Thinking', 'Back-End Web Development',
      'Java', 'Google Apps Script', 'Full-Stack Development', 'Front-End Development',
      'Team Leadership', 'Wireframing', 'Balsamiq'
    ]
  },
  {
    title: 'Web Developer',
    company: 'Glasswerks',
    location: 'Remote',
    duration: 'Nov 2018 - May 2019 · 7 mos',
		logo: isProduction ? '/personal-website/glasswerks.png' : '/glasswerks.png',
    achievements: [
      'Helped develop and deploy customer order tracking web app used daily',
      'Used Elixir and TDD skills to test and deploy back end logic',
      'Implemented new features and bug fixes according to requirements',
      'Opened, reviewed, and approved pull requests using GitHub'
    ],
    skills: ['Elixir']
  },
  {
    title: 'Software Developer [Intern]',
    company: 'Common Ledger',
    location: 'Wellington, New Zealand',
    duration: 'Jun 2018 - Aug 2018 · 2 mos',
		logo: isProduction ? '/personal-website/common-ledger.jpg' : '/common-ledger.jpg',
    achievements: [
      'Assisted in developing and deploying a full stack web application used daily by the general public.',
      'Relocated to New Zealand to work closely with developers to manage complex projects.',
      'Performed in a full stack environment using skills such as unit testing.',
      'Directed daily meetings to discuss updates and strategies using Scrum practices fulfilling the role of Scrum Master.',
      'Provided bug free code by critiquing personal work before submission.',
      'Used scalable cloud storage for all back end data.',
      'Created unique experiences by tailoring user interfaces to client needs.'
    ],
    skills: [
      'Javascript', 'Vue.js', 'TypeScript', 'Scrum', 'Agile Methodologies', 
      'Amazon Web Services (AWS)'
    ]
  },
  {
    title: 'Shift Lead / Bartender',
    company: 'Bair\'s Sports Grill',
    location: 'Springfield, MO',
    duration: 'Jul 2013 - May 2018 · 4 yrs 11 mos',
		logo: isProduction ? '/personal-website/bairs.jpg' : '/bairs.jpg',
    achievements: [
      'Used empathy and listening skills to resolve any customer grievances',
      'Multitasked between bartending, completing take away orders, and cleaning',
      'Supported Autism Awareness Day by creating and promoting new cocktail',
      'Single handedly opened, operated and closed the bar and cocktail area of the restaurant',
      'Set standards for cleanliness and led by example',
      'Built an efficient staff by training and directing new employees',
      'Won annual contests by promoting and selling the most gift cards ($2,500 in 2016) during the holiday season.',
      'Earned employee of the month award'
    ],
    skills: [
      'Customer Relationship Management (CRM)', 'Bartending', 'People Management', 
      'Employee Training', 'Sales'
    ]
  },
  {
    title: 'Development Lead [Intern]',
    company: 'Big Brothers Big Sisters of the Ozarks',
    location: 'Springfield, MO',
    duration: 'Jan 2017 - Jul 2017 · 7 mos',
		logo: isProduction ? '/personal-website/bbbs.png' : '/bbbs.png',
    achievements: [
      'Acquired new donor leads still used for current fundraising events',
      'Established connections with board members using interpersonal skills',
      'Raised more money in auction items than any other employee, by $10,455',
      'Led role playing exercises for team on how to engage potential donors',
      'Used passion for agency\'s cause to obtain funds such as a single cash donation for $10,000',
      'Obtained free donated air time by networking with local tv station',
      'Raised $13,455 in value for silent auction items surpassing self provided goal by 65%'
    ],
    skills: [
      'Communication', 'Sales', 'Customer Engagement', 'Fundraising', 'Nonprofit Volunteering'
    ]
  }
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Professional <span className="text-amber-600">Experience</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey through my career in software development, showcasing the impact I&apos;ve made 
            and the skills I&apos;ve developed across diverse projects and teams.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.duration}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex items-start gap-4">
                      {experience.logo && (
                        <div className="hidden md:block flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 shadow-sm border border-gray-300">
                            <Image 
                              src={experience.logo}
                              alt={`${experience.company} logo`}
                              width={48}
                              height={48}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {experience.title}
                        </h2>
                        <div className="flex items-center gap-2 mb-2">
                          {experience.logo && (
                            <div className="md:hidden flex-shrink-0">
                              <div className="w-6 h-6 bg-gray-50 rounded p-1 shadow-sm border border-gray-300">
                                <Image 
                                  src={experience.logo}
                                  alt={`${experience.company} logo`}
                                  width={16}
                                  height={16}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          )}
                          <h3 className="text-lg font-semibold text-amber-600">
                            {experience.company}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {experience.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-left lg:text-right">
                      <Badge variant="outline" className="mb-2">
                        {experience.duration}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Achievements</h4>
                    <ul className="space-y-3">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: (index * 0.1) + (achievementIndex * 0.1) 
                          }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies & Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: (index * 0.1) + (skillIndex * 0.02) 
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge 
                            variant="default" 
                            size="sm"
                            className="hover:scale-105 transition-transform"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}