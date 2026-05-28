import React from 'react'

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className="bg-richblack-800 py-12 lg:py-16">
      {/* Wrapper to center content and control responsive layouts */}
      <div className="mx-auto max-w-[1200px] w-11/12">
        
        {/* Responsive Grid Layout to distribute stats evenly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {
            Stats.map((data, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  {/* Large Bold Numbers */}
                  <h1 className="text-3xl lg:text-4xl font-bold text-richblack-5">
                    {data.count}
                  </h1>
                  {/* Muted Sub-labels below */}
                  <h2 className="text-sm lg:text-base font-semibold text-richblack-500">
                    {data.label}
                  </h2>
                </div>
              )
            })
          }
        </div>

      </div>
    </section>
  )
}

export default StatsComponent