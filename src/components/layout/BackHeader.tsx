import React from 'react';
import styled from '@emotion/styled';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';

type BackHeaderType = {
    title: string;
};

const BackHeader = ({ title }: BackHeaderType) => {
    const router = useRouter();
    return (
        <Header>
            <button type="button" onClick={() => router.back()}>
                <IoIosArrowBack />
            </button>
            {title}
        </Header>
    );
};

export default BackHeader;

const Header = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    font-weight: bold;

    > button {
        position: absolute;
        left: 20px;
    }
`;
