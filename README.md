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
    用于延迟更新数据

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



### 5、useTransition
    react18引入的新hook————useTransition
    
    在数据过大造成渲染缓慢时，可以使用useTransition保持UI响应

    useTransition返回一个数组：[isPending,startTransition]

    isPending：Boolean
        标识是否在过渡,默认为false，没有过渡
    startTransition: Function(callback)
        延后执行的callback
        可用于： 网络延迟、渲染缓慢

import and interface
```tsx
    import { FC, ReactElement, useCallback, Fragment, useState, useTransition } from "react";
    import {Spin,Slider,Tag,Switch } from 'antd'

    interface IProps {
        count: number;
    }
```

Random
```tsx
    const Random: FC<IProps> = ({
        count
    }) => {
        const [colors] = useState<string[]>([
            'magenta',
            'red',
            'volcano',
            'orange',
            'gold',
            'lime',
            'green',
            'cyan',
            'blue',
            'geekblue',
            'purple',
        ])
        const length = Math.floor(count*20);
        return (
            <>
                count:{length}
                <br />
                {
                    Array.from(Array(length).keys()).map(key=>{
                        return (
                            <Fragment key={key}>
                                <Tag color={colors[key%colors.length]}>{colors[key%colors.length]}</Tag>
                            </Fragment>
                        ) 
                    })
                }
            </>
        )
    }
```

当dom渲染缓慢时，使用useTransition延时响应

Transition
```tsx
    const Transition: FC = (): ReactElement => {
        const [isPending, startTransition] = useTransition();

        const [num, setNum] = useState<number>(0);
        const [count,setCount] = useState<number>(0);
        const [isTransition,setIsTransition] = useState<boolean>(false);

        const handle = useCallback((value)=>{
            setNum(value)
            isTransition?startTransition(()=>setCount(value)):setCount(value);
        },[startTransition,isTransition]) 

        return (
            <>
                useTransition? <Switch onChange={()=>setIsTransition(!isTransition)} />
                <br />
                {num}
                { isPending && <Spin />}
                <br />
                <Slider max={500} defaultValue={0} onChange={handle}/>
                <br />
                <Random count={count}></Random>
            </>
        )
    }
```

[参考](https://reactjs.org/docs/hooks-reference.html#usetransition)


### 6、useId
    react18引入的新hook————useId
    
    用于服务端与客户端之间的稳定的id，避免数据不匹配

    它不可以在列表中作为key使用
```tsx
    //useId() 返回字符串
    const id = useId()  
```

import and interface
```tsx
import { FC, ReactElement, useId } from "react";
```

常见用法
```tsx
    const Index: FC = (): ReactElement=>{

        const id = useId();

        console.log(id);

        return (
            <>
                <input id={`${id}--first`} type="text" />
                <br />
                <input id={`${id}--last`} type="text" />
            </>
        )
    }
```

[参考](https://reactjs.org/docs/hooks-reference.html#useid)