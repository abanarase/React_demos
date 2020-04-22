import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './css/Car_listing.css';

const Table = ({tbody, thead}) => {

    return (
        <div>             
        <table  id="Cars">
        <thead>
            <tr>
            {thead}
            </tr>
        </thead>
        <tbody>        
             {tbody}  
        </tbody>
        </table>
           </div>
      	
    )
};

Table.propTypes = {
    thead: PropTypes.string,
    };

Table.defaultProps = {
  thead: '',
  tbody: ''  
};

export default Table;

