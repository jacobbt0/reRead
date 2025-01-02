import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Semester = ({semesters, department}) => {
    
    return (
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-1 ">
            <h2 className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8' >Select Semester</h2>
            <motion.div
                className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 justify-items-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {semesters?.map((semester) => (
                    <div className='relative overflow-hidden h-15 w-full rounded-lg group' key={semester.name.charAt(0)}>
                        <Link to={ "/"+department+semester.href}>
                            <div className='w-full h-full cursor-pointer'>
                                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 opacity-100   hover:to-zinc-900 focus:to-slate-600' />
                                <h2 className="text-center text-2xl sm:text-2xl font-bold mb-4 ">
                                    {semester.name}
                                </h2>
                            </div>
                        </Link>
                    </div>

                ))}

            </motion.div>
        </div>
    )
}

export default Semester