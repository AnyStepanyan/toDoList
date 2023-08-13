import { useReducer } from 'react';
import './App.css';
import { v4 } from 'uuid'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteDialog from './Components/DeleteDialog';
import EditDialog from './Components/EditDialog';

function reducer(state, action) {
  switch (action.type) {
    case 'handleInput':
      return { ...state, inputValue: action.payload.text };
    case 'handleAdd':
      return {
      ...state,
      todos: [...state.todos, { title: state.inputValue, id: v4(), isCompleted: false }],
      inputValue: ''
    };
    case 'onRemoveClick':
      return { ...state, itemToDelete: action.payload.text };
    case 'handleDeleteDialogClose':
      return { ...state, itemToDelete: null };
    case 'handleDelete':
      return { ...state, todos: state.todos.filter(todo => todo.id !== state.itemToDelete.id) };
    case 'onEditClick':
      return { ...state, itemToEdit: action.payload.text };
    case 'handleEditDialogClose':
      return { ...state, itemToEdit: null };
    case 'handleUpdate':
      return { ...state, todos: state.todos.map((todo) => todo.id === state.itemToEdit.id ? { ...todo, title: action.payload.text} : todo) };
    case 'handleCompleted':
      return {
        ...state, todos: state.todos.map((todo) => {
          if (todo.id === action.payload.text.id) {
            return action.payload.text
          }
          return todo
        })
      };
    case 'removeCompleted':
      return { ...state, todos: state.todos.filter((todo) => !todo.isCompleted) };
    }

  return state
}


function App() {
  const initialState = { inputValue: '', todos: [], itemToDelete: null, itemToEdit: null };
  const [data, dispatch] = useReducer(reducer, initialState)
  const completedTasks = data.todos.filter((todo) => todo.isCompleted).length

  const handleInput = (e) => {
    dispatch({
      type: "handleInput",
      payload: {
        text: e.target.value
      }
    })
  };

  const handleAdd = () => {
    if (!data.inputValue.trim()) {
      alert('Enter valid value')
      return
    }
    dispatch({
      type: "handleAdd"
    })
  }

  const onRemoveClick = (itemToDelete) => {
    dispatch({
      type: "onRemoveClick",
      payload: {
        text: itemToDelete
      }
    })
  }

  const handleDeleteDialogClose = () => {
    dispatch({
      type: "handleDeleteDialogClose",
    })
  }

  const handleDelete = () => {
    dispatch({
      type: "handleDelete",
    })
    handleDeleteDialogClose()
  }

  const onEditClick = (itemToEdit) => {
    dispatch({
      type: "onEditClick",
      payload: {
        text: itemToEdit
      }
    })
  }

  const handleEditDialogClose = () => {
    dispatch({
      type: "handleEditDialogClose",
    })
  }

  const handleUpdate = (newTitle) => {
    dispatch({
      type: "handleUpdate",
      payload: {
        text: newTitle
      }
    })
    handleEditDialogClose()
  }

  const handleCompleted = (checkedTask) => {
    dispatch({
      type: "handleCompleted",
      payload: {
        text: checkedTask
      }
    })
  }

  const removeCompleted = () => {
    dispatch({
      type: "removeCompleted",
    })
  }

  return (
    <div>
      <TextField
        onChange={handleInput}
        value={data.inputValue}
        id="outlined-basic"
        label=""
        variant="outlined"
      />
      <Button
        onClick={handleAdd}
        variant="outlined">
        Add</Button>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            <input onChange={(e) => handleCompleted({ ...todo, isCompleted: e.target.checked })} type='checkbox' checked={todo.isCompleted} />
            {' '}{todo.title}{' '}
            <Button onClick={() => onRemoveClick(todo)}>Remove</Button>
            <Button onClick={() => onEditClick(todo)}>Edit</Button>
          </li>
        ))}
      </ul>

      {data.itemToDelete && (
        <DeleteDialog
          title={data.itemToDelete.title}
          onClose={handleDeleteDialogClose}
          onDelete={handleDelete} />
      )
      }

      {data.itemToEdit && (
        <EditDialog
          onClose={handleEditDialogClose}
          onUpdate={handleUpdate}
          initialValue={data.itemToEdit.title} />
      )
      }

      <p>{completedTasks}/{data.todos.length} completed
        <Button onClick={removeCompleted}>Remove Completed</Button></p>

    </div>
  );
}

export default App;

// class App extends React.Component {
//   state = {
//     value: "",
//     todos: [],
//     itemToDelete: null
//   };
//   onChange = (e) => {
//     this.setState({ value: e.target.value });
//   };

//   handleAdd = () => {
//     this.setState({
//       todos: [...this.state.todos, { title: this.state.value, id: v4() }],
//       value: "",
//     });
//   }

//   onRemoveClick = (itemToDelete) => {
//     this.setState({ itemToDelete })
//   }

//   handleDeleteDialogClose = () => {
//     this.setState({ itemToDelete: null })
//   }

//   handleDelete = () => {
//     const { todos, itemToDelete } = this.state
//     this.setState({ todos: todos.filter(todo => todo.id !== itemToDelete.id) })
//     this.handleDeleteDialogClose()
//   }

//   render() {
//     const { value, todos, itemToDelete } = this.state
//     return (
//       <div>
//         <TextField
//           onChange={this.onChange}
//           value={value}
//           id="outlined-basic"
//           label=""
//           variant="outlined"
//         />
//         <Button
//           onClick={this.handleAdd}
//           variant="outlined">
//           Add</Button>
//         <ul>
//           {todos.map((todo) => (
//             <li key={todo.id}>{todo.title}{' '}
//               <Button onClick={() => this.onRemoveClick(todo)}>Remove</Button>
//             </li>
//           ))}
//         </ul>

//         {itemToDelete && (
//           <DeleteDialog
//             title={itemToDelete.title}
//             onClose={this.handleDeleteDialogClose}
//             onDelete={this.handleDelete} />
//         )
//         }
//       </div>
//     );
//   }
// }

