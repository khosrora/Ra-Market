import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from './../../../GlobalState';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

const DetailProducts = () => {

    const params = useParams();
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])


    if (detailProduct.length === 0) return null
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.product_id}:id#</h6>
                    </div>
                    <span>{detailProduct.price}تومان</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>
                        {
                            (detailProduct.sold === 0)
                                ? "آماده برای فروش"
                                : "به فروش رسید "
                        }
                    </p>
                    {
                        (detailProduct.sold === 0)
                            ? <Link to="/cart" className="cart">خرید</Link>
                            : <Link to="/cart" className="cart">موجود شد اطلاع بده</Link>
                    }

                </div>
            </div>
            <div dir="rtl">
                <h2>محصولات مشابه</h2>
                <hr style={{ opacity: .3 }} />
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem
                                    key={product._id}
                                    product={product}
                                />
                                : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProducts
