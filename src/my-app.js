import { html, css, LitElement } from 'lit';

export class MyApp extends LitElement {

  static properties = {
    games: {},
    category: {}
  };
  static styles = css `

    li {
      list-style-type: none;
    }

    .card {
      align-items: center;
      background: #0a1a2e;
      color: white;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      padding-top: 1%;
      padding-right: 10%;
      padding-left: 10%;
    }
    .card div{
      box-shadow: 0px 1.5px 0px 0px rgba(138, 143, 197, 1);
      padding: 1% 0;
      transition: 0.3s;
    }
    .card p, h3 {
      margin-left: 3%;
    }
    .card div:hover {
      box-shadow: 0 8px 16px 8px rgba(201, 203, 232, 0);
      cursor: pointer;
    }

    .header {
      align-items: center;
      background: #0d213b;
      box-shadow: 0px 1.5px 0px 0px rgba(138, 143, 197, 1);
      color: white;
      display: flex;
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
      justify-content: space-between;
      padding-left: 2%;
      padding-right: 2%;
      margin-bottom: 1.6px;
    }
    .header input {
      width: 20rem;
    }

    .menu {
      display: flex;
      flex-direction: row;
      gap: 16%;
    }

  `
  constructor() {
    super();
    this.loaded = false;
  }

  render() {
    return html `
      <div class="header">
        <h1>Free to play games api 🎮</h1>
        <menu class="menu">
          <li>Categories</li>
          <li>Platform</li>
          <li>About</li>
        </menu>
        <input 
          @input=${this.searchCategory} 
          @keypress=${(evt) => {
            evt.code === 'Enter' && this.apiCall(this.category);
          }} 
          type="text"
          placeholder="Search game by category"
        >
      </div>
      <div class="card">
      ${
        this.loaded 
          ? this.games.map(idx => html `
            <div>
              <h3>${idx.title}</h3>
              <img src="${idx.thumbnail}"></img>
              <p>${idx.platform}</p>
            </div>
          `
          )
          : html `<button @click=${() => this.apiCall("mmorpg")}>Call the Api</button>`
      }
      </div>
    `
  }

  searchCategory(event) {

    const input = event.target;
    this.category = input.value;
    console.log(this.category);
  }


  async apiCall(category = "shooter") {

    const resp = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": "300088c818msh3c31c8bf58012bep12a7fejsnb4e9cb2c7bc4"
      }
    })

    this.games = await resp.json()
    console.log(this.games)
    this.loaded = true;
  }
}

customElements.define('main-element', MyApp);
