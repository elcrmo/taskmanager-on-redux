import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Head from './head'
import { getTasks } from '../redux/reducers/tasks'
import Task from './common/task'
import Header from './header'
import Bottom from './bottom'
import Top from './top'

const TaskList = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const tasks = useSelector((s) => s.tasks.listOfTasks)
  useEffect(() => {
    dispatch(getTasks(category))
  }, [dispatch, category])
  return (
    <div>
      <Header />
      <Head title="Task List" />
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <Top />
          <div className="grid md:grid-cols-2 gap-8 m-5 max-w-5xl m-auto">
            {tasks.map((item) => (
              <Task category={category} taskData={item} key={item.taskId} />
            ))}
          </div>
        </div>
      </div>
      <Bottom />
    </div>
  )
}

TaskList.propTypes = {}

export default TaskList
