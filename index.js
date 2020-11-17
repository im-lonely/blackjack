console.clear();

require("colors");

const readline = require("readline");

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function game() {
  const suits = ["spades", "hearts", "clubs", "diamonds"];

  const royalty = ["jack", "queen", "king"];

  const cards = [];

  const player = [];

  const dealer = [];

  function setup() {
    cards.length = 0;

    for (const suit of suits) {
      for (let i = 1; i < 14; i++) {
        cards.push({
          value: i > 10 ? 10 : i,
          suit,
          name: `${[1, 8].includes(i) ? "an" : "a"} ${
            i === 1 ? "ace" : royalty[i > 10 ? (i % 10) - 1 : undefined] || i
          } of ${suit}`,
        });
      }
    }

    shuffle(cards);

    dealCards();
  }

  function dealCards() {
    player.length = 0;
    dealer.length = 0;
    player.splice(0, -1, ...cards.splice(0, 2));
    dealer.splice(0, -1, ...cards.splice(0, 2));
  }

  function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const cur = array[i];
      const rnd = Math.floor(Math.random() * array.length);
      const tmp = array[rnd];
      array[rnd] = cur;
      array[i] = tmp;
    }

    return array;
  }

  function handToString(hand) {
    let a = hand.map((card) => card.name);
    return [a.slice(0, -1).join(", "), a.pop()]
      .filter((w) => w !== "")
      .join(" and ");
  }

  function play(choice) {
    if (restart()) return;

    if (choice === "hit") {
      const card = cards.splice(0, 1)[0];
      player.splice(0, -1, card);
      if (player.reduce((a, b) => a + b.value, 0) > 21) {
        console.clear();
        console.log(
          `
    You drew ${card.name}.

    You bust! Dealing cards again
          `.red
        );
        dealCards();
        gameOver = false;
        return setTimeout(play, 1000);
      }
    }

    if (choice === "stand") {
      while (dealer.reduce((a, b) => a + b.value, 0) < 17) {
        if (restart()) return;
        dealer.splice(0, -1, ...cards.splice(0, 1));
      }
      if (dealer.reduce((a, b) => a + b.value, 0) > 21) {
        console.clear();
        console.log(
          `
    Dealer busts! You win!
          
    Starting next round...
          `.green
        );
        dealCards();
        return setTimeout(play, 1000);
      }

      if (player.reduce((a, b) => a + b.value, 0) > 21) {
        console.clear();
        console.log(
          `
    You bust! Dealing cards again
          `.red
        );
        dealCards();
        gameOver = false;
        return setTimeout(play, 1000);
      }

      if (
        dealer.reduce((a, b) => a + b.value, 0) <
          player.reduce((a, b) => a + b.value, 0) ||
        dealer.reduce((a, b) => a + b.value, 0) <
          player.reduce((a, b) => a + b.value, 0) +
            (player.some((card) => card.name.split(" ")[0] === "ace") ? 10 : 0)
      ) {
        console.clear();
        console.log(
          `
    You win!
            
    Dealer : ${dealer.reduce((a, b) => a + b.value, 0)}
    You    : ${player.reduce((a, b) => a + b.value, 0)}`.green
        );
        console.log(
          `
    Starting next round...
      `.yellow
        );
        dealCards();
        return setTimeout(play, 1000);
      } else {
        console.clear();
        console.log(
          `
    You lose!
            
    Dealer : ${dealer.reduce((a, b) => a + b.value, 0)}
    You    : ${player.reduce((a, b) => a + b.value, 0)}`.red
        );
        console.log(
          `
    Starting next round...
      `.yellow
        );
        dealCards();
        return setTimeout(play, 1000);
      }
    }

    console.clear();
    console.log("\n");
    console.log(`    Dealer has ${dealer[0].name}.`.green);
    console.log(`    You have ${handToString(player)}.`.green);

    io.question(
      `
    Hit or stand? (h/s)
    `.yellow,
      (answer) => {
        if (answer.startsWith("h")) {
          play("hit");
        } else if (answer.startsWith("s")) {
          play("stand");
        } else {
          console.log(`    Exiting game...`);
          process.exit(0);
        }
      }
    );
  }

  function restart() {
    if (cards.length === 0) {
      console.log(
        `
      No cards left!`.cyan
      );
      console.log(
        `
      Restarting the game...
      `.red
      );
      setTimeout(game, 1000);
      return true;
    }
  }

  setup();

  play();
}

console.log(
  `
    ██████╗ ██╗      █████╗  ██████╗██╗  ██╗     ██╗ █████╗  ██████╗██╗  ██╗
    ██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝     ██║██╔══██╗██╔════╝██║ ██╔╝
    ██████╔╝██║     ███████║██║     █████╔╝      ██║███████║██║     █████╔╝ 
    ██╔══██╗██║     ██╔══██║██║     ██╔═██╗ ██   ██║██╔══██║██║     ██╔═██╗ 
    ██████╔╝███████╗██║  ██║╚██████╗██║  ██╗╚█████╔╝██║  ██║╚██████╗██║  ██╗
    ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`
);

setTimeout(game, 1000);
