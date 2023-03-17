import React from 'react';
import styled from '@emotion/styled';
type InputProps = {
    type: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, placeholder, value, name, onChange }: InputProps) => {
    return <StyledInput type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />;
};

export default Input;

const StyledInput = styled.input`
    border: none;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    &::placeholder {
        color: #9c9c9c;
    }
`;
