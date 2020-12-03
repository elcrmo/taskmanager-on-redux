import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const UPDATE_SMTH = 'UPDATE_SMTH'
const CHANGE_STATUS = 'CHANGE_STATUS'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TITLE = 'CHANGE_TITLE'
const GET_TASKS_FOR_TIMESPAN = 'GET_TASKS_FOR_TIMESPAN'

const initialState = {
  listOfTasks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        listOfTasks: action.listOfTasks
      }
    }
    case CHANGE_STATUS: {
      return {
        ...state,
        listOfTasks: action.changedStatus
      }
    }
    case UPDATE_SMTH: {
      return {
        ...state,
        listOfTasks: [...state.listOfTasks, action.new]
      }
    }
    case ADD_TASK: {
      return {
        ...state,
        listOfTasks: action.data.filter((item) => !item._isDeleted)
      }
    }
    case CHANGE_TITLE: {
      return {
        ...state,
        listOfTasks: action.data.filter((item) => !item._isDeleted)
      }
    }
    case GET_TASKS_FOR_TIMESPAN: {
      return { ...state, listOfTasks: action.data }
    }
    default:
      return state
  }
}

export function getTasks(category) {
  return (dispatch) => {
    axios(`/api/v1/tasks/${category}`).then(({ data }) => {
      dispatch({ type: GET_TASKS, listOfTasks: data })
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
    dispatch({ type: CHANGE_STATUS, changedStatus })
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
    }).then(({ data }) =>
      dispatch({
        type: ADD_TASK,
        data
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
    }).then(({ data }) => {
      dispatch({ type: CHANGE_TITLE, data })
    })
  }
}

export function getTasksForTimespan(category, timespan) {
  return (dispatch) => {
    axios(`/api/v1/tasks/${category}/${timespan}`).then(({ data }) =>
      dispatch({
        type: GET_TASKS_FOR_TIMESPAN,
        data
      })
    )
  }
}

export function updateSmth() {
  return { type: UPDATE_SMTH, new: 'blabla' }
}
