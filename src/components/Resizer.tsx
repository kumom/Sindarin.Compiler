import React from 'react'
import './Resizer.scss'

export default class Resizer extends React.Component<{}, { [key: string]: any }> {
  ref: any
  leftRef: any
  rightRef: any
  active: boolean
  leftWidth: number
  rightWidth: number

  constructor(props: {}) {
    super(props)
    this.ref = React.createRef();
    this.leftRef = null;
    this.rightRef = null;
    this.active = false;
    this.leftWidth = 0;
    this.rightWidth = 0;

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.active) return;

    event.preventDefault();
    event.stopPropagation();

    if (!this.leftRef && this.ref.current) {
      this.leftRef = this.ref.current.previousElementSibling;
      this.leftWidth = Number(window.getComputedStyle(this.leftRef).getPropertyValue('width').replace(/[^0-9.]/g, ''));
    }
    if (!this.rightRef && this.ref.current) {
      this.rightRef = this.ref.current.nextElementSibling;
      this.rightWidth = Number(window.getComputedStyle(this.rightRef).getPropertyValue('width').replace(/[^0-9.]/g, ''));
    }

    if (this.leftRef && this.leftRef.classList.contains('panel')) {
      this.leftWidth += event.movementX;
      this.leftRef.style.width = this.leftWidth + 'px';
    }
    if (this.rightRef && this.rightRef.classList.contains('panel')) {
      this.rightWidth -= event.movementX;
      this.rightRef.style.width = this.rightWidth + 'px';
    }
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  componentDidMount(): void {
    document.addEventListener('mouseup', () => { this.active = false; });
    document.addEventListener('mouseleave', () => { this.ref.current.style.cursor = "default"; });
    document.addEventListener('mousemove', this.onMouseMove);
  }

  render(): JSX.Element {
    return (
      <div
        className='resizer' ref={this.ref}
        onMouseOver={() => {
          this.ref.current.style.cursor = "col-resize";
        }}
        onMouseDown={() => {
          this.active = true;
          this.ref.current.style.cursor = "col-resize";
        }}
      />
    );
  }
}
