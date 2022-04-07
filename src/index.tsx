import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as Element

const root = createRoot(container)

// let second = 4;
// console.log('五秒后卸载#root')
// console.log(`${second+1}`);
// const interval =  setInterval(()=>{
//     console.log(`${second}`);
//     second--;
// },1000)
// setTimeout(() => {
//     // 五秒后卸载#root
//     root.unmount();
//     clearInterval(interval);
// }, 5000)

root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);
reportWebVitals();
