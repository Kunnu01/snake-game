import {getRandomCoordinates} from '../../../libs/utils';
import { enlargeSnake, shortenSnake } from './Snake';

export function  generateFood(that) {
    const { snakeBlocks } = that.state;
    const snake = [...snakeBlocks];
    let food = getRandomCoordinates();
    snake.forEach(dot => {
      if(food[0] === dot[0] && food[1] === dot[1]) {
        food = getRandomCoordinates();
      }
    });
    return food;
}

export function checkIfEat(that) {
    const { snakeBlocks, food, bonusFood, score } = that.state;
    let head = snakeBlocks[snakeBlocks.length - 1];
    if (head[0] === bonusFood[0] && head[1] === bonusFood[1]) {
      that.setState({
        bonusFood: [-2, -2],
        score: score+3,
      });
      shortenSnake(that);
    }
    if (head[0] === food[0] && head[1] === food[1]) {
      that.setState({
        food: generateFood(that),
      });
      enlargeSnake(that);
    }
}