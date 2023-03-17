import styled from '@emotion/styled';
import React from 'react';

type LayoutProps = {
    children: React.ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
    return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
    max-width: 375px;
    margin: 0 auto;
`;
