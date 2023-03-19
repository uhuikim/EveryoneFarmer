import React, { useEffect, useState } from 'react';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';
import BackHeader from 'components/layout/BackHeader';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { getApi } from 'api/setup';
import Image from 'next/image';

import image1Src from '../../../public/img/image1.jpg';
import image2Src from '../../../public/img/image2.jpg';
import image3Src from '../../../public/img/image3.jpg';
import image4Src from '../../../public/img/image4.jpg';

const IMAGE = [image1Src, image2Src, image3Src, image4Src]


interface DeviceResult {
    description: string;
    deviceAccId: string;
    deviceCd: string;
    deviceIp: string;
    deviceNm: string;
    devicePort: string;
    deviceStatus: number;
    idx: number;
    regDt: number;
    regUsrNm: string;
    userIdx: number;
}

const MyDevice: NextPageWithLayout = () => {
    const [data, setData] = useState<Array<DeviceResult>>([]);

    useEffect(() => {
        (async () => {
            await getApi<{ list: Array<DeviceResult> }>('/mo/device')
                .then((res) => setData(res.list))
                .catch((err) => console.log(err));
        })();
    }, []);

    const router = useRouter();
    return (
        <div>
            <Header>
                내기기
                <button type="button" onClick={() => router.push('/myDevice/create')}>
                    <AiOutlinePlus size={18} />
                </button>
            </Header>

            <UnorderedList>
                {data.map((item, index) => {
                    return (
                        <li key={item.deviceCd}>
                            <ItemWrapper>
                                <CameraImage status={item.deviceStatus === 0 ? "connected" : "disconnected"}>
                                    <div>{item.deviceStatus === 0 ? '연결' : '미연결'}</div>
                                    <Image alt="img/image1.png" src={IMAGE[index]} width={150} height={100} />
                                </CameraImage>
                                <CameraName>{item.deviceNm}</CameraName>
                                <Icon>
                                    <HiOutlineDotsVertical />
                                </Icon>
                            </ItemWrapper>
                        </li>
                    );
                })}
            </UnorderedList>
        </div>
    );
};

MyDevice.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default MyDevice;

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

const ItemWrapper = styled.div`
    display: flex;
`;

const CameraImage = styled.div<{ status: 'connected' | 'disconnected' | 'unknown' }>`
    position: relative;

    & > div:first-of-type {
        position: absolute;
        display: flex;
        align-items: center;
        left: 15px;
        color: white;
        font-weight: bold;
        font-size: 12px;
        &::before {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: ${({ status }) => {
                if (status === 'connected') return 'green';
                if (status === 'disconnected') return 'red';
                if (status === 'unknown') return 'gray';
            }};
            border: 1px solid black;
            border-radius: 50%;
            left: -15px;
        }
    }
`;

const CameraName = styled.div`
margin-left: 10px;
`;

const Icon = styled.div`
    margin-left: auto;
`;

const UnorderedList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
