import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeStatus, changeTitle } from '../../redux/reducers/tasks'

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
  let status
  switch (taskData.status) {
    case 'in progress':
    case 'blocked': {
      status = 'done'
      break
    }
    default:
      status = 'in progress'
  }
  const blocked = taskData.status === 'blocked' ? 'in progress' : 'blocked'
  const edit = isEditingMode ? 'Save' : 'Edit'
  return (
    <div>
      <button type="button" className="border rounded bg-teal-500" onClick={onEditSaveClick}>
        {edit}
      </button>
      {!isEditingMode && (
        <>
          <div>{taskData.title}</div>
          <div>{taskData.status}</div>
        </>
      )}
      {isEditingMode && (
        <input className="text-black" type="text" value={newTitle} onChange={onTitleChange} />
      )}{' '}
      <button
        type="button"
        className="border rounded bg-teal-500"
        onClick={() => dispatch(changeStatus(category, taskData.taskId, status))}
      >
        {status}
      </button>
      {(taskData.status === 'in progress' || taskData.status === 'blocked') && (
        <button
          type="button"
          className="border rounded bg-teal-500"
          onClick={() => dispatch(changeStatus(category, taskData.taskId, blocked))}
        >
          {blocked}
        </button>
      )}
    </div>
  )
}

Task.propTypes = {}

export default React.memo(Task)
