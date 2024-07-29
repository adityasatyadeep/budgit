import React from 'react';
import { LabelComponent, DateTimeInput, NumberInput, TextInput, SelectInput } from './FormComponents';

const FormRow = ({ label, type, name, value, options, onChange }) => {
  const renderInput = () => {
    switch (type) {
      case 'datetime-local':
        return <DateTimeInput name={name} value={value} onChange={onChange} />;
      case 'number':
        return <NumberInput name={name} value={value} onChange={onChange} />;
      case 'text':
        return <TextInput name={name} value={value} onChange={onChange} />;
      case 'select':
        return <SelectInput name={name} value={value} options={options} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <LabelComponent label={label} name={name}>
      {renderInput()}
    </LabelComponent>
  );
};

export default FormRow;
