import Select from 'react-select';
// import { useField } from 'formik';

const SelectList = ({ onChange, options, defaultValue, value, isMulti }) => {
  const style = {
    control: (base) => ({
      ...base,
      // This line disable the thick blue border
      boxShadow: 'none',
    }),
  };

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      styles={style}
    />
  );
};

export default SelectList;
