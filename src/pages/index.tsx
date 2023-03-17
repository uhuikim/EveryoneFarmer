import Head from 'next/head';

import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';

import { FaRegBell } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getApi } from 'api/setup';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';

const test = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

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
            <Body>
                <ContentWrapper>
                    <TitleWrapper>
                        <CameraName color="lightgreen">카메라 1</CameraName>
                        <Count>
                            <span>32회</span>
                            <span>(24시간 이내)</span>
                        </Count>
                    </TitleWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={test} width={150} height={40} barSize={15}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <XAxis dataKey="pv" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </ContentWrapper>
                <ContentWrapper>
                    <TitleWrapper>
                        <CameraName color="red">카메라 1</CameraName>
                        <Count>
                            <span>32회</span>
                            <span>(24시간 이내)</span>
                        </Count>
                    </TitleWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={test} width={150} height={40} barSize={15}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <XAxis dataKey="pv" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </ContentWrapper>
                <ContentWrapper>
                    <TitleWrapper>
                        <CameraName color="lightgreen">카메라 1</CameraName>
                        <Count>
                            <span>32회</span>
                            <span>(24시간 이내)</span>
                        </Count>
                    </TitleWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={test} width={150} height={40} barSize={15}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <XAxis dataKey="pv" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </ContentWrapper>
            </Body>
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

const Body = styled.article`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const CameraName = styled.div<{ color: string }>`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 43px;
    margin-bottom: 10px;

    &::before {
        position: absolute;
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: ${({ color }) => color};
        border: 1px solid black;
        left: -20px;
    }
`;

const Count = styled.div`
    & > span {
        &:first-of-type {
            font-size: 12px;
        }

        &:last-of-type {
            font-size: 10px;
            margin-left: 2px;
            color: grey;
        }
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 150px;
`;
