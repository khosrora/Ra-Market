import { useContext } from 'react'
import { GlobalState } from './../../GlobalState';
import { Switch, Route } from "react-router-dom"




import Products from './products/Products'
import DetailProducts from './products/DetailProducts'
import Cart from './cart/Cart';
import Login from './auth/Login';
import Register from './auth/Register';
import NotFound from './../../utils/notFound/NotFound';
import OrderHistory from './history/OrderHistory';
import OrderDetailas from './history/OrderDetailas';
import User from './user/User';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';

const Pages = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProducts} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/category" exact component={Categories} />


            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetailas : NotFound} />
            <Route path="/userpanel" exact component={User} />

            <Route path="/createproduct" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
