import React from 'react'

const Form = props => {
    const {change, submit, errors, disabled} = props;
    const {firstName, lastName, email, password, tos} = props.values;

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === "checkbox" ? checked : value
        change(name, valueToUse)
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <div className='errors'>
                    <div>{errors.firstName}</div>
                    <div>{errors.lastName}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <h3>Enter your information here</h3>

                <label>First Name:
                    <input
                        value={firstName}
                        onChange={onChange}
                        name='firstName'
                        type='text'
                    />
                </label>
                <br />
                <label>Last Name:
                    <input
                        value={lastName}
                        onChange={onChange}
                        name='lastName'
                        type='text'
                    />
                </label>
                <br />
                <label>Email:
                    <input
                        value={email}
                        onChange={onChange}
                        name='email'
                        type='email'
                    />
                </label>
                <br />
                <label>Password:
                    <input
                        value={password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
                <br />
                <label>Terms Of Service
                    <input
                        type='checkbox'
                        name='tos'
                        onChange={onChange}
                        checked={tos}
                    />
                </label>
                <br />
                <button disabled={disabled} >submit</button>
            </div>
        </form>
    )
}

export default Form;