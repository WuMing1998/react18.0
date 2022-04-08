import { FC, ReactElement, useCallback, Fragment, useState, useTransition } from "react";
import {Spin,Slider,Tag,Switch } from 'antd'

interface IProps {
    count: number;
}

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

export default Transition