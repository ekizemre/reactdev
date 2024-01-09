import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const uploadProduct = async () => {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        console.log(formData);
        const responce = await axios.post("http://10.10.88.120:8000/api/product", formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        });
        console.log(responce.data);


        if (responce) {
            console.log(responce)
            setMessage(responce.message); //"message": "Product successfully created."
            setTimeout(() => {
                navigate('/productlist');
            }, 2000);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadProduct();

    }
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mt-4">
                        <h5 className="mb-4">ADD PRODUCT </h5>
                        <p className="text-warning">{message}</p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label className="col-sm-3">Product Title </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Description </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3">Price </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div>



                            <div className="mb-3 row">
                                <label className="col-sm-3"></label>
                                <div className="col-sm-9">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Addproduct;