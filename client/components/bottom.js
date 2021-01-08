import React from 'react'
import { useParams } from 'react-router-dom'
import NewTask from './common/newTask'

const Bottom = () => {
  const { category } = useParams()
  return (
    <div className="container mx-auto flex justify-around p-5 flex-col md:flex-row items-center">
      <div>
        <NewTask category={category} />
      </div>
    </div>
  )
}

Bottom.propTypes = {}

export default Bottom