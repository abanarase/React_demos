
import React, { useState, useEffect, memo } from 'react';
import Table from "./Table";
import axios from 'axios';

const headers = ["Name","Car model","Total Amount","Days"];

const UserList = () => {
  const [users, setUserList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  
  // const apiCall = (url, reqInit = {}) => {
  //   setLoading(true);
  //   return new Promise((resolve, reject) => {
  //     fetch(url, reqInit)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         resolve(data);
  //       })
  //       .catch((err) => {
  //         setError(err);
  //         reject(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  // };

  // const loadData = async () => {
  //   const data = await apiCall('http://localhost:3001/todos');
  //   console.log("updated data",JSON.stringify(data));
  //   setUserList(data);
    
  // };
  const loadData=()=>{
    setLoading(true);
  axios.get('http://localhost:3001/todos')
  .then(res => {
    if(res!=error){
      setLoading(false);
      const data = res.data;
      setUserList(data);
    }
    else{
      setLoading(false);
      setError(res);
    }
    
  })
}
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
    <Table thead={headers} tbody={users}/>
   );
};

export default memo(UserList);

