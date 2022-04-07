## lazy常用于react-router懒加载

```tsx
    const Home = lazy(() => import('./Home'))
    const About = lazy(() => import('./About'))
```

### 导入懒加载组件

 考虑到用户使用会有网络不好的情况，lazy方法和Suspense组件进行搭配

```tsx
    <Suspense fallback={<h2>Loading...</h2>}>
        <About></About>
    </Suspense>
```

## Fragment组件
 Fargment组件可以使浏览器忽略该标签和<></>类似。
 Fargment组件和<></>的区别： Fargment可以绑定循环中的key值
 