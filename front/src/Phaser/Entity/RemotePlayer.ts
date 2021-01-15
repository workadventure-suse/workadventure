import {GameScene} from "../Game/GameScene";
import {PointInterface} from "../../Connexion/ConnexionModels";
import {Character} from "../Entity/Character";
import {Sprite} from "./Sprite";

export const selectedEvent = 'selected';

/**
 * Class representing the sprite of a remote player (a player that plays on another computer)
 */
export class RemotePlayer extends Character {
    userId: number;
    blocked: boolean = false;

    constructor(
        userId: number,
        Scene: GameScene,
        x: number,
        y: number,
        name: string,
        texturesPromise: Promise<string[]>,
        direction: string,
        moving: boolean
    ) {
        super(Scene, x, y, texturesPromise, name, direction, moving, 1);

        //set data
        this.userId = userId;
        
        this.playerName.setInteractive();
        this.playerName.on('pointerup', () => {
            this.toggleBlockStatus();
            this.emit(selectedEvent);
        });
    }
    
    toggleBlockStatus(): void {
        if (this.blocked) {
            this.blocked = false;
            this.playerName.setText(this.PlayerValue);
        } else {
            this.blocked = true;
            this.playerName.setText('Blocked'); //todo: red text instead?
        }
    }

    updatePosition(position: PointInterface): void {
        this.playAnimation(position.direction, position.moving);
        this.setX(position.x);
        this.setY(position.y);
        
        this.setDepth(position.y); //this is to make sure the perspective (player models closer the bottom of the screen will appear in front of models nearer the top of the screen).
    }
}
