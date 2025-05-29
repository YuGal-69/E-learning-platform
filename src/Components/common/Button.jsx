import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', style = {} }) => {
  const baseStyle = {
    background: 'transparent',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s',
  };

  const mergedStyle = { ...baseStyle, ...style };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={className}
      style={mergedStyle}
    >
      {children}
    </button>
  );
};

export default Button;
