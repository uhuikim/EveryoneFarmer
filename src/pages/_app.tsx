import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import globalStyle from 'styles/globals';
import type { NextPage } from 'next';
import Authorization from 'components/Authorization'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <Authorization>
            <Global styles={globalStyle} />
            {getLayout(<Component {...pageProps} />)}
        </Authorization>
    );
}
