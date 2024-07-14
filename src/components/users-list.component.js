import React, { useState, useEffect } from 'react';
import UsersService from '../services/users.service'
import { useNavigate } from 'react-router-dom';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { Modal, Button, Image } from "react-bootstrap";
import editIcon from "../assets/icons/edit_user.png";
import deleteIcon from '../assets/icons/delete_user.png';

const Users = () =>
{
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [currentId, setCurrentId] = useState(-1);
    const [userNameToDelete, setUserNameToDelete] = useState(-1);
    const handleClose = () => setShowDialog(false);

    const showConfirmForm = (id, name) =>
    {
        setCurrentId(id);
        setUserNameToDelete(name);
        setShowDialog(true);
    };

    useEffect(() =>
    {
        getData();
    }, []);

    const getData = async (id) =>
    {
        try
        {
            const ret = await UsersService.getUsers();
            setUsers(ret.data);
        } catch (err)
        {
            console.log(err, "Failed to get user with id " + id);
        }
    }

    const newUser = (id) =>
    {
        navigate(`/users/${id}`);
    }

    const deleteUser = (id) =>
    {
        UsersService.deleteById(id)
            .then(data =>
            {
                setMessage("User deleted");
            })
            .catch(err =>
            {
                setMessage("Delete failed", err);
            })
        setTimeout(() => getData(), 500);
        setShowDialog(false);
        setTimeout(() => setMessage(""), 2000);
    }

    const editUser = (id) =>
    {
        navigate(`/users/${id}`);
    }

    return (
        <div className="container">
            <div className='list row'>
                <div className='col-md-12'>
                    <h5>Users<span className='little-txt'> &nbsp;({users.length})</span>
                        &nbsp;<button className="btn btn-primary btn-sm" type="button" onClick={() => newUser(-1)}  > Add new user </button>
                    </h5>
                    {message ? (
                        <div className="message-content-user">
                            {message}
                        </div>

                    ) : (
                        <div></div>
                    )}
                    <MDBAccordion borderless initialActive={-1}>
                        {users && users.map((item, index) => (
                            <MDBAccordionItem key={item.id} collapseId={item.id} headerTitle={item.name} >

                                <table key={'tbl-1-' + item.id} className='table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr id={'row-' + item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td style={{ float: 'right' }}>
                                                <Image style={{ width: 24, cursor: "pointer" }} src={editIcon} onClick={() => editUser(item.id)}></Image>
                                                <Image style={{ width: 24, cursor: "pointer" }} src={deleteIcon} onClick={() => showConfirmForm(item.id, item.name)} ></Image>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}>
                                                <table key={'tbl-2-' + item.id} className='table table-sm table-hover table-bordered'>
                                                    <tbody>

                                                        <tr>
                                                            <td className='user-detail-title'>Username:</td>
                                                            <td>{item.username}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='user-detail-title'>Email:</td>
                                                            <td>{item.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='user-detail-title'>Phone:</td>
                                                            <td>{item.phone}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='user-detail-title'>Website:</td>
                                                            <td>{item.website}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='user-detail-title'>Street:</td>
                                                            <td>{item.address.street}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='user-detail-title'>Suite:</td>
                                                            <td>{item.address.suite}</td>
                                                        </tr><tr>
                                                            <td className='user-detail-title'>City:</td>
                                                            <td>{item.address.city}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='user-detail-title'>Zipcode:</td>
                                                            <td>{item.address.zipcode}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </MDBAccordionItem>
                        ))}
                    </MDBAccordion>
                </div>
            </div>

            <Modal show={showDialog} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete user {userNameToDelete}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => deleteUser(currentId)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default Users;