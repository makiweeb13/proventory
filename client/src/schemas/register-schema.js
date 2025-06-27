import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string()
        .min(4, 'Username must be at least 4 characters long')
        .max(20, 'Username must not exceed 20 characters')
        .required('Username is required'),
    
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
        
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
})