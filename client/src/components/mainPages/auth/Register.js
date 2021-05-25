import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';



const Register = () => {
    const [user, setUser] = useState({
        email: "", password: "", name: "", phone: ""
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    
    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/user/register", { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login_page" dir="rtl">
            <form onSubmit={registerSubmit}>
                <h2>ثبت نام</h2>
                <input type="text" name="name" required
                    placeholder="نام و نام خانوادگی" value={user.name}
                    onChange={onChangeInput}
                />
                <input type="email" name="email" required
                    placeholder="ایمیل" value={user.email}
                    onChange={onChangeInput}
                />
                <input type="password" name="password" required
                    placeholder="کلمه عبور" value={user.password}
                    onChange={onChangeInput}
                />
                <input type="Number" name="phone" required
                    placeholder="شماره تماس" value={user.phone}
                    onChange={onChangeInput}
                />
                <div className="row">
                    <button type="submit">ثبت نام</button>
                    <Link to="/login">ورود</Link>
                </div>
            </form>
        </div>
    )
}

export default Register