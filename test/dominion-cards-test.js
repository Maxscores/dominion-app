const assert = require('chai').assert
import dominionCards from '../src/game-utilities/dominion'

describe('Dominion Cards', () => {
	let state = {
		supply: {
			'curse': 10
		},
		cardsGained:[],
		coins: 0,
		actions: 0,
		buys: 0,
		draw: ['card1', 'card2', 'card3', 'card4', 'card5'],
		discard: [],
		hand: [],
		actionQueue: [],
		attackQueue: {'1': [], '2': []},
		trash: [],
		currentPlayer: 1
	}

	context('Basic Cards', () => {
		context('estate', () => {
			it('returns expected', () => {
				let estate = dominonCards['estate']

				assert.equal('victory', estate.type)
				assert.equal(2, estate.cost)
			})
		})

		context('curse', () => {
			it('returns expected', () => {
				let curse = dominonCards['curse']

				assert.equal('curse', curse.type)
				assert.equal(0, curse.cost)
			})
		})

		context('duchy', () => {
			it('returns expected', () => {
				let duchy = dominonCards['duchy']

				assert.equal('victory', duchy.type)
				assert.equal(5, duchy.cost)
			})
		})

		context('province', () => {
			it('returns expected', () => {
				let province = dominonCards['province']

				assert.equal('victory', province.type)
				assert.equal(8, province.cost)
			})
		})

		context('copper', () => {
			it('returns expected', () => {
				let copper = dominonCards['copper']

				assert.equal('treasure', copper.type)
				assert.equal(0, copper.cost)
				assert.deepEqual({coins: 1}, copper.action(state))
			})
		})

		context('silver', () => {
			it('returns expected', () => {
				let silver = dominonCards['silver']

				assert.equal('treasure', silver.type)
				assert.equal(3, silver.cost)
				assert.deepEqual({coins: 2}, silver.action(state))
			})
		})

		context('gold', () => {
			it('returns expected', () => {
				let gold = dominonCards['gold']

				assert.equal('treasure', gold.type)
				assert.equal(6, gold.cost)
				assert.deepEqual({coins: 3}, gold.action(state))
			})
		})

	} )
	context('2nd Edition Base Set', () => {
		context('laboratory', () => {
			it('returns expected', () => {
				let laboratory = dominonCards['laboratory']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let expected = {
				  'actions': 1,
				  'discard': [],
				  'draw': [
				    'card3',
				    'card4',
				    'card5',
				  ],
				  'hand': [
				    'card1',
				    'card2'
				  ]
				}

				assert.equal('action', laboratory.type)
				assert.equal(5, laboratory.cost)
				assert.deepEqual(expected, laboratory.action(stateCopy))
			})
		})

		context('festival', () => {
			it('returns expected', () => {
				let festival = dominonCards['festival']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let expected = {
				  'actions': 2,
					'coins': 2,
					'buys': 1
				}

				assert.equal('action', festival.type)
				assert.equal(5, festival.cost)
				assert.deepEqual(expected, festival.action(stateCopy))
			})
		})

		context('smithy', () => {
			it('returns expected', () => {
				let smithy = dominonCards['smithy']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let expected = {
					'discard': [],
					'draw': [
						'card4',
						'card5'
					],
					'hand': [
						'card1',
						'card2',
						'card3'
					]
				}

				assert.equal('action', smithy.type)
				assert.equal(4, smithy.cost)
				assert.deepEqual(expected, smithy.action(stateCopy))
			})
		})

		context('village', () => {
			it('returns expected', () => {
				let village = dominonCards['village']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let expected = {
					'actions': 2,
					'discard': [],
					'draw': [
						'card2',
						'card3',
						'card4',
						'card5'
					],
					'hand': [
						'card1'
					]
				}

				assert.equal('action', village.type)
				assert.equal(3, village.cost)
				assert.deepEqual(expected, village.action(stateCopy))
			})
		})

		context('market', () => {
			it('returns expected', () => {
				let market = dominonCards['market']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let expected = {
					'actions': 1,
					'buys': 1,
					'coins': 1,
					'discard': [],
					'draw': [
						'card2',
						'card3',
						'card4',
						'card5'
					],
					'hand': [
						'card1'
					]
				}

				assert.equal('action', market.type)
				assert.equal(5, market.cost)
				assert.deepEqual(expected, market.action(stateCopy))
			})
		})

		context('vassal', () => {
			it('returns expected', () => {
				let vassal = dominonCards['vassal']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let expected = {
					'coins': 2,
					'actionQueue': [{card: 'vassal', revealedCard: 'card1'}]
				}

				assert.equal('action', vassal.type)
				assert.equal(3, vassal.cost)
				assert.deepEqual(expected, vassal.action(stateCopy))
			})
		})

		context('council_room', () => {
			it('returns expected', () => {
				let council_room = dominonCards['council_room']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let stateCopy2 = JSON.parse(JSON.stringify(state))
				let expected = {
					'buys': 1,
					'discard': [],
					'draw': [
						'card5'
					],
					'hand': [
						'card1',
						'card2',
						'card3',
						'card4',
					],
					'attackQueue': {'1': [], '2': ['council_room']}
				}
				let expectedAttack = {
					'discard': [],
					'draw': [
						'card2',
						'card3',
						'card4',
						'card5'
					],
					'hand': [
						'card1'
					]
				}

				assert.equal('action', council_room.type)
				assert.equal(5, council_room.cost)
				assert.deepEqual(expected, council_room.action(stateCopy))
				assert.deepEqual(expectedAttack, council_room.attack(stateCopy2))
			})
		})

		context('moneylender', () => {
			it('returns expected', () => {
				let moneylender = dominonCards['moneylender']
				let stateCopy = JSON.parse(JSON.stringify(state))
				stateCopy.hand = ['copper']
				let expected = {
					'hand': [],
					'coins': 3,
					'trash': ['copper']
				}

				assert.equal('action', moneylender.type)
				assert.equal(4, moneylender.cost)
				assert.deepEqual(expected, moneylender.action(stateCopy))
			})

			it('must have copper to gain gold', () => {
				let moneylender = dominonCards['moneylender']
				let stateCopy = JSON.parse(JSON.stringify(state))
				stateCopy.hand = []
				let expected = {}

				assert.deepEqual(expected, moneylender.action(stateCopy))
			})
		})

		context('chapel', () => {
			it('returns expected', () => {
				let chapel = dominonCards['chapel']
				let stateCopy = JSON.parse(JSON.stringify(state))
				stateCopy.hand = ['card1', 'card2', 'card3', 'card4']
				let expected = {
					'actionQueue': [
						{
							card: 'chapel',
							handCards: [
								{
				          "label": "card1",
				          "value": 0
				        },
				        {
				          "label": "card2",
				          "value": 1
				        },
				        {
				          "label": "card3",
				          "value": 2
				        },
				        {
				          "label": "card4",
				          "value": 3
				        }
							]
						}
					]
				}

				assert.equal('action', chapel.type)
				assert.equal(2, chapel.cost)
				assert.deepEqual(expected, chapel.action(stateCopy))
			})
		})

		context('witch', () => {
			it('returns expected', () => {
				let witch = dominonCards['witch']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let stateCopy2 = JSON.parse(JSON.stringify(state))
				let expected = {
					'discard': [],
					'draw': [
						'card3',
						'card4',
						'card5'
					],
					'hand': [
						'card1',
						'card2',
					],
					'attackQueue': {'1': [], '2': ['witch']}
				}

				let expectedAttack = {
					'supply': {
						'curse': 9
					},
					'cardsGained': ['curse'],
					'playarea': ['curse']
				}

				assert.deepEqual(['action', 'attack'], witch.type)
				assert.equal(5, witch.cost)
				assert.deepEqual(expected, witch.action(stateCopy))
				assert.deepEqual(expectedAttack, witch.attack(stateCopy2))
			})
		})

		context('moat', () => {
			it('returns expected', () => {
				let moat = dominonCards['moat']
				let stateCopy = JSON.parse(JSON.stringify(state))
				let stateCopy2 = JSON.parse(JSON.stringify(state))
				stateCopy2.attackQueue = {'1': ['militia', 'witch'], '2': []}
				let expected = {
					'discard': [],
					'draw': [
						'card3',
						'card4',
						'card5'
					],
					'hand': [
						'card1',
						'card2',
					]
				}
				let expectedAttack = {
					attackQueue: {'1': [], '2': []}
				}

				assert.deepEqual(['action', 'reaction'], moat.type)
				assert.equal(2, moat.cost)
				assert.deepEqual(expected, moat.action(stateCopy))
				assert.deepEqual(expectedAttack, moat.reaction(stateCopy2))
			})
		})

	})
})
