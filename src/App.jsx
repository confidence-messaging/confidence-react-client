import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ethWallet from "ethereumjs-wallet";
import ChatList from "./components/ChatList";
import "./chat.css";
import nodes from "./defaultNodes.json";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      node: "",
      active: "asd",
      configOpen: true,
      publicKeys: ["asd"],
      messages: [],
      privateKey: null,
      publicKey: null
    };
  }

  addPublicKey() {}

  handlePublicKey() {}

  toggleConfig() {
    this.setState(prevstate => ({
      configOpen: !prevstate.configOpen
    }));
  }

  generateKeyPair() {
    const wallet = ethWallet.generate();
    this.setState({
      privateKey: wallet.getPrivateKeyString(),
      publicKey: wallet.getAddressString()
    });
  }

  async sync(){
    const { node, publicKey } = this.state;
    const { data } = await axios.get(`${node}/messages/${publicKey}`);
    console.log(data);
  }

  render() {
    const {
      privateKey,
      publicKey,
      publicKeys,
      active,
      configOpen
    } = this.state;
    return (
      <>
        <Modal isOpen={configOpen} toggle={() => this.toggleConfig()}>
          <ModalHeader toggle={() => this.toggleConfig()}>
            Configuration
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col">
                <label htmlFor="cars">Connected node</label>{" "}
                <select id="node" onChange={e => console.log(e.target.value)}>
                  {nodes.map(node => {
                    return <option value="node">{node}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input type="text" name="publicKey" defaultValue={publicKey} />{" "}
                <small>Public key</small>
                <hr />
                <input
                  type="text"
                  name="privateKey"
                  defaultValue={privateKey}
                />{" "}
                <small>Private key</small>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.generateKeyPair()}>
              New Keypair
            </Button>
            <Button color="primary" onClick={() => this.sync()}>
              Sync
            </Button>
            <Button color="danger" onClick={() => this.toggleConfig()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <span className="input-group-addon">
                      <button type="button" onClick={() => this.toggleConfig()}>
                        config
                      </button>
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                {publicKeys.map(key => {
                  return (
                    <ChatList
                      active={active === key ? true : false}
                      publicKey={key}
                      key={key}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                <div className="incoming_msg">
                  <div className="incoming_msg_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      <p>Test which is a new approach to have all solutions</p>
                      <span className="time_date"> 11:01 AM | June 9</span>
                    </div>
                  </div>
                </div>
                <div className="outgoing_msg">
                  <div className="sent_msg">
                    <p>Test which is a new approach to have all solutions</p>
                    <span className="time_date"> 11:01 AM | June 9</span>{" "}
                  </div>
                </div>
                <div className="incoming_msg">
                  <div className="incoming_msg_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      <p>Test, which is a new approach to have</p>
                      <span className="time_date"> 11:01 AM | Yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="outgoing_msg">
                  <div className="sent_msg">
                    <p>Apollo University, Delhi, India Test</p>
                    <span className="time_date"> 11:01 AM | Today</span>{" "}
                  </div>
                </div>
                <div className="incoming_msg">
                  <div className="incoming_msg_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      <p>
                        We work directly with our designers and suppliers, and
                        sell direct to you, which means quality, exclusive
                        products, at a price anyone can afford.
                      </p>
                      <span className="time_date"> 11:01 AM | Today</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                  />
                  <button className="msg_send_btn" type="button">
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
