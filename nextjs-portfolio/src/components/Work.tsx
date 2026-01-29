'use client'

import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'Love leetcode',
    image: '/Loveleetcode.png',
    description: 'A Fullstack leetcode inspired platform for practicing coding problems and solving DSA challenges with a user-friendly interface and interactive features. User can practice coding problems, track progress, and improve their skills in a fresh looking environment.',
    technologies: ['Node js', 'Express', 'Prisma', 'PostgreSQL', 'Auth0', 'React', 'Monaco-editor', 'Tailwind CSS', 'Zod', 'Zustand'],
    features: ['Learning platform', 'Custom problem sets', 'Integrated environment', 'Integrated code execution environment', 'Cloud Storage', 'Personal problem sheets', 'Level based learning'],
    liveDemo: 'https://loveleetcode.in',
    sourceCode: null,
    reverse: false
  },
  {
    title: 'Dcode (deprecated)',
    image: '/Dcode.png',
    description: 'A full-stack web application for open source contribution with exciting rewards and managing multiple repositories. Your open-source contributing platform, built with React.js, facilitates seamless collaboration on open-source projects. It enables developers to explore projects, contribute via pull requests, and engage with maintainers.',
    technologies: ['React', 'Node.js', 'Firebase', 'MongoDB', 'Firebase Auth', 'Auth0'],
    features: ['User Authentication', 'Contribution Management', 'Leaderboard Recognition', 'Task assignment', 'Progress tracking', 'Admin Tools'],
    liveDemo: 'https://dcode-v1.vercel.app/',
    sourceCode: null,
    reverse: true
  },
  {
    title: 'Neutron 2025',
    image: '/Neutron2025.png',
    description: 'Neutron Fest is a leading AI-focused techno-cultural festival by Newton School of Technology and Rishihood University, showcasing innovation through tech events and cultural programs and creating an engaging user experience for festival attendees and participants.',
    technologies: ['React', 'Tailwind CSS', 'CSS'],
    features: ['Interactive & Creative design', 'Event details', 'Dynamic navigation', 'Schedules', 'Registration', 'Partner information'],
    liveDemo: 'https://neutronfest.com/',
    sourceCode: null,
    reverse: false
  },
  {
    title: 'Health Up',
    image: '/Health-Up.jpeg',
    description: 'Health Up is a comprehensive health and fitness platform that offers personalized workout plans, nutrition tracking, and progress monitoring to help users achieve their fitness goals.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    features: ['Personalized Workout Plans', 'Nutrition Tracking', 'Progress Monitoring', 'Community Support', 'Expert Guidance'],
    liveDemo: 'https://health-up-weld.vercel.app/',
    sourceCode: 'https://github.com/Kevish07/Health-UP',
    reverse: true
  },
  {
    title: 'University Fest',
    image: '/Neutron2.O-retro.jpeg',
    description: 'A university fest website that showcases the events, workshops, and competitions of the fest with a user-friendly interface and interactive features. Users can explore the fest details, register for events, and stay updated with the latest news and announcements.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    features: ['Event details', 'Dynamic navigation', 'Schedules', 'Registration', 'Partner information'],
    liveDemo: 'https://neutron2-0-retro.vercel.app/',
    sourceCode: null,
    reverse: false
  }
]

export default function Work() {
  return (
    <section id="work" className="flex flex-col items-center justify-center gap-16 py-16 px-8 max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-bold text-center">Featured Work</h2>
      
      {projects.map((project, index) => (
        <div key={index}>
          <div className={`flex max-lg:flex-col gap-8 items-start w-full ${project.reverse ? 'flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2">
              <Image 
                src={project.image} 
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
              
              <div>
                <span className="font-bold">Technologies -</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-200 py-1.5 px-3 text-sm rounded">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-bold">Features -</span>
                <ul className="list-disc pl-5 text-gray-600 text-sm mt-2">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4 mt-4">
                <Link 
                  href={project.liveDemo} 
                  target="_blank"
                  className="inline-flex items-center gap-2 no-underline py-2.5 px-5 text-sm rounded-md transition-all duration-300 bg-blue-600 text-white hover:bg-blue-800"
                >
                  🔗 Live Demo
                </Link>
                {project.sourceCode && (
                  <Link 
                    href={project.sourceCode} 
                    target="_blank"
                    className="inline-flex items-center gap-2 no-underline py-2.5 px-5 text-sm rounded-md transition-all duration-300 bg-gray-900 text-white hover:bg-black"
                  >
                    🐙 Source Code
                  </Link>
                )}
              </div>
            </div>
          </div>
          {index < projects.length - 1 && <hr className="my-8 border-gray-300" />}
        </div>
      ))}
      
      <p className="text-lg">
        For More Such work{' '}
        <Link href="https://github.com/Kevish07" className="text-orange-500 hover:underline">
          Check out this
        </Link>
      </p>
    </section>
  )
}
