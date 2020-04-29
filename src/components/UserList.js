
import React, { useState, useEffect, memo } from 'react';
import Table from "./Table";
import axios from 'axios';
import Button from './library/Button';
const headers = ["Name","Car model","Total Amount","Days","Actions"];

const UserList = (props) => {
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
    if(res!==error){
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

  const generateHeader= ()=>{
 	let columnHeader = headers;  
 	 let res=[];
     for(var i =0; i < columnHeader.length; i++){
         res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
     }
     return res;
   }

  const generatebody= ()=> {  	
 	let columnbody = users ;   	
      const  newdata= columnbody.map((data) =>{
        return(<tr  key={data.id}>
        <td>{data.name}</td> 
        <td>{data.car.label}</td> 
        <td>{data.amt}</td>
        <td>{data.days}</td>   
        <td> <Button value='Edit'  onClick={e =>props.action.editHandler(data.id)}/> <Button value='Delete' onClick={e =>props.action.deleteHandler(data.id)}/></td> 
        </tr>)
      });      
      return newdata;
   }
 
    
  if (error) {
    return <h2 style={{ color: 'red' }}>{error.message}</h2>;
  }

  if (loading) {
    return <h3 style={{ color: 'blue' }}>Loading...</h3>;
  }

  return(
    <Table thead={generateHeader()} tbody={generatebody()}/>
   );
};

export default memo(UserList);

