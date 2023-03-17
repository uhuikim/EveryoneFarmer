import styled from '@emotion/styled';
import React from 'react';
import BottomNav from './BottomNav';

type LayoutProps = {
    children: React.ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Container>
            <Content>{children}</Content>
            <BottomNav />
        </Container>
    );
};

export default Layout;

const Container = styled.div`
    max-width: 375px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1;
`;
