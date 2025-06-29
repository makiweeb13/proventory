import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string()
        .min(4, 'Name must be at least 4 characters long')
        .max(20, 'Name must not exceed 20 characters')
        .required('Name is required'),

    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
        
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),

    role: yup.string()
        .oneOf(['user', 'admin'], 'Role must be either user or admin')
        .required('Role is required')
})