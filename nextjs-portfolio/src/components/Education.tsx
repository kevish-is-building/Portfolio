'use client'

import Image from 'next/image'

const educationData = [
  {
    logo: '/RU Campus.png',
    institution: 'Newton School of Technology, Rishihood University',
    degree: 'Bachelor in Computer Science and Artificial Intelligence',
    duration: '2024 - 2028',
    description: 'Specialized in Machine Learning and Artificial Intelligence.'
  },
  {
    logo: '/Anss.png',
    institution: 'Adharsh Navodaya Public School',
    degree: 'High Secondary Education',
    duration: '2010 - 2024',
    description: 'Graduated with honors, With Leadership Qualities'
  }
]

export default function Education() {
  return (
    <section id="education" className="bg-gray-100 py-16 px-6">
      <div className="flex flex-col gap-8 max-w-[1000px] mx-auto">
        <h2 className="text-3xl font-bold text-center">Education</h2>
        
        {educationData.map((edu, index) => (
          <div key={index} className="flex max-md:flex-col gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-[200px] h-[150px] flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              <Image 
                src={edu.logo} 
                alt={`${edu.institution} logo`}
                width={200}
                height={150}
                className="object-contain"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">{edu.institution}</h3>
              <p className="text-lg">{edu.degree}</p>
              <p className="text-sm text-gray-500">{edu.duration}</p>
              <p className="text-gray-500">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
