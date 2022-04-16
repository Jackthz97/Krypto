import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart';

const SingleCrypto = (props) => {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/crypto/${id}`) 
      .then((res) => {
        console.log(res);
        }
      )
      .catch((err)=>console.log(err));
  },[id]);
  return (
    <div>
      <Chart id={id}/>
    </div>
  )
}

export default SingleCrypto