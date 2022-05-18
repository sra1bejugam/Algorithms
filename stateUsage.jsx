class User extends React.component {
    constructor(props) {
        super(props);
        this.state = {
            message: "hellow simple state usage"
        };
    }
    render() {
        return (
            <div className="container">
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}