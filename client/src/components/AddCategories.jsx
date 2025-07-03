import { useFormik } from "formik";
import { categorySchema } from "../schemas/category-schema";
import useStore from "../store/store";

function AddCategories() {

    const { setStatusMessage, addCategory } = useStore();

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            
            const response = await fetch(`${API_URL}/category`, {
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
                addCategory(data.category);
            }
        } catch (error) {
            console.error("Error adding category:", error);
            setStatusMessage("Error adding category", "error");
        } finally {
            setSubmitting(false);
            
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: categorySchema,
        onSubmit
    });

    return (
        <form className="add-user-form" onSubmit={handleSubmit}>
            <h2>Add Category</h2>
            <div className="form-group">
                <label htmlFor="name">Category</label>
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
            {errors.name && touched.name && <p className='error-message'>{errors.name}</p>}
            <button className="add-user-btn" type="button" onClick={() => handleSubmit()}>
                Add Category
            </button>
        </form>
    );
}

export default AddCategories;