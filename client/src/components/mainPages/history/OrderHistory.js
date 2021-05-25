import { useContext, useEffect } from 'react'
import { GlobalState } from './../../../GlobalState';
import { Link } from 'react-router-dom';
import moment from 'jalali-moment'
import axios from 'axios';



const OrderHistory = () => {

    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get("/api/payment", {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                } else {
                    const res = await axios.get("/user/history", {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data)
                }
            }
            getHistory();
        }
    }, [token, isAdmin , setHistory])


    return (
        <div className="history-page">
            <h2>پرداخت ها</h2>
            <h4>شما {history.length} پرداخت دارید</h4>
            <table>
                <thead>
                    <tr>
                        <th>وضعیت</th>
                        <th>شماره پرداخت</th>
                        <th>تاریخ پرداخت</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{
                                    items.status
                                        ? <p style={{ color: "green" }}>موفق</p>
                                        : <p style={{ color: "red" }}>نا موفق</p>
                                }</td>
                                <td>{items.paymentCode}</td>
                                <td>{moment(items.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
                                <td>
                                    {
                                        items.status
                                            ? <Link to={`/history/${items._id}`}>مشاهده</Link>
                                            : ""
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
