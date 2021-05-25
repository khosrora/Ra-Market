import { useContext, useState, useEffect } from 'react'
import { GlobalState } from './../../../GlobalState';
import axios from 'axios';

const Cart = () => {

    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    const addToCart = async () => {
        await axios.patch("/user/addcart", { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart()
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart()
    }

    const removeProduct = id => {
        cart.forEach((item, index) => {
            if (item._id === id) {
                cart.splice(index, 1)
            }
        })
        setCart([...cart])
        addToCart()
    }

    const payment = async (payment) => {
        const res = await axios.post("/api/payment", { cart, total }, {
            headers: { Authorization: token }
        });
        window.location.href = `${res.data.url}`;
    }

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "3rem" }}>محصولی برای نمایش وجود ندارد</h2>

    return (

        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img
                            src={product.images.url}
                            alt=""
                        />

                        <div className="box-detail">
                            <h2>{product.title}</h2>
                            <h3>{product.price * product.quantity}تومان</h3>
                            <p>
                                {product.description.length < 150
                                    ? `${product.description}`
                                    : `${product.description.substring(0, 150)}...`}
                            </p>
                            <p>
                                {product.content.length < 150
                                    ? `${product.content}`
                                    : `${product.content.substring(0, 150)}...`}

                            </p>
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}>+</button>
                            </div>
                            <div
                                className="delete"
                                onClick={() => removeProduct(product._id)}>X</div>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>جمع : تومان {total}</h3>
                <button type="button" onClick={() => payment(token)}>پرداخت</button>
            </div>
        </div>
    )
}

export default Cart
