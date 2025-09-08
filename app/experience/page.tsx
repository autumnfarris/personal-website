'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const experiences = [
  {
    title: 'Lead Software Engineer',
    company: 'NOAA: National Oceanic & Atmospheric Administration',
    location: 'Seattle, Washington, United States · Remote',
    duration: 'Nov 2022 - Present · 2 yrs 4 mos',
    logo: '/noaa_logo.png',
    achievements: [
			'Built stakeholder trust by participating in at-sea surveys, uncovering critical user needs.',
			'Accelerated development timelines with prototypes that validated workflows and designs.',
			'Boosted team clarity by documenting application architecture and technical decisions.',
			'Streamlined legacy system upgrades through modular technology integration.',
			'Delivered bug-free apps via rigorous team code testing.',
			'Reduced data processing by 75% with intuitive, SDLC-driven workflows.',
			'Resolved complex user challenges with offline-first solutions and sensor data graph visualizations.',
			'Owned end-to-end app development across QA, project management, UX, architecture, and support.',
    ],
    skills: [
      'React.js', 'Python', 'Express.js', 'SQL', 'Javascript', 'MySQL', 
      'Oracle', 'Google Apps Script', 'Node.js', 'Vue.js', 
      'Vuetify', 'Software Documentation', 'IIS', 'Mantine', 'SDLC', 
      'Full-Stack Development', 'Design Thinking', 'Software Design', 'Balsamiq', 
      'Wireframing', 'Android Studio', 'Jira', 'GitLab', 'Team Leadership', 'Customer Support', 'Project Management', 'UX Designer', 'Business Analyst', 'End to End testing', 
			'Technical Writing', 'Windows OS', 'VS Code'
    ]
  },
  {
    title: 'Software Developer [Contractor in support of NOAA]',
    company: 'IBSS',
    location: 'Seattle, Washington, United States',
    duration: 'Aug 2021 - Nov 2022 · 1 yr 4 mos',
		logo: '/ibss.png',
    achievements: [
      'Developed full-stack enterprise apps to streamline workflows and reduce user and manager workload.',
			'Led as project manager to deliver new enterprise applications.',
			'Earned user trust with intuitive, reliable applications.',
			'Managed stakeholder expectations by communicating feature updates and version releases.',
			'Guided clients through technical issues with effective solutions.',
			'Maintained development best practices using clean code principles.',
			'Built strong client and team relationships through interpersonal skills.',
			'Improved team workflow by exploring and implementing new tools and ideas.',
			'Supported government and scientific operations with workflow-enhancing applications.',
    ],
    skills: [
      'Javascript', 'Vue.js', 'Vuetify', 'Design Thinking',
      'Google Apps Script', 'Full-Stack Development',
      'Wireframing', 'Balsamiq', 'GitLab', 'End to End testing', 'jQuery', 'Jira', 'Material Design',
			'Design Thinking', 'Windows OS', 'VS Code', 'Customer Support'
    ]
  },
  {
    title: 'Bartender / Shift Lead',
    company: 'The Overhang',
    location: 'Dahlonega, GA',
    duration: 'Jan 2019 - February 2020 · 1 year 1 mos',
		logo: '/overhang.jpg',
    achievements: [
			'Directed military personnel, combining leadership and teamwork to deliver efficient service.',
			'Maintained safety and cleanliness, ensuring a secure environment.',
			'Reconciled daily transactions, ensuring accurate accounting.',
    ],
    skills: ['Customer Relationship Management (CRM)', 'Bartending', 'Communication', 'Employee Training', 'Sales', 'Multitasking', 'Team Leadership', 'Conflict Resolution']
  },
	{
    title: 'Web Developer',
    company: 'Glasswerks',
    location: 'Remote',
    duration: 'Nov 2018 - May 2019 · 7 mos',
		logo: '/glasswerks.png',
    achievements: [
      'Developed and deployed a customer order tracking web app that improved daily operational efficiency for clients.',
			'Applied Elixir and TDD to ensure robust backend logic, reducing post-deployment bugs.',
			'Implemented new features and fixed critical bugs based on user requirements, enhancing app functionality.',
			'Reviewed and approved pull requests via GitHub, ensuring code quality and team alignment.',
    ],
    skills: ['Elixir', 'Phoenix', 'Erlang', 'GitHub', 'Mac OS', 'Git', 'Atom']
  },
  {
    title: 'Software Developer [Intern]',
    company: 'Common Ledger',
    location: 'Wellington, New Zealand',
    duration: 'Jun 2018 - Aug 2018 · 2 mos',
		logo: '/common-ledger.jpg',
    achievements: [
			'Relocated to New Zealand to collaborate closely with developers on complex projects, ensuring timely delivery.',
			'Performed in a full-stack environment using unit testing to ensure robust and reliable code.',
			'Directed Scrum meetings to align on updates and strategies, fulfilling the role of Scrum Master.',
			'Delivered bug-free code by rigorously critiquing work before submission.',
    ],
    skills: [
      'Javascript', 'Vue.js', 'TypeScript', 'Scrum', 'Agile Methodologies', 
      'Amazon Web Services (AWS)', 'Terraform', 'Mac OS', 'VS Code'
    ]
  },
  {
    title: 'Shift Lead / Bartender',
    company: 'Bair\'s Sports Grill',
    location: 'Springfield, MO, United States',
    duration: 'Jul 2013 - May 2018 · 4 yrs 11 mos',
		logo: '/bairs.jpg',
    achievements: [
			'Resolved customer issues with empathy, enhancing satisfaction.',
			'Managed daily transactions and prepared bank deposits accurately.',
			'Closed and secured the bar, maintaining safety standards.',
			'Sold $2,500 in gift cards during the holiday season, winning annual sales contest.',
			'Verified ages of patrons, supporting law enforcement protocols and compliance.',
			'Embraced tasks with energy and positivity, improving team morale.',
			'Earned Employee of the Month award, recognizing outstanding performance.',
    ],
    skills: [
      'Customer Relationship Management (CRM)', 'Bartending', 'Communication', 
      'Employee Training', 'Sales', 'Multitasking', 'Team Leadership', 'Conflict Resolution'
    ]
  },
  {
    title: 'Development Lead [Intern]',
    company: 'Big Brothers Big Sisters of the Ozarks',
    location: 'Springfield, MO, United States',
    duration: 'Jan 2017 - Jul 2017 · 7 mos',
		logo: '/BBBS.png',
    achievements: [
      'Generated new donor leads for fundraising events, expanding outreach opportunities.',
      'Built relationships with board members through strong interpersonal skills.',
      'Increased auction item value by $10,455, outperforming all colleagues.',
      'Volunteered for diverse tasks, demonstrating adaptability and initiative.',
      'Assisted in planning signature fundraising events, ensuring successful execution.',
      'Led team role-play exercises, improving donor engagement strategies.',
      'Secured major donations, including a single $10,000 pledge, through passion and advocacy.',
      'Negotiated free media coverage by networking with a local TV station.',
      'Raised $13,455 for a silent auction, exceeding personal fundraising goals by $10,000.',
    ],
    skills: [
      'Communication', 'Sales', 'Customer Engagement', 'Fundraising', 'Nonprofit Volunteering', 'Community Outreach'
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