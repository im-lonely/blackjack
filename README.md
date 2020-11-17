# blackjack

### this repo contains some of the worst code i've ever written but it's the most fun and most useless.

### have fun playing my crappy blackjack

### Steps to make a `blackjack` command so you can play this by entering a command (OS X only):

### Open `.bash_profile` from the root (`~`), if it doesn't exist, use `touch .bash_profile` to create the file and then open it

Example using VSCode:
```
bash~2.3$ touch .bash_profile
bash~2.3$ code .bash_profile
```

### Set an alias that clones the repo, starts the game, and then deletes the repo after the game is finished

```sh
alias blackjack="git clone https://github.com/im-lonely/blackjack.git && node blackjack && rm -rf blackjack"
```

`git clone`      – Clone the repository
`node blackjack` – Run the js (we can just specify the folder)
`rm -rf`         – Delete the crappy code from your machine
`&&`             – Tells your machine to run these commands one after another

### Update your terminal thingy I don't know how this works

```
bash~2.3$ . .bash_profile
```

### Have fun

```
bash~2.3$ blackjack
```
