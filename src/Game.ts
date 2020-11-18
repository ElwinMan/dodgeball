class Game {

    public static readonly GRAVITY: number = 0.0098;

    private scene: Scene;

    private canvas: HTMLCanvasElement;

    private previous: number;

    public constructor(canvas: HTMLElement) {
        this.scene = new Scene(canvas);
        this.canvas = <HTMLCanvasElement>canvas;
        
        // Start the animation
        console.log('start animation');
        this.previous = performance.now();
        requestAnimationFrame(this.step);
    }


    /**
     * This MUST be an arrow method in order to keep the `this` variable 
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = (timestamp: number) => {
        // Timedifference (t) in ms between previous and now
        const elapsed = timestamp - this.previous;
        this.previous = timestamp;

        const gameover = this.scene.update(elapsed);

        // Render the items on the canvas
        // Get the canvas rendering context
        this.scene.render();

        // Call this method again on the next animation frame
        // A quick-and-dirty game over situation: just stop animating :/
        // The user must hit F5 to reload the game
        if (!gameover) {
            requestAnimationFrame(this.step);
        }
    }
}