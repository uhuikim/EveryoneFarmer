import Layout from 'components/layout/Layout';
import React, { useState } from 'react';
import { NextPageWithLayout } from 'pages/_app';
import styled from '@emotion/styled';
import Input from 'components/form/Input';
import { postApi } from 'api/setup';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [value, setValue] = useState({ userId: '', userPw: '' });

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postApi('/mo/signIn', value)
            .then((res) => {
                if (res.data.message === 'SUCCESS') {
                    const access_token = res.data.data['MO-MNG-TOKEN'];
                    localStorage.setItem('monong_access_token', access_token);
                    router.push('/');
                }
                if (res.data.message === 'FAIL_ACCESS_NO_USER_OR_PASSWORD') console.log('없는 아이디 비번');
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <Title>모두의 농부</Title>
                <InputWrap>
                    <Input
                        type="text"
                        placeholder="아이디"
                        name="userId"
                        onChange={handleChange}
                        value={value.userId}
                    />
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        name="userPw"
                        onChange={handleChange}
                        value={value.userPw}
                    />
                </InputWrap>
                <Button type="submit">로그인</Button>
            </LoginForm>
        </Container>
    );
};

export default Login;
const Container = styled.div`
    max-width: 375px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

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
