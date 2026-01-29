'use client'

import Image from 'next/image'

const experiences = [
  {
    logo: '/Neutron.png',
    title: 'Frontend Developer',
    company: 'Neutron Fest',
    duration: 'March 2025 - April 2025',
    description: 'Built responsive and feasible product for Neutron Fest 2025. Worked with React js to create engaging user experiences.',
    achievements: [
      'Improved teamwork and communication skills, learned to handle panic situations',
      'Got an opportunity to complete unfinished product and build it from scratch',
      'Implemented scheduled and planned events, workshops and competitions of the fest'
    ]
  },
  {
    logo: 'https://raw.githubusercontent.com/github/explore/e838e6d3526495c83c195ed234acf109cb781f00/topics/hacktoberfest/hacktoberfest.png',
    title: 'Frontend Developer',
    company: 'Hacktober Fest',
    duration: 'October 2024 - November 2024',
    description: 'First hands on experience of open source contribution and learned a lot of industry code. 7+ PR requests and 5+ successfully merged.',
    achievements: [
      'Started with helping maintainers with improving features of Amazon ui clone',
      'Fixed ui and improved styles for user\'s personal projects',
      'Contributed to GFG POTD problems and added more algorithms'
    ]
  },
  {
    logo: '/Dev-Club.jpeg',
    title: 'Full Stack Developer',
    company: 'Dev Club',
    duration: 'August 2024 - Present',
    description: 'Produced frontend products for university infrastructure. Worked with JavaScript, Tailwind, React js.',
    achievements: [
      'Learned how to handle conflicts while collaborating in a huge code base product',
      'Got involved deep usage of git and github for working on open source projects',
      'Currently working on identifying real world problems to make a ease'
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8 py-16 px-8 max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-bold text-center">Experience</h2>
      
      {experiences.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex max-md:flex-col max-md:items-center max-md:text-center gap-6 p-6">
            <div className="w-20 h-20 bg-white p-2 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image 
                src={exp.logo} 
                alt={`${exp.company} logo`}
                width={80}
                height={80}
                className="object-contain max-w-full max-h-full"
              />
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-lg font-medium text-blue-500">{exp.company}</p>
                </div>
                <span className="h-fit w-fit text-sm text-gray-500 border border-gray-300 rounded-full px-3 py-1 font-medium">
                  {exp.duration}
                </span>
              </div>
              
              <p className="text-gray-500">{exp.description}</p>
              
              <div className="mt-2">
                <h4 className="text-sm font-semibold">Key Achievements:</h4>
                <ul className="list-disc pl-5 text-gray-500 text-sm mt-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
