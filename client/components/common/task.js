import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeStatus, changeTitle, deleteTask } from '../../redux/reducers/tasks'

const Task = (props) => {
  const { taskData, category } = props
  const [isEditingMode, setEditingMode] = useState(false)
  const [newTitle, setNewTitle] = useState(taskData.title)
  const dispatch = useDispatch()
  const onTitleChange = (e) => {
    setNewTitle(e.target.value)
  }
  const onEditSaveClick = () => {
    setEditingMode(!isEditingMode)
    if (isEditingMode) {
      dispatch(changeTitle(category, taskData.taskId, newTitle))
    }
  }
  const delClick = () => {
    dispatch(deleteTask(category, taskData.taskId))
  }
  let status
  let flag
  switch (taskData.status) {
    case 'in progress':
    case 'blocked': {
      status = 'done'
      flag =
        'border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none'
      break
    }
    default:
      status = 'in progress'
      flag =
        'border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none'
  }
  const blocked = taskData.status === 'blocked' ? 'in progress' : 'blocked'
  const blockedButton =
    taskData.status === 'blocked'
      ? 'border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none'
      : 'border border-yellow-500 bg-yellow-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-700 focus:outline-none'
  const edit = isEditingMode ? 'Save': 'Edit'
  // (
    // <img src="https://img.icons8.com/small/16/000000/save-as.png" alt="" />
  // ) : (
    // <img src="https://img.icons8.com/small/16/000000/pencil.png" alt="" />
  // )
  return (
    <div className="max-px-6 max-py-4 text-purple bg-gray-400 rounded-lg border shadow-lg p-10">
      {!isEditingMode && (
        <>
          <div className="text-2xl font-bold word-break: break-all">{taskData.title}</div>
          <button
            type="button"
            className="border border-indigo-500 text-indigo-500 rounded-md px-2 py-1 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none"
            onClick={onEditSaveClick}
          >
            {edit}
          </button>
          <div>
            Status: <em>{taskData.status}</em>
          </div>
        </>
      )}
      {isEditingMode && (
        <>
          <div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              // className="px-1 py-1 border border-gray-500 placeholder-gray-5 00 text-black relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none"
              type="text"
              value={newTitle}
              onChange={onTitleChange}
            />
            <button
              type="button"
              className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none"
              onClick={onEditSaveClick}
            >
              {edit}
            </button>
          </div>
          <div>
            Status: <em>{taskData.status}</em>
          </div>
        </>
      )}{' '}
      <button
        type="button"
        className={`${flag}`}
        onClick={() => dispatch(changeStatus(category, taskData.taskId, status))}
      >
        {status}
      </button>
      {(taskData.status === 'in progress' || taskData.status === 'blocked') && (
        <button
          type="button"
          className={`${blockedButton}`}
          onClick={() => dispatch(changeStatus(category, taskData.taskId, blocked))}
        >
          {blocked}
        </button>
      )}
      <button
        type="button"
        className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none"
        onClick={delClick}
      >
        delete
      </button>
    </div>
  )
}

Task.propTypes = {}

export default React.memo(Task)
