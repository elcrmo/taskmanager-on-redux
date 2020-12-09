import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Head from './head'
import { getTasks } from '../redux/reducers/tasks'
import Task from './common/task'
import NewTask from './common/newTask'
import TimespanButton from './common/timespanButton'

const TaskList = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const tasks = useSelector((s) => s.tasks.listOfTasks)
  useEffect(() => {
    dispatch(getTasks(category))
  }, [dispatch, category])

  const timespans = ['day', 'week', 'month']

  const [activeTimespan, setActiveTimespan] = useState('all')

  return (
    <div>
      <Head title="Task List" />
      <div className="bg-gray-800 flex items-center justify-center h-screen">
        <div className="text-purple bg-gray-400 font-bold rounded-lg border shadow-lg p-10">
          {['all', ...timespans].map((timespan) => (
            <TimespanButton
              category={category}
              title={timespan}
              key={timespan}
              isActive={activeTimespan === timespan}
              setActiveTimespan={setActiveTimespan}
            />
          ))}
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