import React, { Component } from "react";
import "./Header.css";

class Header extends Component {

    render() {
        return (
            <div>
                <header className="app-header">
                <span
            className="logo"
            style={this.props.profile === "true" ? { cursor: "pointer" } : null}
            onClick={this.props.profile === "true" ? this.logoHandler : null}
          >
            Image Viewer
          </span>
                </header>
                </div>
        )
    }
}
