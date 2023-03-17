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

import image1Src from '../../../public/img/image1.png';
import image2Src from '../../../public/img/image2.png';
import image3Src from '../../../public/img/image3.png';

const MyDevice: NextPageWithLayout = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            await getApi('/mo/device')
                .then((res) => setData(res.data.list))
                .catch((err) => console.log(err));
        })();
    }, []);

    console.log(data);

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
                <li>
                    <ItemWrapper>
                        <CameraImage status="connected">
                            <div>연결</div>
                            <Image alt="img/image1.png" src={image1Src} width={150} height={100} />
                        </CameraImage>
                        <CameraName>카메라 1</CameraName>
                        <Icon>
                            <HiOutlineDotsVertical />
                        </Icon>
                    </ItemWrapper>
                </li>
                <li>
                    <ItemWrapper>
                        <CameraImage status="disconnected">
                            <div>미연결</div>
                            <Image alt="img/image2.png" src={image2Src} width={150} height={100} />
                        </CameraImage>
                        <CameraName>카메라 2</CameraName>
                        <Icon>
                            <HiOutlineDotsVertical />
                        </Icon>
                    </ItemWrapper>
                </li>
                <li>
                    <ItemWrapper>
                        <CameraImage status="connected">
                            <div>연결</div>
                            <Image alt="img/image3.png" src={image3Src} width={150} height={100} />
                        </CameraImage>
                        <CameraName>카메라 3</CameraName>
                        <Icon>
                            <HiOutlineDotsVertical />
                        </Icon>
                    </ItemWrapper>
                </li>
                <li>
                    <ItemWrapper>
                        <CameraImage status="unknown">
                            <div>수정필요</div>
                            <Image alt="img/image1.png" src={image1Src} width={150} height={100} />
                        </CameraImage>
                        <CameraName>카메라 4</CameraName>
                        <Icon>
                            <HiOutlineDotsVertical />
                        </Icon>
                    </ItemWrapper>
                </li>
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
        color: black;
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

const CameraName = styled.div``;

const Icon = styled.div`
    margin-left: auto;
`;

const UnorderedList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
