import styled from '@emotion/styled';
import React from 'react';
import { TbDeviceDesktop } from 'react-icons/tb';
import { AiOutlineMenu, AiOutlineHome } from 'react-icons/ai';
import Link from 'next/link';

const BottomNav = () => {
    return (
        <BottomNavList>
            <BottomItem href="/">
                <AiOutlineHome size={20} />홈
            </BottomItem>
            <BottomItem href="/myDevice">
                <TbDeviceDesktop size={20} />
                내기기
            </BottomItem>
            <BottomItem href="/">
                <AiOutlineMenu size={20} />
                전체
            </BottomItem>
        </BottomNavList>
    );
};

export default BottomNav;

const BottomNavList = styled.nav`
    display: flex;
`;

const BottomItem = styled(Link)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    cursor: pointer;

    > svg {
        margin-bottom: 7px;
    }

    &:hover {
        background: #f2f5f7;
    }
`;
