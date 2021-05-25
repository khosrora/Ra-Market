import { useState, useContext, useEffect } from 'react'
import { GlobalState } from './../../../GlobalState';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import Loading from './../../Helpers/Loading';


const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "",
    content: "",
    category: "",
    id: ""
}

const CreateProduct = () => {

    const state = useContext(GlobalState);
    const [token] = state.token;
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories;
    const [callback, setCallback] = state.productsAPI.callback;
    const [isAdmin] = state.userAPI.isAdmin;
    const [images, setImages] = useState(false);
    const [loading, setloading] = useState(false);


    const history = useHistory();
    const param = useParams();
    const [products] = state.productsAPI.products;
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("شما اجازه دسترسی ندارید");
            setloading(true)
            await axios.post("/api/destroy", { public_id: images.public_id }, {
                headers: {
                    Authorization: token
                }
            })
            setloading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload = async e => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert("شما اجازه دسترسی ندارید")
            const file = e.target.files[0]

            if (!file) return alert("فایلی برای نمایش وجود ندارد")

            if (file.size > 1024 * 1024)
                return alert("حجم عکس بیش از اندازه بزرگ است")

            if (file.type !== "image/jpeg" && file.type !== "image/png")
                return alert("فرمت عکس قابل قبول نیست")

            let formData = new FormData();
            formData.append("file", file)
            setloading(true)
            const res = await axios.post("/api/upload", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token
                }
            })
            setloading(false)
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert("شما اجازه دسترسی ندارید")
            if (!images) return alert("عکس برای نمایش موجود نیست")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post("/api/products", { ...product, images }, {
                    headers: { Authorization: token }
                })
            }
            // setImages(false)
            // setProduct(initialState)
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product" dir="rtl">
            <div className="upload">
                <input
                    type="file" name="file" id="file_up"
                    onChange={handleUpload}
                />
                {
                    loading
                        ? <div id="file_img" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Loading /></div>
                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ""} alt="" />
                            <span onClick={handleDestroy}>&times;</span>
                        </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">شناسه محصول</label>
                    <input type="text" name="product_id" id="product_id" required
                        value={product.product_id}
                        onChange={handleChangeInput}
                        disabled={product.id}
                    />
                </div>
                <div className="row">
                    <label htmlFor="title">عنوان</label>
                    <input type="text" name="title" id="title" required
                        value={product.title}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="price">قیمت</label>
                    <input type="number" name="price" id="price" required
                        value={product.price}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="description">توضیحات</label>
                    <textarea type="number" rows="5" name="description" id="description" required
                        value={product.description}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="content">شرح محصول</label>
                    <textarea rows="5" type="number" name="content" id="content" required
                        value={product.content}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="category">دسته بندی</label>
                    <select name="category"
                        value={product.category}
                        onChange={handleChangeInput}
                    >
                        <option value="">دسته بندی را انتخاب کنید</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit? "ویرایش" : "ساخت"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
