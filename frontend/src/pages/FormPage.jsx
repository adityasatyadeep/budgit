import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitButton from '../components/SubmitButton';
import Form from '../components/Form/Form';

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

      const categories =[
        { emoji: "🍔", value: "Food" },
        { emoji: "🥤", value: "Drinks" },
        { emoji: "⛽️", value: "Gas" },
        { emoji: "🏀", value: "Recreation" },
        { emoji: "🥕", value: "Groceries" },
        { emoji: "🎁", value: "Gifts" },
        { emoji: "💻", value: "Technology" },
        { emoji: "🏠", value: "Rent" },
        { emoji: "♾️", value: "Miscellaneous" }
      ]
      

      return (
        <Form fields={fields} options={categories}/>
      );

}

export default FormPage