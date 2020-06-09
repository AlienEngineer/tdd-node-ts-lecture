'use strict';
import { FizzBuzz } from '../src';

describe('FizzBuzz', () => {

	describe('not multiple of 3 or 5', () => {
		[1, 2, 4, 7, 8, 11].forEach(value => {
			it('returns value ' + value, () => {
				const result = FizzBuzz.execute(value);

				expect(result).toEqual(value.toString());
			});
		});
	});

	describe('multiple of 3 returns Fizz', () => {
		[3, 6, 9, 12].forEach(value => {
			it('when value is ' + value, () => {
				const result = FizzBuzz.execute(value);

				expect(result).toEqual('Fizz');
			});
		});
	});

	describe('multiple of 5 returns Fizz', () => {
		[5, 10, 20].forEach(value => {
			it('when value is ' + value, () => {
				const result = FizzBuzz.execute(value);

				expect(result).toEqual('Buzz');
			});
		});
	});
	describe('multiple of 3 and 5 returns FizzBuzz', () => {
		[15, 30].forEach(value => {
			it('when value is ' + value, () => {
				const result = FizzBuzz.execute(value);

				expect(result).toEqual('FizzBuzz');
			});
		});
	});

});
