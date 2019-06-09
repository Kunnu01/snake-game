export function checkIfOutOfBorders(that) {
    const { snakeBlocks, classic, gameOver } = that.state;
    let dots = [...snakeBlocks];
    let head = dots[dots.length - 1];

    if (!classic) {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        if (!gameOver) {
          that.setState({
            gameOver: true,
          });
        }
        return;
      }
    }
}

export function classic(that) {
  let flag = 0;
  const { snakeBlocks, direction, classic } = that.state;
  let dots = [...snakeBlocks];
  let head = dots[dots.length - 1];
  if (classic) {
    if (direction === 'Right' && head[0] >= 98) {
      head = [0, head[1]];
      flag = 1;
    } else if (direction === 'Left' && head[0] <= 0) {
      head = [98, head[1]];
      flag = 1;
    } else if (direction === 'Down' && head[1] >= 98) {
       head = [head[0], 0];
       flag = 1;
    } else if (direction === 'Up' && head[1] <= 0) {
       head = [head[0], 98];
       flag = 1;
    }
    dots.push(head);
    dots.shift();

    if (flag) {
      that.setState({
        snakeBlocks: dots,
      })
    }
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