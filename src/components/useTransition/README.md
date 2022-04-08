### useTransition
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
