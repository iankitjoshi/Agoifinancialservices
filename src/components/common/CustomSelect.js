import React from 'react'
import SelectCmp from "react-select"


const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    minWidth: "220px",
    height: "48px",
    fontSize: "14px",
    boxShadow: "none",
    borderColor: '#dedede'
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? '#eaeaea' : isSelected ? '#dedede' : '#fff',
      color: isSelected ? 'black' : "black",
      fontSize: "14px",
      padding: "6px 10px",
      zIndex: "99"
    };
  },
};


function CustomSelect(props) {
  const {
    isDisabled = false,
    isLoading = false,
    isClearable = false,
    isSearchable = false,
    options = [],
    defaultValue = null,
    value = null,
    className = '',
    placeholder,
    onChange
  } = props;
  return (
    <div className="select-top-container">
      <SelectCmp
        className={className}
        classNamePrefix="select"
        defaultValue={defaultValue}
        value={value}
        styles={colourStyles}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        onChange={onChange}
        isSearchable={isSearchable}
        options={options}
      />
      <svg class="cus-select-dropdown MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
    </div>
  )
}

export default CustomSelect
