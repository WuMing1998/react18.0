### React 17.x ==> React 18.0


### 解决react @types版本过低的问题

```json
    "@types/react": "^17.0.43",
    "@types/react-dom": "^17.0.14",
```
如果你的types版本比我的要高，请无视它。

在react-app-env.d.ts中
```ts
    /// <reference types="react/next" />
```


### 1、createRoot
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
    
### 2、useEffect
    useEffect在react18中，当用户输入（如点击）时，传递给useEffect的函数将在页面渲染之前执行。
###
[参考](https://reactjs.org/docs/hooks-reference.html#useeffect)

### 3、React.StrictMode
    在react18中的严格模式中，你可能会遇到useEffect执行两次的情况。这是正确的，为了帮助开发者更好的发现异常情况，react解除了在17版本中严格模式的渲染限制。
### 
 [参考](https://github.com/facebook/react/blob/main/CHANGELOG.md)

    
### 4、useDeferredValue
    react18引入的新hook--useDeferredValue

import and interface
```tsx
    import { FC, ReactElement, useState, useDeferredValue, useEffect, useMemo, memo } from "react"

    interface IChildProps {
        numDeferred: number;
    }
```

DeferredValueComponent
```tsx
    const DeferredValue: FC = (): ReactElement => {

        const [num, setNum] = useState<number>(0)

        const numDeferred = useDeferredValue<number>(num)

        useEffect(() => {
            console.log(`useEffect---numDeferred`)
            console.log(num)
            console.log(numDeferred)
            console.log(new Date().valueOf())
        }, [numDeferred]);

        useEffect(() => {
            console.log(`useEffect---num`)
            console.log(num)
            console.log(numDeferred)
            console.log(new Date().getTime())
        }, [num]);

        return (
            <>
                num:{num}
                <br />
                numDeferred:{numDeferred}
                <br />
                <input type="text" onChange={(e) => setNum(Number(e.target.value))} />
                <br />
            </>
        )
    }
```
useDeferredValue 基于防抖和节流实现的延迟更新，上面的例子中 state 的 num 发生改变时 numDeferred 会延迟更新。请观察时间戳。

当你不希望子组件中的数据及时更新时，你可以使用useMemo和memo来处理子组件

```tsx
    // child
    const Child = memo<IChildProps>(({
        numDeferred
    }) => {
        return (
            <>
                child...
                {numDeferred}
            </>
        )
    })

    // parent
    const DeferredValue: FC = (): ReactElement => {

        const [num, setNum] = useState<number>(0)

        const numDeferred = useDeferredValue<number>(num)

        const child = useMemo(() => <Child numDeferred={numDeferred}></Child>, [num])
        return (
            <>
                num:{num}
                <br />

                numDeferred:{numDeferred}
                <br />

                <input type="text" onChange={(e) => setNum(Number(e.target.value))} />
                <br />

                {child}
            </>
        )
    }
```
[参考](https://reactjs.org/docs/hooks-reference.html#usedeferredvalue)

