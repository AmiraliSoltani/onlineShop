import React, { useState } from 'react';
import Joi from 'joi'; // Make sure to import Joi
import Input from "./input";
import Select from "./select";

function CustomForm() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const schema = { // Define your schema here
    // Add your schema definitions
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;
    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    // Call your submit function here, e.g., doSubmit();
  };

  const handleChange = (e) => {
    const input = e.currentTarget;
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);

    if (input.name === 'gender') {
      handleSoloValidate(e);
    }
  };

  const handleSoloValidate = ({ currentTarget: input }) => {
    const newData = { ...data };
    const { name, value } = input;
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    let errorMessage = error === null ? null : error.details[0].message;
    const newErrors = { ...errors };
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name] || ''}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderInput = (name, label, placeholder, type = 'text') => {
    return (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={data[name] || ''}
        label={label}
        onChange={handleChange}
        onBlur={handleSoloValidate}
        error={errors[name]}
        className="form-control mt-3 mb-3"
      />
    );
  };

}

export default CustomForm;














// import React from "react";
// import Joi from "joi-browser";
// import Input from "./input";
// import Select from "./select";


// function Custom__form() {
//   state = {
//     data: {},
//     errors: {}
//   };

//   const validate = () => {
//     const options = { abortEarly: false };
//     const { error } = Joi.validate(this.state.data, this.schema, options);
//     if (!error) return null;
//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };


//   const handleSubmit = e => {
//     e.preventDefault();

//     const errors = this.validate();
//     this.setState({ errors: errors || {} });
//     if (errors) return;

//     this.doSubmit();
//   };


//   const handleChange = (e) => {
//     let input=e.currentTarget
//     const data = { ...this.state.data };
//     data[input.name] = input.value;
//     this.setState({ data });
//     if(input.name==="gender")
//     this.handleSoloValidate(e)
//   };

//   const handleSoloValidate=({ currentTarget: input }) =>{
//     const data = { ...this.state.data };
// const {name,value}=input;
// const obj = { [name]: value };
// const schema = { [name]: this.schema[name] };
// const { error } = Joi.validate(obj, schema);
// let errorMessage = error===null? null:error.details[0].message;
// const errors = { ...this.state.errors };
// if (errorMessage) errors[input.name] = errorMessage;
// else delete errors[input.name];
// this.setState({errors});
//   }
 

//   const renderSelect=(name, label, options) =>{
//     const { data, errors } = this.state;

//     return (
//       <Select
//         name={name}
//         value={data[name]}
//         label={label}
//         options={options}
//         onChange={this.handleChange}
//         error={errors[name]}
//       />
//     );
//   }

//   const renderInput = (name, label, placeholder, type = "text") => {
//     const { data, errors } = this.state;

//     return (
//       <Input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={data[name]}
//         label={label}
//         onChange={this.handleChange}
//         onBlur={this.handleSoloValidate}
//         error={errors[name]}
//         className="form-control mt-3 mb-3"
//       />
//     );
// }

// }

// export default Custom__form

  
