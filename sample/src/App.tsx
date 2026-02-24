import { useState } from 'react';
import BasicTab from './examples/BasicTab';
import {ValidationTab} from './examples/ValidationTab';
import {ParserTab} from './examples/ParserTab';
import AdvancedTab from './examples/AdvancedTab';

import '../../src/index.scss';
import '../../src/dark.scss';

export default function App() {
    const [activeTab, setActiveTab] = useState('basic');
    const [isDarkMode, setIsDarkMode] = useState(true);

    const theme = isDarkMode ? 'dark' : 'light';

    return (
        <div style={{
            height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',
            padding: '24px', boxSizing: 'border-box',
            backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
            color: isDarkMode ? '#f9fafb' : '#111827'
        }}>
            <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <nav style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setActiveTab('basic')}>Basic</button>
                    <button onClick={() => setActiveTab('validation')}>Validation</button>
                    <button onClick={() => setActiveTab('parser')}>Parser</button>
                    <button onClick={() => setActiveTab('advanced')}>Advanced</button>
                </nav>

                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    style={{ fontSize: '20px', cursor: 'pointer' }}
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </header>

            <main style={{ flex: 1, border: '1px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
                {activeTab === 'basic' && <BasicTab theme={theme} />}
                {activeTab === 'validation' && <ValidationTab theme={theme} />}
                {activeTab === 'parser' && <ParserTab theme={theme} />}
                {activeTab === 'advanced' && <AdvancedTab theme={theme} />}
            </main>
        </div>
    );
}
