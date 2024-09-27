1. What is the difference between Component and PureComponent? Give an example where it might break my app.

# Answer

Component and PureComponent were commonly used with the class-based React ( till 16th version ).
The main difference are in provided lifecycle methods and rendering way. Component doesn't not have 'shouldComponentUpdate' and that means, it will be affected by each render. PureComponent allows us to use 'shouldComponentUpdate'. This lifecycle method return boolean value. If this method was used, rendering of a component will depend from a value, that will be returned.
The most common mistake is mutation.
Rendering won't be applied, because React compare references to memory ( in case of not primitive data types ). If content of some object-type data was changed, but link - not: render won't trigger.

---

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

# Answer

Context show it's data directly to a component, instead of passing it like props. But PureComponent rely on props, so it may be not updated, in case of changing some values inside a context.

---

3. Describe 3 ways to pass information from a component to its PARENT.

# Answer

1. Pass function from parent as a prop and call it from a child with some data.
2. Bind child and parent to the same context object, then - update it from a child.
3. Use libraries, like Redux ( basically, the same as context ), Tanstack query, etc...

---

4. Give 2 ways to prevent components from re-rendering.

# Answer

1. If we are using React hooks, then we need to wrap a component inside React.memo and make sure, that all props are memorized ( meaning, wrapped inside useCallback, useMemo, etc). In case of class-like structure, we can use PureComponent and shouldComponentUpdate instead.
2. In case of rendering lists, we need to pass 'key' prop. By default, React doesn't recognize element as a unique structure, if it was created from a code, like: array.map(el => <span>{el}</span>). So, any manipulation with a list will cause a rendering of all items inside. When we will assign key for each of items, we will tell React, which element is changing.

---

5. What is a fragment and why do we need it? Give an example where it might break my app.

# Answer

<React.Fragment></React.Fragment> or <></> allows us to group a some amount of elements and return it without wrapping in a <div> or smth like. Actually, no idea how it can break an app :d

---

6. Give 3 examples of the HOC pattern.

# Answer

1. Create protected Route. Some of routes could be shown only for authorized users.
2. Error boundary. A common thing for React app, that prevents app from crashing and shows some fancy screen, e g: Something went wrong. Choose a developer to fire.
3. Old versions of 'connect' from 'react-redux', that provides an access to store.

---

7. What's the difference in handling exceptions in promises, callbacks and async...await?

# Answer

Promise:

- We can call .catch() over a promise object.
- To return an error, reject should be called with this error as an argument. E. g: (resolve, reject) => {reject('some error' ))}

Callbacks:

- Passing everything as an argument of function and calling it.

Async/await:

- Should be wrapped inside try {} catch {} structure.

---

8. How many arguments does setState take and why is it async.

# Answer

setState((prevState) => {... Return new state ....}, () => { ... Do something once effect was applied ....})
Async is needed to batch all 'setState' call and do not trigger them one by one.
For example:
setState(1)
setState(2)
setState(3)
meaning the same as
setState(3)

---

9. List the steps needed to migrate a Class to Function Component.

# Answer

In case of 1 component only:

1. We need to get rid of class structure and re-define all functions and variables inside of function.
2. Replace constructor with const [state, setState] = useState({....})
3. Remove 'render' method and return only JSX code;
4. Rewrite all lifecycle methods to useEffect()
5. Replace all PureComponent-s with functions, wrapped in React.memo()

In case of an entire codebase:

1. Better to write everything from scratch :D

---

10. List a few ways styles can be used with components.

# Answer

1. Inline. <span style={{marginTop: 10, padding: 5, display: 'flex'}}>.....</span>
2. Define className according to style files. <span className="some-fancy-span">....</span>
3. Use libraries and frameworks: Tailwind, Styled components, css in js, etc

---

11. How to render an HTML string coming from the server.

# Answer

Use dangerouslySetInnerHTML, but it's better to avoid this feature at all. Server may send some script, and it will be executed on client side.
