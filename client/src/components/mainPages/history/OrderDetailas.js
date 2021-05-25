import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { GlobalState } from './../../../GlobalState';
import moment from 'jalali-moment';




const OrderDetailas = () => {

    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item.cart)
            })
        }

    }, [params.id, history])
    console.log(orderDetails);

    if (orderDetails.length === 0) return null;
    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>تاریخ</th>
                        <th>دسته بندی</th>
                        <th>شناسه محصول</th>
                        <th>تعداد</th>
                        <th>مبلغ</th>
                        <th>عنوان</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orderDetails.map(items => (
                            <tr key={items._id}>
                                <td>{moment(items.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</td>
                                <td>{items.category}</td>
                                <td>{items.product_id}</td>
                                <td>{items.quantity}</td>
                                <td>{items.price}</td>
                                <td>{items.title}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetailas
