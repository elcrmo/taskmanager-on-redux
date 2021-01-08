import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/reducers/tasks'

const NewCategory = () => {
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const onSetCategory = (e) => {
    setCategory(e.target.value)
  }
  const onSetTitle = (e) => {
    setTitle(e.target.value)
  }
  const onClick = () => {
    if (title.length !== 0) {
      dispatch(addTask(category, title))
      setTitle('')
      setCategory('')
    }
  }
  return (
    <div>
      <div className="flex mb-3 pt-0 flex flex-col">
        <input
          className="px-5 py-1 border border-gray-500 placeholder-gray-5 00 text-black relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none"
          // " border border-gray-800 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
          type="text"
          value={category}
          onChange={onSetCategory}
          placeholder="Enter new category..."
        />
        <input
          className="px-5 py-1 border border-gray-500 placeholder-gray-5 00 text-black relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none"
          // " border border-gray-800 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
          type="text"
          value={title}
          onChange={onSetTitle}
          placeholder="Enter new task..."
        />
        <button
          type="button"
          className="py-1 border border-gray-500 placeholder-gray-5 00 text-black relative bg-white bg-white rounded text-sm transition duration-500 hover:text-white hover:bg-gray-800 shadow outline-none focus:outline-none"
          onClick={onClick}
        >
          Add
        </button>
      </div>
    </div>
  )
}

NewCategory.propTypes = {}

export default React.memo(NewCategory)
