namespace SpriteKind {
    export const Wizard_Laser = SpriteKind.create()
    export const Snake = SpriteKind.create()
    export const Wizard_Explosion = SpriteKind.create()
    export const Rammer_Football = SpriteKind.create()
    export const Princess_Heart = SpriteKind.create()
    export const Princess_Star = SpriteKind.create()
    export const Visual = SpriteKind.create()
}
namespace MultiplayerState {
    export const A_Energy_Requirement = MultiplayerState.create()
    export const B_Energy_Requirement = MultiplayerState.create()
    export const Class = MultiplayerState.create()
    export const Energy = MultiplayerState.create()
    export const Player_Attacking = MultiplayerState.create()
    export const Direction = MultiplayerState.create()
}
statusbars.onStatusReached(StatusBarKind.EnemyHealth, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Fixed, 0, function (status) {
    sprites.destroy(status.spriteAttachedTo())
    info.changeScoreBy(1)
})
function SpawnSnake () {
    Snake2 = sprites.create(assets.image`Snake`, SpriteKind.Enemy)
    tiles.placeOnTile(Snake2, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Snake2)
    Enemy_Health.setColor(7, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 10
    Snake2.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    Snake2,
    assets.animation`Snake Animation`,
    100,
    true
    )
    Snake2.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Average_Speed)
}
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 0) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
            game.splash("Slow but incredibly powerful and tanky. A button shoots a laser which becomes faster the longer its been out. B button causes an explosion at the edge of the screen which can damage multiple enemies. Not recommended for beginners.")
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            game.splash("The jack of all trades. Medium speed and health makes this great for beginners. A button slashes with a sword dealing medium damage and can pierce through multiple enemies. B button blocks with a shield making you invincible and costing no energy, though keep in mind you cannot move or attack while blocking otherwise you will cancel it.")
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
            game.splash("Fast and powerful, but very frail. A button tackles enemies with a roll, and even makes you invincible for a short time during the tackle. B button throws a football to enemies which stun, however the football deals low damage so use this more as a support move than an offensive move. Not recommended for beginners.")
        } else {
        	
        }
    } else if (Start_Battle == 1) {
        sprites.destroy(Buttons)
        if (Energ.value >= mp.getPlayerState(player2, MultiplayerState.B_Energy_Requirement)) {
            Player_Attacking = 2
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                Energ.value += 0 - mp.getPlayerState(player2, MultiplayerState.B_Energy_Requirement)
                Player_Attacking = 0
                Explosion = sprites.create(assets.image`Explosion Image`, SpriteKind.Wizard_Explosion)
                Explosion.scale = 2
                animation.runImageAnimation(
                Explosion,
                assets.animation`Explosion Animation`,
                200,
                false
                )
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                    Explosion.x = mp.getPlayerSprite(player2).x + -16
                    Explosion.y = mp.getPlayerSprite(player2).y + -52
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    Explosion.x = mp.getPlayerSprite(player2).x + 56
                    Explosion.y = mp.getPlayerSprite(player2).y + -15
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                    Explosion.x = mp.getPlayerSprite(player2).x + -16
                    Explosion.y = mp.getPlayerSprite(player2).y + 36
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    Explosion.x = mp.getPlayerSprite(player2).x + -72
                    Explosion.y = mp.getPlayerSprite(player2).y + -15
                } else {
                	
                }
                pause(1000)
                sprites.destroy(Explosion)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Forward Shield Animation`,
                    100,
                    false
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Shield Right Animation`,
                    100,
                    false
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Shield Animation`,
                    100,
                    false
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Shield Left Animation`,
                    100,
                    false
                    )
                } else {
                    pause(100)
                    pauseUntil(() => controller.anyButton.isPressed())
                    Player_Attacking = 0
                    mp.moveWithButtons(player2, 100, 100)
                }
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                Energ.value += 0 - mp.getPlayerState(player2, MultiplayerState.B_Energy_Requirement)
                Player_Attacking = 0
                Football = sprites.create(assets.image`Football Image`, SpriteKind.Rammer_Football)
                Football.x = mp.getPlayerSprite(player2).x
                Football.y = mp.getPlayerSprite(player2).y
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                    Football.vy = -150
                    animation.runImageAnimation(
                    Football,
                    assets.animation`Football Up Animation`,
                    100,
                    true
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    Football.vx = 150
                    animation.runImageAnimation(
                    Football,
                    assets.animation`Football Animation`,
                    100,
                    true
                    )
                    pause(400)
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Rammer Right Animation`,
                    100,
                    true
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                    Football.vy = 150
                    animation.runImageAnimation(
                    Football,
                    assets.animation`Football Down Animation`,
                    100,
                    true
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    Football.vx = -150
                    animation.runImageAnimation(
                    Football,
                    assets.animation`Football Left Animation`,
                    100,
                    true
                    )
                    pause(400)
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Rammer Left Animation`,
                    100,
                    true
                    )
                } else {
                	
                }
                pause(5000)
                sprites.destroy(Football)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                Star = sprites.createProjectileFromSprite(assets.image`Star Image`, mp.getPlayerSprite(player2), 0, 0)
                Star.setKind(SpriteKind.Princess_Star)
                animation.runImageAnimation(
                Star,
                assets.animation`Star Waiting Animation`,
                200,
                true
                )
                Star.setFlag(SpriteFlag.DestroyOnWall, false)
            } else {
            	
            }
        }
    } else {
    	
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Rammer_Football, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -2
    sprites.destroy(Football)
    sprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 0)
    sprite.startEffect(effects.bubbles)
    Energ.value += 25
    pause(1000)
    sprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 5)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Princess_Star, function (sprite, otherSprite) {
    animation.runImageAnimation(
    otherSprite,
    assets.animation`Star Hit Animation`,
    200,
    false
    )
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -25
    for (let index = 0; index <= 7; index++) {
        Star.scale += 0.5
        pause(100)
    }
    sprites.destroy(otherSprite)
    Energ.value += 10
})
function SpawnEvilPrincess () {
    Evil_Princess = sprites.create(assets.image`Evil Princess Image`, SpriteKind.Enemy)
    Evil_Princess.setPosition(randint(0, 160), randint(0, 120))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Evil_Princess)
    Enemy_Health.setColor(6, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 100
    Evil_Princess.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    Evil_Princess,
    assets.animation`Evil Princess Animation`,
    100,
    true
    )
    Evil_Princess.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 0) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
            sprites.destroy(Wizard)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Knight = sprites.create(assets.image`Knight Picture`, SpriteKind.Visual)
            Knight.sayText("Knight")
            Knight.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Knight,
            assets.animation`Knight Animation`,
            200,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            sprites.destroy(Knight)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Rammer = sprites.create(assets.image`Rammer Picture`, SpriteKind.Visual)
            Rammer.sayText("Rammer")
            Rammer.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Rammer,
            assets.animation`Rammer Right Animation`,
            100,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
            sprites.destroy(Rammer)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Princess = sprites.create(assets.image`Princess Image`, SpriteKind.Visual)
            Princess.sayText("Princess")
            Princess.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Princess,
            assets.animation`Princess Animation`,
            200,
            true
            )
        } else if (false) {
        	
        } else {
        	
        }
    } else if (Start_Battle == 1) {
        mp.setPlayerState(player2, MultiplayerState.Direction, 2)
        if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Wizard Right Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            if (!(Player_Attacking == 2)) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Knight Right Animation`,
                200,
                true
                )
            }
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Rammer Right Animation`,
            100,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Princess Right Animation`,
            200,
            true
            )
        } else {
        	
        }
    }
})
function SpawnSkull () {
    Skull = sprites.create(assets.image`Skull Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Skull, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Skull)
    Enemy_Health.setColor(1, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 20
    Skull.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    Skull,
    assets.animation`Skull Animation`,
    100,
    true
    )
    Skull.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Below_Average_Speed)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    info.changeLifeBy(-1)
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 0) {
        Start_Battle = 1
    } else if (Start_Battle == 1) {
        mp.setPlayerState(player2, MultiplayerState.Direction, 3)
        sprites.destroy(Buttons)
        if (Energ.value >= mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)) {
            Player_Attacking = 1
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                Energ.value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                Player_Attacking = 0
                Laser = sprites.create(assets.image`Laser Image`, SpriteKind.Wizard_Laser)
                Laser.x = mp.getPlayerSprite(player2).x
                Laser.y = mp.getPlayerSprite(player2).y
                Laser.startEffect(effects.fire)
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                    animation.runImageAnimation(
                    Laser,
                    assets.animation`Laser Up Animation`,
                    100,
                    false
                    )
                    Laser.ay = -200
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    animation.runImageAnimation(
                    Laser,
                    assets.animation`Laser Animation`,
                    100,
                    false
                    )
                    Laser.ax = 200
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                    animation.runImageAnimation(
                    Laser,
                    assets.animation`Laser Down Animation`,
                    100,
                    false
                    )
                    Laser.ay = 200
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    animation.runImageAnimation(
                    Laser,
                    assets.animation`Laser Left Animation`,
                    100,
                    false
                    )
                    Laser.ax = -200
                } else {
                	
                }
                Laser.setFlag(SpriteFlag.DestroyOnWall, true)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                Energ.value += mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement) / -1
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Swing Up Animation`,
                    100,
                    false
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Swing Right Animation`,
                    100,
                    false
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Swing Animation`,
                    100,
                    false
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Knight Swing Left Animation`,
                    100,
                    false
                    )
                } else {
                	
                }
                pause(1000)
                Player_Attacking = 0
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                Energ.value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Rammer Attack Right Animation`,
                    100,
                    false
                    )
                    pause(500)
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Rammer Right Animation`,
                    100,
                    true
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Rammer Attack Left Animation`,
                    100,
                    false
                    )
                    pause(500)
                    animation.runImageAnimation(
                    mp.getPlayerSprite(player2),
                    assets.animation`Rammer Left Animation`,
                    200,
                    true
                    )
                } else {
                	
                }
                pause(500)
                Player_Attacking = 0
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                Player_Attacking = 0
                if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                    for (let index = 0; index <= 4; index++) {
                        Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, mp.getPlayerSprite(player2), 25 * index + -50, -50)
                        Heart.setKind(SpriteKind.Princess_Heart)
                        animation.runImageAnimation(
                        Heart,
                        assets.animation`Heart Animation`,
                        200,
                        false
                        )
                    }
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                    for (let index = 0; index <= 4; index++) {
                        Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, mp.getPlayerSprite(player2), 50, 25 * index + -50)
                        Heart.setKind(SpriteKind.Princess_Heart)
                        animation.runImageAnimation(
                        Heart,
                        assets.animation`Heart Animation`,
                        200,
                        false
                        )
                    }
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                    for (let index = 0; index <= 4; index++) {
                        Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, mp.getPlayerSprite(player2), 25 * index + -50, 50)
                        Heart.setKind(SpriteKind.Princess_Heart)
                        animation.runImageAnimation(
                        Heart,
                        assets.animation`Heart Animation`,
                        200,
                        false
                        )
                    }
                } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                    for (let index = 0; index <= 4; index++) {
                        Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, mp.getPlayerSprite(player2), -50, 25 * index + -50)
                        Heart.setKind(SpriteKind.Princess_Heart)
                        animation.runImageAnimation(
                        Heart,
                        assets.animation`Heart Animation`,
                        200,
                        false
                        )
                    }
                    Heart.setFlag(SpriteFlag.DestroyOnWall, true)
                } else {
                	
                }
            } else if (false) {
            	
            } else {
            	
            }
        }
    } else {
    	
    }
})
function SpawnMiniDino () {
    Mini_Dino = sprites.create(assets.image`Mini Dino Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Mini_Dino, tiles.getTileLocation(randint(4, 12), randint(52, 55)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Mini_Dino)
    Enemy_Health.setColor(5, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 50
    animation.runImageAnimation(
    Mini_Dino,
    assets.animation`Mini Dino Animation`,
    200,
    true
    )
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairWest, function (sprite, location) {
    if (Level == 2) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 1`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index <= 10; index++) {
            SpawnBat()
        }
    } else if (Level == 3) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 2`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index <= 10; index++) {
            SpawnSnake()
        }
    } else if (Level == 4) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 3`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index <= 10; index++) {
            SpawnSkull()
        }
    } else {
    	
    }
    sprite.setPosition(40, 60)
    Level += -1
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Princess_Heart, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -25
    sprites.destroy(otherSprite)
    if (info.life() <= 90) {
        info.changeLifeBy(10)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles10, function (sprite, location) {
    if (Level == 1) {
        tiles.setCurrentTilemap(tilemap`Forest Cave`)
        scene.setBackgroundColor(15)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        Level += 1
        tiles.placeOnTile(sprite, tiles.getTileLocation(7, 14))
        SpawnBigDino()
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    if (status.spriteAttachedTo() == Evil_Princess) {
        game.gameOver(true)
    } else if (status.spriteAttachedTo() == Big_Dino) {
        game.gameOver(true)
    } else {
    	
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Wizard_Laser, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -50
    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    pause(100)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairEast, function (sprite, location) {
    if (Level == 1) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 2`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index <= 10; index++) {
            SpawnSnake()
        }
    } else if (Level == 2) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 3`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index <= 10; index++) {
            SpawnSkull()
        }
    } else if (Level == 3) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 4`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        SpawnEvilPrincess()
    } else {
    	
    }
    sprite.setPosition(40, 60)
    Level += 1
})
/**
 * Things to work on.
 * 
 * Energy
 * 
 * Player Attacking
 * 
 * Player Direction
 */
