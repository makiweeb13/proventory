import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../schemas/login-schema';

function Login() {
    const navigate = useNavigate();

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                resetForm();
                setSubmitting(false) 
                navigate('/');
            } else {
                console.error('Login failed', data.message);
            }
        } catch(err) {
            console.error('Login request failed:', err)
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
            <h2>Proventory</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="username" 
                    name="email" 
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                { errors.email && touched.email && <p className='error-message'>{errors.email}</p> }
                { errors.password && touched.password && <p className='error-message'>{errors.password}</p> }
                <button type="submit">Login</button>
                <p>Don&#39;t have an account yet? <Link to="/register" className="link">Create Account</Link></p>
            </form>
        </div>
    )
}

export default Login;