import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitButton from '../components/SubmitButton';
import Form from '../components/Form';

const FormPage = () => {

      const fields = [{
        name: "category",
        label: "Category",
        type: "select",
      },
      {
        name: "description",
        label: "Description",
        type: "text",
      }, 
      {
        name: "price",
        label: "Price",
        type: "number",
      }, 
      {
        name: "date",
        label: "Date-Time",
        type: "datetime-local",
      }]

      const categories = ["Food", "Drinks", "Gas", "Recreation", "Groceries", "Gifts", "Technology", "Rent"]

      return (
        <Form fields={fields} options={categories}/>
      );

}

export default FormPage