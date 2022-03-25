import React, { Component } from 'react';

class ExampleContent extends Component {

  render() {
    return (
      <div className="row">
        <br></br>
        <h5>{this.props.data}</h5>
        
        <h5>{this.props.meaning}</h5>
      </div>
    )
  }
}

export default ExampleContent;