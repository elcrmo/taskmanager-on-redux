import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const UPDATE_SMTH = 'UPDATE_SMTH'
const CHANGE_STATUS = 'CHANGE_STATUS'

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
      item.taskId === id ? { ...item, status} : { ...item }
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

export function updateSmth() {
  return { type: UPDATE_SMTH, new: 'blabla' }
}

