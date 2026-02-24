import React from 'react';
import { ReactJsonEditor, createAjvValidator } from '../../../src';

interface Props {
    theme: 'dark' | 'light'
}


const schema = {
    type: "object",
    properties: {
        system_port: { type: "integer", minimum: 1024 },
        log_level: { enum: ["debug", "info", "warn", "error"] }
    },
    required: ["system_port"]
};

const validator = createAjvValidator({ schema });

export const ValidationTab : React.FC<Props> =({ theme }: { theme: 'dark' | 'light' }) => {
    return (
        <div style={{ height: '100%' }}>
            <ReactJsonEditor
                theme={theme}
                content={{ json: { system_port: 80, log_level: "verbose" } }}
                validator={validator}
            />
        </div>
    );
}
