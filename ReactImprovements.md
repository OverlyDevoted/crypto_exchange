In the beginning a component gets rendered twice, because all the <App> is wrapped in a <React.StrictMode>  
how useEffect works:
1. First all the code runs, then the useEffect gets called. 
3. useEffect can run only once after the intial render with this snipped
```
useEffect(()=>{
    console.count("Times");
},[])
```
4. On any change to the UI - like a button click, input gets it's value changed, then a component rerender is instantiated.
5. Also using useEffect on non-primitives should be handeled differently. Since all non-primitives, even seemingly the same are not equal in computer's eyes, so even when the object gets changed in any way, useEffect gets triggered and calls for a rerender as it recognizes the object as changed due to that peculiarity. So basically primitives (string, numbers, booleans, null, undefined) get their values checked with logical operators, while non-primitives (objects, arrays) get their references compared.

useMemo caches the result of a calculation between rerenders, so it can help to avoid them.
Or add object variables to the dependency list in useEffect to avoid unnecessary rerenders

6. We can run code before useEffect. Mainly it is used for clean-ups, like cleaning event subscriptions 
```
useEffect(()=>{
    console.log(useEffect runs)
    
    return ()=>{ //cleanup function
        console.log("cleanup starts")
        // clean something from previous useEffect and the run this one
        console.log("cleanup ends")
    }
})
```

7. In some cases useEffect has to be interrupted, for example when leaving the component, because if we don't it still runs it's code even when it's not on. 
Cleanup function can be also used to cancel such cases.

8. `AbortController()` can be used to cancel api requests in fetch() functions. Other api libraries probably will implement different objects for handling request cancelling as axios has its `axios.cancelToken.source()`
```
useEffect(()=> {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://jsonplaceholder.typicode.com/users/${id}', {signal})
    .then((res)=>res.json())
    .then((data)=>{
        setUser(data);
    }).catch(err=>{
        if (err.name === "AbortError"){
            console.log("canceled")
        } else {
            //handle errors 
        }
    })
})
```