import React from 'react';
import {Motion, spring} from 'react-motion';
import _ from 'lodash'
import styles from './ScrollContainer.css'

const ScrollContainer = React.createClass({
  getInitialState() {
    return {
      touchStart: 0,
      direction: 0,
      touchControl: false,
      active: 0,
      allow: false // 为false的时候不会update component
    };
  },

  handleMouseDown() {
    this.setState({active: this.props.children.length-1 });
  },

  moveDown(){
    // console.log('this.state.active:', this.state.active)
    // console.log(' this.props.children.length-1',  this.props.children.length-1)
    this.setState({ allow: true,
                    active: this.state.active === this.props.children.length-1 ? this.props.children.length-1 : (this.state.active + 1) })
  },

  moveUp(){
    this.setState({ allow: true,
                    active: this.state.active === 0 ? 0 : (this.state.active - 1) })
  },

  moveTo(number){
    this.setState({allow: true, active: number})
  },

  shouldComponentUpdate(nextProps, nextState){
    // console.log('this state:', this.state.allow === false)
    // console.log('nextState', nextState)
    // console.log('next state:', nextState.allow === true)
    if(this.state.allow === false && nextState.allow === true){
      return true
    }else{
      return false
    }
  },

  handleOnWheel(e){
    if(e.deltaY > 0 && this.state.allow === false && this.state.active !== this.props.children.length-1)
      { this.moveDown() }
    if(e.deltaY < 0 && this.state.allow === false && this.state.active !== 0)
      { this.moveUp() }
  },

  handleTouchStart(e){
    if(this.state.touchControl === true){return}
    console.log('touch start')
    this.setState({ touchStart: e.touches[0].screenY,
                    })
  },

  handleTouchMove(e){
    if(this.state.touchControl === true){return}
    console.log('touch move')
    let direction = e.touches[0].screenY < this.state.touchStart ? 'down' : 'up' 

    // console.log('111111', this.atHead() && direction == 'up')
    // console.log('222222', this.atEnd() && direction == 'down')

    if(this.atHead() && direction == 'up'){ console.log('lala');return}
    if(this.atEnd() && direction == 'down'){ console.log('haha');return}

    if( direction == 'down' ){
      this.setState({ direction: 1}) // 1 down
    } else {
      this.setState({ direction: -1}) // 0 up
    }
  },

  handleTouchEnd(e){
    if(this.state.touchControl === true){return}
    console.log('touch end')
    if(this.state.direction === 1 && !this.atEnd() ){
      // console.log('moveDown')
      this.moveDown()
      this.setState({touchControl: true})
    }
    if(this.state.direction === -1 && !this.atHead() ){
      this.moveUp()
      this.setState({touchControl: true})
    }
  },
  
  atHead(){
    return this.state.active === 0
  },

  atEnd(){
    return this.state.active === this.props.children.length-1
  },

  handleLinkClick(number){
    this.moveTo(number)
  },

  handleReset(){
    this.setState({
      allow: false,
      direction: 0,
      touchControl: false
    })
  },

  render() {
    return (
      <div>
        <ul className={styles.onepagePagination}>
          {_.map( _.times(this.props.children.length, Number), (i) => {
            return(
              <li>
                <a className={this.state.active === i ? styles.active : "" }
                   onClick={this.handleLinkClick.bind(this, i)}>
                </a>
              </li>
            )
          })}
        </ul>

        <Motion onRest={this.handleReset}
                style={{x: spring( -(this.state.active)*100 )}}>
          {({x}) =>
            <div className={styles.demo0}
                 onWheel={ this.handleOnWheel }
                 // onKeyDown={ this.handleKeyDown }
                 // onKeyPress={ this.handleKeyDown }
                 // onKeyUp={ this.handleKeyDown }
                 // onFocus={ this.handleKeyDown }
                 // onBlur={ this.handleKeyDown }
                 // onTouchCancel={ this.handleKeyDown }
                 // onTouchEnd={ this.handleKeyDown }
                 // onTouchMove={ this.handleKeyDown }
                 onTouchStart={ this.handleTouchStart }
                 onTouchMove={ this.handleTouchMove }
                 onTouchEnd={ this.handleTouchEnd }
                 style={{
                   WebkitTransform: `translate3d( 0, ${x}%, 0)`,
                   transform: `translate3d( 0, ${x}%, 0)`
                 }}>
                 {this.props.children}
            </div>
          }
        </Motion>
      </div>
    );
  },
});

export default ScrollContainer;
