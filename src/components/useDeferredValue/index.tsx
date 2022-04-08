import { FC, ReactElement, useState, useDeferredValue, useEffect, useMemo, memo } from "react"

interface IChildProps {
    numDeferred: number;
}

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

const DeferredValue: FC = (): ReactElement => {

    const [num, setNum] = useState<number>(0)

    const numDeferred = useDeferredValue<number>(num)

    useEffect(() => {
        console.log(`useEffect---numDeferred`)
        console.log(num)
        console.log(numDeferred)
        console.log(new Date().getTime())
    }, [numDeferred]);

    useEffect(() => {
        console.log(`useEffect---num`)
        console.log(num)
        console.log(numDeferred)
        console.log(new Date().getTime())
    }, [num]);

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


export default DeferredValue