import styled from '@emotion/styled';
import Input from 'components/form/Input';
import BackHeader from 'components/layout/BackHeader';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const column = [
    { key: 'name', value: '이름' },
    { key: 'hikision', value: 'hikision' },
    { key: 'cctvId', value: 'cctv 아이디' },
    { key: 'password', value: '비밀번호' },
    { key: 'ipAddress', value: 'IP 주소' },
    { key: 'port', value: '포트' },
    { key: 'order', value: '카메라 순서' },
    { key: 'rtsp', value: 'rtsp://' }
];

const MyDeviceCreate: NextPageWithLayout = () => {
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <BackHeader title="내 기기 추가" />
            <Form onSubmit={handleCreate}>
                {column.map((el) => (
                    <Input key={el.key} type="text" placeholder={el.value} name={el.key} />
                ))}
                <Button type="submit">등록</Button>
            </Form>
        </div>
    );
};

MyDeviceCreate.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};
export default MyDeviceCreate;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 25px;
    gap: 6px;
`;

const Button = styled.button`
    border-radius: 8px;
    padding: 15px;
    margin-top: 20px;
    background: #0267ff;
    color: white;
    &:hover {
        font-weight: bold;
    }
`;
