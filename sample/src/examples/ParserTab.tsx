import React from 'react';
import { ReactJsonEditor } from '../../../src';
import { parse, stringify } from 'lossless-json'

interface Props {
    theme: 'dark' | 'light'
}


const LosslessJSONParser = { parse, stringify }

export const ParserTab: React.FC<Props> = ({ theme }: { theme: 'dark' | 'light' }) => {
    return (
        <div style={{ height: '100%' }}>
            <ReactJsonEditor
                theme={theme}
                content={{ text: '{"large_id": 9223372036854775807}' }}
                parser={LosslessJSONParser}
            />
        </div>
    );
}
