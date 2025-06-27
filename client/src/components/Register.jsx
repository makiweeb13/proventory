import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userSchema } from '../schemas/register-schema';

function Register() {
    const navigate = useNavigate();

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            resetForm()
            setSubmitting(false)
            navigate('/login')
        })
        .catch(err => {
            console.error(err);
        })
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: userSchema,
        onSubmit
    })

    return (
        <div className="page">
            <form onSubmit={handleSubmit} >
                <input 
                    type="username" 
                    name="username" 
                    placeholder="username" 
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.username && touched.username ? 'input-error' : ''}
                />
                <br />
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'input-error' : ''}
                />
                <br />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? 'input-error' : ''}
                />
                <br />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirm-password" 
                    placeholder="confirm password" 
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                />
                <br />
                { errors.username && touched.username && <p className='error-message'>{errors.username}</p> }
                { errors.email && touched.email && <p className='error-message'>{errors.email}</p> }
                { errors.password && touched.password && <p className='error-message'>{errors.password}</p> }
                { errors.confirmPassword && touched.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p> }
                <br />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
            </form>
        </div>
        
    )
}

export default Register;