import React from 'react';
import ReactDOM from 'react-dom';

export const Input = ({ label, type, name, register, required }) => (
  <>
    <div className="form-group">
      <label>
        <b>{label}</b>
      </label>
      <input type={type} className="form-control" {...register(name, { required })} />
    </div>
  </>
);

export const Select = React.forwardRef(({ onChange, name, label }, ref) => (
  <>
    <div className="form-group">
      <label>
        <b>{label}</b>
      </label>
      <select name={name} ref={ref} onChange={onChange}>
        <option value="false">Nữ</option>
        <option value="true">Nam</option>
      </select>
    </div>
  </>
));
