import Head from 'next/head';

import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';

import { FaRegBell } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getApi } from 'api/setup';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

interface APIResult {
    deviceCd: string;
    deviceNm: string;
    totalCnt: string;

    graphValueList: Array<{
        time: string;
        value: number;
    }>;
}

type CCTVListType = {
    cctvBrandCd: string;
    cctvBrandNm: string;
    regDt: number;
};
const Home: NextPageWithLayout = () => {
    const [data, setData] = useState<Array<APIResult>>([]);

    useEffect(() => {
        (async () => {
            await getApi<{ list: Array<APIResult> }>('/mo/event')
                .then((res) => {
                    setData(
                        res.list.map((item) => {
                            return {
                                ...item,
                                graphValueList: item.graphValueList.map((value) => {
                                    return { ...value, time: String(dayjs(value.time).hour()) };
                                })
                            };
                        })
                    );
                })
                .catch((err) => console.log(err));
        })();
    }, []);

    const router = useRouter();

    return (
        <>
            <Header>
                홈
                <button type="button">
                    <FaRegBell size={18} />
                </button>
            </Header>
            <Body>
                {data.map((item) => (
                    <ContentWrapper
                        key={item.deviceNm}
                        onClick={() => {
                            router.push(`/event/${item.deviceCd}`);
                        }}
                    >
                        <TitleWrapper>
                            <CameraName color="lightgreen">{item.deviceNm}</CameraName>
                            <Count>
                                <span>{`${item.totalCnt}회`}</span>
                                <span>(24시간 이내)</span>
                            </Count>
                        </TitleWrapper>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={item.graphValueList} width={150} height={40} barSize={15}>
                                <Bar dataKey="value" fill="#8884d8" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ContentWrapper>
                ))}
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
