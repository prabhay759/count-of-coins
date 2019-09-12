'use strict';

/**
 * This function accepts array of coins (change) and note (target) and
 * returns all possible combinations to make the change for a given note.
 * @param {Array} coins Array of coins. [4, 5, 6]
 * @param {Number} note Note amount for the change i,e. 100
 * @returns {Array<Object>} Returns array of object of each coins counts to make the note on successful match.
 */
function make_change(coins, note) {
  // Generating wallets from the coins.
  // input coins[9, 6] > wallets[[9], [6]]
  let wallets = coins.map(coin => [coin]);
  let new_wallets = [];
  const collected = [];

  // Iterating over length of wallets for all possible combinations.
  while (wallets.length > 0) {
    for (let index = 0; index < wallets.length; index++) {
      const wallet = wallets[index];
      const sum = wallet.reduce((total, num) => {
        return total + num;
      }, 0);

      for (let index = 0; index < coins.length; index++) {
        const coin = coins[index];
        if (coin >= wallet[wallet.length - 1]) {
          if (sum + coin < note) {
            new_wallets.push(wallet.concat([coin]));
          } else if (sum + coin === note) {
            const res = {};
            
            wallet.concat([coin]).map(element => {
              if (!res[element])
                res[element] = 1;
              else
                res[element] = res[element] + 1;
            });

            collected.push(res);
          }
        }
      }
    }

    wallets = new_wallets;
    new_wallets = [];
  }

  return collected;
}


/* 
To run the tests
make_change([10, 6, 5], 20);
make_change([9, 6, 5], 25);
*/

