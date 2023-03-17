import React, { useEffect, useState } from 'react';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';
import BackHeader from 'components/layout/BackHeader';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { getApi } from 'api/setup';

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

            <ul>
                <li>
                    영상 ? / 카메라 1 <HiOutlineDotsVertical />
                </li>
                <li>
                    영상 ? / 카메라 2 <HiOutlineDotsVertical />
                </li>
            </ul>
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
