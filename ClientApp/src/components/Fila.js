import React, { Component } from 'react';
import axios from 'axios';
import './Components.css';

export class Fila extends Component {
  static displayName = Fila.name;

  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0,
      userList: [],
      userInput: ''
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://localhost:7005/api/GithubInfo/GetUsers');
      const userList = response.data;
      this.setState({ userList });
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }

  async addUser() {
    try {
      if (this.state.userInput.trim() !== '') {
        this.setState((prevState) => ({
          currentCount: prevState.currentCount + 1,
          userList: [...prevState.userList, prevState.userInput],
          userInput: ''
        }));
      
        const userData = { 
          name: this.state.userInput 
        };
        await axios.post('https://localhost:7005/api/GithubInfo/SetUser', userData);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
  

  handleChange(event) {
    this.setState({ userInput: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Fila de Usuários</h1>

        <p>Uma lista de usuários, que será utilizada para adicionar usuários à nossa base.</p>

        <p>Usuários adicionados: <strong>{this.state.userList.length}</strong></p>

        <input
          className='input'
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
        />

        <button className="btn btn-primary" onClick={this.addUser}>Adicionar</button>

        <ul className="column-list">
          {this.state.userList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>

      </div>
    );
  }
}
