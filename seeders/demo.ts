'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Suit',
      [
        { name: 'SPADES' },
        { name: 'CLUBS' },
        { name: 'DIAMONDS' },
        { name: 'HEARTS' },
      ],
      {},
    );
    const cards = [
      { value: 'ACE', inShortlist: true},
      { value: '2', inShortlist: false},
      { value: '3', inShortlist: false},
      { value: '4', inShortlist: false},
      { value: '5', inShortlist: false},
      { value: '6', inShortlist: false},
      { value: '7', inShortlist: true},
      { value: '8', inShortlist: true},
      { value: '9', inShortlist: true},
      { value: '10', inShortlist: true},
      { value: 'JACK', inShortlist: true},
      { value: 'QUEEN', inShortlist: true},
      { value: 'KING', inShortlist: true}
    ];
    const suitsLetter = ['S', 'C', 'D', 'H'];
    const spades = cards.map((card) => (
      {
      value: card.value,
      suitId: 1,
      code: `${card.value[0]}${suitsLetter[0]}`,
      inShortlist: card.inShortlist,
    }));
    const clubs =  cards.map((card) => (
      {
      value: card.value,
      suitId: 1,
      code: `${card.value[0]}${suitsLetter[1]}`,
      inShortlist: card.inShortlist,
    }));
    const diamonds =  cards.map((card) => (
      {
      value: card.value,
      suitId: 1,
      code: `${card.value[0]}${suitsLetter[2]}`,
      inShortlist: card.inShortlist,
    }));
    const hearts =  cards.map((card) => (
      {
      value: card.value,
      suitId: 1,
      code: `${card.value[0]}${suitsLetter[3]}`,
      inShortlist: card.inShortlist,
    }));
    await queryInterface.bulkInsert(
      'Card',
      [...spades, ...clubs, ...diamonds, ...hearts],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
