import { useContext, useState } from 'react'
import { GlobalState } from './../../GlobalState';
import { Link } from "react-router-dom"
import axios from "axios"

import Menu from "./icon/bars-solid.svg"
import Close from "./icon/times-solid.svg"
import Cart from "./icon/shopping-cart-solid.svg"

const Headers = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false)


    const logoutUser = async () => {
        await axios.get("/user/logout")
        localStorage.removeItem("firstLogin", false)
        window.location.href = "/"
    }


    const adminRouter = () => {
        return (
            <>
                <li><Link to="/createproduct">ساخت محصول</Link></li>
                <li><Link to="/category">ساخت دسته بندی</Link></li>
            </>
        )
    }



    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/userpanel">حساب کاربری </Link></li>
                <li><Link to="/history">پرداختی ها</Link></li>
                <li><Link to="/" onClick={logoutUser}>خروج</Link></li>
            </>
        )
    }
    const toggleMenu = () => setMenu(!menu)
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img className="menu" src={Menu} alt="" width="30" />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? "مدیر" : "فروشگاه من"}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                {/* <li><Link to="/products">{isAdmin ? "محصولات" : "خرید"}</Link></li> */}
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">ورود / ثبت نام</Link></li>
                }
                <li onClick={() => setMenu(!menu)}>
                    <img className="menu" src={Close} alt="" width="30" />
                </li>
            </ul>
            {
                isAdmin ? ""
                    :
                    <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="cart">
                            <img src={Cart} alt="سبد خرید" width="30" />
                        </Link>
                    </div>
            }

        </header>
    )
}

export default Headers
