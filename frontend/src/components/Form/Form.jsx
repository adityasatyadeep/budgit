import React, { useState, useEffect } from "react";
import axios from "axios";
import SubmitButton from "../SubmitButton";
import FormRow from "./FormRow";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

const Form = ({ fields, options }) => {
  const [formData, setFormData] = useState(() => {
    var initialState = {};
    fields.forEach((field) => {
      if (field.name == "date") {
        initialState[field.name] = dayjs();
      } else {
        initialState[field.name] = "";
      }
    });
    return initialState;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing ", name, " to ", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://54.183.196.89:5000/upload",
        formData
      );

      console.log("Sending formdata to backend:", formData);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-pink-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {fields.map((field, index) => (
          <FormRow
            key={index}
            label={field.label}
            type={field.type}
            name={field.name}
            options={options}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
      </Box>
      <div className="flex items-center justify-between">
        <SubmitButton onSubmit={handleSubmit} />
      </div>
    </form>
  );
};

export default Form;
