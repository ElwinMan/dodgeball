class Ball {
    private ballRadius: number;
    private ballPositionX: number;
    private ballPositionY: number;
    private ballSpeedX: number;
    private ballSpeedY: number;

    public constructor(canvas: HTMLCanvasElement) {
        // Spawn a Ball
        this.ballRadius = 25 + 25 * Math.random();
        this.ballSpeedX = -5 + 10 * Math.random();
        this.ballSpeedY = 0;
        this.ballPositionX = this.ballRadius +
            (canvas.width - 2 * this.ballRadius) * Math.random();
        this.ballPositionY = canvas.height * 0.8 + canvas.height * 0.2 * Math.random();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        // reverse height, so the ball falls down
        ctx.ellipse(this.ballPositionX, this.ballPositionY, this.ballRadius,
            this.ballRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    applyPhysics(elapsed: number) {
        this.ballSpeedY -= Game.GRAVITY * elapsed;
        // Calculate new X and Y parts of the position 
        // Formula: S = v*t
        // Calculate the new position of the ball
        // Some physics here: the y-portion of the speed changes due to gravity
        // Formula: Vt = V0 + gt
        // 9.8 is the gravitational constant and time=1
        this.ballPositionX += this.ballSpeedX * elapsed;
        // Formula: S=v0*t + 0.5*g*t^2
        this.ballPositionY += this.ballSpeedY * elapsed + 0.5 * Game.GRAVITY * elapsed * elapsed;
    }

    collideWithWalls(canvas: HTMLCanvasElement) {
        // Collision detection: check if the ball hits the walls and let it bounce
        // Left wall
        this.ballPositionX >= canvas.width - this.ballRadius;
        if (this.ballPositionX <= this.ballRadius && this.ballSpeedX < 0) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        // Right wall
        if (this.ballPositionX >= canvas.width - this.ballRadius
            && this.ballSpeedX > 0) {
            this.ballSpeedX = -this.ballSpeedX;
        }

        // Bottom only (ball will always come down)
        if (this.ballPositionY <= this.ballRadius && this.ballSpeedY < 0) {
            this.ballSpeedY = -this.ballSpeedY;
        }
    }

    overlapWithPlayer(playerPositionX: number, playerPositionY: number, playerRadius: number) :boolean {
        //  if the ball collides with the player. It's game over then
        const distX = playerPositionX - this.ballPositionX;
        const distY = playerPositionY - this.ballPositionY;
        // Calculate the distance between ball and player using Pythagoras'
        // theorem
        const distance = Math.sqrt(distX * distX + distY * distY);
        // Collides is distance <= sum of radii of both circles
        return distance <= (this.ballRadius + playerRadius);
    }
}