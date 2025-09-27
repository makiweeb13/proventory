import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../schemas/login-schema';
import { useState } from 'react';

function ForgotPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/user/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                resetForm();
                setSubmitting(false);
                navigate('/login');
            } else {
                console.error('Reset password failed', data.message);
                setError(data.message);
            }
        } catch(err) {
            console.error('Reset password request failed:', err)
            setError('An error occurred. Please try again.');
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: userSchema,
        onSubmit
    })

    return (
        <div className="page">
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                <label htmlFor="password">New Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="new password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                { errors.email && touched.email && <p className='error-message'>{errors.email}</p> }
                { errors.password && touched.password && <p className='error-message'>{errors.password}</p> }
                { error && <p className='error-message'>{error}</p> }
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ForgotPassword;