export class Controller {
    constructor(game, view) {
      this.game = game;
      this.view = view;
    }
  
    init(codeKey) {
      window.addEventListener("keydown", (event) => {
        if (event.code === codeKey) {
          this.view.init();
          this.start();
        }
      });
    }
  
    start() {
      this.view.showArea(this.game.viewArea);
      const showScore = this.view.createBlockScore();
      const showNextTetromino = this.view.createBlockNextTetromino();
      
      this.game.createUpdatePanels( showScore, showNextTetromino );
      
      const tick = () => {
        const time = (2200 - 200 * this.game.lvl);
        if (this.game.gameOver) return;
        setTimeout(() => {
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
          tick()
        }, time > 200 ? time : 200)
      };
      tick();


      setInterval(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
      }, 2000);
  
      window.addEventListener("keydown", (event) => {
        const key = event.code;
  
        switch (key) {
          case "ArrowLeft":
            this.game.moveLeft();
            this.view.showArea(this.game.viewArea);
            break;
          case "ArrowRight":
            this.game.moveRight();
            this.view.showArea(this.game.viewArea);
            break;
          case "ArrowDown":
            this.game.moveDown();
            this.view.showArea(this.game.viewArea);
            break;
          case "ArrowUp":
            this.game.rotateTetromino();
            this.view.showArea(this.game.viewArea);
            break;
        }
      });
    }
  }
  