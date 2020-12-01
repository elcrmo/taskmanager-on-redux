import axios from 'axios'

const GET_TASKS = 'GET_TASKS'

const initialState = {
  listOfTasks: ['1232343', '12324']
}

export default (state = initialState, action) => {
  switch (action.type) {
     case GET_TASKS: {
      return { ...state, listOfTasks: action.listOfTasks }
    }
    default:
      return state
  }
}

export function getTasks(category) {
  return (dispatch) => {
    axios(`/api/v1/tasks/${category}`)
      .then(({ data }) => {
        dispatch({ type: GET_TASKS, listOfTasks: data })
      })
   }
}