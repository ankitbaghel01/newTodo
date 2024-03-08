import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [updateFields, setUpdateFields] = useState({
    id: null,
    updatedName: '',
    updatedEmail: '',
    updatedMno: '',
  });
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

  const handleUpdateClick = (id, name, email, mno) => {
    setUpdateFields({
      id,
      updatedName: name,
      updatedEmail: email,
      updatedMno: mno,
    });
  };

  const handleUpdateSubmit = () => {
    const { id, updatedName, updatedEmail, updatedMno } = updateFields;

    axios
      .put(`http://localhost:4500/api/update/${id}`, {
        updatedName,
        updatedEmail,
        updatedMno,
      })
      .then(() => {
        fetchData();
        setUpdateFields({
          id: null,
          updatedName: '',
          updatedEmail: '',
          updatedMno: '',
        });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4500/api/delete/${id}`).then(() => {
      fetchData();
    });
  };

  const handleAddNewData = () => {
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
    
      <div className='w-50 bg-white rounded p-3 mt-3'>
        <h2>Data Table</h2>
        <div className='d-flex justify-content-end'>
           <Link to='./create' className='btn btn-success'>Add</Link>

        </div>
        {/* Table for displaying data */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mno</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mno}</td>
                <td>
                  <button
                    className='btn btn-warning me-2'
                    onClick={() => handleUpdateClick(item.id, item.name, item.email, item.mno)}
                  >
                    Update
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {updateFields.id && (
        <div className='mt-3'>
          <h2>Update Data</h2>
          <input
            className='form-control mb-2'
            type="text"
            placeholder="Updated Name"
            value={updateFields.updatedName}
            onChange={(e) =>
              setUpdateFields({ ...updateFields, updatedName: e.target.value })
            }
          />
          <input
            className='form-control mb-2'
            type="text"
            placeholder="Updated Email"
            value={updateFields.updatedEmail}
            onChange={(e) =>
              setUpdateFields({
                ...updateFields,
                updatedEmail: e.target.value,
              })
            }
          />
          <input
            className='form-control mb-2'
            type="text"
            placeholder="Updated Mno"
            value={updateFields.updatedMno}
            onChange={(e) =>
              setUpdateFields({ ...updateFields, updatedMno: e.target.value })
            }
          />
          <button
            className='btn btn-warning'
            onClick={handleUpdateSubmit}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
