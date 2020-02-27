import React, { Component } from "react";

export default class Avataar extends Component {
  render() {
    const { seed } = this.props;
    return (
      <>
        <img
          src={`https://avatars.dicebear.com/v2/gridy/${seed}.svg`}
          alt={seed}
        />
      </>
    );
  }
}
