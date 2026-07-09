import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../schemas/login-schema';
import { useState } from 'react';
import API_URL from "../util/api";
import proventoryLogo from "../assets/proventory-logo.png";

function ForgotPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
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
        <div className="auth-page">
            <div className="auth-card">
                <img src={proventoryLogo} alt="Proventory" className="auth-logo" />
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle">Enter your email and new password</p>

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
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter new password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && <p className="auth-error">{errors.password}</p>}
                    </div>

                    <button type="submit" className="auth-button">Save</button>

                    {error && <p className="auth-error" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{error}</p>}
                </form>

                <div className="auth-footer">
                    <Link to="/login" className="auth-link">← Back to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
