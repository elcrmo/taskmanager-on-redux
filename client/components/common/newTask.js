import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/reducers/tasks'

const NewTask = (props) => {
  const { category } = props
  const [title, setTitle] = useState()
  const dispatch = useDispatch()
  const onChange = (e) => {
    setTitle(e.target.value)
  }
  const onClick = () => dispatch(addTask(category, title))
  return (
    <div>
      <input className="text-black" type="text" value={title} onChange={onChange} />
      <button type="button" onClick={onClick}>
        Add
      </button>

    </div>
  )
}

NewTask.propTypes = {}

export default React.memo(NewTask)
