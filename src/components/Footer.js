import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3002/send", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === "success") {
          alert("Message Sent.");
          this.resetForm();
        } else if (response.status === "fail") {
          alert("Message failed to send.");
        }
      });
  }
  resetForm() {
    this.setState({ name: "", email: "", message: "" });
  }
  render() {
    return (
      <footer className="footer section" id="contact">
        <h1 className="contact__title">Contact</h1>
        <form
          className="form"
          onSubmit={this.handleSubmit.bind(this)}
          method="POST"
        >
          <div className="form-group">
            <input type="text" className="form-control" placeholder="name" />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="message"
              className="form-control"
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="send">
            submit
          </button>
        </form>
        <div id="social" className="social">
          Social
        </div>
      </footer>
    );
  }
}

export default Footer;
