import { useContext } from 'react'
import { GlobalState } from './../../../GlobalState';


const User = () => {

    const state = useContext(GlobalState)
    const user = state.userAPI.user;

    return (
        <div className="user-panel">
            <h1>اطلاعات کاربری</h1>
            <table>
                <thead>
                    <tr>
                        <td>شماره تماس</td>
                        <td>پست الکترونیک</td>
                        <td>نام کاربری</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user[0].phone}</td>
                        <td>{user[0].email}</td>
                        <td>{user[0].name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default User
