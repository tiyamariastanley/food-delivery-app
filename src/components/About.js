import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center">
        <h2>Tiya Maria Stanley</h2>
        <h4>{this.props.email}</h4>
      </div>
    );
  }
}

export default About;
