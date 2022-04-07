import react,{ lazy, useEffect,useDeferredValue } from 'react';

// const Picture = lazy(() => import('./components/Index'))

import Lazytest from './components/Lazytest'

const App = () => {

  const effectFun = () =>{
    console.log('effectFunRender')
  }

  useEffect(() => {
    effectFun();
    console.log('render');
  })
  return (
    <div className="App">
      <Lazytest></Lazytest>
    </div>
  );
}

export default App;
