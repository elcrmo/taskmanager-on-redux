import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Head from './head'
import NewCategory from './common/newCategory'
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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Select category:</h1>
        <div className="flex flex-col items-center justify-center text-purple bg-white font-bold rounded-lg shadow-lg px-20 py-4">
          {categories.map((it) => {
            return (
              <div key={it} className="hover:text-red-500">
                <Link to={`/${it}`}>{it}</Link>
              </div>
            )
          })}
        </div>
        <NewCategory />
      </div>
    </div>
  )
}

Category.propTypes = {}

export default React.memo(Category)
