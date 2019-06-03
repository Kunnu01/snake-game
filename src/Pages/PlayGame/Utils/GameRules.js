export function checkIfOutOfBorders(that) {
    const { snakeBlocks, direction, classic, gameOver } = that.state;
    let dots = [...snakeBlocks];
    let head = dots[dots.length - 1];

    // let head = snakeBlocks[snakeBlocks.length-1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      if (!classic) {
        if (!gameOver) {
          that.setState({
            gameOver: true,
          });
        }
        return;
      }

      if (direction === 'Right') {
        head = [head[0]-100, head[1]];
      } else if (direction === 'Left') {
        head = [head[0]+100, head[1]];
      } else if (direction === 'Down') {
        head = [head[0], head[1]-100];
      } else if (direction === 'Up') {
        head = [head[0], head[1]+100];
      }

      dots.push(head);
      dots.shift();
      that.setState({
        snakeBlocks: dots,
      })
    }
}

export function checkIfCollapsed(that) {
    const { snakeBlocks, gameOver } = that.state;
    let snake = [...snakeBlocks];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        // that.onGameOver();
        if(!gameOver)
        that.setState({
          gameOver: true,
        })
      }
    })
}

export function checkHighScore(that) {
    const { score, classicHighestScore, arcadeHighestScore, classic } = that.state;
    if (classic) {
      if (score > classicHighestScore) {
        that.setState({
          classicHighestScore: score,
        })
      }
    }

    if (!classic) {
      if (score > arcadeHighestScore) {
        that.setState({
          arcadeHighestScore: score,
        })
      }
    }
}

export function checkLevel(that) {
    const { score } = that.state;

    if (score >= 20) {
      that.setState({level: 'Veteran'})
    } else if (score >= 15) {
      that.setState({level: 'Expert'})
    } else if (score >= 10) {
      that.setState({level: 'Amateur'})
    } else if (score >= 5) {
      that.setState({level: 'Beginner'})
    }
  }