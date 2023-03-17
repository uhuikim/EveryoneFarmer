import Head from 'next/head';

import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';

import { FaRegBell } from 'react-icons/fa';

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Header>
                홈
                <button type="button">
                    <FaRegBell size={18} />
                </button>
            </Header>
            <p>카메라 1</p>
            <div>차트</div>
            <p>카메라 2</p>
            <div>차트</div>
            <p>카메라 3</p>
            <div>차트</div>
        </>
    );
};

Home.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Home;

const Header = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    font-weight: bold;

    > button {
        position: absolute;
        right: 20px;
    }
`;

const Button = styled.button`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    &:hover {
        color: white;
    }
`;
