### React 17.x ==> React 18.0

##### 在react-app-env.d.ts中

```ts
    /// <reference types="react/next" />
```


##### 1、createRoot
src/index.tsx
```tsx
    // Before
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import reportWebVitals from './reportWebVitals';

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root'),()=>{
            console.log('这里的回调在react18中被删除了，因为它通常没有预期的结果')
        }
    );
    reportWebVitals();

    // After
    import React from 'react';
    import {createRoot} from 'react-dom/client';
    import App from './App';
    import reportWebVitals from './reportWebVitals';

    const container = document.getElementById('root') as Element
    const root = createRoot(container)

    setTimeout(() => {
    // 五秒后卸载#root
        root.unmount();
    }, 5000)

    root.render(
        <React.StrictMode>
        <App />
        </React.StrictMode>
    );
    reportWebVitals();
```

    [参考](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)

##### 2、useEffect
    useEffect在react18中，当用户输入（如点击）时，传递给useEffect的函数将在页面渲染之前执行。

    [参考](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)

##### 3、React.StrictMode
    在react18中的严格模式中，你可能会遇到useEffect执行两次的情况。这是正确的，为了帮助开发者更好的发现异常情况，react解除了在17版本中严格模式的渲染限制。

    [参考](https://github.com/facebook/react/blob/main/CHANGELOG.md)
    

