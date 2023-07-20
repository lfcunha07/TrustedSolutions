import axios from 'axios';
import React, { Component } from 'react';

export class Tabela extends Component {
  static displayName = Tabela.name;

  constructor(props) {
    super(props);
    this.state = {
      githubInfoList: [],
      filteredList: [],
      loading: true,
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.populateGithubInfo();
  }

  static renderGithubInfoTable(githubInfoList) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome de Usuário</th>
          </tr>
        </thead>
        <tbody>
          {githubInfoList.map((githubInfo) => (
            <tr key={githubInfo.id}>
              <td>{githubInfo.id}</td>
              <td>{githubInfo.login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, () => {
      this.filterGithubInfoList();
    });
  };

  filterGithubInfoList = () => {
    const { githubInfoList, searchQuery } = this.state;
    const filteredList = githubInfoList.filter(
      (githubInfo) =>
        githubInfo.id.toString().includes(searchQuery) ||
        githubInfo.login.includes(searchQuery)
    );
    this.setState({ filteredList });
  };

  render() {
    const { loading, filteredList } = this.state;

    let contents = loading ? <p><em>Loading...</em></p> : Tabela.renderGithubInfoTable(filteredList);

    return (
      <div>
        <h1 id="tableLabel">Tabela de Usuários</h1>
        <p>Abaixo, podemos ver os usuários já presentes no nosso banco de dados.</p>
        <input
          type="text"
          placeholder="Procurar por ID ou Usuário"
          onChange={this.handleSearchChange}
        />
        {contents}
      </div>
    );
  }

  async populateGithubInfo() {
    try {
      const response = await axios.get('https://localhost:7005/api/GithubInfo/GetInfo');
      console.log(response);
      this.setState({ githubInfoList: response.data, filteredList: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching GithubInfo:', error);
    }
  }
}
