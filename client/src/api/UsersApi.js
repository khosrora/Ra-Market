import { useState, useEffect } from 'react'
import axios from 'axios';




const UsersAPI = (token) => {
    const [user, setUser] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])



    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get("/user/infor", {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setUser(res.data);
                    setCart(res.data.cart)
                } catch (err) {
                    alert(err)
                }
            }
            getUser();
        }
    }, [token])



    const addCart = async (product) => {
        if (!isLogged) return alert("لطفا برای خرید وارد شوید")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])

            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        } else {
            alert("این محصول به سبد خرید اضافه شده است")
        }
    }

    return {
        user: [user, setUser],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
    }
}

export default UsersAPI
