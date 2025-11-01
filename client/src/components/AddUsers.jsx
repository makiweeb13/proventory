import { useFormik } from "formik";
import { userSchema } from "../schemas/register-schema";
import useStore from "../store/store";

function AddUsers() {

    const { setStatusMessage, addUser } = useStore();

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                resetForm();
                setSubmitting(false);
                setStatusMessage(data.message);
                addUser(data.user);
            } else {
                setStatusMessage(`Registration failed: ${data.message}`, "error");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            setStatusMessage(`Error adding user: ${error.message}`, "error");
        } finally {
            setSubmitting(false);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "user",
        },
        validationSchema: userSchema,
        onSubmit
    });

    return (
        <form className="add-user-form" onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                >
                    <option value="user">Staff</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            {errors.name && touched.name && <p className='error-message'>{errors.name}</p>}
            {errors.email && touched.email && <p className='error-message'>{errors.email}</p>}
            {errors.password && touched.password && <p className='error-message'>{errors.password}</p>}
            {errors.role && touched.role && <p className='error-message'>{errors.role}</p>}
            <button className="add-user-btn" type="button" onClick={() => handleSubmit()}>
                Add User
            </button>
        </form>
    );
}

export default AddUsers;