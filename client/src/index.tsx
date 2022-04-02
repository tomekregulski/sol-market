import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { TokenProvider } from './context/tokens/token.context';
import { App } from './App';

ReactDOM.render(
    <StrictMode>
        <TokenProvider>
            <App />
        </TokenProvider>
    </StrictMode>,
    document.getElementById('app')
);
