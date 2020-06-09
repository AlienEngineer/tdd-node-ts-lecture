import { ConwaysGoL } from './index';
import { LifeAlgorithm } from './life-algorithm';


const game = new ConwaysGoL(10, 200, new LifeAlgorithm());

setInterval(() => {
	game.evolve();
	game.draw();
}, 100);
