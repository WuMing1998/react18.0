### useDeferredValue
    react18引入的新hook————useDeferredValue
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

        const child = useMemo(() => <Child numDeferred={numDeferred}></Child>, [numDeferred])
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