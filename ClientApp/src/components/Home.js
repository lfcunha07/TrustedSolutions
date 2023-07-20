import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Aplicação de adição e consulta de usuários Github</h1>
        <p>A aplicação é capaz de:</p>
        <ul>
          <li><p>Adicionar usuários ao banco por meio de chamadas à API do Github</p></li>
          <li><p>Disponibilizar os usuários ja existentes em uma tabela</p></li>
        </ul>
        <p>Detalhes de funcionamento:</p>
        <ul>
          <li><p>Para adicionar um usuário, basta adicioná-lo na página de Fila de Usuários.</p></li>
          <li><p>Quando o timer no topo da página zerar, os nomes da fila são adicionados em um documento de texto e posteriormente usados na chamada da API.</p></li>
          <li><p>Os nomes e seus respectivos IDs ficam disponíveis na tabela na página de Tabela de Usuários uma vez que forem encontrados.</p></li>
          <li><p>Para recarregar a página de lista ou tabela de usuários, basta clicar em outra tab e retornar.</p></li>
        </ul>
      </div>
    );
  }
}
