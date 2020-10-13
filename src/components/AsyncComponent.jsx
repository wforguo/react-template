import React, { Component } from "react";

export default function (componentFactory) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {component: null};
        }
        async componentDidMount() {
            let {default: component} = await componentFactory();
            this.setState({component});
        }
        render() {
            let Comp = this.state.component;
            return Comp ? <Comp {...this.props}/> : null;
        }
    }
    return AsyncComponent;
}
