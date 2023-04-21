import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// importing web workers - https://vitejs.dev/guide/features.html#web-workers
const worker = new Worker(new URL('../workers/worker', import.meta.url), { type: 'module' });

worker.addEventListener('message', function handleMessageFromWorker(msg) {
    console.log('message from worker received in main:', msg);

    const bufTransferredBackFromWorker = msg.data;

    console.log('buf.byteLength in main AFTER transfer back from worker:', bufTransferredBackFromWorker.byteLength);
});

// create the buffer
const myBuf = new ArrayBuffer(8);

console.log('buf.byteLength in main BEFORE transfer to worker:', myBuf.byteLength);

// send myBuf to myWorker and transfer the underlying ArrayBuffer
worker.postMessage(myBuf, [myBuf]);

console.log('buf.byteLength in main AFTER transfer to worker:', myBuf.byteLength);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
