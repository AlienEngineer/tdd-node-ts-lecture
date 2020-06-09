'use strict';

// Write a program that prints the numbers from 1 to 100.
// But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”.
// For numbers which are multiples of both three and five print “FizzBuzz”."
export class FizzBuzz {
	public static execute(value: number): string {
		let result = '';

		if (value % 3 == 0) result += 'Fizz';
		if (value % 5 == 0) result += 'Buzz';

		return result !== ''
			? result
			: value.toString();
	}
}
