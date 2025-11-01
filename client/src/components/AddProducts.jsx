import { useFormik } from "formik";
import { productSchema } from "../schemas/product-schema";
import useStore from "../store/store";

function AddProducts({ categories }) {

    const { setStatusMessage, addProduct } = useStore();

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/product`, {
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
                addProduct(data.product);
            } else {
                setStatusMessage(data.message, "error");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            setStatusMessage("Error adding product", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            stock: 0,
            buying_price: 0,
            selling_price: 0,
            category_id: "",
        },
        validationSchema: productSchema,
        onSubmit
    });

    return (
        <form className="add-user-form" onSubmit={handleSubmit}>
            <h2>Add Product</h2>
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
                <label htmlFor="stock">Stock</label>
                <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label htmlFor="buying_price">Buying Price</label>
                <input
                    id="buying_price"
                    name="buying_price"
                    type="number"
                    value={values.buying_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label htmlFor="selling_price">Selling Price</label>
                <input
                    id="selling_price"
                    name="selling_price"
                    type="number"
                    value={values.selling_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label htmlFor="category_id">Category</label>
                <select
                    id="category_id"
                    name="category_id"
                    value={values.category_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                >
                    <option value="">Select Category</option>
                    { categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {errors.name && touched.name && <p className='error-message'>{errors.name}</p>}
            {errors.stock && touched.stock && <p className='error-message'>{errors.stock}</p>}
            {errors.buying_price && touched.buying_price && <p className='error-message'>{errors.buying_price}</p>}
            {errors.selling_price && touched.selling_price && <p className='error-message'>{errors.selling_price}</p>}
            {errors.category_id && touched.category_id && <p className='error-message'>{errors.category_id}</p>}
            <button className="add-user-btn" type="button" onClick={() => handleSubmit()}>
                Add Product
            </button>
        </form>
    );
}

export default AddProducts;