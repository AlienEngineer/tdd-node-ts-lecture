'use strict';
import { ConwaysGoL } from '../src';
import { LifeAlgorithm } from './life-algorithm';

describe('Conways Life Algorithm', () => {

	describe('a live cell with less than 2 neighbours dies', () => {
		[0, 1].forEach(value => {
			it(value + ' neighbours', () => {
				const algorithm = new LifeAlgorithm();

				const isAlive = algorithm.isAlive(true, value);

				expect(isAlive).toBeFalsy();
			});
		});
	});
	describe('a live cell with 2 or 3 neighbours lives', () => {
		[2, 3].forEach(value => {
			it(value + ' neighbours', () => {
				const algorithm = new LifeAlgorithm();

				const isAlive = algorithm.isAlive(true, value);

				expect(isAlive).toBeTruthy();
			});
		});
	});
	describe('a live cell with more than 3 neighbours dies ', () => {
		[4, 5, 6, 7, 8].forEach(value => {
			it(value + ' neighbours', () => {
				const algorithm = new LifeAlgorithm();

				const isAlive = algorithm.isAlive(true, value);

				expect(isAlive).toBeFalsy();
			});
		});
	});

	it('a dead cell with 3 neighbours lives', () => {
		const algorithm = new LifeAlgorithm();

		const isAlive = algorithm.isAlive(false, 3);

		expect(isAlive).toBeTruthy();
	});

	describe('a dead cell neighbours different than 3 stays dead', () => {
		[0, 1, 2, 4, 5, 6, 7, 8].forEach(value => {
			it(value + ' neighbours', () => {
				const algorithm = new LifeAlgorithm();

				const isAlive = algorithm.isAlive(false, value);

				expect(isAlive).toBeFalsy();
			});
		});
	});
});
