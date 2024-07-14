import React, { useState, useEffect } from "react";
import UsersService from '../services/users.service';
import { useNavigate, useParams } from 'react-router-dom';
// import { useFormik } from 'formik';

const UserForm = () =>
{
    const { id } = useParams();
    const dataTmpl = {
        id: -1,
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
        },
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        },
        errors: {},
        loading: false
    }

    const [formData, setFormData] = useState({
        id: -1,
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
        },
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        },
        errors: {},
        loading: false,
    });
    const [dataLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>
    {
        getData(id);
        setTimeout(() =>
        {
            setLoading(false);
        }, 100);
    }, [dataLoading]);

    const handleChange = (event) =>
    {
        const { id, value } = event.target;
        if (id === 'company-name')
        {
            const d = { ...formData };
            d.company.name = event.target.value;
            setFormData(d);
        } else if (id === 'catchPhrase')
        {
            const d = { ...formData };
            d.company.catchPhrase = event.target.value;
            setFormData(d);
        } else if (id === 'bs')
        {
            const d = { ...formData };
            d.company.bs = event.target.value;
            setFormData(d);
        } else if (id === 'street')
        {
            const d = { ...formData };
            d.address.street = event.target.value;
            setFormData(d);
        } else if (id === 'suite')
        {
            const d = { ...formData };
            d.address.suite = event.target.value;
            setFormData(d);
        } else if (id === 'city')
        {
            const d = { ...formData };
            d.address.city = event.target.value;
            setFormData(d);
        } else if (id === 'zipcode')
        {
            const d = { ...formData };
            d.address.zipcode = event.target.value;
            setFormData(d);
        } else
            setFormData((prevState) => ({ ...prevState, [id]: value }));
    };

    const getData = async (id) =>
    {
        try
        {
            if (id > -1)
            {
                const ret = await UsersService.getById(id);
                const data = ret.data;
                createData(data);
            } else
            {
                setFormData(dataTmpl);
            }
        } catch (err)
        {
            console.log("Data not found by id: " + id);
        }
    }

    const createData = (newData) =>
    {
        setFormData({
            ...formData,
            id: newData.id,
            name: newData.name,
            username: newData.username,
            email: newData.email,
            phone: newData.phone,
            website: newData.website,
            address: newData.address,
            company: newData.company
        })
    }

    const validateForm = () =>
    {
        const errors = {};

        if (!formData.name)
        {
            errors.name = "Name is required";
        }

        if (!formData.username)
        {
            errors.username = "Username is required";
        }

        if (!formData.email)
        {
            errors.email = 'Email is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email))
        {
            errors.email = 'Invalid email address'
        }
        setFormData((prevState) => ({ ...prevState, errors }));

        return Object.keys(errors).length === 0;
    };

    const saveUser = (event) =>
    {
        if (!validateForm())
        {
            return;
        }

        setFormData({
            ...formData,
            loading: true,
        });

        try
        {
            UsersService.saveUser(formData);
        } catch (error)
        {
            console.log("User add failed");
        }

        setTimeout(() =>
        {
            setFormData({
                ...formData,
                loading: false,
            });
            navigate('/users');
        }, 1000);
    }

    const updateUser = (event) =>
    {
        if (!validateForm())
        {
            return;
        }

        setFormData({
            ...formData,
            loading: true,
        });

        try
        {
            UsersService.updateUser(formData.id, formData);
        } catch (error)
        {
            console.log("User update failed");
        }

        setTimeout(() =>
        {

            setFormData({
                ...formData,
                loading: false,
            });
            navigate('/users');
        }, 1000);
    }

    return (
        <div className="container">
            {formData.id === -1 ?
                <h5>Add user </h5>
                :
                <h5>Edit user</h5>
            }
            <form>

                <div className="form-group">
                    {formData.errors.name && (
                        <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.name}</p>
                    )}
                    <label htmlFor="name">Name *</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    {formData.errors.username && (
                        <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.username}</p>
                    )}
                    <label htmlFor="username">Username *</label>
                    <input
                        id="username"
                        className="form-control"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    {formData.errors.email && (
                        <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.email}</p>
                    )}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="form-control"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    {formData.errors.phone && (
                        <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.phone}</p>
                    )}
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        className="form-control"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    {formData.errors.website && (
                        <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.website}</p>
                    )}
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        className="form-control"
                        type="text"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>

                <div className="row">
                    <div className="col-6 col-sm-6">
                        <div className="form-group">
                            {formData.errors.street && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.street}</p>
                            )}
                            <label htmlFor="street">Street</label>
                            <input
                                id="street"
                                className="form-control"
                                type="text"
                                value={formData.address.street}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            {formData.errors.suite && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.suite}</p>
                            )}
                            <label htmlFor="street">Suite</label>
                            <input
                                id="suite"
                                className="form-control"
                                type="text"
                                value={formData.address.suite}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            {formData.errors.city && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.city}</p>
                            )}
                            <label htmlFor="street">City</label>
                            <input
                                id="city"
                                className="form-control"
                                type="text"
                                value={formData.address.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            {formData.errors.zipcode && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.zipcode}</p>
                            )}
                            <label htmlFor="street">Zipcode</label>
                            <input
                                id="zipcode"
                                className="form-control"
                                type="text"
                                value={formData.address.zipcode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-6 col-sm-6">
                        <div className="form-group">
                            {formData.errors.company && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.company}</p>
                            )}
                            <label htmlFor="street">Company</label>
                            <input
                                id="company-name"
                                className="form-control"
                                type="text"
                                value={formData.company.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            {formData.errors.catchPhrase && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.catchPhrase}</p>
                            )}
                            <label htmlFor="street">CatchPhrase</label>
                            <input
                                id="catchPhrase"
                                className="form-control"
                                type="text"
                                value={formData.company.catchPhrase}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            {formData.errors.bs && (
                                <p style={{ color: "red", height: 16, fontSize: 12 }}>{formData.errors.bs}</p>
                            )}
                            <label htmlFor="street">Bs</label>
                            <input
                                id="bs"
                                className="form-control"
                                type="text"
                                value={formData.company.bs}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {formData.id === -1 ?
                        <button className="btn btn-primary btn-sm" disabled={formData.loading} type="button" onClick={() => saveUser()} > Add </button>
                        :
                        <button className="btn btn-primary btn-sm" disabled={formData.loading} type="button" onClick={() => updateUser()} > Update </button>
                    }

                    &nbsp;<button className="btn btn-primary btn-sm" disabled={formData.loading} type="button" onClick={() => navigate('/users')} > Cancel </button>

                    {formData.loading && (
                        <span style={{ color: "green", marginTop: 10, marginLeft: 10, fontWeight: "bold" }}>Saving...</span>
                    )}
                </div>
            </form>
            <br /><br />
        </div>
    );
}
export default UserForm;
