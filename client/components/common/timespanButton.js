import React from 'react'
import { useDispatch } from 'react-redux'
import { getTasks, getTasksForTimespan } from '../../redux/reducers/tasks'

const TimespanButton = ({ category, title, setActiveTimespan, isActive }) => {
  const dispatch = useDispatch()
  return (
    <button
      className={`border rounded m-2 px-2 ${isActive ? 'bg-blue-800' : 'bg-blue-500'}`}
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