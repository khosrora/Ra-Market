import { useContext } from 'react';
import { Link } from "react-router-dom"
import { GlobalState } from './../../GlobalState';


const BtnRender = ({ product, deleteProduct }) => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
        <div>
            {
                isAdmin ?
                    <div className="row_btn">
                        <Link id="btn_buy" to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>
                            حذف
                        </Link>
                        <Link id="btn_view" to={`/edit_product/${product._id}`}>
                            ویرایش
                        </Link>
                    </div>
                    :
                    <div className="row_btn">
                        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                            خرید
                        </Link>
                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            جزئیات
                        </Link>
                    </div>
            }

        </div>
    )
}

export default BtnRender
