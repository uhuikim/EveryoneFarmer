import Head from 'next/head';

import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';

import { FaRegBell } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getApi } from 'api/setup';

type CCTVListType = {
    cctvBrandCd: string;
    cctvBrandNm: string;
    regDt: number;
};
const Home: NextPageWithLayout = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            await getApi('/mo/cctvbrand')
                .then((res) => setData(res.data.list))
                .catch((err) => console.log(err));
        })();
    }, []);

    console.log(data);

    return (
        <>
            <Header>
                홈
                <button type="button">
                    <FaRegBell size={18} />
                </button>
            </Header>
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
