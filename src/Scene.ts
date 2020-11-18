class Scene {

    private ball: Ball;

    private canvas: HTMLCanvasElement;

    private playerPositionX: number;
    
    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;
        
        // Resize the canvas to full window size
        this.canvas.width = window.innerWidth - 1;
        this.canvas.height = window.innerHeight - 4; 
        
        // Transform the rendering context so that (0,0) is the lower left 
        // corner.
        const ctx = this.canvas.getContext('2d');
        ctx.transform(1, 0, 0, -1, 0, this.canvas.height);

        // Spawn a Ball
        this.ball = new Ball(this.canvas);
        
        // Set the player at the center
        this.playerPositionX = this.canvas.width / 2;
    }

    public render() {
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render the player
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.ellipse(this.playerPositionX, 50, 50, 50, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Render the ball
        this.ball.render(ctx);
    }

    /**
    * 
    * @param elapsed 
    */
    public update(elapsed: number): boolean {
        this.ball.applyPhysics(elapsed);

        this.ball.collideWithWalls(this.canvas);

        return this.ball.overlapWithPlayer(this.playerPositionX, 50, 50);
    }

}