import * as yup from 'yup'

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .required("First name is required!")
        .trim()
        .min(3, "Your first name can't be less than 3 characters!"),
    last_name: yup
        .string()
        .required("Last name is required!")
        .trim()
        .min(3, "Your last name can't be less than 3 characters!"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required!"),
    password: yup
        .string()
        .required("Enter a password!")
        .min(6, "Password must be longer than six characters!"),
    tos: yup.boolean()
    .oneOf([true], "You must accept TOS!")
})

export default formSchema;