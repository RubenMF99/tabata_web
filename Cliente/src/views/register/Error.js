import React from 'react';
import {Alert } from 'antd';

const Error = ({message}) => {
    return ( 
        
            <Alert
            
                type='error'
                description={message}
                
            ></Alert>
        
     );
}
 
export default Error;