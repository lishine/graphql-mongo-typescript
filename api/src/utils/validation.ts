import * as yup from 'yup'

const MIN_PASSWORD_LENGTH = 6

export const schema = yup.object({
    email: yup.string().email('E-mail is not valid!').required('Email is required'),
    password: yup
        .string()
        .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Invalid')
        .required('Password is required'),
})

function getErrorsFromValidationError(validationError: yup.ValidationError): Record<string, any> {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}
export function validate(schema: yup.ObjectSchema<any>, values: {}) {
    try {
        schema.validateSync(values, { abortEarly: false, recursive: true })
        return {}
    } catch (error) {
        return getErrorsFromValidationError(error)
    }
}
