import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TimespanButton from './common/timespanButton'

const Header = () => {
  const { category } = useParams()
  const timespans = ['day', 'week', 'month']
  const [activeTimespan, setActiveTimespan] = useState('all')
  const back = (
    <img className="p-1" src="https://img.icons8.com/windows/32/000000/circled-left.png" alt="" />
  )

  return (
    <div className="container mx-auto flex justify-around p-5 flex-col md:flex-row items-center">
      <div>
        <Link
          type="button"
          to="/"
          className="flex text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold"
        >
          Back to category select {back}
        </Link>
        {/* <br />
          <em className="text-xs text-grey-dark">Current category - {category}</em> */}
      </div>
      <div className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">
        {category}
      </div>
      <div>
        {['all', ...timespans].map((timespan) => (
          <TimespanButton
            category={category}
            title={timespan}
            key={timespan}
            isActive={activeTimespan === timespan}
            setActiveTimespan={setActiveTimespan}
          />
        ))}
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
