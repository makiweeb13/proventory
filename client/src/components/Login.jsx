import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../schemas/login-schema';
import { useState } from 'react';
import proventoryLogo from "../assets/proventory-logo.png";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                resetForm();
                setSubmitting(false);
                navigate('/');
            } else {
                console.error('Login failed', data.message);
                setError(data.message);
            }
        } catch(err) {
            console.error('Login request failed:', err)
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
        <div className="auth-page">
            <div className="auth-card">
                <img src={proventoryLogo} alt="Proventory" className="auth-logo" />
                <h1 className="auth-title">Proventory</h1>
                <p className="auth-subtitle">Sign in to your account</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && <p className="auth-error">{errors.email}</p>}
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && <p className="auth-error">{errors.password}</p>}
                    </div>

                    <NavLink to="/forgot-password" className="auth-link">Forgot Password?</NavLink>

                    <button type="submit" className="auth-button">Sign In</button>

                    {error && <p className="auth-error" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{error}</p>}
                </form>

                <div className="demo-hint">
                    <div className="demo-hint-header">Demo Account</div>
                    <code>Email:    admin@proventory.com</code>
                    <code>Password: abcDEF123#</code>
                </div>
            </div>
        </div>
    )
}

export default Login;
