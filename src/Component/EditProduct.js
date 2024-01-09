import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [message, setMessage] = useState('');

    const [inputs, setInputs] = useState([]);

    const handleChange = async (event) => {
        console.log(event.target.title);

        const title = event.target.title;
        const value = event.target.value;
        setInputs(values => ({ ...values, [title]: value }));

    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lastdata, yapLastData] = useState({
        'title': title,
        'description': description,
        'price': price
    });
    const handleXXXChange = (price, description, title) => {
        yapLastData(prevData => ({
            ...prevData,
            'price': price,
            'description': description,
            'title': title,
        }));
    };
    console.log(lastdata)


    const uploadProduct = async () => {


        await handleXXXChange(price, description, title);
        console.log(lastdata)
        const response = await axios.put("http://10.10.88.120:8000/api/product/gedit/" + id, lastdata, {

        });
        setMessage(response.data.message); //"message": "Product successfully updated.."

    }

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        await uploadProduct();

    }

    useEffect(() => {
        getproduct();
    }, []);

    function getproduct() {
        axios.get('http://10.10.88.120:8000/api/product/edit/' + id).then(function (response) {
            setInputs(response.data);
        });
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mt-4">
                        <h5 className="mb-4">Edit Product </h5>
                        <p className="text-success"><b>{message}</b></p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label className="col-sm-3">Product Title </label>
                                <div className="col-sm-9">
                                    <input type="text" defaultValue={inputs.title} className="form-control" name="name" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-3">Description </label>
                                <div className="col-sm-9">
                                    <input type="text" defaultValue={inputs.description} className="form-control" name="description" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3">Price </label>
                                <div className="col-sm-9">
                                    <input type="text" defaultValue={inputs.price} className="form-control" name="price" onChange={(e) => setPrice(e.target.value)} />
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
export default EditProduct;