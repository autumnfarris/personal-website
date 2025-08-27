'use client';

import { motion } from 'framer-motion';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS', 'Bootstrap'],
    icon: '🎨'
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'Python', 'Java', 'Elixir', 'RESTful APIs', 'GraphQL', 'Microservices'],
    icon: '⚙️'
  },
  {
    title: 'Database & Storage',
    skills: ['MySQL', 'PostgreSQL', 'SQLite', 'Oracle', 'MongoDB', 'Redis', 'SQL Optimization', 'Database Design'],
    icon: '🗃️'
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'Docker', 'CI/CD', 'GitHub Actions', 'Linux', 'Nginx', 'Load Balancing'],
    icon: '☁️'
  },
  {
    title: 'Development Tools',
    skills: ['Git', 'GitHub', 'GitLab', 'Jira', 'VS Code', 'Jest', 'Testing Library', 'Webpack', 'Vite'],
    icon: '🛠️'
  },
  {
    title: 'Design & UX',
    skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility', 'Responsive Design'],
    icon: '🎯'
  }
];

const certifications = [
  {
    name: 'Mastering Design Thinking',
    issuer: 'MIT',
    year: '2023',
    description: 'Advanced certification in human-centered design principles and methodologies'
  },
  {
    name: 'Software Architecture Principles and Practices',
    issuer: 'Carnegie Mellon University',
    year: '2023',
    description: 'Comprehensive study of scalable software architecture patterns and best practices'
  }
];

export default function SkillsPage() {
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
            Skills & <span className="text-amber-600">Expertise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and certifications that drive my passion for creating exceptional digital experiences.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: (index * 0.1) + (skillIndex * 0.02) 
                        }}
                      >
                        <Badge 
                          variant="default" 
                          className="hover:scale-105 transition-transform cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Certifications & Education
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-l-4 border-l-amber-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cert.name}
                      </h3>
                      <Badge variant="secondary" size="sm">
                        {cert.year}
                      </Badge>
                    </div>
                    <p className="text-amber-600 font-medium mb-3">{cert.issuer}</p>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-900 text-center">
                Academic Background
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-amber-100 last:border-b-0">
                  <div>
                    <h4 className="font-semibold text-gray-900">Computer Information Systems</h4>
                    <p className="text-gray-600 text-sm">Bachelor of Science</p>
                  </div>
                  <Badge variant="outline">B.S.</Badge>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-amber-100 last:border-b-0">
                  <div>
                    <h4 className="font-semibold text-gray-900">Communication</h4>
                    <p className="text-gray-600 text-sm">Bachelor of Science</p>
                  </div>
                  <Badge variant="outline">B.S.</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            My Development Philosophy
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I believe in writing clean, maintainable code that not only solves problems but also 
              tells a story. Every line of code should serve a purpose, every component should be 
              reusable, and every user interaction should feel intuitive and delightful.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Technology is constantly evolving, and I'm committed to continuous learning and 
              staying current with industry best practices. I strive to balance innovation with 
              stability, always considering the long-term impact of architectural decisions.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}