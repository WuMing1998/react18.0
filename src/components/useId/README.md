### useId
    react18引入的新hook————useId
    
    用于服务端与客户端之间的稳定的id，避免数据不匹配

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
