import { FC, ReactElement, useState } from "react";
import { Carousel } from 'antd';


interface IProps {
}

type Picture = { url: string }[]

const Index: FC<IProps> = ({
}): ReactElement => {

    const [pics, setPics] = useState<Picture>([
        { url: '' },
        { url: '' },
        { url: '' },
        { url: '' },
    ])

    return (
        <>
            <Carousel autoplay>
                <div>
                    1
                </div>
                <div>
                    2
                </div>
                <div>
                    3
                </div>
                <div>
                    4
                </div>
            </Carousel>,
        </>
    )
}

export default Index