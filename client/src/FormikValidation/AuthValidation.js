import * as yup from 'yup'

export const validationSchema = yup.object({
    email: yup
        .string('Enter email')
        .email('valid email')
        .required('required mail'),
    password: yup
        .string('enter password')
        .min(6, 'min 6 simbols')
        .required('pass req')
})
