import { useNavigate } from "react-router-dom";
import AdminProtected from "../components/AdminProtected";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AdminLoginPage.css';
import axios from 'axios';
import { useState } from "react";
import './DeleteShopPage.css'
import AdminNavBar from "../UI/AdminNavBar";

const DeleteShopPage = (props) => {
    const [email, setEmail] = useState('');
    const history = useNavigate();
    const deleteRequest = async (e) => {
        e.preventDefault();
        debugger;
        try {
            const res = await axios.delete('http://localhost:3000/api/shop/', {
                data: {
                    email: email
                }
            });
            // const data = res.data.message;
            // console.log(data);
            // window.alert(data);
            history('/admin/home');
        }
        catch (err) {
            console.log(err);
        }
    }

    // return (<AdminProtected>
    //     <Form className='form-style' onSubmit={deleteRequest}>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <Form.Label className='form-label'>Email address</Form.Label>
    //             <Form.Control type="email" placeholder="Enter email" value={email}
    //                 onChange={(e) => setEmail(e.target.value)} />
    //         </Form.Group>
    //         <Button variant="primary" type="submit">
    //             Delete
    //         </Button>
    //     </Form>
    // </AdminProtected>)
    return (
        <AdminProtected>
            <AdminNavBar />
            <Form className="form-style delete-form" onSubmit={deleteRequest}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="form-label">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Button className="delete-btn" type="submit">
                    Delete
                </Button>
            </Form>
        </AdminProtected>
    );

}
export default DeleteShopPage;