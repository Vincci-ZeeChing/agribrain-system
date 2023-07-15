import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const FormEditCrop = () => {
    const [name,setName] = useState("");
    const [message,setMessage] = useState("");
    const {id} = useParams();


    const navigate = useNavigate();

    useEffect(()=>{
        const getCropById = async() => {
            try{
                const response = await axios.get(`http://localhost:5000/api/v1/crop/${id}`)
                setName(response.data.name);
            }catch (error){
                if(error.response){
                    setMessage(error.response.data.message);
                }
            }
        }
        getCropById();
    },[id])

    const handleUpdateCrop = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/v1/crop/${id}`,{
                crop_name:name,
            })
            navigate("/precision-farming/crop");
        }catch (error) {
            if(error.response){
                setMessage(error.response.data.message);
            }
        }
    }

    return (
        <div>
            <h1 className="title">Crop</h1>
            <h2 className="subtitle">Edit Crop</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={handleUpdateCrop}>
                            <p className="has-text-centered">
                                {message}
                            </p>
                            <div className="field">
                                <label className="label"> Crop Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input" value={name}
                                        onChange={(e)=> setName(e.target.value)}
                                        placeholder='Crop Name'/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button" style={{ backgroundColor: "#71AF9D", color: "white" }}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditCrop;
