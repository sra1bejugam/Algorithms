function ParentComponent() {
    let [counter, SetCounter] = useState(0);

    let callback = valFromChild => SetCounter(valFromChild)
    return (
        <div>
            <p>value from child:{counter}</p>
            <childComponent callbackFun={callback} counterVal={counter} />
        </div>
    )
}

function childComponent(props) {
    let childCounter = props.counter
    return (
        <div>
            <button onClick={() => props.callbackFun(++childCounter)}>Increment counter</button>
        </div>
    )
}