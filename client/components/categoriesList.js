import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Head from './head'
import { getCategories } from '../redux/reducers/tasks'

const Category = () => {
  const categories = useSelector((s) => s.tasks.listOfCategories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  })
  return (
    <div>
      <Head title="Hello" />
      <div className="bg-gray-800 flex items-center justify-center h-screen">
        <div className="text-purple bg-gray-400 font-bold rounded-lg border shadow-lg p-10">
          {categories.map((it) => {
            return (
              <div key={it} className="hover:text-red-500">
                <Link to={`/${it}`}>{it}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Category.propTypes = {}

export default React.memo(Category)
