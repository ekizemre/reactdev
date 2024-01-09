import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function Productlist() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = () => {
            fetch("http://10.10.88.120:8000/api/product")
                .then(res => { return res.json() })
                .then(response => {
                    console.log(response.product)
                    setProduct(response.product)
                })
                .catch(error => { console.log(error) });
        }
        getProduct();
    }, []);


    const deleteProduct = (id) => {
        axios.delete('http://10.10.88.120:8000/api/product/edit/' + id).then(function (response) {
            console.log(response.data);
            window.location.reload();
        });
    }

    return (
        <React.Fragment>
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-4">PRODUCT LİST</h5>
                        <p className="text-danger"> </p>
                        <table className="table table-striped table-dark">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Product Title</th>
                                    <th scope="col">Product Description</th>
                                    <th scope="col">Price</th>

                                    <th scope="col" width="200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map((pdata, index) => (
                                        <tr key={index}>
                                            <td>{index + 1} </td>
                                            <td>{pdata.title} </td>
                                            <td>{pdata.description} </td>
                                            <td>{pdata.price}</td>

                                            <td>
                                                <Link to={`/productedit/${pdata.id}`} className="btn btn-success mx-2">Edit</Link>
                                                <button onClick={() => deleteProduct(pdata.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Productlist;