import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaRegBell } from 'react-icons/fa';
import BackHeader from 'components/layout/BackHeader';
import Image from 'next/image';
import image1Src from '../../../public/img/image1.jpg';
import image2Src from '../../../public/img/image2.jpg';
import image3Src from '../../../public/img/image3.jpg';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getApi } from 'api/setup';

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

interface GraphResult {
    deviceCd: string;
    deviceNm: string;
    totalCntL: string;
    graphValueList: Array<{
        time: string;
        value: number;
    }>;
}

interface ImagesResult {
    deviceNm: string;
    cctvLink: string;
    list: Array<{
        time: string;
        diffTime: string;
        preTime: string;
        imgLink: string;
    }>;
}

function EventDetail() {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    const [graph, setGraph] = useState<GraphResult>();
    const [images, setImages] = useState();

    useEffect(() => {
        if (!id) return;

        (async () => {
            await getApi<GraphResult>(`/mo/event/${id}/graph`).then((res) => {
                console.log(res);
            });
        })();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        (async () => {
            await getApi<ImagesResult>(`/mo/event/${id}/images`).then((res) => {
                console.log(res);
            });
        })();
    }, [id]);

    if (!id) return null;

    return (
        <Layout>
            <>
                <BackHeader title="카메라 1" />
                <ChartWrapper>
                    <Count>
                        <span>32회</span>
                        <span>(24시간 이내)</span>
                    </Count>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={test} width={150} height={40} barSize={15}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <XAxis dataKey="pv" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartWrapper>
                <List>
                    <Item>
                        <p>06-24 12:15(40분전)</p>
                        <div>
                            <Image alt="img/image2.png" src={image2Src} fill style={{ objectFit: 'fill' }} />
                        </div>
                    </Item>
                    <Item>
                        <p>06-24 12:15(40분전)</p>
                        <div>
                            <Image alt="img/image2.png" src={image2Src} fill style={{ objectFit: 'fill' }} />
                        </div>
                    </Item>
                    <Item>
                        <p>06-24 12:15(40분전)</p>
                        <div>
                            <Image alt="img/image2.png" src={image2Src} fill style={{ objectFit: 'fill' }} />
                        </div>
                    </Item>
                    <Item>
                        <p>06-24 12:15(40분전)</p>
                        <div>
                            <Image alt="img/image2.png" src={image2Src} fill style={{ objectFit: 'fill' }} />
                        </div>
                    </Item>
                    <Item>
                        <p>06-24 12:15(40분전)</p>
                        <div>
                            <Image alt="img/image2.png" src={image2Src} fill style={{ objectFit: 'fill' }} />
                        </div>
                    </Item>
                </List>
            </>
        </Layout>
    );
}

export default EventDetail;

const ChartWrapper = styled.div`
    width: 100%;
    height: 150px;
    margin-bottom: 30px;
`;

const Count = styled.div`
    margin-left: auto;
    width: fit-content;
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

const Item = styled.div`
    & > div {
        position: relative;
        width: 100%;
        height: 150px;
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
