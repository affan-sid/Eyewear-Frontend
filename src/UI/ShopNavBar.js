import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShopActions } from '../store/ShopSlice';
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import '../UI/NavBar.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function ShopNavBar() {
    const isLoggedIn = useSelector(state => state.shop.isLoggedIn);
    const history = useNavigate();
    const dispatch = useDispatch();
    const [shop, setShop] = useState()
    const logoutHandler = async () => {
        const res = await axios.post('http://localhost:3000/api/shop/logout', {
            withCredentials: true
        });
        if (res.status === 200) {
            dispatch(ShopActions.logout());
            history('/shop-owner');
            window.alert("successfull logout");
        }
    }

    async function getShop() {
        try {
            const shop_id = localStorage.getItem('shop_id')
            const res = await axios.get(`http://localhost:3000/api/shop/${shop_id}`, {
                withCredentials: true
            });
            const shop = res.data.shop
            return shop;

        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        const findShop = async () => {
            const shop = await getShop();
            setShop(shop);
        }
        findShop();
    }, [])


    return (
        <>
            <div className='AnnouncementContainer'>
                Super Offers. Shop for frames now!
            </div>
            <div className='Container'>
                <div className='Wrapper'>
                    <div className='Left'>
                        <span className='Language'>EN</span>
                        <div className='SearchContainer'>
                            <input></input>
                            <BsSearch />
                        </div>
                    </div>
                    <div className='Center'>
                        <h1 className='logo'>EyeWear.pk</h1>
                    </div>
                    <div className='Right'>
                        <div>{shop && shop.map(s => {
                            return (
                                <div key={s._id}>wallet: ${s.wallet}</div>
                            )
                        })}</div>
                        {!isLoggedIn && <div className='MenuItem'><Link to='/home'>Home</Link></div>}
                        {isLoggedIn && <div className='MenuItem'><Link to='/admin' onClick={logoutHandler}>LogOut</Link></div>}
                        <div className='MenuItem'>
                            <BsFillCartFill />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopNavBar;