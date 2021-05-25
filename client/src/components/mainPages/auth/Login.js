import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
    const [user, setUser] = useState({
        email: "", password: ""
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/user/login", { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = "/"
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="login_page" dir="rtl">
            <form onSubmit={loginSubmit}>
                <h2>ورود</h2>
                <input type="email" name="email" required
                    placeholder="ایمیل" value={user.email}
                    onChange={onChangeInput}
                />
                <input type="password" name="password" required
                    placeholder="کلمه عبور" value={user.password}
                    onChange={onChangeInput}
                />

                <div className="row">
                    <button type="submit">ورود</button>
                    <Link to="/register">ثبت نام</Link>
                </div>

            </form>
        </div>
    )
}

export default Login
