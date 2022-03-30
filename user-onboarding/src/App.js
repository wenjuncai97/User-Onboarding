import React, {useState, useEffect} from 'react'
import Form from './component/Form'
import './App.css';
import * as yup from 'yup'
import axios from 'axios'
import schema from './validation/formSchema'

//ENDPOINT: `https://reqres.in/api/users` 

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  tos: false
}

const initialFormErrors = {
  firstName: '',
  lastName: '',
  password: '',
  tos: ''
}

const initialUsers = []
const initialDisabled = false

function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
      .then(res => {
        // console.log(res.data)
        setUsers(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ""}))
        .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  const formSubmit = () => {
    const newUser = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      password: formValues.password.trim(),
    }
    handleSubmit(newUser);
  }

  const handleChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }

  const handleSubmit = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues))
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(() => setDisabled)
  }, [formValues])


  return (
    <div className="App">
      <header><h1>Sign Up Form!</h1></header>
      <Form 
      values={formValues}
      change={handleChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
    />
    {/* {users.map(user => {
      return (
      <div key={user.id}>
        <p>{user.createdAt}</p>
        <p>{user.email}</p>
      </div>
      )
    })} */}
    </div>
  );
}

export default App;
