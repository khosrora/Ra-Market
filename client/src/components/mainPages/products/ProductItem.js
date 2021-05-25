import { Link } from 'react-router-dom';
import BtnRender from '../../Helpers/BtnRender';



const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {




    return (
        <div className="product_card" dir="rtl">
            <img
                src={product.images.url}
                alt={product.title}
            />

            <div className="product_box">
                {
                    isAdmin && <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={handleCheck}
                    />
                }
                <h4 title={product.title}>{product.title}</h4>
                <span>{product.price}تومان</span>
                <p>
                    {product.description.length < 150
                        ? `${product.description}`
                        : `${product.description.substring(0, 150)}...`}
                    <span>
                        <Link to={`/detail/${product._id}`}>
                            ادامه
                        </Link>
                    </span>
                </p>
            </div>
            <BtnRender
                product={product}
                deleteProduct={deleteProduct}
            />
        </div>
    )
}

export default ProductItem
