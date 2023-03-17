import Layout from 'components/layout/Layout';
import React from 'react';
import { NextPageWithLayout } from 'pages/_app';
import styled from '@emotion/styled';
import Input from 'components/form/Input';

const Login: NextPageWithLayout = () => {
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('dkdkdkdkdk');
    };
    return (
        <LoginForm onSubmit={handleLogin}>
            <Title>모두의 농부</Title>
            <InputWrap>
                <Input type="text" placeholder="아이디" />
                <Input type="password" placeholder="비밀번호" />
            </InputWrap>
            <Button type="submit">로그인</Button>
        </LoginForm>
    );
};

Login.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Login;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 25px;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-top: 120px;
`;

const InputWrap = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    margin: 40px 0 30px;
`;

const Button = styled.button`
    border-radius: 8px;
    padding: 15px;

    background: #0267ff;
    color: white;
    &:hover {
        font-weight: bold;
    }
`;