function SpawnBat () {
    Bat = sprites.create(assets.image`Bat Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Bat, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Bat)
    Enemy_Health.setColor(11, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 5
    Bat.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    Bat,
    assets.animation`Bat Left Animation`,
    100,
    true
    )
    Bat.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Fast_Speed)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Exit`, function (sprite, location) {
    if (Level == 2) {
        tiles.setCurrentTilemap(tilemap`Forest`)
        scene.setBackgroundColor(7)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        Level += -1
        tiles.placeOnTile(sprite, tiles.getTileLocation(21, 46))
        for (let index = 0; index <= 5; index++) {
            SpawnMushroom()
        }
        for (let index = 0; index <= 5; index++) {
            SpawnCrab()
        }
        for (let index = 0; index <= 5; index++) {
            SpawnMonkey()
        }
        for (let index = 0; index <= 1; index++) {
            SpawnMiniDino()
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 1) {
        mp.setPlayerState(player2, MultiplayerState.Direction, 3)
    }
    if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
        animation.runImageAnimation(
        mp.getPlayerSprite(player2),
        assets.animation`Wizard Animation`,
        300,
        true
        )
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
        if (!(Player_Attacking == 2)) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Knight Animation`,
            200,
            true
            )
        }
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
        animation.runImageAnimation(
        mp.getPlayerSprite(player2),
        assets.animation`Princess Animation`,
        200,
        true
        )
    } else {
    	
    }
})
function SpawnCrab () {
    Crab = sprites.create(assets.image`Crab Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Crab, tiles.getTileLocation(randint(4, 25), randint(11, 18)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Crab)
    Enemy_Health.setColor(5, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    pauseUntil(() => scene.cameraProperty(CameraProperty.X) >= 4 && !(scene.cameraProperty(CameraProperty.X) < 25) && (scene.cameraProperty(CameraProperty.X) >= 11 && !(scene.cameraProperty(CameraProperty.X) < 18)))
    Enemy_Health.max = 4
    animation.runImageAnimation(
    Crab,
    assets.animation`Crab Walk Animation`,
    200,
    true
    )
}
function SpawnBigDino () {
    Big_Dino = sprites.create(assets.image`Big Dino Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Big_Dino, tiles.getTileLocation(7, 4))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Big_Dino)
    Enemy_Health.setColor(5, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 75
    animation.runImageAnimation(
    Big_Dino,
    assets.animation`Dino Animation`,
    200,
    true
    )
    Big_Dino.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
info.onLifeZero(function () {
    game.gameOver(false)
})
mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 0) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            sprites.destroy(Knight)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Wizard = sprites.create(assets.image`Wizard Image`, SpriteKind.Visual)
            Wizard.sayText("Wizard")
            Wizard.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Wizard,
            assets.animation`Wizard Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
            sprites.destroy(Rammer)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Knight = sprites.create(assets.image`Knight Picture`, SpriteKind.Visual)
            Knight.sayText("Knight")
            Knight.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Knight,
            assets.animation`Knight Animation`,
            200,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
            sprites.destroy(Princess)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Rammer = sprites.create(assets.image`Rammer Picture`, SpriteKind.Visual)
            Rammer.sayText("Rammer")
            Rammer.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Rammer,
            assets.animation`Rammer Right Animation`,
            100,
            true
            )
        } else if (false) {
        	
        } else {
        	
        }
    } else if (Start_Battle == 1) {
        mp.setPlayerState(player2, MultiplayerState.Direction, 4)
        if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Wizard Left Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            if (!(Player_Attacking == 2)) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Knight Left Animation`,
                200,
                true
                )
            }
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Rammer Left Animation`,
            100,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Princess Left Animation`,
            200,
            true
            )
        } else {
        	
        }
    } else {
    	
    }
})
function SpawnMushroom () {
    Mushroom = sprites.create(assets.image`Mushroom Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Mushroom, tiles.getTileLocation(randint(19, 35), randint(31, 37)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Mushroom)
    Enemy_Health.setColor(13, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 4
    animation.runImageAnimation(
    Mushroom,
    assets.animation`Mushroom Walk`,
    200,
    true
    )
}
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 1) {
        mp.setPlayerState(player2, MultiplayerState.Direction, 1)
        if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Wizard Forward Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            if (!(Player_Attacking == 2)) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Knight Forward Animation`,
                200,
                true
                )
            }
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
            animation.runImageAnimation(
            mp.getPlayerSprite(player2),
            assets.animation`Princess Up Animation`,
            200,
            true
            )
        } else {
        	
        }
    }
})
mp.onControllerEvent(ControllerEvent.Connected, function (player2) {
    if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2) {
        pauseUntil(() => Start_Battle == 0)
        Multiplayer = true
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`Blue Circle`, SpriteKind.Player))
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setFlag(SpriteFlag.Invisible, false)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(60, 60)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).z = -1
        Knight = sprites.create(assets.image`Knight Picture`, SpriteKind.Visual)
        Knight.sayText("Knight")
        Knight.setPosition(60, 60)
        animation.runImageAnimation(
        Knight,
        assets.animation`Knight Animation`,
        200,
        true
        )
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.Class, 2)
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.Player_Attacking, 0)
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.Direction, 3)
        pauseUntil(() => Start_Battle == 1)
        sprites.destroy(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`Wizard Image`, SpriteKind.Player))
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.Class, 1)
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.life, 200)
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.A_Energy_Requirement, 50)
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.B_Energy_Requirement, 25)
        sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 75, 75)
        Player_Health = statusbars.create(20, 4, StatusBarKind.Health)
        Player_Health.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
        Player_Health.setColor(5, 15, 3)
        Player_Health.setBarBorder(1, 15)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Wizard_Explosion, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -100
    pause(100)
})
function SpawnMonkey () {
    Monkey = sprites.create(assets.image`Monkey Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Monkey, tiles.getTileLocation(randint(19, 35), randint(31, 37)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Monkey)
    Enemy_Health.setColor(14, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 4
    animation.runImageAnimation(
    Monkey,
    assets.animation`Monkey Walk Animation`,
    100,
    true
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Player_Attacking == 0) {
        info.changeLifeBy(-25)
        scene.cameraShake(4, 500)
        music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        pause(500)
    }
    if (Player_Attacking == 1) {
        if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class) == 2) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -4
        } else if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class) == 3) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -6
        } else {
        	
        }
    }
    if (Player_Attacking == 2) {
        info.changeLifeBy(0)
    }
    pause(500)
})
let Monkey: Sprite = null
let Mushroom: Sprite = null
let Crab: Sprite = null
let Bat: Sprite = null
let Big_Dino: Sprite = null
let Mini_Dino: Sprite = null
let Heart: Sprite = null
let Laser: Sprite = null
let Skull: Sprite = null
let Princess: Sprite = null
let Rammer: Sprite = null
let Wizard: Sprite = null
let Evil_Princess: Sprite = null
let Star: Sprite = null
let Football: Sprite = null
let Explosion: Sprite = null
let Enemy_Health: StatusBarSprite = null
let Snake2: Sprite = null
let Player_Health: StatusBarSprite = null
let Energ: StatusBarSprite = null
let Buttons: Sprite = null
let Knight: Sprite = null
let Player_Attacking = 0
let Level = 0
let Fast_Speed = 0
let Boss_Speed = 0
let Below_Average_Speed = 0
let Average_Speed = 0
let Start_Battle = 0
let Multiplayer = false
Multiplayer = false
// 1 = facing up
// 2 = facing right
// 3= facing down
// 4= facing left
let Player_Direction = 3
Start_Battle = 0
Average_Speed = 25
Below_Average_Speed = 15
Boss_Speed = 5
Fast_Speed = 50
Level = 1
Player_Attacking = 0
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`Red Circle`, SpriteKind.Player))
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.A_Energy_Requirement, 0)
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.B_Energy_Requirement, 0)
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class, 2)
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Direction, 3)
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Player_Attacking, 0)
Knight = sprites.create(assets.image`Knight Picture`, SpriteKind.Visual)
sprites.setDataNumber(Knight, "Player", 1)
Buttons = sprites.create(assets.image`Buttons`, SpriteKind.Visual)
Knight.sayText("Knight")
scene.setBackgroundColor(13)
Knight.setPosition(20, 60)
Buttons.setPosition(145, 100)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(20, 60)
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class, 2)
Buttons.setFlag(SpriteFlag.RelativeToCamera, true)
animation.runImageAnimation(
Knight,
assets.animation`Knight Animation`,
200,
true
)
Energ = statusbars.create(20, 4, StatusBarKind.Energy)
Energ.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
Energ.setPosition(10, 15)
Energ.max = 100
Energ.setBarBorder(1, 15)
Energ.setColor(9, 15, 6)
Energ.setLabel("MP", 9)
Energ.setFlag(SpriteFlag.Invisible, true)
pauseUntil(() => Start_Battle == 1)
sprites.destroy(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Direction, 3)
sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
let Map = 2
Energ.setFlag(SpriteFlag.Invisible, false)
if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class) == 1) {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`Wizard Image`, SpriteKind.Player))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, 200)
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.A_Energy_Requirement, 50)
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.B_Energy_Requirement, 25)
    sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 75, 75)
    Player_Health = statusbars.create(20, 4, StatusBarKind.Health)
    Player_Health.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    Player_Health.setColor(5, 15, 3)
    Player_Health.setBarBorder(1, 15)
    Player_Health.max = 200
} else if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class) == 2) {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`Knight Picture`, SpriteKind.Player))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, 150)
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.A_Energy_Requirement, 25)
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.B_Energy_Requirement, 0)
    sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
    Player_Health = statusbars.create(20, 4, StatusBarKind.Health)
    Player_Health.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    Player_Health.setColor(2, 15, 3)
    Player_Health.setBarBorder(1, 15)
    Player_Health.max = 150
    if (Player_Attacking == 2) {
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, 0)
    } else {
        mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 100)
    }
} else if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class) == 3) {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`Rammer Picture`, SpriteKind.Player))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, 100)
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.A_Energy_Requirement, 25)
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.B_Energy_Requirement, 10)
    sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 125, 125)
    Player_Health = statusbars.create(20, 4, StatusBarKind.Health)
    Player_Health.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    Player_Health.setColor(9, 15, 3)
    Player_Health.setBarBorder(1, 15)
    Player_Health.max = 100
} else if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Class) == 4) {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`Princess Image`, SpriteKind.Player))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, 100)
    sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 100)
    Player_Health = statusbars.create(20, 4, StatusBarKind.Health)
    Player_Health.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    Player_Health.setColor(3, 15, 3)
    Player_Health.setBarBorder(1, 15)
    Player_Health.max = 100
} else {
	
}
if (Multiplayer == false) {
    info.setScore(0)
    scene.cameraFollowSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    if (Map == 1) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 1`)
        for (let index = 0; index <= 5; index++) {
            SpawnBat()
        }
        SpawnEvilPrincess()
    } else if (Map == 2) {
        tiles.setCurrentTilemap(tilemap`Forest`)
        scene.setBackgroundColor(7)
        for (let index = 0; index <= 5; index++) {
            SpawnMushroom()
        }
        for (let index = 0; index <= 5; index++) {
            SpawnCrab()
        }
        for (let index = 0; index <= 5; index++) {
            SpawnMonkey()
        }
        for (let index = 0; index <= 1; index++) {
            SpawnMiniDino()
        }
    } else {
    	
    }
}
game.onUpdateInterval(2000, function () {
    Energ.value += 20
})
forever(function () {
    if (Multiplayer == false) {
        if (Start_Battle == 1) {
            Player_Health.value = mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life)
            mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Direction, 3)
            info.setScore(mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Direction))
        }
    }
})
