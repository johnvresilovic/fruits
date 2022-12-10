const React = require("react");

class Show extends React.Component {
  render() {
    return (
      <div>
        <h1>Fruits on display</h1>
        The {this.props.fruit.name} is {this.props.fruit.color}.
        {this.props.fruit.readyToEat
          ? ` It is ready to eat`
          : ` It is not ready to eat`}
        <nav>
          <a href='/fruits/'>Return to index</a>
        </nav>
      </div>
    );
  }
}
module.exports = Show;
