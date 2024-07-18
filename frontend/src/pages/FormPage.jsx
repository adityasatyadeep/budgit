import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitButton from '../components/SubmitButton';
import Form from '../components/Form';

const FormPage = () => {

      const fields = [{
        name: "category",
        label: "Category"
      },
      {
        name: "description",
        label: "Description"
      }, 
      {
        name: "price",
        label: "Price"
      }]

      return (
        <Form fields={fields}/>
      );

}

export default FormPage