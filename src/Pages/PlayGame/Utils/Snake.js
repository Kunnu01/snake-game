/* eslint-disable default-case */
import { generateFood } from './Food';
import { checkLevel } from './GameRules';
import { primaryKeys, secondaryKeys } from '../../../constants';

const incrementByValueOne = 1;

export function onKeyDown(e, that) {
  e = e || window.event;
  const { direction } = that.state;

  switch (e.keyCode) {
    case primaryKeys.UP:
      if (direction !== 'Down')
        that.setState({direction: 'Up'});
      break;
    case secondaryKeys.UP:
      if (direction !== 'Down')
        that.setState({direction: 'Up'});
      break;
    case primaryKeys.DOWN:
      if (direction !== 'Up')
        that.setState({direction: 'Down'});
      break;
    case secondaryKeys.DOWN:
      if (direction !== 'Up')
        that.setState({direction: 'Down'});
      break;
    case primaryKeys.LEFT:
      if (direction !== 'Right')
        that.setState({direction: 'Left'});
      break;
    case secondaryKeys.LEFT:
      if (direction !== 'Right')
        that.setState({direction: 'Left'});
      break;
    case primaryKeys.RIGHT:
      if (direction !== 'Left')
        that.setState({direction: 'Right'});
      break;
    case secondaryKeys.RIGHT:
      if (direction !== 'Left')
        that.setState({direction: 'Right'});
      break;
  }
}

export function moveSnake(that) {
    const { snakeBlocks, direction } = that.state;
    let dots = [...snakeBlocks];
    let head = dots[dots.length - 1];

    switch(direction) {
      case 'Right':
        head = [head[0]+2, head[1]];
        break;
      case 'Left':
        head = [head[0]-2, head[1]];
        break;
      case 'Down':
        head = [head[0], head[1]+2];
        break;
      case 'Up':
        head = [head[0], head[1]-2];
        break;
    }
    dots.push(head);
    dots.shift();
    that.setState({
      snakeBlocks: dots,
    })
  }

export function enlargeSnake(that) {
    const { snakeBlocks, score, speed } = that.state;
    let enlargedSnake = [...snakeBlocks];
    enlargedSnake.unshift([]);
    that.setState({
      snakeBlocks: [...enlargedSnake],
      speed: (speed>30 && score%2===0) ? speed-10 : speed,
      score: score+1,
      bonusFood: ((score+incrementByValueOne)>2 && (score+incrementByValueOne)%10===0) ? generateFood(that) : [-2, -2],
    }, () => checkLevel(that));
}

export function shortenSnake(that) {
    const { snakeBlocks } = that.state;

  for (let i = 0; i <= 2; i++) {
      snakeBlocks.shift();
  }
  that.setState({snakeBlocks});
}