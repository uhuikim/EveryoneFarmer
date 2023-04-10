import { ReactNode, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

export interface AuthorizationProps {
    children: ReactNode;
}

function Authorization(props: AuthorizationProps) {
    const { children } = props;

    const [token, setToken] = useState<string | undefined>(undefined);

    const { pathname } = useRouter();

    const showPage = (() => {
        if (token === undefined) return false;
        if (token && pathname !== '/login') return true;
        if (!token && pathname === '/login') return true;
        return false;
    })();

    useEffect(() => {
        const token = localStorage.getItem('monong_access_token') ?? '';

        if (!token) {
            if (pathname !== '/login') {
                Router.replace('/login');
            }
        }

        if (token) {
            if (pathname === '/login') {
                Router.replace('/');
            }
        }

        setToken(token);
    }, [pathname]);

    return <>{showPage && children}</>;
}

export default Authorization;
