'use strict';
import logUpdate = require('log-update');
import { LifeAlgorithm } from './life-algorithm';

class RandomLifeAlgorithm implements LifeAlgorithm {
	isAlive(cell: boolean, neighboursCount: number): boolean {
		return Math.floor(Math.random() * (3 - 1)) + 1 === 1;
	}
}

export class ConwaysGoL {
	grid = [];

	constructor(
		private readonly height: number,
		private readonly width: number,
		private readonly lifeAlgorithm: LifeAlgorithm) {
		this.grid = this.initGrid();
		this.grid = this.update(new RandomLifeAlgorithm());
	}

	private update(algorithm: LifeAlgorithm): [][] {
		const newGrid = [];
		for (let rowIndex = 0; rowIndex < this.height; rowIndex += 1) {
			newGrid.push([]);
			for (let columnIndex = 0; columnIndex < this.width; columnIndex += 1) {
				newGrid[rowIndex][columnIndex] = algorithm.isAlive(
					this.grid[rowIndex][columnIndex],
					this.getNeighboursCount(rowIndex, columnIndex),
				);
			}
		}
		return newGrid;
	}

	public draw(): void {
		const drawing = this.grid.map(row => row.map(v => v ? '*' : ' ').join('')).join('\n');
		logUpdate(drawing);
	}

	public evolve(): void {
		this.grid = this.update(this.lifeAlgorithm);
	}

	private getNeighboursCount(row: number, column: number): number {
		function checkCell(row, column, grid) {
			return grid[row] && grid[row][column]
				? 1
				: 0;
		}

		const checkCells = [
			checkCell(row - 1, column - 1, this.grid),
			checkCell(row - 1, column, this.grid),
			checkCell(row - 1, column + 1, this.grid),

			checkCell(row, column - 1, this.grid),
			checkCell(row, column + 1, this.grid),

			checkCell(row + 1, column - 1, this.grid),
			checkCell(row + 1, column, this.grid),
			checkCell(row + 1, column + 1, this.grid),
		];

		return checkCells.reduce((prev, current) => prev + current, 0);
	}

	private initGrid(): [][] {
		const newGrid = [];
		for (let rowIndex = 0; rowIndex < this.height; rowIndex += 1) {
			newGrid.push([]);
			for (let columnIndex = 0; columnIndex < this.width; columnIndex += 1) {
				newGrid[rowIndex][columnIndex] = false;
			}
		}
		return newGrid;
	}
}
