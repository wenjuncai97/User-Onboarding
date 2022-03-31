import React from 'react'
// import styled from 'styled-components'

const Form = props => {
    const {change, submit, errors, disabled} = props;
    const {first_name, last_name, email, password, tos} = props.values;

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === "checkbox" ? checked : value
        change(name, valueToUse)
    }

    // const StyledInputs = styled.div`
    //     #formInputs {
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         flex-direction: column;
    //     }
    // `
    
    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </div>
        {/* <StyledInputs> */}
            <div id="formInputs" className='form-group inputs'>
                <h3>Enter your information here</h3>

                <label>First Name:
                    <input
                        value={first_name}
                        onChange={onChange}
                        name='first_name'
                        type='text'
                    />
                </label>
                <br />
                <label>Last Name:
                    <input
                        value={last_name}
                        onChange={onChange}
                        name='last_name'
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
            {/* </StyledInputs> */}
        </form>
    )
}

export default Form;