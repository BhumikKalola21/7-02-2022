function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      myHealth: 100,
      monsterHealth: 100,
      latestRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBar() {
      if (this.myHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.myHealth + "%" };
    },
    SpecialAttack() {
      return this.latestRound % 3 !== 0;
    },
  },
  watch: {
    myHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.myHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.myHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.latestRound = 0;
      this.logMessages = [];
    },
    attackMonster() {
      this.latestRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.myHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttack() {
      this.latestRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healing() {
      this.latestRound++;
      const healValue = getRandomValue(8, 20);
      if (this.myHealth + healValue > 100) {
        this.myHealth = 100;
      } else {
        this.myHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
