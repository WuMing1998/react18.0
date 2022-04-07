import { lazy, Suspense } from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs

const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

const Tab = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">

        <TabPane tab="Home" key="1">
          {/* <Home></Home> */}
          <Suspense fallback={<h2>Loading...</h2>}>
            <Home></Home>
          </Suspense>
        </TabPane>

        <TabPane tab="About" key="2">
          {/* <About></About> */}
          <Suspense fallback={<h2>Loading...</h2>}>
            <About></About>
          </Suspense>
        </TabPane>

      </Tabs>
    </>
  )
}

export default Tab
