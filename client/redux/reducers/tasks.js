import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const CHANGE_STATUS = 'CHANGE_STATUS'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TITLE = 'CHANGE_TITLE'
const GET_TASKS_FOR_TIMESPAN = 'GET_TASKS_FOR_TIMESPAN'
const DELETE_TASK = 'DELETE_TASK'
const GET_CATEGORIESLIST = 'GET_CATEGORIESLIST'

const initialState = {
  listOfTasks: [],
  listOfCategories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
    case CHANGE_STATUS:
    case ADD_TASK:
    case CHANGE_TITLE:
    case GET_TASKS_FOR_TIMESPAN:
    case DELETE_TASK: {
      return {
        ...state,
        listOfTasks: action.listOfTasks
      }
    }
    case GET_CATEGORIESLIST: {
      return {
        ...state,
        listOfCategories: action.data
      }
    }
    default:
      return state
  }
}

export function getTasks(category) {
  return (dispatch) => {
    axios(`/api/v1/tasks/${category}`).then(({ data: listOfTasks }) => {
      dispatch({ type: GET_TASKS, listOfTasks })
    })
  }
}

export function changeStatus(category, id, status) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfTasks } = store.tasks
    const changedStatus = listOfTasks.map((item) =>
      item.taskId === id ? { ...item, status } : { ...item }
    )
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        status: 'in progress'
      }
    })
    dispatch({ type: CHANGE_STATUS, listOfTasks: changedStatus })
  }
}

export function addTask(category, title) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/tasks/${category}`,
      data: {
        title
      }
    }).then(({ data: listOfTasks }) =>
      dispatch({
        type: ADD_TASK,
        listOfTasks
      })
    )
  }
}

export function changeTitle(category, id, title) {
  return (dispatch) => {
    axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        title
      }
    }).then(({ data: listOfTasks }) => {
      dispatch({ type: CHANGE_TITLE, listOfTasks })
    })
  }
}

export function getTasksForTimespan(category, timespan) {
  return (dispatch) => {
    axios(`/api/v1/tasks/${category}/${timespan}`).then(({ data: listOfTasks }) =>
      dispatch({
        type: GET_TASKS_FOR_TIMESPAN,
        listOfTasks
      })
    )
  }
}

export function deleteTask(category, id) {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/api/v1/tasks/${category}/${id}`
    }).then(({ data: listOfTasks }) =>
      dispatch({
        type: DELETE_TASK,
        listOfTasks
      })
    )
  }
}

export function getCategories() {
  return (dispatch) => {
    axios(`/api/v1/categories`).then(({ data }) => {
      dispatch({ type: GET_CATEGORIESLIST, data })
    })
  }
}
