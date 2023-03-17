import React from 'react';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';
import BackHeader from 'components/layout/BackHeader';
const MyDevice: NextPageWithLayout = () => {
    return (
        <div>
            <BackHeader title="기기 등록" />
        </div>
    );
};

MyDevice.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default MyDevice;
