import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Head from './head'
import { getTasks, getTasksForTimespan } from '../redux/reducers/tasks'
import Task from './common/task'
import NewTask from './common/newTask'

const TaskList = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const tasks = useSelector((s) => s.tasks.listOfTasks)
  useEffect(() => {
    dispatch(getTasks(category))
  }, [])
  return (
    <div>
      <Head title="TaskList" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <button
            className="border rounded bg-blue-700 m-2"
            type="button"
            onClick={() => dispatch(getTasks(category))}
          >
            All
          </button>
          <button
            className="border rounded bg-blue-700 m-2"
            type="button"
            onClick={() => dispatch(getTasksForTimespan(category, 'day'))}
          >
            Day
          </button>
          <button
            className="border rounded bg-blue-700 m-2"
            type="button"
            onClick={() => dispatch(getTasksForTimespan(category, 'week'))}
          >
            Week
          </button>
          <button
            className="border rounded bg-blue-700 m-2"
            type="button"
            onClick={() => dispatch(getTasksForTimespan(category, 'month'))}
          >
            Month
          </button>
          {tasks.map((item) => (
            <Task category={category} taskData={item} key={item.taskId} />
          ))}
          <NewTask category={category} />
        </div>
      </div>
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList