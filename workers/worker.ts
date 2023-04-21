// Strongly Typed Web Workers - https://joshuatz.com/posts/2021/strongly-typed-service-workers/

// Web Worker Example from here - https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage#transfer_example
self.onmessage = function handleMessageFromMain(msg) {
    console.log('message from main received in worker:', msg);

    const bufTransferredFromMain = msg.data;

    console.log('buf.byteLength in worker BEFORE transfer back to main:', bufTransferredFromMain.byteLength);

    // send buf back to main and transfer the underlying ArrayBuffer
    self.postMessage(bufTransferredFromMain, [bufTransferredFromMain]);

    console.log('buf.byteLength in worker AFTER transfer back to main:', bufTransferredFromMain.byteLength);
};

// export default null;
