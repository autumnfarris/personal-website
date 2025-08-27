'use client';

import Card, { CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js',
    'Python', 'SQL', 'MySQL', 'PostgreSQL', 'Oracle', 'Express.js',
    'TailwindCSS', 'SCSS', 'Git', 'Docker', 'AWS', 'Google Cloud'
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-transparent to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  My Journey
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-600">
                  <p>
                    I'm a versatile full-stack developer with a unique blend of technical expertise 
                    and communication skills. My background combines real-world experience with 
                    academic excellence in both Computer Science and Communication.
                  </p>
                  <p>
                    I specialize in creating intuitive, scalable applications that bridge complex 
                    technical requirements with exceptional user experiences. My approach focuses 
                    on understanding user needs, implementing best practices, and fostering 
                    collaborative relationships with both technical teams and stakeholders.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing 
                    to open source projects, or sharing knowledge with the developer community.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-amber-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Education & Certifications</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Computer Information Systems, B.S.</span>
                      <span className="text-amber-600 font-medium">Bachelor's Degree</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Communication, B.S.</span>
                      <span className="text-amber-600 font-medium">Bachelor's Degree</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mastering Design Thinking</span>
                      <span className="text-amber-600 font-medium">MIT Certification</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Software Architecture Principles</span>
                      <span className="text-amber-600 font-medium">CMU Certification</span>
                    </div>
										 <div className="flex justify-between">
                      <span>Remote Work Revolution</span>
                      <span className="text-amber-600 font-medium">HarvardX Certification</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Technical Skills
                </h3>
                <p className="text-gray-600">
                  Technologies I love working with
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge variant="default" className="hover:scale-105 transition-transform">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Core Competencies</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Full-Stack Web Development</li>
                      <li>Database Design & Management</li>
                      <li>API Development & Integration</li>
                      <li>User Experience Design</li>
                      <li>Technical Documentation</li>
                      <li>Team Leadership & Mentoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}