import React, { Component } from 'react';
import axios from 'axios';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Components.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      timer: 600,
    };

    // Start the timer
    this.timerInterval = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  updateTimer = async () => {
    try {
      // Set users info
      if (this.state.timer === 0) {
        await axios.get('https://localhost:7005/api/GithubInfo/SetInfo');
        this.setState({ timer: 600 });
      }
      // Decrease the timer by 1 second
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    } catch (error) {
      console.error('Error updating timer:', error);
    }
  };

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          container
          light
        >
          <NavbarBrand tag={Link} to="/">
            Trusted Solutions : {this.formatTime(this.state.timer)}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fila">
                  Fila
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/tabela">
                  Tabela
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
