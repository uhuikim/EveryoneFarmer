import BackHeader from 'components/layout/BackHeader';
import Layout from 'components/layout/Layout';
import { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const MyDeviceCreate: NextPageWithLayout = () => {
    return (
        <div>
            <BackHeader title="내 기기 추가" />
        </div>
    );
};

MyDeviceCreate.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};
export default MyDeviceCreate;
