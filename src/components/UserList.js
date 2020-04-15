
import React, { useState, useEffect, memo } from 'react';
import Table from "./Table";
const headers = ["Name","Car model","Total Amount","Days"];

const UserList = () => {
  const [usered, setUserList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [temp, setTemp] = useState(`${data}, Yagnesh`);

  
  const apiCall = (url, reqInit = {}) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      fetch(url, reqInit)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          setError(err);
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const loadData = async () => {
    const data = await apiCall('http://localhost:3001/todos');
    console.log("updated data",JSON.stringify(data));
    setUserList(data);
    
  };

  // componentDidMount
  useEffect(() => {
    loadData();
  }, []);

  
  if (error) {
    return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  }

  if (loading) {
    return <h3 style={{ color: 'blue' }}>Loading...</h3>;
  }

  return(
    <Table thead={headers} tbody={usered}/>
   );
};

export default memo(UserList);

