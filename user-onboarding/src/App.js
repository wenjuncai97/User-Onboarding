import React, {useState, useEffect} from 'react'
import Form from './component/Form'
import './App.css';
import * as yup from 'yup'
import axios from 'axios'
import schema from './validation/formSchema'

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: false
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  password: '',
  tos: ''
}

const initialUsers = []
const initialDisabled = true

function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
      .then(res => {
        setUsers(res.data.data)
        console.log(users)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleSubmit = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues))
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
    }
    handleSubmit(newUser);
  }

  const handleChange = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ""}))
        .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues)
    .then((res) => {
      setDisabled(!res)
    })
  }, [formValues])

  return (
    <div className="App">
      <header>
        <h1>Sign Up Form!</h1>
      </header>
      <Form 
        values={formValues}
        change={handleChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {users.map(user => {
        return (<div key={user.id}>
          <p>{user.first_name}</p>
          <p>{user.last_name}</p>
          <p>{user.email}</p>
        </div>)
     })}
    </div>
  );
}

export default App;
