import { FC, ReactElement, useId } from "react";

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

export default Index