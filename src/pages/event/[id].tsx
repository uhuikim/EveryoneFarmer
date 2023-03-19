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
import dayjs from 'dayjs';

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
    totalCnt: string;
    graphValueList: Array<{
        time: string;
        value: number;
    }>;
}

interface ImagesResult {
    deviceNm: string;
    cctvLink: string;
    imgList: Array<{
        time: string;
        diffTime: string;
        preTime: string;
        imgLink: string;
    }>;
}

function EventDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [graph, setGraph] = useState<GraphResult>();
    const [images, setImages] = useState<ImagesResult>();

    useEffect(() => {
        if (!id) return;

        (async () => {
            await getApi<{ data: GraphResult }>(`/mo/event/${id}/graph`, { page: 0, size: 100 }).then((res) => {
                setGraph({
                    ...res.data,
                    graphValueList: res.data.graphValueList.map((item) => ({
                        ...item,
                        time: String(dayjs(item.time).hour())
                    }))
                });
            });
        })();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        (async () => {
            await getApi<{ data: ImagesResult }>(`/mo/event/${id}/images`).then((res) => {
                setImages(res.data);
            });
        })();
    }, [id]);

    if (!id || !graph || !images) return null;

    return (
        <Layout>
            <>
                <BackHeader title={graph.deviceNm} />
                <ChartWrapper>
                    <Count>
                        <span>{`${graph.totalCnt}회`}</span>
                        <span>(24시간 이내)</span>
                    </Count>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={graph.graphValueList} width={150} height={40} barSize={15}>
                            <Bar dataKey="value" fill="#8884d8" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartWrapper>
                <List>
                    {images.imgList.map((item) => {
                        return (
                            <Item key={item.diffTime}>
                                <p>{item.time}</p>
                                <div>
                                    <Image
                                        src={`http://monong.de:8205/mo/event/image?path=${item.imgLink}`}
                                        fill
                                        style={{ objectFit: 'fill' }}
                                        alt="test"
                                    />
                                </div>
                            </Item>
                        );
                    })}
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
