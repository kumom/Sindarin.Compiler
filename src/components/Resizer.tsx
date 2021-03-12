import React from "react";
import "./Resizer.scss";
import debounce from 'lodash.debounce';

export default class Resizer extends React.Component<{}, { [key: string]: any }> {
    ref: any;
    leftRef: any;
    rightRef: any;
    active: boolean;

    constructor(props: {}) {
        super(props);
        this.ref = React.createRef()
        this.leftRef = null;
        this.rightRef = null;
        this.active = false;

        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseMove(event) {
        if (!this.active) return;

        event.preventDefault();
        event.stopPropagation();

        const diff = event.movementX;
        debounce(() => this.resize(diff), 50)();
    }

    private resize(diff: number) {
        if (!this.leftRef && this.ref.current)
            this.leftRef = this.ref.current.previousElementSibling;
        if (!this.rightRef && this.ref.current)
            this.rightRef = this.ref.current.nextElementSibling;

        if (this.leftRef && this.leftRef.classList.contains('panel')) {
            const leftWidth = Number(window.getComputedStyle(this.leftRef).getPropertyValue('width').replace(/[^0-9.]/g, ''));
            this.leftRef.style.width = (leftWidth + diff) + 'px';
        }
        if (this.rightRef && this.rightRef.classList.contains('panel')) {
            const rightWidth = Number(window.getComputedStyle(this.rightRef).getPropertyValue('width').replace(/[^0-9.]/g, ''));
            this.rightRef.style.width = (rightWidth - diff) + 'px';
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        document.addEventListener('mouseup', () => { this.active = false; })
        document.addEventListener('mousemove', this.onMouseMove);
    }

    render() {
        return <div className="resizer" ref={this.ref}
            onMouseDown={() => {
                this.active = true
            }} />
    }
}
