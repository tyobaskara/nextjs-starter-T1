import React, { PureComponent } from 'react'

class Home extends PureComponent {
  render() {
    return (
      <section>
        <div className="container">
          <h1>Home</h1>
          <button onClick={this.props.showModal} className="btn btn-info">Show Modal</button>
        </div>
      </section>
    )
  }
}

export default Home;
