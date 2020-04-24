/* eslint-disable */
const address = 'https://localhost:2000';
const socket = io(address);

Vue.component('cell', {
  props: [
    'item',
    'x',
    'y',
  ],

  methods: {
    makeStep(x, y) {
      axios.post(`${address}/makeStep`, { x, y })
        .then((response) => {
          this.$emit('update-response', response.data);
          socket.emit('make-step');
        })
        .catch((err) => {
          this.$emit('update-response', err.response.data);
        });
    },
  },

  template: `
  <div class="cell" @click="makeStep(x, y)">
    <div v-if="item == 1">x</div>
    <div v-if="item == 2">o</div>
  </div>
  `,
});

Vue.component('auth', {
  props: {
    username: '',
    password: '',
  },
  methods: {
    signIn(username, password) {
      axios.post(`${address}/signIn`, { username, password })
        .then((response) => {
          this.$emit('update-response', response.data);
        })
        .catch((err) => {
          this.$emit('update-response', err.response.data);
        });
    },
    logIn(username, password) {
      axios.post(`${address}/logIn`, { username, password })
        .then((response) => {
          this.$emit('update-response', `Hello, ${username}!`);
          socket.emit('user-logged-in');
        })
        .catch((err) => {
          this.$emit('update-response', err.response.data);
        });
    },
  },
  template: `  
  <div>
    <div class="horizontal">
      <label>Username:</label>
      <input placeholder="Username" @input="$emit('update-username', $event.target.value)">
    </div>
    <div class="horizontal">
    <label>Password:</label>
      <input placeholder="Password" @input="$emit('update-password', $event.target.value)" type="password">
    </div>
    <div class="horizontal">
      <button class="button" @click="signIn(username, password)">Sign In</button>
      <button class="button" @click="logIn(username, password)">Log In</button>
    </div>
  </div>    
  `,
});

Vue.component('game', {
  props: {
    gameUuid: String,
    activeGameUuid: String,
    player1Username: String,
    player2Username: String,
  },
  computed: {
    gameDescription() {
      if (this.player1Username == '' && this.player1Username == '') {
        return 'Empty';
      }
      if (this.player1Username == '') {
        return `Game with ${this.player2Username}`;
      }
      if (this.player2Username == '') {
        return `Game with ${this.player1Username}`;
      }

      return `${this.player1Username} plays with ${this.player2Username}`;
    },
  },
  methods: {
    connectToGame(gameUuid) {
      axios.post(`${address}/connectToGame`, { gameUuid })
        .then((response) => {
          this.$emit('update-game-uuid', gameUuid);
          this.$emit('update-response', response.data);
          socket.emit('connect-to-game');
        })
        .catch((err) => {
          this.$emit('update-response', err.response.data);
        });
    },
  },
  template: `
  <div>
    <label v-if="activeGameUuid != gameUuid" class="inactive-game-header">{{ gameDescription }}</label>
    <label v-if="activeGameUuid == gameUuid" class="active-game-header">(Active) {{ gameDescription }}</label>
    <button @click="connectToGame(gameUuid)" class="button">Connect</button>
  </div>
  `,
});

const app = new Vue({
  el: '#app',
  data: {
    field: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    username: String,
    password: String,
    games: Array,
    gameUuid: '',
    response: '',
  },

  methods: {
    setUsername(value) {
      this.username = value;
    },
    setPassword(value) {
      this.password = value;
    },
    setResponse(value) {
      this.response = value;
    },
    setGameUuid(value) {
      this.gameUuid = value;
    },
    createNewGame() {      
      axios
        .get(`${address}/createNewGame`)
        .then((response) => {
          this.response = 'Game successfully created!';
          socket.emit('create-new-game');
        })
        .catch((err) => {
          this.response = err.response.data;
        });
    },
  },

  mounted() {
    socket.on('games-list-updated', () => {
      axios
        .get(`${address}/getGames`)
        .then((response) => {
          this.games = response.data;
        })
        .catch((err) => {
          this.response = err.response.data;
        });
    });
    
    socket.on('get-game-status', () => {
      axios.post(`${address}/getGameStatus`, { gameUuid: this.gameUuid })
      .then((response) => {
        this.field = response.data;
      })
      .catch((err) => {
      //
      });
    });
  },
});
