import React, { Component } from "react";
import Avataar from "./Avataar";

export default class ChatList extends Component {
  render() {
    const { publicKey, active } = this.props;
    return (
      <>
        <div className={`chat_list ${active ? "active_chat" : ""}`}>
          <div className="chat_people">
            <div className="chat_img">
              <Avataar seed={publicKey} />
            </div>
            <div className="chat_ib">
              <h5>
                {publicKey} <span className="chat_date">Dec 25</span>
              </h5>
              <p>
                Test, which is a new approach to have all solutions astrology
                under one roof.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
