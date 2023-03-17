import { css } from '@emotion/react';
import normalize from 'emotion-normalize';
import reset from './reset';

export default css`
    ${normalize}
    ${reset}

    html,
    body,
    body > div:first-child,
    div#__next,
    div#__next > div {
        height: 100%;
    }
`;
