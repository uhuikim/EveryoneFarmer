import Head from 'next/head';

import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';

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

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Button>수현짱~~</Button>
        </>
    );
};

Home.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Home;
