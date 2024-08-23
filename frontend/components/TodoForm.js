import React, { useReducer } from 'react'

const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_IS_COMPLETED = 'CHANGE_IS_COMPLETED'

const initialState = {
  todoLabel: '',
  todoIsCompleted: false,
}
// {type: CHANGE_LABEL, payload: 'foo'} this is the action
// {type: CHANGE_IS_COMPLETED, payload: true} this is the action
const reducer = (state, action) => {// reducer takes a state with the initial state and an action that updates the state
  switch (action.type) {
    case CHANGE_LABEL:
      return { ...state, todoLabel: action.payload }//never change state. instead create shallow copy
    case CHANGE_IS_COMPLETED:
      return { ...state, todoIsCompleted: action.payload }
    default:
      return state // always return default state
  }
}
// you don't have to flesh out all the branches in the switch to see the initial state in component
// but with the switch you can start dispatching actions from inside the component
export default function TodoForm({ createNewTodo }) {
   // state and dispatch are the 1st and 2nd element on an Array that returns from calling useReducer
  // passing reducer as the first argument and initialState as the second argument
  const [state, dispatch] = useReducer(reducer, initialState)
  const onLabelChange = ({ target: { value } }) => {// trigger a state change
    dispatch({ type: CHANGE_LABEL, payload: value })//its takes the argument of action and every keystroke is dispatched to the reduced to compute the next state
  }
  const onIsCompletedChange = ({ target: { checked } }) => {
    dispatch({ type: CHANGE_IS_COMPLETED, payload: checked })
  }
  const resetForm = () => {
    dispatch({ type: CHANGE_LABEL, payload: '' })
    dispatch({ type: CHANGE_IS_COMPLETED, payload: false })
  }
  const onNewTodo = evt => {
    evt.preventDefault()
    createNewTodo(state.todoLabel, state.todoIsCompleted)
    resetForm()
  }

  return (
    <form id="todoForm" onSubmit={onNewTodo}>
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          type='text'
          name='todoLabel'
          placeholder='Type label'
          onChange={onLabelChange}
          value={state.todoLabel} // helps to change it's own internal state
        />
      </label>
      <label><span>Is completed:</span>
        <input
          type='checkbox'
          name='todoIsCompleted'
          onChange={onIsCompletedChange}
          checked={state.todoIsCompleted}
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
          disabled={!state.todoLabel.trim()}
        />
      </label>
    </form>
  )
}





