'use client';

import { motion } from 'framer-motion';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    title: 'Oceanographic Data Management System',
    description: 'Enterprise-level application for managing scientific data from oceanographic surveys. Features offline-first architecture, real-time sensor data visualization, and comprehensive data analysis tools.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL', 'Axios', 'MySQL2' ,'PWA', 'IndexedDB', 'Mantine'],
    category: 'Enterprise Application',
    highlights: [
      'Reduced data processing time by 75%',
      'Supports offline functionality for at-sea research',
      'Handles data from 3 different sensor types',
      'Used by federal scientists and researchers',
			'Impacts international seafood markets'
    ],
    status: 'Production',
    year: '2023-2025'
  },
  {
    title: 'Travel Request',
    description: 'Web application for managing employee travel requests. Streamlined paper-based workflow by automating approvals, creating custom reporting, and integratiion with Google Workspace tools.',
    technologies: ['Vue.js', 'Vuetify', 'Google Apps Script', 'GitLab', 'Google Sheets', 'Jira', 'Balsamiq'],
    category: 'Enterprise Application',
    highlights: [
      'Streamlined travel request process',
      'Integrated with Google Workspace tools',
      'Seamless user experience',
			'Automated email notifications'
    ],
    status: 'Production',
    year: '2022-2023'
  },
  {
    title: 'Micro-Purchasing',
    description: 'Web application streamlining the micro-purchasing process for government agencies. Features include real-time approval workflows, budget tracking, and vendor management.',
    technologies: ['Vue.js', 'Vuetify', 'Google Apps Script', 'GitLab', 'Google Sheets', 'Jira'],
    category: 'Enterprise Application',
    highlights: [
      'Facilitated government purchasing',
      'Real-time approval tracking',
      'Custom report generation',
			'User-friendly interface'
    ],
    status: 'Production',
    year: '2023'
  },
  {
    title: 'Item Exchange',
    description: 'Internal application used for exchanging items between departments. Features include image uploads, automated email notifications, and inventory management.',
    technologies: ['Vue.js', 'Vuetify', 'Google Apps Script', 'GitLab', 'Google Sheets', 'Jira'],
    category: 'Enterprise Application',
    highlights: [
      'Seamless item exchange process',
      'Automated email notifications',
      'Intuitive user interface',
      'Real-time inventory tracking'
    ],
    status: 'Production',
    year: '2022'
  },
	{
    title: 'Account Request',
    description: 'Internal application used for managing user account requests. Features include image uploads/display, automated email notifications, and inventory management.',
    technologies: ['jQuery', 'Javascript', 'Material Design', 'Google Apps Script', 'GitLab', 'Google Sheets'],
    category: 'Enterprise Application',
    highlights: [
      'Streamlined account request process',
      'Automated email notifications',
      'Intuitive user interface',
      'Real-time status updates'
    ],
    status: 'Production',
    year: '2022'
  },
	{
    title: 'VPN Request',
    description: 'Simple application used for managing internal VPN requests.',
    technologies: ['Vue.js', 'Vuetify', 'Google Apps Script', 'GitLab', 'Google Sheets', 'Jira'],
    category: 'Enterprise Application',
    highlights: [
      'Streamlined VPN request process',
			'Jira integration',
      'Automated email notifications',
      'Custom reporting'
    ],
    status: 'Production',
    year: '2022'
  },
  {
    title: 'Personal Developer Portfolio',
    description: 'Modern, responsive portfolio website built with Next.js and featuring smooth animations, optimized performance, and accessibility-first design principles.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Claude', 'Lyra'],
    category: 'Portfolio',
    highlights: [
      'Lighthouse score of 100/100',
      'Smooth scroll animations',
      'Fully responsive design',
      'Accessibility compliant'
    ],
    status: 'Active',
    year: '2025',
    liveUrl: '/',
    githubUrl: 'https://github.com/autumnfarris/personal-website'
  }
];

export default function ProjectsPage() {
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
            Featured <span className="text-amber-600">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of applications and systems I&apos;ve designed and built, 
            ranging from enterprise solutions to personal projects that demonstrate 
            my passion for creating meaningful digital experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Project Info */}
                  <div className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {project.title}
                          </h2>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Badge variant="outline" size="sm">
                              {project.category}
                            </Badge>
                            <span>•</span>
                            <span>{project.year}</span>
                            <span>•</span>
                            <span className={`font-medium ${
                              project.status === 'Production' ? 'text-green-600' :
                              project.status === 'Active' ? 'text-blue-600' :
                              'text-gray-600'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Links */}
                        {(project.liveUrl || project.githubUrl) && (
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <Button
                                href={project.liveUrl}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                Live Demo
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button
                                href={project.githubUrl}
                                variant="ghost"
                                size="sm"
                                className="gap-2"
                              >
                                <CodeBracketIcon className="h-4 w-4" />
                                Code
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="default" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                  
                  {/* Project Highlights */}
                  <div className="lg:col-span-1">
                    <CardContent className="h-full flex flex-col justify-center">
                      <h4 className="font-semibold text-gray-900 mb-4">Key Highlights</h4>
                      <ul className="space-y-3">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <motion.li
                            key={highlight}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: (index * 0.1) + (highlightIndex * 0.1) 
                            }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            I&apos;m always excited to take on new challenges and collaborate on innovative projects. 
            Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Get In Touch
            </Button>
            <Button href="/experience" variant="outline" size="lg">
              View Experience
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}