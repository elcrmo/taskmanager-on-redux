import React from 'react'
import { useDispatch } from 'react-redux'
import { getTasks, getTasksForTimespan } from '../../redux/reducers/tasks'

const TimespanButton = ({ category, title, setActiveTimespan, isActive }) => {
  const dispatch = useDispatch()
  return (
    <button
      className={`border border-gray-700 rounded-md px-4 py-1 m-2 transition duration-500 ease select-none hover:text-white hover:bg-gray-600 focus:outline-none ${
        isActive ? 'bg-gray-800 text-white' : 'text-gray-700'
      }`}
      type="button"
      onClick={() => {
        dispatch(title === 'all' ? getTasks(category) : getTasksForTimespan(category, title))
        setActiveTimespan(title)
      }}
    >
      {title}
    </button>
  )
}

TimespanButton.propTypes = {}

export default TimespanButton