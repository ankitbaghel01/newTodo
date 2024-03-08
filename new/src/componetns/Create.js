import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Create(props) {
    const [data, setData] = useState([]);
  
    const [newData, setNewData] = useState({
      name: '',
      email: '',
      mno: '',
    });
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios.get('http://localhost:4500/api/data').then((response) => {
        setData(response.data);
      });
    };
  

    const handleAddNewData = () => {
        toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });


      axios.post('http://localhost:4500/api/add', newData).then(() => {
        fetchData();
        setNewData({
          name: '',
          email: '',
          mno: '',
        });
      });
    };


    return (
        <div className='App d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='card p-3 w-50'>
        <h2>Add New Data</h2>
        <input
          className='form-control mb-2'
          type="text"
          placeholder="Name"
          value={newData.name}
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
        />
        <input
          className='form-control mb-2'
          type="text"
          placeholder="Email"
          value={newData.email}
          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
        />
        <input
          className='form-control mb-2'
          type="text"
          placeholder="Mno"
          value={newData.mno}
          onChange={(e) => setNewData({ ...newData, mno: e.target.value })}
        />
        <button className='btn btn-success' onClick={handleAddNewData}>
          Add Students
        </button>
        <ToastContainer/>
      </div> 
      </div>
    );
}

export default Create;