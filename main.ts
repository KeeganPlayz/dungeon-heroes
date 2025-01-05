enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Activating
}
namespace SpriteKind {
    export const Wizard_Laser = SpriteKind.create()
    export const Wizard_Explosion = SpriteKind.create()
    export const Rammer_Football = SpriteKind.create()
    export const Princess_Heart = SpriteKind.create()
    export const Princess_Star = SpriteKind.create()
    export const Visual = SpriteKind.create()
    export const Collectible = SpriteKind.create()
    export const Laser_Bullet = SpriteKind.create()
    export const Laser_Sniper = SpriteKind.create()
}
namespace MultiplayerState {
    export const A_Energy_Requirement = MultiplayerState.create()
    export const B_Energy_Requirement = MultiplayerState.create()
    export const Class = MultiplayerState.create()
    export const Energy = MultiplayerState.create()
    export const Attacking = MultiplayerState.create()
    export const Direction = MultiplayerState.create()
    export const Ready = MultiplayerState.create()
    export const Side_Direction = MultiplayerState.create()
    export const Speed = MultiplayerState.create()
    export const Damage_Multiplier = MultiplayerState.create()
    export const Selection = MultiplayerState.create()
    export const Default_Speed = MultiplayerState.create()
    export const Charge_Up_Time = MultiplayerState.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprites.setDataBoolean(sprite, "Has Status Bar?", true)
    sprites.setDataNumber(sprite, "Attack", 0)
    sprites.setDataNumber(sprite, "Player", 0)
})
function SpawnZombie1 () {
    Zombie_1 = sprites.create(assets.image`Zombie 1 Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Zombie_1, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Zombie_1)
    Enemy_Health.setColor(7, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 3
    sprites.setDataString(Zombie_1, "Enemy Type", "Zombie 1")
    animation.runImageAnimation(
    Zombie_1,
    assets.animation`Zombie 1 Animation`,
    200,
    true
    )
    Zombie_1.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
function SpawnPizza () {
    Snack = sprites.create(assets.image`Pizza Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Pizza")
    tiles.placeOnRandomTile(Snack, assets.tile`transparency16`)
}
function SpawnStrawberry (X: number, Y: number) {
    Snack = sprites.create(assets.image`Strawberry Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Strawberry")
    tiles.placeOnTile(Snack, tiles.getTileLocation(X, Y))
}
function SpawnSnake () {
    Snake = sprites.create(assets.image`Snake`, SpriteKind.Enemy)
    sprites.setDataString(Snake, "Enemy Type", "Snake")
    tiles.placeOnRandomTile(Snake, sprites.dungeon.floorLightMoss)
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Snake)
    Enemy_Health.setColor(7, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 34
    characterAnimations.loopFrames(
    Snake,
    assets.animation`Snake Animation`,
    100,
    characterAnimations.rule(Predicate.Moving)
    )
    Snake.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Above_Average_Speed)
}
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (Start_Battle == 0) {
            for (let index = 0; index <= 3; index++) {
                if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.Class) - 1] == 0) {
                    game.showLongText("You cannot use a locked character!", DialogLayout.Bottom)
                    break;
                } else {
                    if (index == 3) {
                        Game_Mode = "Versus"
                        Start_Battle = 1
                    }
                    continue;
                }
            }
        } else if (Start_Battle == 1) {
            if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                sprites.destroy(Buttons)
                if (statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value >= mp.getPlayerState(player2, MultiplayerState.B_Energy_Requirement)) {
                    mp.setPlayerState(player2, MultiplayerState.Attacking, 2)
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += 0 - mp.getPlayerState(player2, MultiplayerState.B_Energy_Requirement)
                    if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        Explosion = sprites.create(assets.image`Explosion Image`, SpriteKind.Projectile)
                        sprites.setDataString(Explosion, "Projectile", "Explosion")
                        sprites.setDataNumber(Explosion, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        Explosion.scale = 2
                        Explosion.lifespan = 500
                        animation.runImageAnimation(
                        Explosion,
                        assets.animation`Explosion Animation`,
                        100,
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
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                        if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == false) {
                            mp.setPlayerState(player2, MultiplayerState.Speed, mp.getPlayerState(player2, MultiplayerState.Speed) / 3)
                            mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                        }
                        sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", true)
                        characterAnimations.setCharacterAnimationsEnabled(mp.getPlayerSprite(player2), false)
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
                        	
                        }
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                        if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Has football?") == true) {
                            statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += mp.getPlayerState(player2, MultiplayerState.B_Energy_Requirement)
                            sprites.setDataBoolean(mp.getPlayerSprite(player2), "Has football?", false)
                        }
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        Football = sprites.create(assets.image`Football Image`, SpriteKind.Projectile)
                        sprites.setDataString(Football, "Projectile", "Football")
                        sprites.setDataNumber(Football, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        Football.lifespan = 5000
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
                        } else {
                        	
                        }
                        Football.lifespan = 5000
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        Star = sprites.createProjectileFromSprite(assets.image`Star Image`, mp.getPlayerSprite(player2), 0, 0)
                        sprites.setDataString(Star, "Projectile", "Star")
                        sprites.setDataNumber(Star, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        sprites.setDataBoolean(Star, "Activated?", false)
                        animation.runImageAnimation(
                        Star,
                        assets.animation`Star Waiting Animation`,
                        200,
                        true
                        )
                        Star.setFlag(SpriteFlag.AutoDestroy, false)
                        Star.setFlag(SpriteFlag.DestroyOnWall, false)
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        Moral_Dino = sprites.create(assets.image`Egg Image`, SpriteKind.Enemy)
                        sprites.setDataString(Moral_Dino, "Enemy Type", "Moral Dino")
                        Moral_Dino.setFlag(SpriteFlag.GhostThroughSprites, true)
                        sprites.setDataNumber(Moral_Dino, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        sprites.setDataBoolean(Moral_Dino, "Activated?", false)
                        Moral_Dino.lifespan = 5000
                        Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
                        Enemy_Health.attachToSprite(Moral_Dino)
                        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).z = -1
                        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).max = 15
                        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setBarBorder(1, 15)
                        if (Players[2] == 2 || Players[3] == 3 || Players[4] == 4) {
                            if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
                                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(2, 15)
                            } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2) {
                                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(8, 15)
                            } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 3) {
                                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(5, 15)
                            } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 4) {
                                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(7, 15)
                            }
                        } else {
                            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(4, 15)
                        }
                        Moral_Dino.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                        sprites.setDataBoolean(mp.getPlayerSprite(player2), "Has Bubble?", true)
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        Bubble = sprites.createProjectileFromSprite(assets.image`Bubble Shield Image`, mp.getPlayerSprite(player2), 0, 0)
                        sprites.setDataString(Bubble, "Projectile", "Bubble")
                        sprites.setDataNumber(Bubble, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        Bubble.setFlag(SpriteFlag.DestroyOnWall, false)
                        Bubble.setFlag(SpriteFlag.AutoDestroy, false)
                        Bubble.setFlag(SpriteFlag.GhostThroughWalls, true)
                        Bubble.scale = 2
                        Bubble.z = -1
                        Bubble.follow(mp.getPlayerSprite(player2), 500)
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        mp.getPlayerSprite(player2).setFlag(SpriteFlag.Invisible, true)
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setFlag(SpriteFlag.Invisible, true)
                        for (let index = 0; index <= 1; index++) {
                            if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                                pause(1000)
                                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setFlag(SpriteFlag.Invisible, false)
                                pause(1000)
                                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setFlag(SpriteFlag.Invisible, true)
                            }
                        }
                        if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                            mp.getPlayerSprite(player2).setFlag(SpriteFlag.Invisible, false)
                            statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setFlag(SpriteFlag.Invisible, false)
                        }
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1 || mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                            Laser_Sniper = sprites.createProjectileFromSprite(assets.image`Laser Sniper Vertical Image`, mp.getPlayerSprite(player2), 0, 0)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2 || mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                            Laser_Sniper = sprites.createProjectileFromSprite(assets.image`Laser Sniper Image`, mp.getPlayerSprite(player2), 0, 0)
                        }
                        sprites.setDataString(Laser_Sniper, "Projectile", "Laser Sniper")
                        sprites.setDataNumber(Laser_Sniper, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        Laser_Sniper.setFlag(SpriteFlag.AutoDestroy, false)
                        Laser_Sniper.setFlag(SpriteFlag.DestroyOnWall, false)
                        Laser_Sniper.setFlag(SpriteFlag.BounceOnWall, true)
                        Laser_Sniper.lifespan = 1000
                        if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                            Laser_Sniper.vy = -1000
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                            Laser_Sniper.vx = 1000
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                            Laser_Sniper.vy = 1000
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                            Laser_Sniper.vx = -1000
                        }
                        music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                            Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, mp.getPlayerSprite(player2), 0, -100)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                            Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, mp.getPlayerSprite(player2), 100, 0)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                            Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, mp.getPlayerSprite(player2), 0, 100)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                            Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, mp.getPlayerSprite(player2), -100, 0)
                        }
                        sprites.setDataString(Splitter, "Projectile", "Splitter")
                        sprites.setDataNumber(Splitter, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        Splitter.setFlag(SpriteFlag.AutoDestroy, false)
                        Splitter.lifespan = 5000
                        animation.runImageAnimation(
                        Splitter,
                        assets.animation`Splitter Animation`,
                        100,
                        false
                        )
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        mp.changePlayerStateBy(player2, MultiplayerState.Damage_Multiplier, 0.5)
                        mp.getPlayerSprite(player2).startEffect(effects.fire)
                        pause(10000)
                        mp.changePlayerStateBy(player2, MultiplayerState.Damage_Multiplier, -0.5)
                        effects.clearParticles(mp.getPlayerSprite(player2))
                    }
                }
            }
        } else {
        	
        }
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.HittingWallUp))) {
        if (tiles.tileAtLocationEquals(location, sprites.dungeon.purpleSwitchDown)) {
            story.showPlayerChoices("Turn on the lever", "Not yet")
            if (true) {
                tiles.setTileAt(location, sprites.dungeon.purpleOuterNorth0)
                Purple_Wall_Toggle = true
                tileUtil.setWalls(sprites.dungeon.purpleOuterEast2, false)
                tileUtil.setWalls(sprites.dungeon.purpleOuterNorth2, false)
                tileUtil.setWalls(sprites.dungeon.purpleOuterWest2, false)
                tileUtil.replaceAllTiles(sprites.dungeon.purpleOuterEast2, sprites.dungeon.darkGroundCenter)
                tileUtil.replaceAllTiles(sprites.dungeon.purpleOuterNorth2, sprites.dungeon.darkGroundCenter)
                tileUtil.replaceAllTiles(sprites.dungeon.purpleOuterWest2, sprites.dungeon.darkGroundCenter)
            }
        } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.greenSwitchDown)) {
            story.showPlayerChoices("Turn on the lever", "Not yet")
            if (true) {
                tiles.setTileAt(location, sprites.dungeon.greenOuterNorth0)
                Green_Wall_Toggle = true
                tileUtil.setWalls(sprites.dungeon.greenOuterEast2, false)
                tileUtil.setWalls(sprites.dungeon.greenOuterNorth2, false)
                tileUtil.setWalls(sprites.dungeon.greenOuterSouth2, false)
                tileUtil.replaceAllTiles(sprites.dungeon.greenOuterEast2, sprites.dungeon.darkGroundCenter)
                tileUtil.replaceAllTiles(sprites.dungeon.greenOuterNorth2, sprites.dungeon.darkGroundCenter)
                tileUtil.replaceAllTiles(sprites.dungeon.greenOuterSouth2, sprites.dungeon.darkGroundCenter)
            }
        } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.doorLockedNorth)) {
            if (!(story.isMenuOpen())) {
                story.setSoundEnabled(true)
                game.setDialogCursor(assets.image`Pigeon`)
                game.showLongText("Unlike other bosses, you will NOT be able to flee once you start this battle. Are you sure you're ready to face this overwhelmingly strong boss?", DialogLayout.Bottom)
                story.startCutscene(function () {
                    tileUtil.setWalls(sprites.dungeon.stairWest, true)
                    tileUtil.replaceAllTiles(assets.tile`Stair Left`, sprites.dungeon.floorLight2)
                    story.showPlayerChoices("Nah, let me prepare a little bit more.", "Yes. I am confident in my abilities.")
                    if (story.checkLastAnswer("Yes. I am confident in my abilities.")) {
                        game.showLongText("Tell me how many of this boss you'll be facing.", DialogLayout.Bottom)
                        story.showPlayerChoices("Nevermind.", "Only 1, please.", "Let me tell you the exact number.")
                        if (!(story.checkLastAnswer("Nevermind."))) {
                            tileUtil.replaceAllTiles(sprites.dungeon.doorLockedNorth, sprites.dungeon.floorLight2)
                            if (story.checkLastAnswer("Only 1, please.")) {
                                SpawnEvilPrincess()
                                Evil_Princess.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 0)
                                tiles.placeOnTile(Evil_Princess, location)
                                game.setDialogCursor(assets.image`Evil Princess Image`)
                                game.setDialogCursor(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).image)
                                game.showLongText("What happened.. to.. you?", DialogLayout.Bottom)
                                game.setDialogCursor(assets.image`Evil Princess Image`)
                                game.showLongText("ERGHHYUUUUUUUUUUUUUUUUA", DialogLayout.Bottom)
                                tiles.placeOnTile(Evil_Princess, tiles.getTileLocation(15, 22))
                                Evil_Princess.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Fast_Speed)
                                Evil_Princess.setKind(SpriteKind.Enemy)
                            } else if (story.checkLastAnswer("Let me tell you the exact number.")) {
                                index = game.askForNumber("Spawn how much of this boss?")
                                for (let index2 = 0; index2 < index; index2++) {
                                    SpawnEvilPrincess()
                                    Evil_Princess.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 0)
                                    tiles.placeOnTile(Evil_Princess, tiles.getTileLocation(randint(0, 31), randint(0, 31)))
                                    Evil_Princess.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Above_Average_Speed)
                                    Evil_Princess.setKind(SpriteKind.Enemy)
                                }
                                game.setDialogCursor(assets.image`Evil Princess Image`)
                                game.setDialogCursor(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).image)
                                game.showLongText("What happened.. to.. you?", DialogLayout.Bottom)
                                game.setDialogCursor(assets.image`Evil Princess Image`)
                                game.showLongText("ERGHHYUUUUUUUUUUUUUUUUA", DialogLayout.Bottom)
                            } else if (false) {
                            	
                            } else {
                            	
                            }
                            for (let index = 0; index <= 3; index++) {
                                if (Players[index + 1] == index + 1) {
                                    tiles.placeOnTile(mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)), tiles.getTileLocation(15, 24))
                                }
                            }
                            tileUtil.setWalls(sprites.dungeon.floorLight2, false)
                        } else {
                            tiles.setTileAt(tiles.getTileLocation(13, 15), assets.tile`Stair Left`)
                            tiles.setTileAt(tiles.getTileLocation(15, 17), assets.tile`Stair Left`)
                            tileUtil.setWalls(sprites.dungeon.stairWest, false)
                        }
                    } else {
                        tiles.setTileAt(tiles.getTileLocation(13, 15), assets.tile`Stair Left`)
                        tiles.setTileAt(tiles.getTileLocation(15, 17), assets.tile`Stair Left`)
                        tileUtil.setWalls(sprites.dungeon.stairWest, false)
                    }
                    story.cancelCurrentCutscene()
                })
            }
        } else if (tiles.tileAtLocationEquals(location, sprites.dungeon.chestClosed)) {
            tiles.setWallAt(location, false)
            if (Level == 1) {
                game.showLongText("You found a cherry!", DialogLayout.Bottom)
                tiles.setTileAt(location, sprites.dungeon.darkGroundCenter)
                SpawnCherry(location.column, location.row)
            } else if (Level == 2) {
                game.showLongText("You found a strawberry!", DialogLayout.Bottom)
                tiles.setTileAt(location, sprites.dungeon.floorLightMoss)
                SpawnStrawberry(location.column, location.row)
            } else if (Level >= 3) {
                game.showLongText("You found an apple!", DialogLayout.Bottom)
                tiles.setTileAt(location, sprites.dungeon.floorLight2)
                SpawnApple(location.column, location.row)
            }
        } else {
        	
        }
    }
})
function SpawnAngelFish () {
    Angel_Fish = sprites.create(assets.image`Angel Fish Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Angel_Fish, tiles.getTileLocation(randint(44, 63), randint(4, 27)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Angel_Fish)
    Enemy_Health.setColor(1, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 4
    sprites.setDataString(Angel_Fish, "Enemy Type", "Angel Fish")
    animation.runImageAnimation(
    Angel_Fish,
    assets.animation`Angel Fish Animation`,
    200,
    true
    )
    Angel_Fish.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Average_Speed)
}
function SpawnCake () {
    Snack = sprites.create(assets.image`Cake Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Cake")
    if (Map == 1) {
        tiles.placeOnTile(Snack, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Snack, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
}
function SpawnYellowOrb () {
    Yellow_Orb = sprites.create(assets.image`Yellow Orb`, SpriteKind.Collectible)
    sprites.setDataString(Yellow_Orb, "Collectible", "Yellow Orb")
    if (Map == 1) {
        tiles.placeOnTile(Yellow_Orb, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Yellow_Orb, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
}
function SpawnZombie2 () {
    Zombie_2 = sprites.create(assets.image`Zombie 2 Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Zombie_2, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Zombie_2)
    Enemy_Health.setColor(7, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 2
    animation.runImageAnimation(
    Zombie_2,
    assets.animation`Zombie 2 Animation`,
    200,
    true
    )
    Zombie_2.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
function SpawnClam () {
    Clam = sprites.create(assets.image`Clam Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Clam, tiles.getTileLocation(randint(50, 53), randint(37, 48)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Clam)
    Enemy_Health.setColor(3, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 8
    sprites.setDataString(Clam, "Enemy Type", "Clam")
    animation.runImageAnimation(
    Clam,
    assets.animation`Clam Animation`,
    100,
    true
    )
    Clam.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Above_Average_Speed)
}
function SpawnEvilPrincess () {
    Evil_Princess = sprites.create(assets.image`Evil Princess Image`, SpriteKind.Enemy)
    sprites.setDataString(Evil_Princess, "Enemy Type", "Evil Princess")
    Evil_Princess.setPosition(randint(0, 160), randint(0, 120))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Evil_Princess)
    Enemy_Health.setColor(6, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 500
    Enemy_Health.value = Enemy_Health.max
    Evil_Princess.setKind(SpriteKind.Visual)
    Evil_Princess.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
    characterAnimations.loopFrames(
    Evil_Princess,
    assets.animation`Evil Princess Animation`,
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    Evil_Princess,
    assets.animation`Evil Princess Right Animation`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    Evil_Princess,
    assets.animation`Evil Princess Left Animation`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    Evil_Princess,
    assets.animation`Evil Princess Forward Animation`,
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
}
statusbars.onStatusReached(StatusBarKind.EnemyHealth, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 50, function (status) {
    if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Evil Princess") {
        status.spriteAttachedTo().x = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x
        status.spriteAttachedTo().y = mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).y
    } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Big Dino") {
        SpawnEgg("Mini", status.spriteAttachedTo())
    }
})
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
            300,
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
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Princess.sayText("LOCKED")
            } else {
                Princess.sayText("Prncss")
            }
            Princess.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Princess,
            assets.animation`Princess Animation`,
            200,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
            sprites.destroy(Princess)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Hero_Dino = sprites.create(assets.image`Hero Dino`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Hero_Dino.sayText("LOCKED")
            } else {
                Hero_Dino.sayText("H Dino")
            }
            Hero_Dino.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Hero_Dino,
            assets.animation`Hero Dino Left Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
            sprites.destroy(Hero_Dino)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Duck = sprites.create(assets.image`Duck Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Duck.sayText("LOCKED")
            } else {
                Duck.sayText("Duck")
            }
            Duck.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Duck,
            assets.animation`Duck Right Animation`,
            200,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
            sprites.destroy(Duck)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Car = sprites.create(assets.image`Car Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Car.sayText("LOCKED")
            } else {
                Car.sayText("Car")
            }
            Car.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
            sprites.destroy(Car)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Ship = sprites.create(assets.image`Ship Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Ship.sayText("LOCKED")
            } else {
                Ship.sayText("Ship")
            }
            Ship.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
            sprites.destroy(Ship)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Plane = sprites.create(assets.image`Plane Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Plane.sayText("LOCKED")
            } else {
                Plane.sayText("Plane")
            }
            Plane.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Plane,
            assets.animation`Plane Left Animation`,
            50,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
            sprites.destroy(Plane)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, 1)
            Meteor = sprites.create(assets.image`Asteroid Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Meteor.sayText("LOCKED")
            } else {
                Meteor.sayText("Meteor")
            }
            Meteor.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Meteor,
            assets.animation`Asteroid Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
            sprites.destroy(Meteor)
            mp.setPlayerState(player2, MultiplayerState.Class, 1)
            Wizard = sprites.create(assets.image`Wizard Image`, SpriteKind.Visual)
            Wizard.sayText("Wizard")
            Wizard.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Wizard,
            assets.animation`Wizard Animation`,
            200,
            true
            )
        }
    } else if (Start_Battle == 1) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) != 10) {
            mp.setPlayerState(player2, MultiplayerState.Direction, 2)
            mp.setPlayerState(player2, MultiplayerState.Side_Direction, 2)
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Wizard Right Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            	
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
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Hero Dino Right Animation`,
                300,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Duck Right Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Ship Right Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Plane Right Animation`,
                50,
                true
                )
            }
        } else {
            if (sprites.readDataBoolean(Small_Meteor, "Activated?") == true) {
                Small_Meteor.angle += -10
            } else {
                mp.setPlayerState(player2, MultiplayerState.Direction, 2)
            }
        }
    }
})
function SpawnSkull () {
    Skull = sprites.create(assets.image`Skull Image`, SpriteKind.Enemy)
    sprites.setDataString(Skull, "Enemy Type", "Skull")
    Skull.setFlag(SpriteFlag.GhostThroughTiles, true)
    Skull.setFlag(SpriteFlag.GhostThroughWalls, true)
    tiles.placeOnRandomTile(Skull, sprites.dungeon.collectibleInsignia)
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Skull)
    Enemy_Health.setColor(1, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 50
    characterAnimations.loopFrames(
    Skull,
    assets.animation`Skull Animation`,
    100,
    characterAnimations.rule(Predicate.Moving)
    )
    Skull.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Average_Speed)
}
function SpawnEgg (Type: string, Parent: Sprite) {
    if (Type == "Mini") {
        Mini_Dino = sprites.create(assets.image`Egg Image`, SpriteKind.Enemy)
        sprites.setDataString(Mini_Dino, "Enemy Type", "Mini Dino")
        Mini_Dino.setFlag(SpriteFlag.GhostThroughSprites, true)
        sprites.setDataNumber(Mini_Dino, "Player", 0)
        sprites.setDataBoolean(Mini_Dino, "Activated?", false)
        Mini_Dino.lifespan = 5000
        Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        Enemy_Health.attachToSprite(Mini_Dino)
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Mini_Dino).z = -1
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Mini_Dino).max = 50
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Mini_Dino).setBarBorder(1, 15)
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Mini_Dino).setColor(5, 15)
        Mini_Dino.setPosition(Parent.x, Parent.y)
        Mini_Dino.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 75)
        pause(200)
        Mini_Dino.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 0)
    }
}
function SpawnCoin () {
    Coin = sprites.create(assets.image`Coin Image`, SpriteKind.Collectible)
    sprites.setDataString(Coin, "Collectible", "Coin")
    if (Map == 1) {
        tiles.placeOnTile(Coin, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Coin, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
    animation.runImageAnimation(
    Coin,
    assets.animation`Coin Animation`,
    200,
    true
    )
}
info.onCountdownEnd(function () {
    game.setGameOverMessage(false, "STALE MATE")
    game.gameOver(false)
})
function SpawnError () {
    RandomEnemy = assets.image`Error`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipY()
    }
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(3, randint(0, 15))
    RandomEnemy.replace(1, randint(0, 15))
    RandomEnemy.replace(10, randint(0, 15))
    RandomEnemy.replace(15, randint(1, 15))
    RandomEnemy.replace(9, randint(0, 15))
    RandomEnemy.replace(12, randint(0, 15))
    RandomEnemy.replace(8, randint(0, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(1, 1)
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 200
    Enemy_Health.value = Enemy_Health.max
    sprites.setDataString(RandomSprite, "Enemy Type", "Error")
    RandomSprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Above_Average_Speed)
}
function SpawnRedOrb () {
    Red_Orb = sprites.create(assets.image`Red Orb`, SpriteKind.Collectible)
    sprites.setDataString(Red_Orb, "Collectible", "Red Orb")
    if (Map == 1) {
        tiles.placeOnTile(Red_Orb, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Red_Orb, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
}
mp.onScore(146, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("The next enemy will be an Error. Errors are jacks of all trades, no weaknesses that don't pertain with their attacks, but they don't really have strengths either.", "Pigeon")
            })
            for (let index = 0; index <= 19; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 9; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnGlitch()
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) < 7) {
        if (sprites.readDataBoolean(sprite, "Has Bubble?") == false) {
            mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1)
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (Start_Battle == 0) {
            for (let index = 0; index <= 3; index++) {
                if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.Class) - 1] == 0) {
                    game.showLongText("You cannot use a locked character!", DialogLayout.Bottom)
                    break;
                } else {
                    if (index == 3) {
                        Game_Mode = "Arcade"
                        Start_Battle = 1
                    }
                    continue;
                }
            }
        } else if (Start_Battle == 1) {
            if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                sprites.destroy(Buttons)
                if (statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value >= mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)) {
                    if (mp.getPlayerState(player2, MultiplayerState.Attacking) == 0) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 1)
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                        if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            Laser = sprites.create(assets.image`Laser Image`, SpriteKind.Projectile)
                            sprites.setDataString(Laser, "Projectile", "Laser")
                            sprites.setDataNumber(Laser, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
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
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            mp.setPlayerState(player2, MultiplayerState.Charge_Up_Time, 0.32)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                            characterAnimations.setCharacterAnimationsEnabled(mp.getPlayerSprite(player2), false)
                            if (mp.getPlayerState(player2, MultiplayerState.Side_Direction) == 2) {
                                animation.runImageAnimation(
                                mp.getPlayerSprite(player2),
                                assets.animation`Rammer Attack Right Animation`,
                                100,
                                false
                                )
                            } else if (mp.getPlayerState(player2, MultiplayerState.Side_Direction) == 4) {
                                animation.runImageAnimation(
                                mp.getPlayerSprite(player2),
                                assets.animation`Rammer Attack Left Animation`,
                                100,
                                false
                                )
                            }
                            pause(1000)
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            characterAnimations.setCharacterAnimationsEnabled(mp.getPlayerSprite(player2), true)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                                for (let index = 0; index <= 4; index++) {
                                    Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, mp.getPlayerSprite(player2), 25 * index + -50, -50)
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
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
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
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
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
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
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                                    animation.runImageAnimation(
                                    Heart,
                                    assets.animation`Heart Animation`,
                                    200,
                                    false
                                    )
                                }
                            } else {
                            	
                            }
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
                            if (mp.getPlayerState(player2, MultiplayerState.Side_Direction) == 1) {
                            	
                            } else if (mp.getPlayerState(player2, MultiplayerState.Side_Direction) == 2) {
                                animation.runImageAnimation(
                                mp.getPlayerSprite(player2),
                                assets.animation`Hero Dino Right Attack Animation`,
                                100,
                                false
                                )
                            } else if (mp.getPlayerState(player2, MultiplayerState.Side_Direction) == 3) {
                            	
                            } else if (mp.getPlayerState(player2, MultiplayerState.Side_Direction) == 4) {
                                animation.runImageAnimation(
                                mp.getPlayerSprite(player2),
                                assets.animation`Hero Dino Left Attack Animation`,
                                100,
                                false
                                )
                            } else {
                            	
                            }
                            pause(500)
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 1)
                            Flash = sprites.createProjectileFromSprite(assets.image`Flash Image`, mp.getPlayerSprite(player2), 0, 0)
                            sprites.setDataString(Flash, "Projectile", "Flash")
                            sprites.setDataNumber(Flash, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                            Flash.z = -1
                            Flash.setFlag(SpriteFlag.AutoDestroy, false)
                            Flash.setFlag(SpriteFlag.DestroyOnWall, false)
                            Flash.setFlag(SpriteFlag.GhostThroughWalls, true)
                            mp.getPlayerSprite(player2).follow(Flash, 1000)
                            animation.runImageAnimation(
                            Flash,
                            assets.animation`Flash Animation`,
                            1000,
                            false
                            )
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == false) {
                                mp.setPlayerState(player2, MultiplayerState.Speed, mp.getPlayerState(player2, MultiplayerState.Speed) / 5)
                                mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                            }
                            mp.getPlayerSprite(player2).startEffect(effects.blizzard)
                            sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", true)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == false) {
                                mp.setPlayerState(player2, MultiplayerState.Speed, mp.getPlayerState(player2, MultiplayerState.Speed) / 1.5)
                                mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                            }
                            sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", true)
                            if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), 0, -150)
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), 150, 0)
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), 0, 150)
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), -150, 0)
                            }
                            sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                            sprites.setDataNumber(Laser_Bullet, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, mp.getPlayerSprite(player2), 0, -200)
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, mp.getPlayerSprite(player2), 200, 0)
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, mp.getPlayerSprite(player2), 0, 200)
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, mp.getPlayerSprite(player2), -200, 0)
                            }
                            sprites.setDataString(Explosive_Bullet, "Projectile", "Explosive Bullet")
                            sprites.setDataBoolean(Explosive_Bullet, "Activated?", false)
                            sprites.setDataNumber(Explosive_Bullet, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
                            mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                            Small_Meteor = darts.create(assets.image`Small Meteor Image`, SpriteKind.Projectile, mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
                            sprites.setDataString(Small_Meteor, "Projectile", "Small Meteor")
                            sprites.setDataNumber(Small_Meteor, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                            sprites.setDataBoolean(Small_Meteor, "Activated?", true)
                            Small_Meteor.setFlag(SpriteFlag.AutoDestroy, false)
                            Small_Meteor.setTrace(true)
                            Small_Meteor.setFlag(SpriteFlag.GhostThroughWalls, true)
                            Small_Meteor.traceColor = 10
                            Small_Meteor.iter = 2
                            Small_Meteor.pow = 100
                            mp.getPlayerSprite(player2).follow(Small_Meteor, 1000)
                            if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                                Small_Meteor.angle = 90
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                                Small_Meteor.angle = 0
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                                Small_Meteor.angle = 270
                            } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                                Small_Meteor.angle = 180
                            }
                        }
                    }
                }
            }
        } else {
        	
        }
    }
})
function ChangeMap () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Collectible)
    if (Map == 1) {
        if (Level == 1) {
            tiles.setCurrentTilemap(tilemap`Dungeon Level 1`)
            for (let index = 0; index <= 10; index++) {
                SpawnBat()
            }
        } else if (Level == 2) {
            tiles.setCurrentTilemap(tilemap`Dungeon Level 2`)
            for (let index = 0; index <= 10; index++) {
                SpawnSnake()
            }
        } else if (Level == 3) {
            tiles.setCurrentTilemap(tilemap`Dungeon Level 3`)
            for (let index = 0; index <= 10; index++) {
                SpawnSkull()
            }
        } else {
            tiles.setCurrentTilemap(tilemap`Dungeon Level 4`)
            sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        }
    } else if (Map == 2) {
        if (Level == 1) {
            tiles.setCurrentTilemap(tilemap`Wild Forest`)
            scene.setBackgroundColor(7)
            for (let index = 0; index <= 3; index++) {
                if (Players[index + 1] == index + 1) {
                    tiles.placeOnTile(mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)), tiles.getTileLocation(21, 47))
                }
            }
            for (let index = 0; index <= 5; index++) {
                SpawnMushroom()
                SpawnCrab()
                SpawnMonkey()
            }
            for (let index = 0; index <= 1; index++) {
                SpawnMiniDino(mySprite)
            }
        } else if (Level == 2) {
            tiles.setCurrentTilemap(tilemap`Forest Cave`)
            scene.setBackgroundColor(15)
            for (let index = 0; index <= 3; index++) {
                if (Players[index + 1] == index + 1) {
                    tiles.placeOnTile(mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)), tiles.getTileLocation(7, 13))
                }
            }
            SpawnBigDino()
            for (let index = 0; index <= 2; index++) {
                SpawnLemon()
            }
        }
    }
    if (Purple_Wall_Toggle == true) {
        tileUtil.setWalls(sprites.dungeon.purpleOuterEast2, false)
        tileUtil.setWalls(sprites.dungeon.purpleOuterNorth2, false)
        tileUtil.setWalls(sprites.dungeon.purpleOuterWest2, false)
        tileUtil.replaceAllTiles(sprites.dungeon.purpleOuterEast2, sprites.dungeon.darkGroundCenter)
        tileUtil.replaceAllTiles(sprites.dungeon.purpleOuterNorth2, sprites.dungeon.darkGroundCenter)
        tileUtil.replaceAllTiles(sprites.dungeon.purpleOuterWest2, sprites.dungeon.darkGroundCenter)
        tileUtil.replaceAllTiles(sprites.dungeon.purpleSwitchDown, sprites.dungeon.purpleOuterNorth0)
    }
    if (Green_Wall_Toggle == true) {
        tileUtil.setWalls(sprites.dungeon.greenOuterEast2, false)
        tileUtil.setWalls(sprites.dungeon.greenOuterNorth2, false)
        tileUtil.setWalls(sprites.dungeon.greenOuterSouth2, false)
        tileUtil.replaceAllTiles(sprites.dungeon.greenOuterEast2, sprites.dungeon.darkGroundCenter)
        tileUtil.replaceAllTiles(sprites.dungeon.greenOuterNorth2, sprites.dungeon.darkGroundCenter)
        tileUtil.replaceAllTiles(sprites.dungeon.greenOuterSouth2, sprites.dungeon.darkGroundCenter)
        tileUtil.replaceAllTiles(sprites.dungeon.greenSwitchDown, sprites.dungeon.greenOuterNorth0)
    }
}
mp.onScore(15, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Bruhs are here! They also throw rocks which follow a unique path, make sure the rocks don't hit you from above.", "Pigeon")
            })
            for (let index = 0; index <= 9; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnBruh()
            }
        }
    }
})
function SpawnApple (X: number, Y: number) {
    Snack = sprites.create(assets.image`Apple Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Apple")
    tiles.placeOnTile(Snack, tiles.getTileLocation(X, Y))
}
function SpawnMiniDino (Parent: Sprite) {
    Mini_Dino = sprites.create(assets.image`Mini Dino Image`, SpriteKind.Enemy)
    if (Level == 1) {
        tiles.placeOnRandomTile(Mini_Dino, sprites.swamp.swampTile16)
    } else if (Level == 2) {
        Mini_Dino.x = Parent.x
        Mini_Dino.y = Parent.y
    }
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Mini_Dino)
    Enemy_Health.setColor(5, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 50
    sprites.setDataString(Mini_Dino, "Enemy Type", "Mini Dino")
    sprites.setDataBoolean(Mini_Dino, "Activated?", true)
    animation.runImageAnimation(
    Mini_Dino,
    assets.animation`Mini Dino Animation`,
    200,
    true
    )
    Mini_Dino.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Below_Average_Speed)
}
function SpawnAkita () {
    RandomEnemy = assets.image`Akita`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(2, randint(0, 15))
    RandomEnemy.replace(14, randint(0, 15))
    RandomEnemy.replace(11, randint(0, 15))
    RandomEnemy.replace(13, randint(0, 15))
    RandomEnemy.replace(15, randint(1, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(2.1, 3)
    sprites.setDataNumber(RandomSprite, "Player", randint(1, 4))
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    if (sprites.readDataNumber(RandomSprite, "Player") == 1) {
        Enemy_Health.setColor(2, 15, 14)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 2) {
        Enemy_Health.setColor(8, 15, 12)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 3) {
        Enemy_Health.setColor(5, 15, 4)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 4) {
        Enemy_Health.setColor(7, 15, 6)
    }
    Enemy_Health.setBarBorder(1, 1)
    Enemy_Health.max = 5
    sprites.setDataString(RandomSprite, "Enemy Type", "Akita")
}
function SpawnDonut () {
    Snack = sprites.create(assets.image`Donut Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Donut")
    if (Map == 1) {
        tiles.placeOnTile(Snack, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Snack, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairWest, function (sprite, location) {
    Level += -1
    tiles.placeOnTile(sprite, location)
    for (let index = 0; index <= 3; index++) {
        if (Players[index + 1] == index + 1) {
            mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)).x += -25 * mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)).scale
        }
    }
    ChangeMap()
})
function InflictStatus (Type: string, Tickrate: number, Ticks: number, Target: Sprite) {
    story.startCutscene(function () {
        if (Type == "Venom") {
            sprites.setDataBoolean(Target, "Venomed?", true)
            Target.startEffect(effects.trail)
            for (let index = 0; index <= Ticks - 1; index++) {
                pause(Tickrate)
                if (sprites.readDataBoolean(Target, "Venomed?") == true) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(Target), MultiplayerState.life, -1)
                } else {
                    break;
                }
            }
            sprites.setDataBoolean(Target, "Venomed?", false)
            effects.clearParticles(Target)
        }
    })
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataNumber(sprite, "Player") != sprites.readDataNumber(otherSprite, "Player")) {
        if (sprites.readDataNumber(sprite, "Player") == 0 || (sprites.readDataNumber(otherSprite, "Player") == 0 || Game_Mode == "Versus")) {
            if (sprites.readDataString(sprite, "Enemy Type") == "Moral Dino") {
                sprite.follow(otherSprite, 75)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(sprite, "Player")), MultiplayerState.Damage_Multiplier)
                pause(500)
            }
            if (sprites.readDataString(otherSprite, "Enemy Type") == "Moral Dino") {
                otherSprite.follow(sprite, 75)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -15 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                pause(500)
            }
            if (sprites.readDataString(sprite, "Enemy Type") == "Dog") {
                sprite.follow(otherSprite, Average_Speed)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -5 * 1
                pause(500)
            }
            if (sprites.readDataString(otherSprite, "Enemy Type") == "Dog") {
                otherSprite.follow(sprite, Average_Speed)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -5 * 1
                pause(500)
            }
            if (sprites.readDataString(sprite, "Enemy Type") == "Cat") {
                sprite.follow(otherSprite, Fast_Speed)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15 * 1
                pause(500)
            }
            if (sprites.readDataString(otherSprite, "Enemy Type") == "Cat") {
                otherSprite.follow(sprite, Fast_Speed)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -15 * 1
                pause(500)
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (Game_Mode == "Versus" || Game_Mode == "Arcade" && sprites.readDataNumber(sprite, "Player") == 0) {
        if (sprites.readDataBoolean(sprite, "Has Status Bar?") == true) {
            music.play(music.createSoundEffect(WaveShape.Noise, 3300, 1400, 255, 0, 150, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            if (sprites.readDataString(sprite, "Enemy Type") == "Mushroom") {
            	
            } else if (sprites.readDataString(sprite, "Enemy Type") == "Crab") {
                sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                characterAnimations.setCharacterAnimationsEnabled(sprite, false)
                sprite.follow(mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))), 0)
                animation.runImageAnimation(
                sprite,
                assets.animation`Crab Shield Animation`,
                100,
                false
                )
                story.startCutscene(function () {
                    pause(randint(500, 2000))
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                    characterAnimations.setCharacterAnimationsEnabled(sprite, true)
                    sprite.follow(mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))), Average_Speed)
                    story.cancelCurrentCutscene()
                })
            }
            if (sprites.readDataString(otherSprite, "Projectile") == "Laser") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -3 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                pause(100)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Explosion") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -1 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                pause(100)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Football") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -2 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprites.destroy(otherSprite)
                sprite.follow(mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))), 0)
                sprite.startEffect(effects.bubbles, 2000)
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")))).value += 25
                pause(2000)
                sprite.follow(mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))), 5)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Heart") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -3 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprites.destroy(otherSprite)
                if (mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.life) < 100) {
                    mp.changePlayerStateBy(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.life, 1)
                }
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Star") {
                if (sprites.readDataBoolean(otherSprite, "Activated?") == false) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -20 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Star Hit Animation`,
                    190,
                    false
                    )
                    otherSprite.lifespan = 800
                    sprites.setDataBoolean(otherSprite, "Activated?", true)
                    for (let index = 0; index <= 7; index++) {
                        otherSprite.scale += 0.4
                        pause(100)
                    }
                } else {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -10 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                    pause(800)
                }
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Flash") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -1 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                pause(250)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Bubble") {
                animation.runImageAnimation(
                otherSprite,
                assets.animation`Bubble Shield Break Animation`,
                50,
                false
                )
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -2 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, true)
                pause(150)
                mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, false)
                sprites.destroy(otherSprite)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Laser Bullet") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -1 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprites.destroy(otherSprite)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Laser Sniper") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -20 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                pause(500)
                sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Explosive Bullet") {
                if (sprites.readDataBoolean(otherSprite, "Activated?") == false) {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Explosive Bullet`,
                    100,
                    false
                    )
                    otherSprite.lifespan = 300
                }
                sprites.setDataBoolean(otherSprite, "Activated?", true)
                otherSprite.scale = 3
                otherSprite.vx = 0
                otherSprite.vy = 0
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -2 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                pause(300)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Splitter") {
                otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                otherSprite.follow(sprite, 75)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -1 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                pause(500)
                otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Small Meteor") {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -3 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier)
                sprites.destroy(otherSprite)
            } else {
            	
            }
        }
    }
})
function SpawnBlueOrb () {
    Blue_Orb = sprites.create(assets.image`Blue Orb`, SpriteKind.Collectible)
    sprites.setDataString(Blue_Orb, "Collectible", "Blue Orb")
    if (Map == 1) {
        tiles.placeOnTile(Blue_Orb, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Blue_Orb, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
}
mp.onScore(70, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Glitches throw footballs that stun for 2 seconds! Either avoid them by changing your direction before getting hit or using Car which is stun immune.", "Pigeon")
            })
            for (let index = 0; index <= 14; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 9; index++) {
                SpawnBruh()
            }
        }
    }
})
mp.onScore(508, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Faults shoot fireballs that accelerate in speed. Make sure to avoid them before they become too fast to!", "Pigeon")
            })
            for (let index = 0; index <= 9; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 19; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 14; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 9; index++) {
                SpawnError()
            }
        }
    }
})
function SpawnIceCream () {
    Snack = sprites.create(assets.image`Ice Cream Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Ice Cream")
    if (Map == 1) {
        tiles.placeOnTile(Snack, tiles.getTileLocation(randint(0, 32), randint(0, 32)))
    } else if (Map != 1) {
        tiles.placeOnTile(Snack, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    }
}
mp.onScore(105, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            for (let index = 0; index <= 19; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 8; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 0; index++) {
                SpawnGlitch()
            }
        }
    }
})
function SpawnTaco () {
    Snack = sprites.create(assets.image`Taco Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Taco")
    tiles.placeOnRandomTile(Snack, assets.tile`transparency16`)
}
mp.onScore(35, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Glitches are arriving in 2 waves, they are tanky but slow. Crowd control attacks are useful agains them since they're usually close to eachother.", "Pigeon")
            })
            for (let index = 0; index <= 4; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 14; index++) {
                SpawnBruh()
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles10, function (sprite, location) {
    Level += 1
    ChangeMap()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectible, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    if (sprites.readDataString(otherSprite, "Collectible") == "Coin") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.score, 25)
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Burger") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 8)
        sprite.sx += 1.5
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -25)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Red Orb") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier, 2)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -10)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Blue Orb") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, 20)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier, -1)
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Yellow Orb") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.A_Energy_Requirement, -10)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.B_Energy_Requirement, -10)
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Ice Cream") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 1)
        sprite.sx += 5
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -50)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Cake") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 2)
        sprite.sx += 4.5
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -45)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Donut") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 3)
        sprite.sx += 4
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -40)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Pizza") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 6)
        sprite.sx += 2
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -30)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Taco") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 4)
        sprite.sx += 1
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -20)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Drumstick") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 10)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier, 1)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.A_Energy_Requirement, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.A_Energy_Requirement))
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.B_Energy_Requirement, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.B_Energy_Requirement))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Ham") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 15)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, sprite).value += -50
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Lemon") {
        sprites.destroy(otherSprite)
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, sprite).value += 100
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Cherry") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 20)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, 20)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
        pause(5000)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, -15)
        mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Strawberry") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 30)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.A_Energy_Requirement, -25)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.B_Energy_Requirement, -25)
        if (sprites.readDataBoolean(sprite, "Venomed?") == true) {
            sprites.setDataBoolean(sprite, "Venomed?", false)
        }
    } else if (sprites.readDataString(otherSprite, "Collectible") == "Apple") {
        sprites.destroy(otherSprite)
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 50)
    } else {
    	
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.setDataBoolean(status.spriteAttachedTo(), "Has Status Bar?", false)
    if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Random") {
        info.changeScoreBy(1)
    } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Bruh") {
        info.changeScoreBy(2)
    } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Glitch") {
        info.changeScoreBy(3)
    } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Error") {
        info.changeScoreBy(4)
    } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Fault") {
        info.changeScoreBy(5)
    } else if (!(sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Moral Dino")) {
        info.changeScoreBy(statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, status.spriteAttachedTo()).max)
        if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Mushroom") {
            pause(500)
            Flash = sprites.createProjectileFromSprite(assets.image`Flash Image`, status.spriteAttachedTo(), 0, 0)
            sprites.setDataString(Flash, "Projectile", "Flash")
            sprites.setDataNumber(Flash, "Player", 0)
            Flash.z = -1
            Flash.scale = 3
            Flash.lifespan = 3000
            Flash.setFlag(SpriteFlag.AutoDestroy, false)
            Flash.setFlag(SpriteFlag.DestroyOnWall, false)
            Flash.setFlag(SpriteFlag.GhostThroughWalls, true)
            animation.runImageAnimation(
            Flash,
            assets.animation`Flash Animation`,
            500,
            false
            )
        }
    }
    if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Evil Princess" || sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Big Dino" || (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Zombie 4" || sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Shark") || sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Bug") {
        if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Evil Princess") {
            Classes[3] = 1
            game.setGameOverMessage(true, "Triumph + Obtained Princess!")
        } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Big Dino") {
            Classes[4] = 1
            game.setGameOverMessage(true, "Triumph + Obtained Hero Dino!")
        } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Zombie 4") {
            Classes[6] = 1
            game.setGameOverMessage(true, "Triumph + Obtained Car!")
        } else if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Shark") {
            Classes[5] = 1
            game.setGameOverMessage(true, "Triumph + Obtained Duck!")
        } else {
            game.setGameOverMessage(true, "Triumph!")
        }
        blockSettings.writeNumberArray("Classes", Classes)
        blockSettings.writeNumber("Cash", blockSettings.readNumber("Cash") + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score) + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score) + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Three), MultiplayerState.score) + mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Four), MultiplayerState.score)))))
        game.gameOver(true)
    } else {
        sprites.destroy(status.spriteAttachedTo())
    }
})
mp.onScore(1267, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Bug's other attack are laser snipers. They're powerful and can ricochet off all walls! It's best to stay away from the edge of the map to avoid getting hit twice with this move! Do your best! You came this far!", "Pigeon")
            })
            for (let index = 0; index <= 3; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 9; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 19; index++) {
                SpawnError()
            }
            for (let index = 0; index <= 34; index++) {
                SpawnFault()
            }
            for (let index = 0; index <= 0; index++) {
                SpawnBug()
            }
        }
    }
})
function SpawnZombie4 () {
    Zombie_4 = sprites.create(assets.image`Zombie 4 Image`, SpriteKind.Enemy)
    sprites.setDataString(Zombie_4, "Enemy Type", "Zombie 4")
    tiles.placeOnTile(Zombie_4, tiles.getTileLocation(randint(0, 64), randint(0, randint(5, 5))))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Zombie_4)
    Enemy_Health.setColor(2, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 50
    animation.runImageAnimation(
    Zombie_4,
    assets.animation`Zombie 4 Animation`,
    200,
    true
    )
    Zombie_4.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (Game_Mode == "Versus" || (sprites.readDataNumber(sprite, "Player") == 0 || sprites.readDataNumber(otherSprite, "Player") == 0)) {
        if (sprites.readDataNumber(otherSprite, "Player") != sprites.readDataNumber(sprite, "Player")) {
            if (sprites.readDataString(sprite, "Projectile") == sprites.readDataString(otherSprite, "Projectile")) {
                if (sprites.readDataString(sprite, "Projectile") == "Bubble") {
                	
                }
            } else if (sprites.readDataString(sprite, "Projectile") == "Bubble") {
                music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                animation.runImageAnimation(
                sprite,
                assets.animation`Bubble Shield Break Animation`,
                50,
                false
                )
                if (sprites.readDataNumber(sprite, "Player") != 0) {
                    mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(sprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, true)
                    pause(150)
                    mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(sprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, false)
                } else {
                    pause(150)
                    sprites.setDataNumber(Shark, "Attack", 0)
                    Shark.setFlag(SpriteFlag.GhostThroughSprites, false)
                }
                sprites.destroy(otherSprite)
                sprites.destroy(sprite)
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Bubble") {
                music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                animation.runImageAnimation(
                otherSprite,
                assets.animation`Bubble Shield Break Animation`,
                50,
                false
                )
                if (sprites.readDataNumber(otherSprite, "Player") != 0) {
                    mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, true)
                    pause(150)
                    mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, false)
                } else {
                    pause(150)
                    sprites.setDataNumber(Shark, "Attack", 0)
                    Shark.setFlag(SpriteFlag.GhostThroughSprites, false)
                }
                sprites.destroy(sprite)
                sprites.destroy(otherSprite)
            } else {
            	
            }
        }
    }
})
mp.onScore(201, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Errors can shoot explosive bullets that explode on impact. But if nothing gets hit by them, they are much less problematic.", "Pigeon")
            })
            for (let index = 0; index <= 4; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 24; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 9; index++) {
                SpawnGlitch()
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (Game_Mode == "Versus" || Game_Mode == "Arcade" && sprites.readDataNumber(otherSprite, "Player") == 0) {
        if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) != 2) {
            if (sprites.readDataNumber(otherSprite, "Player") != 0) {
                sprites.setDataNumber(otherSprite, "Damage Multiplier", mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier))
            } else {
                sprites.setDataNumber(otherSprite, "Damage Multiplier", 1)
            }
            if (sprites.readDataNumber(otherSprite, "Player") != mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)) {
                scene.cameraShake(4, 500)
                music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                if (sprites.readDataString(otherSprite, "Projectile") == "Laser") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -3 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                    pause(100)
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Explosion") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                    pause(100)
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Football") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -2 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprites.destroy(otherSprite)
                    mp.setPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed) / 1000)
                    mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
                    sprite.startEffect(effects.bubbles, 2000)
                    if (sprites.readDataNumber(otherSprite, "Player") != 0) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")))).value += 25
                    }
                    pause(2000)
                    mp.setPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed) * 1000)
                    mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Heart") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -3 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprites.destroy(otherSprite)
                    if (mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.life) < 100 && sprites.readDataNumber(otherSprite, "Player") != 0) {
                        mp.changePlayerStateBy(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.life, 1)
                    }
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Star") {
                    if (sprites.readDataBoolean(otherSprite, "Activated?") == false) {
                        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -20 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                        animation.runImageAnimation(
                        otherSprite,
                        assets.animation`Star Hit Animation`,
                        190,
                        false
                        )
                        otherSprite.lifespan = 800
                        sprites.setDataBoolean(otherSprite, "Activated?", true)
                        if (Players[mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)] == mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)) {
                            statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerBySprite(sprite))).value += -25
                        }
                        for (let index = 0; index <= 7; index++) {
                            otherSprite.scale += 0.4
                            pause(100)
                        }
                    } else {
                        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -10 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                        pause(800)
                    }
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Flash") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                    pause(250)
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Bubble") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Bubble Shield Break Animation`,
                    50,
                    false
                    )
                    if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) < 1) {
                        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -2 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    }
                    if (sprites.readDataNumber(otherSprite, "Player") != 0) {
                        mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, true)
                        pause(150)
                        mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))).setFlag(SpriteFlag.GhostThroughSprites, false)
                    } else {
                        pause(150)
                        sprites.setDataNumber(Shark, "Attack", 0)
                        Shark.setFlag(SpriteFlag.GhostThroughSprites, false)
                    }
                    sprites.destroy(otherSprite)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Laser Bullet") {
                    sprites.destroy(otherSprite)
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Laser Sniper") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -20 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                    pause(500)
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Explosive Bullet") {
                    if (sprites.readDataBoolean(otherSprite, "Activated?") == false) {
                        animation.runImageAnimation(
                        otherSprite,
                        assets.animation`Explosive Bullet`,
                        100,
                        false
                        )
                        otherSprite.lifespan = 300
                    }
                    sprites.setDataBoolean(otherSprite, "Activated?", true)
                    otherSprite.scale = 3
                    otherSprite.vx = 0
                    otherSprite.vy = 0
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -2 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    pause(300)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Splitter") {
                    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                    otherSprite.follow(sprite, 75)
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    pause(500)
                    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                } else if (sprites.readDataString(otherSprite, "Projectile") == "Small Meteor") {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -3 * sprites.readDataNumber(otherSprite, "Damage Multiplier"))
                    sprites.destroy(otherSprite)
                } else {
                	
                }
            }
        }
    } else if (Game_Mode == "Arcade") {
        if (mp.getPlayerBySprite(sprite) != mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player"))) {
            if (sprites.readDataString(otherSprite, "Projectile") == "Heart") {
                if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.life) < 250) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 1 * mp.getPlayerState(mp.getPlayerByNumber(sprites.readDataNumber(otherSprite, "Player")), MultiplayerState.Damage_Multiplier))
                    sprites.destroy(otherSprite)
                }
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Bubble") {
                if (sprites.readDataBoolean(mp.getPlayerSprite(mp.getPlayerBySprite(sprite)), "Has Bubble?") == false) {
                    sprites.setDataBoolean(mp.getPlayerSprite(mp.getPlayerBySprite(sprite)), "Has Bubble?", true)
                    Bubble = sprites.createProjectileFromSprite(assets.image`Bubble Shield Image`, mp.getPlayerSprite(mp.getPlayerBySprite(sprite)), 0, 0)
                    sprites.setDataString(Bubble, "Projectile", "Bubble")
                    sprites.setDataNumber(Bubble, "Player", mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number))
                    Bubble.setFlag(SpriteFlag.DestroyOnWall, false)
                    Bubble.setFlag(SpriteFlag.AutoDestroy, false)
                    Bubble.setFlag(SpriteFlag.GhostThroughWalls, true)
                    Bubble.scale = 2
                    Bubble.z = -1
                    Bubble.follow(mp.getPlayerSprite(mp.getPlayerBySprite(sprite)), 500)
                }
            } else if (sprites.readDataString(otherSprite, "Projectile") == "Football") {
                sprites.setDataBoolean(mp.getPlayerSprite(mp.getPlayerBySprite(sprite)), "Has football?", true)
                sprites.destroy(otherSprite)
            }
        }
    } else {
    	
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairEast, function (sprite, location) {
    Level += 1
    tiles.placeOnTile(sprite, location)
    for (let index = 0; index <= 3; index++) {
        if (Players[index + 1] == index + 1) {
            mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)).x += 25 * mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)).scale
        }
    }
    ChangeMap()
})
function SpawnBat () {
    Bat = sprites.create(assets.image`Bat Image`, SpriteKind.Enemy)
    sprites.setDataString(Bat, "Enemy Type", "Bat")
    Bat.setFlag(SpriteFlag.GhostThroughTiles, true)
    tiles.placeOnRandomTile(Bat, sprites.dungeon.darkGroundCenter)
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Bat)
    Enemy_Health.setColor(11, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 20
    characterAnimations.loopFrames(
    Bat,
    assets.animation`Bat Left Animation`,
    100,
    characterAnimations.rule(Predicate.Moving)
    )
    Bat.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Fast_Speed)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Exit`, function (sprite, location) {
    Level += -1
    ChangeMap()
})
function SpawnBruh () {
    RandomEnemy = assets.image`Bruh`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipY()
    }
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(15, randint(1, 15))
    RandomEnemy.replace(1, randint(0, 15))
    RandomEnemy.replace(5, randint(0, 15))
    RandomEnemy.replace(4, randint(0, 15))
    RandomEnemy.replace(14, randint(0, 15))
    RandomEnemy.replace(12, randint(0, 15))
    RandomEnemy.replace(13, randint(0, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(1, 1)
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 60
    sprites.setDataString(RandomSprite, "Enemy Type", "Bruh")
    RandomSprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Fast_Speed)
}
/**
 * Things to work on.
 * 
 * Speed not being correct on: Knight, Ship, and Car
 */
function SpawnRandom () {
    RandomEnemy = image.create(16, 16)
    for (let index = 0; index <= 16; index++) {
        RandomEnemy.drawRect(randint(0, 16), randint(0, 16), 5, 5, randint(1, 15))
        RandomEnemy.fillRect(randint(0, 16), randint(0, 16), 5, 5, randint(0, 15))
    }
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipY()
    }
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(5, randint(1, 15))
    RandomEnemy.replace(4, randint(1, 15))
    RandomEnemy.replace(14, randint(1, 15))
    RandomEnemy.replace(6, randint(1, 15))
    RandomEnemy.replace(15, randint(1, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(1, 3)
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 100
    sprites.setDataString(RandomSprite, "Enemy Type", "Random")
    RandomSprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Average_Speed)
}
function SpawnZombie3 () {
    Zombie_3 = sprites.create(assets.image`Zombie 3 Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Zombie_3, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Zombie_3)
    Enemy_Health.setColor(7, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 1
    sprites.setDataString(Zombie_3, "Enemy Type", "Zombie 2")
    animation.runImageAnimation(
    Zombie_3,
    assets.animation`Zombie 3 Animation`,
    200,
    true
    )
    Zombie_3.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
statusbars.onStatusReached(StatusBarKind.EnemyHealth, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 75, function (status) {
    if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Big Dino") {
        SpawnEgg("Mini", status.spriteAttachedTo())
    } else if (false) {
    	
    }
})
mp.onScore(643, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Faults have one more attack being an explosion. Explosions always are at mid-range. So, staying at close range or far range will make you safe from them. Though keep in mind at close range, fireballs can hit you without time to react.", "Pigeon")
            })
            for (let index = 0; index <= 3; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 19; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 29; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnError()
            }
            for (let index = 0; index <= 0; index++) {
                SpawnFault()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnAkita()
            }
        }
    }
})
function SpawnCat () {
    RandomEnemy = assets.image`Cat`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(2, randint(0, 15))
    RandomEnemy.replace(14, randint(0, 15))
    RandomEnemy.replace(11, randint(0, 15))
    RandomEnemy.replace(13, randint(0, 15))
    RandomEnemy.replace(15, randint(1, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(1, 1)
    sprites.setDataNumber(RandomSprite, "Player", randint(1, 4))
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    if (sprites.readDataNumber(RandomSprite, "Player") == 1) {
        Enemy_Health.setColor(2, 15, 14)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 2) {
        Enemy_Health.setColor(8, 15, 12)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 3) {
        Enemy_Health.setColor(5, 15, 4)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 4) {
        Enemy_Health.setColor(7, 15, 6)
    }
    Enemy_Health.setBarBorder(1, 1)
    Enemy_Health.max = 10
    sprites.setDataString(RandomSprite, "Enemy Type", "Cat")
}
controller.menu.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Start_Battle == 0) {
        if (!(story.isMenuOpen())) {
            story.showPlayerChoices("Nevermind", "Delete save")
            if (story.checkLastAnswer("Delete save")) {
                blockSettings.clear()
            }
            game.reset()
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 1) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) != 10) {
            mp.setPlayerState(player2, MultiplayerState.Direction, 3)
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Wizard Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            	
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Princess Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Ship Down Animation`,
                200,
                true
                )
            }
        } else {
            if (sprites.readDataBoolean(Small_Meteor, "Activated?") == true) {
                Small_Meteor.pow += -10
            } else {
                mp.setPlayerState(player2, MultiplayerState.Direction, 3)
            }
        }
    }
})
function SpawnCrab () {
    Crab = sprites.create(assets.image`Crab Image`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(Crab, sprites.castle.tilePath5)
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Crab)
    Enemy_Health.setColor(5, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 20
    sprites.setDataString(Crab, "Enemy Type", "Crab")
    characterAnimations.loopFrames(
    Crab,
    assets.animation`Crab Walk Animation`,
    200,
    characterAnimations.rule(Predicate.Moving)
    )
    Crab.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Average_Speed)
}
function SpawnBurger () {
    Snack = sprites.create(assets.image`Burger Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Burger")
    tiles.placeOnRandomTile(Snack, assets.tile`transparency16`)
}
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Released, function (player2) {
    if (!(story.isMenuOpen())) {
        if (Start_Battle == 0) {
        	
        } else if (Start_Battle == 1) {
            if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                    sprites.destroy(Flash)
                    mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
                    if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == true) {
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 1)
                        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                        pause((mp.getPlayerState(player2, MultiplayerState.Speed) - 125) * 10)
                        effects.clearParticles(mp.getPlayerSprite(player2))
                        mp.setPlayerState(player2, MultiplayerState.Speed, mp.getPlayerState(player2, MultiplayerState.Speed) - (mp.getPlayerState(player2, MultiplayerState.Speed) - 125))
                        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                        mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                    }
                    sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", false)
                } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                    if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == true) {
                        mp.setPlayerState(player2, MultiplayerState.Speed, mp.getPlayerState(player2, MultiplayerState.Speed) * 1.5)
                        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                    }
                    sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", false)
                    mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
                    sprites.setDataBoolean(Small_Meteor, "Activated?", false)
                    mp.getPlayerSprite(player2).follow(Small_Meteor, 0)
                    Small_Meteor.lifespan = 5000
                    Small_Meteor.throwDart()
                    animation.runImageAnimation(
                    Small_Meteor,
                    assets.animation`Small Asteroid Animation`,
                    200,
                    true
                    )
                } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                    mp.setPlayerState(player2, MultiplayerState.Attacking, 1)
                    characterAnimations.setCharacterAnimationsEnabled(mp.getPlayerSprite(player2), false)
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
                    }
                    pause(500)
                    mp.setPlayerState(player2, MultiplayerState.Charge_Up_Time, 0)
                    mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                    characterAnimations.setCharacterAnimationsEnabled(mp.getPlayerSprite(player2), true)
                } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                	
                } else {
                	
                }
            }
        } else {
        	
        }
    }
})
function SpawnLemon () {
    Snack = sprites.create(assets.image`Lemon Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Lemon")
    tiles.placeOnRandomTile(Snack, assets.tile`transparency16`)
}
function SpawnShark () {
    Shark = sprites.create(assets.image`Shark Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Shark, tiles.getTileLocation(randint(0, 34), randint(37, 50)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Shark)
    Enemy_Health.setColor(11, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 100
    sprites.setDataString(Shark, "Enemy Type", "Shark")
    characterAnimations.loopFrames(
    Shark,
    assets.animation`Shark Animation`,
    200,
    characterAnimations.rule(Predicate.Moving)
    )
    Shark.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
function SpawnBigDino () {
    Big_Dino = sprites.create(assets.image`Big Dino Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Big_Dino, tiles.getTileLocation(7, 2))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Big_Dino)
    Enemy_Health.setColor(5, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 250
    Enemy_Health.value = Enemy_Health.max
    sprites.setDataString(Big_Dino, "Enemy Type", "Big Dino")
    characterAnimations.loopFrames(
    Big_Dino,
    assets.animation`Big Dino Animation`,
    200,
    characterAnimations.rule(Predicate.Moving)
    )
    Big_Dino.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
function SpawnCherry (X: number, Y: number) {
    Snack = sprites.create(assets.image`Cherry Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Cherry")
    tiles.placeOnTile(Snack, tiles.getTileLocation(X, Y))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (Game_Mode == "Versus") {
        if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Attacking) < 2) {
            if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) == 1) {
                scene.cameraShake(4, 500)
                music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 2) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(otherSprite), MultiplayerState.life, -1 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Charge_Up_Time) * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier))
                    mp.setPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed, mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed) / 1000)
                    mp.moveWithButtons(mp.getPlayerBySprite(otherSprite), mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed))
                    otherSprite.startEffect(effects.warmRadial, 500)
                    pause(500)
                    mp.setPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed, mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed) * 1000)
                    mp.moveWithButtons(mp.getPlayerBySprite(otherSprite), mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Speed))
                } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 3) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(otherSprite), MultiplayerState.life, -6 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier))
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerBySprite(sprite))).value += 2
                } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 5) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(otherSprite), MultiplayerState.life, -18 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier))
                    if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 1) {
                        otherSprite.y += -120
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 2) {
                        otherSprite.x += 120
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 3) {
                        otherSprite.y += 120
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 4) {
                        otherSprite.x += -120
                    } else {
                    	
                    }
                } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 7) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(otherSprite), MultiplayerState.life, -1 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier))
                } else {
                	
                }
            }
        }
        if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) < 2) {
            if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Attacking) == 1) {
                scene.cameraShake(4, 500)
                music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Class) == 2) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1 * mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Charge_Up_Time) * mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Damage_Multiplier))
                    mp.setPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed) / 1000)
                    mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
                    sprite.startEffect(effects.warmRadial, 500)
                    pause(500)
                    mp.setPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed) * 1000)
                    mp.moveWithButtons(mp.getPlayerBySprite(sprite), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
                } else if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Class) == 3) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -6 * mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Damage_Multiplier))
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerBySprite(otherSprite))).value += 2
                } else if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Class) == 5) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -18 * mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Damage_Multiplier))
                    if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Direction) == 1) {
                        sprite.y += -120
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Direction) == 2) {
                        sprite.x += 120
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Direction) == 3) {
                        sprite.y += 120
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Direction) == 4) {
                        sprite.x += -120
                    } else {
                    	
                    }
                } else if (mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Class) == 7) {
                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1 * mp.getPlayerState(mp.getPlayerBySprite(otherSprite), MultiplayerState.Damage_Multiplier))
                } else {
                	
                }
            }
        }
        pause(500)
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Start_Battle == 1) {
        if (!(story.isMenuOpen())) {
            Cheats = true
            story.showPlayerChoices("Health", "Speed", "Mana", "Damage")
            for (let index = 0; index <= 3; index++) {
                if (Players[index + 1] == index + 1) {
                    if (story.checkLastAnswer("Health")) {
                        mp.setPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.life, 10000)
                    } else if (story.checkLastAnswer("Speed")) {
                        mp.changePlayerStateBy(mp.getPlayerByNumber(index + 1), MultiplayerState.Speed, 10000)
                        mp.moveWithButtons(mp.getPlayerByNumber(index + 1), mp.getPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.Speed), mp.getPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.Speed))
                    } else if (story.checkLastAnswer("Mana")) {
                        mp.setPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.A_Energy_Requirement, 0)
                        mp.setPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.B_Energy_Requirement, 0)
                    } else if (story.checkLastAnswer("Damage")) {
                        mp.changePlayerStateBy(mp.getPlayerByNumber(index + 1), MultiplayerState.Damage_Multiplier, 1)
                    }
                }
            }
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Released, function (player2) {
    if (!(story.isMenuOpen())) {
        if (Start_Battle == 0) {
        	
        } else if (Start_Battle == 1) {
            if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                    if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == true) {
                        mp.setPlayerState(player2, MultiplayerState.Speed, mp.getPlayerState(player2, MultiplayerState.Speed) * 3)
                        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
                    }
                    sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", false)
                    mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
                    characterAnimations.setCharacterAnimationsEnabled(mp.getPlayerSprite(player2), true)
                }
            }
        } else {
        	
        }
    }
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
            200,
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
            300,
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
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
            sprites.destroy(Hero_Dino)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Princess = sprites.create(assets.image`Princess Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Princess.sayText("LOCKED")
            } else {
                Princess.sayText("Prncss")
            }
            Princess.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Princess,
            assets.animation`Princess Animation`,
            200,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
            sprites.destroy(Duck)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Hero_Dino = sprites.create(assets.image`Hero Dino`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Hero_Dino.sayText("LOCKED")
            } else {
                Hero_Dino.sayText("H Dino")
            }
            Hero_Dino.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Hero_Dino,
            assets.animation`Hero Dino Left Animation`,
            300,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
            sprites.destroy(Car)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Duck = sprites.create(assets.image`Duck Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Duck.sayText("LOCKED")
            } else {
                Duck.sayText("Duck")
            }
            Duck.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Duck,
            assets.animation`Duck Right Animation`,
            200,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
            sprites.destroy(Ship)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Car = sprites.create(assets.image`Car Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Car.sayText("LOCKED")
            } else {
                Car.sayText("Car")
            }
            Car.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
            sprites.destroy(Plane)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Ship = sprites.create(assets.image`Ship Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Ship.sayText("LOCKED")
            } else {
                Ship.sayText("Ship")
            }
            Ship.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
            sprites.destroy(Meteor)
            mp.changePlayerStateBy(player2, MultiplayerState.Class, -1)
            Plane = sprites.create(assets.image`Plane Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Plane.sayText("LOCKED")
            } else {
                Plane.sayText("Plane")
            }
            Plane.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Plane,
            assets.animation`Plane Left Animation`,
            50,
            true
            )
        } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
            sprites.destroy(Wizard)
            mp.setPlayerState(player2, MultiplayerState.Class, 10)
            Meteor = sprites.create(assets.image`Asteroid Image`, SpriteKind.Visual)
            if (blockSettings.readNumberArray("Classes")[mp.getPlayerState(player2, MultiplayerState.Class) - 1] == 0) {
                Meteor.sayText("LOCKED")
            } else {
                Meteor.sayText("Meteor")
            }
            Meteor.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
            animation.runImageAnimation(
            Meteor,
            assets.animation`Asteroid Animation`,
            300,
            true
            )
        }
    } else if (Start_Battle == 1) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) != 10) {
            mp.setPlayerState(player2, MultiplayerState.Direction, 4)
            mp.setPlayerState(player2, MultiplayerState.Side_Direction, 4)
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Wizard Left Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            	
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
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Hero Dino Left Animation`,
                300,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Duck Left Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Ship Left Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Plane Left Animation`,
                50,
                true
                )
            }
        } else {
            if (sprites.readDataBoolean(Small_Meteor, "Activated?") == true) {
                Small_Meteor.angle += 10
            } else {
                mp.setPlayerState(player2, MultiplayerState.Direction, 4)
            }
        }
    } else {
    	
    }
})
mp.onScore(997, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Bug can also shoot laser bullets; keep in mind they fire it in a clockwise pattern. Make sure to avoid it if you can!", "Pigeon")
            })
            for (let index = 0; index <= 4; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 34; index++) {
                SpawnError()
            }
            for (let index = 0; index <= 19; index++) {
                SpawnFault()
            }
        }
    }
})
mp.onScore(802, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Bug is coming in 2 waves! They have 1500 health! They're mega slow however. Single target damage would be optimal in taking out this foe, I'd recccommend Ship's laser bullets.", "Pigeon")
            })
            for (let index = 0; index <= 4; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 14; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 24; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 14; index++) {
                SpawnError()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnFault()
            }
        }
    }
})
function SpawnHam () {
    Snack = sprites.create(assets.image`Ham Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Ham")
    tiles.placeOnRandomTile(Snack, sprites.castle.tileDarkGrass1)
}
mp.onScore(398, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Faults are subsequent. They deal a huge amount of damage, have good HP, but aren't really that fast. You can easily outrun them.", "Pigeon")
            })
            for (let index = 0; index <= 14; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 14; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 14; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnError()
            }
        }
    }
})
function SpawnGlitch () {
    RandomEnemy = assets.image`Glitch`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipY()
    }
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(9, randint(0, 15))
    RandomEnemy.replace(1, randint(0, 15))
    RandomEnemy.replace(6, randint(0, 15))
    RandomEnemy.replace(15, randint(1, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(2, 3.5)
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 700
    Enemy_Health.value = Enemy_Health.max
    sprites.setDataString(RandomSprite, "Enemy Type", "Glitch")
    RandomSprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Below_Average_Speed)
}
function SpawnMushroom () {
    Mushroom = sprites.create(assets.image`Mushroom Image`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(Mushroom, sprites.swamp.swampTile9)
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Mushroom)
    Enemy_Health.setColor(13, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 10
    sprites.setDataString(Mushroom, "Enemy Type", "Mushroom")
    animation.runImageAnimation(
    Mushroom,
    assets.animation`Mushroom Walk`,
    200,
    true
    )
    Mushroom.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Above_Average_Speed)
}
function SpawnClownFish () {
    Clown_Fish = sprites.create(assets.image`Clown Fish Image`, SpriteKind.Enemy)
    tiles.placeOnTile(Clown_Fish, tiles.getTileLocation(randint(13, 38), randint(9, 22)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Clown_Fish)
    Enemy_Health.setColor(4, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 6
    animation.runImageAnimation(
    Clown_Fish,
    assets.animation`Clown Fish Animation`,
    200,
    true
    )
    Clown_Fish.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Below_Average_Speed)
}
mp.onLifeZero(function (player2) {
    if (Game_Mode == "Arcade") {
        if (Cheats == true) {
            for (let index = 0; index <= 3; index++) {
                if (Players[index + 1] == index + 1) {
                    mp.setPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.score, 0)
                }
            }
        }
        blockSettings.writeNumber("Cash", blockSettings.readNumber("Cash") + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score) + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score) + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Three), MultiplayerState.score) + mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Four), MultiplayerState.score)))))
        game.gameOver(false)
    } else {
        sprites.destroy(mp.getPlayerSprite(player2))
        Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] = -1
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
        scene.cameraShake(8, 500)
        if (Players[2] != 2 && Players[3] != 3 && Players[4] != 4) {
            color.setPalette(
            color.GrayScale
            )
            for (let index = 0; index <= 14; index++) {
                color.setColor(index + 0, color.__hsv(0, 255, index * 17))
            }
            pause(2000)
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.One))
        } else if (Players[1] != 1 && Players[3] != 3 && Players[4] != 4) {
            color.setPalette(
            color.GrayScale
            )
            for (let index = 0; index <= 14; index++) {
                color.setColor(index + 0, color.__hsv(180, 255, index * 17))
            }
            pause(2000)
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Two))
        } else if (Players[1] != 1 && Players[2] != 2 && Players[4] != 4) {
            color.setPalette(
            color.GrayScale
            )
            for (let index = 0; index <= 14; index++) {
                color.setColor(index + 0, color.__hsv(30, 255, index * 17))
            }
            pause(2000)
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Three))
        } else if (Players[1] != 1 && Players[2] != 2 && Players[3] != 3) {
            color.setPalette(
            color.GrayScale
            )
            for (let index = 0; index <= 14; index++) {
                color.setColor(index + 0, color.__hsv(60, 255, index * 17))
            }
            pause(2000)
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Four))
        }
    }
})
function SpawnFault () {
    RandomEnemy = assets.image`Fault`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipY()
    }
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(15, randint(1, 15))
    RandomEnemy.replace(1, randint(0, 15))
    RandomEnemy.replace(8, randint(0, 15))
    RandomEnemy.replace(9, randint(0, 15))
    RandomEnemy.replace(6, randint(0, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(1, 3)
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 400
    Enemy_Health.value = Enemy_Health.max
    sprites.setDataString(RandomSprite, "Enemy Type", "Fault")
    RandomSprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Average_Speed)
}
mp.onScore(286, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Errors have another attack being Splitters. Splitters can lock onto you and pursue you before it disintegrates. The best counter would be avoiding it but the next best things you can do is outrun it if you're fast enough or passing the splitter onto someone else. Hero Dino is great for this since she can spawn Moral Dinos to take the damage from the Splitters.", "Pigeon")
            })
            for (let index = 0; index <= 9; index++) {
                SpawnRandom()
            }
            for (let index = 0; index <= 3; index++) {
                SpawnBruh()
            }
            for (let index = 0; index <= 29; index++) {
                SpawnGlitch()
            }
            for (let index = 0; index <= 0; index++) {
                SpawnError()
            }
            for (let index = 0; index <= 4; index++) {
                SpawnDog()
                SpawnCat()
            }
        }
    }
})
mp.onScore(5, function (player2) {
    if (Map == 5) {
        if (Game_Mode == "Arcade") {
            Wave += 1
            story.startCutscene(function () {
                story.printCharacterText("Bruhs are coming next wave, they are incredibly fast! Having a tool that slows or stop their movements will show how truly weak they are.", "Pigeon")
            })
            for (let index = 0; index <= 9; index++) {
                SpawnRandom()
            }
        }
    }
})
function SpawnDog () {
    RandomEnemy = assets.image`Dog`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(5, randint(0, 15))
    RandomEnemy.replace(4, randint(0, 15))
    RandomEnemy.replace(14, randint(0, 15))
    RandomEnemy.replace(6, randint(0, 15))
    RandomEnemy.replace(15, randint(1, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(1.4, 2)
    sprites.setDataNumber(RandomSprite, "Player", randint(1, 4))
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    if (sprites.readDataNumber(RandomSprite, "Player") == 1) {
        Enemy_Health.setColor(2, 15, 14)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 2) {
        Enemy_Health.setColor(8, 15, 12)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 3) {
        Enemy_Health.setColor(5, 15, 4)
    } else if (sprites.readDataNumber(RandomSprite, "Player") == 4) {
        Enemy_Health.setColor(7, 15, 6)
    }
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 1)
    Enemy_Health.max = 50
    sprites.setDataString(RandomSprite, "Enemy Type", "Dog")
}
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    if (Game_Mode == "Versus") {
        sprite.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
function SpawnDrumstick () {
    Snack = sprites.create(assets.image`Drumstick Image`, SpriteKind.Collectible)
    sprites.setDataString(Snack, "Collectible", "Drumstick")
    tiles.placeOnRandomTile(Snack, sprites.castle.tileGrass1)
}
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Repeated, function (player2) {
	
})
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player2) {
    if (Start_Battle == 1) {
        if (mp.getPlayerState(player2, MultiplayerState.Class) != 10) {
            mp.setPlayerState(player2, MultiplayerState.Direction, 1)
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Wizard Forward Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
            	
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Princess Up Animation`,
                200,
                true
                )
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                animation.runImageAnimation(
                mp.getPlayerSprite(player2),
                assets.animation`Ship Up Animation`,
                200,
                true
                )
            }
        } else {
            if (sprites.readDataBoolean(Small_Meteor, "Activated?") == true) {
                Small_Meteor.pow += 10
            } else {
                mp.setPlayerState(player2, MultiplayerState.Direction, 1)
            }
        }
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (sprites.readDataBoolean(sprite, "Activated?") == false) {
        if (sprites.readDataString(sprite, "Enemy Type") == "Moral Dino") {
            Moral_Dino = sprites.create(assets.image`Egg Image`, SpriteKind.Enemy)
            sprites.setDataString(Moral_Dino, "Enemy Type", "Moral Dino")
            Moral_Dino.setFlag(SpriteFlag.GhostThroughSprites, false)
            sprites.setDataNumber(Moral_Dino, "Player", sprites.readDataNumber(sprite, "Player"))
            sprites.setDataBoolean(Moral_Dino, "Activated?", true)
            Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
            Enemy_Health.attachToSprite(Moral_Dino)
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).z = -1
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).max = 15
            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setBarBorder(1, 15)
            if (Players[2] == 2 || Players[3] == 3 || Players[4] == 4) {
                if (sprites.readDataNumber(sprite, "Player") == 1) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(2, 15)
                } else if (sprites.readDataNumber(sprite, "Player") == 2) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(8, 15)
                } else if (sprites.readDataNumber(sprite, "Player") == 3) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(5, 15)
                } else if (sprites.readDataNumber(sprite, "Player") == 4) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(7, 15)
                }
            } else {
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Moral_Dino).setColor(4, 15)
            }
            Moral_Dino.setPosition(sprite.x, sprite.y)
            animation.runImageAnimation(
            Moral_Dino,
            assets.animation`Moral Dino Left Animation`,
            200,
            false
            )
            characterAnimations.loopFrames(
            Moral_Dino,
            assets.animation`Moral Dino Left Animation`,
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            characterAnimations.loopFrames(
            Moral_Dino,
            assets.animation`Moral Dino Right Animation`,
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
        } else if (sprites.readDataString(sprite, "Enemy Type") == "Mini Dino") {
            SpawnMiniDino(sprite)
        }
    }
})
statusbars.onStatusReached(StatusBarKind.EnemyHealth, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 25, function (status) {
    if (sprites.readDataString(status.spriteAttachedTo(), "Enemy Type") == "Big Dino") {
        SpawnEgg("Mini", status.spriteAttachedTo())
    } else if (false) {
    	
    }
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    if (sprites.readDataString(sprite, "Projectile") == "Bubble") {
        sprites.setDataBoolean(mp.getPlayerSprite(mp.getPlayerByNumber(sprites.readDataNumber(sprite, "Player"))), "Has Bubble?", false)
    }
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Repeated, function (player2) {
    if (!(story.isMenuOpen())) {
        if (Start_Battle == 0) {
        	
        } else if (Start_Battle == 1) {
            if (Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] == mp.getPlayerProperty(player2, mp.PlayerProperty.Number)) {
                sprites.destroy(Buttons)
                if (statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value >= mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)) {
                    if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                        Flash.scale += 0.2
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                        if (sprites.readDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?") == true) {
                            mp.changePlayerStateBy(player2, MultiplayerState.Speed, 10)
                        }
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                        if (mp.getPlayerState(player2, MultiplayerState.Direction) == 1) {
                            Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), 0, -150)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 2) {
                            Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), 150, 0)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 3) {
                            Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), 0, 150)
                        } else if (mp.getPlayerState(player2, MultiplayerState.Direction) == 4) {
                            Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, mp.getPlayerSprite(player2), -150, 0)
                        }
                        sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                        sprites.setDataNumber(Laser_Bullet, "Player", mp.getPlayerProperty(player2, mp.PlayerProperty.Number))
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).value += 0 - mp.getPlayerState(player2, MultiplayerState.A_Energy_Requirement)
                        mp.changePlayerStateBy(player2, MultiplayerState.Charge_Up_Time, 0.32)
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                    	
                    }
                } else {
                    if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                        Flash.setFlag(SpriteFlag.Ghost, true)
                        Flash.setFlag(SpriteFlag.Invisible, true)
                    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                    	
                    } else {
                    	
                    }
                }
            }
        } else {
        	
        }
    }
})
mp.onControllerEvent(ControllerEvent.Connected, function (player2) {
    mp.setPlayerState(player2, 102, 0)
    mp.setPlayerState(player2, MultiplayerState.Class, 2)
    mp.setPlayerState(player2, MultiplayerState.Attacking, 0)
    mp.setPlayerState(player2, MultiplayerState.Direction, 3)
    mp.setPlayerState(player2, MultiplayerState.Speed, 0)
    mp.setPlayerState(player2, MultiplayerState.Ready, 0)
    mp.setPlayerState(player2, MultiplayerState.Damage_Multiplier, 1)
    mp.setPlayerState(player2, MultiplayerState.Selection, 2)
    Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] = mp.getPlayerProperty(player2, mp.PlayerProperty.Number)
    if (Start_Battle == 0) {
        if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
            mp.setPlayerSprite(player2, sprites.create(assets.image`Red Circle`, SpriteKind.Player))
            mp.getPlayerSprite(player2).setPosition(20, 60)
        }
        if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2) {
            mp.setPlayerSprite(player2, sprites.create(assets.image`Blue Circle`, SpriteKind.Player))
            mp.getPlayerSprite(player2).setPosition(60, 60)
        } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 3) {
            mp.setPlayerSprite(player2, sprites.create(assets.image`Yellow Circle`, SpriteKind.Player))
            mp.getPlayerSprite(player2).setPosition(100, 60)
        } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 4) {
            mp.setPlayerSprite(player2, sprites.create(assets.image`Green Circle`, SpriteKind.Player))
            mp.getPlayerSprite(player2).setPosition(140, 60)
        }
        mp.getPlayerSprite(player2).z = -1
        Knight = sprites.create(assets.image`Knight Picture`, SpriteKind.Visual)
        Knight.sayText("Knight")
        Knight.setPosition(mp.getPlayerSprite(player2).x, mp.getPlayerSprite(player2).y)
        animation.runImageAnimation(
        Knight,
        assets.animation`Knight Animation`,
        300,
        true
        )
    }
    pauseUntil(() => Start_Battle == 1)
    sprites.destroy(mp.getPlayerSprite(player2))
    if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Wizard Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.Class, 1)
        mp.setPlayerState(player2, MultiplayerState.life, 150)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 50)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.Speed, 100)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Knight Picture`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.life, 200)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 2)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 0)
        mp.setPlayerState(player2, MultiplayerState.Speed, 75)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Knight Animation`,
        300,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Knight Right Animation`,
        300,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Knight Forward Animation`,
        300,
        characterAnimations.rule(Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Knight Left Animation`,
        300,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Rammer Picture`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.Side_Direction, 2)
        mp.setPlayerState(player2, MultiplayerState.life, 100)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 50)
        mp.setPlayerState(player2, MultiplayerState.Speed, 125)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Princess Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.life, 100)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.Speed, 100)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Hero Dino`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.Side_Direction, 4)
        mp.setPlayerState(player2, MultiplayerState.life, 150)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 50)
        mp.setPlayerState(player2, MultiplayerState.Speed, 75)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Duck Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.Side_Direction, 2)
        mp.setPlayerState(player2, MultiplayerState.life, 200)
        mp.setPlayerState(player2, MultiplayerState.Side_Direction, 2)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 2)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 50)
        mp.setPlayerState(player2, MultiplayerState.Speed, 100)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Car Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.life, 150)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 1)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 50)
        mp.setPlayerState(player2, MultiplayerState.Speed, 125)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Car Down Animation`,
        100,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Car Up Animation`,
        100,
        characterAnimations.rule(Predicate.MovingUp)
        )
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Car Right Animation`,
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mp.getPlayerSprite(player2),
        assets.animation`Car Left Animation`,
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Ship Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.life, 100)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 1)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 100)
        mp.setPlayerState(player2, MultiplayerState.Speed, 75)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Plane Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.Side_Direction, 4)
        mp.setPlayerState(player2, MultiplayerState.life, 100)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 50)
        mp.setPlayerState(player2, MultiplayerState.Speed, 150)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
        mp.setPlayerSprite(player2, sprites.create(assets.image`Asteroid Image`, SpriteKind.Player))
        mp.setPlayerState(player2, MultiplayerState.life, 250)
        mp.setPlayerState(player2, MultiplayerState.A_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.B_Energy_Requirement, 25)
        mp.setPlayerState(player2, MultiplayerState.Speed, 75)
        mp.moveWithButtons(player2, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
        animation.runImageAnimation(
        mp.getPlayerSprite(player2),
        assets.animation`Asteroid Animation`,
        300,
        true
        )
    }
    mp.setPlayerState(player2, MultiplayerState.Damage_Multiplier, 1)
    sprites.setDataBoolean(mp.getPlayerSprite(player2), "Temporary Speed?", false)
    sprites.setDataBoolean(mp.getPlayerSprite(player2), "Has Bubble?", false)
    mp.getPlayerSprite(player2).setFlag(SpriteFlag.StayInScreen, true)
    mp.getPlayerSprite(player2).setFlag(SpriteFlag.ShowPhysics, false)
    Energ = statusbars.create(20, 4, StatusBarKind.Energy)
    Energ.attachToSprite(mp.getPlayerSprite(player2))
    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setBarBorder(1, 15)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).max = 100
    Players[mp.getPlayerProperty(player2, mp.PlayerProperty.Number)] = mp.getPlayerProperty(player2, mp.PlayerProperty.Number)
    if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 1) {
        mp.getPlayerSprite(player2).setPosition(80, 20)
        controller.player1.moveSprite(Camera, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
        if (Players[2] == 2 || Players[3] == 3 || Players[4] == 4) {
            statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(2, 15, 14)
        } else {
            if (mp.getPlayerState(player2, MultiplayerState.Class) == 1) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(5, 15, 11)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 2) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(2, 15, 14)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 3) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(9, 15, 6)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 4) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(3, 15, 11)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 5) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(4, 15, 14)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 6) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(1, 15, 13)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 7) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(11, 15, 12)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 8) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(7, 15, 6)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 9) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setBarBorder(1, 11)
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(15, 11, 12)
            } else if (mp.getPlayerState(player2, MultiplayerState.Class) == 10) {
                statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(10, 15, 12)
            }
        }
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 2) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(8, 15, 12)
        mp.getPlayerSprite(player2).setPosition(80, 100)
        controller.player2.moveSprite(Camera, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 3) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(5, 15, 4)
        mp.getPlayerSprite(player2).setPosition(20, 60)
        controller.player3.moveSprite(Camera, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    } else if (mp.getPlayerProperty(player2, mp.PlayerProperty.Number) == 4) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(player2)).setColor(7, 15, 6)
        mp.getPlayerSprite(player2).setPosition(140, 60)
        controller.player4.moveSprite(Camera, mp.getPlayerState(player2, MultiplayerState.Speed), mp.getPlayerState(player2, MultiplayerState.Speed))
    }
})
function SpawnMonkey () {
    Monkey = sprites.create(assets.image`Monkey Image`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(Monkey, sprites.swamp.swampTile0)
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(Monkey)
    Enemy_Health.setColor(14, 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 14
    sprites.setDataString(Monkey, "Enemy Type", "Monkey")
    characterAnimations.loopFrames(
    Monkey,
    assets.animation`Monkey Walk Animation`,
    100,
    characterAnimations.rule(Predicate.Moving)
    )
    Monkey.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Fast_Speed)
}
function SpawnBug () {
    RandomEnemy = assets.image`Bug`
    for (let index = 0; index <= randint(0, 1); index++) {
        RandomEnemy.flipX()
    }
    RandomEnemy.replace(15, randint(1, 15))
    RandomEnemy.replace(1, randint(0, 15))
    RandomEnemy.replace(8, randint(0, 15))
    RandomEnemy.replace(9, randint(0, 15))
    RandomEnemy.replace(3, randint(0, 15))
    RandomEnemy.replace(10, randint(0, 15))
    RandomEnemy.replace(12, randint(0, 15))
    RandomSprite = sprites.create(RandomEnemy, SpriteKind.Enemy)
    RandomSprite.scale = randint(4, 4)
    tiles.placeOnTile(RandomSprite, tiles.getTileLocation(randint(0, 64), randint(0, 64)))
    Enemy_Health = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    Enemy_Health.attachToSprite(RandomSprite)
    Enemy_Health.setColor(randint(0, 14), 15, 3)
    Enemy_Health.setBarBorder(1, 15)
    Enemy_Health.max = 3000 * (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Damage_Multiplier) + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.Damage_Multiplier) + (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Three), MultiplayerState.Damage_Multiplier) + mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Four), MultiplayerState.Damage_Multiplier))))
    Enemy_Health.value = Enemy_Health.max
    sprites.setDataString(RandomSprite, "Enemy Type", "Bug")
    RandomSprite.follow(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), Boss_Speed)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "Enemy Type") == "Moral Dino") {
        otherSprite.follow(sprite, 75)
    } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Akita") {
        mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 15)
        otherSprite.follow(sprite, mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Speed))
        pause(500)
    }
    if (sprites.readDataNumber(otherSprite, "Player") != mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)) {
        if (sprites.readDataNumber(otherSprite, "Player") == 0 || Game_Mode == "Versus") {
            if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) == 0) {
                characterAnimations.setCharacterAnimationsEnabled(otherSprite, false)
                if (sprites.readDataString(otherSprite, "Enemy Type") == "Bat") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Bat Attack Animation`,
                    200,
                    false
                    )
                    pause(500)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Snake") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Snake Attack Animation`,
                    200,
                    false
                    )
                    pause(800)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Skull") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Skull Attack Animation`,
                    500,
                    false
                    )
                    pause(500)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Crab") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Crab Attack Animation`,
                    200,
                    false
                    )
                    pause(800)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Monkey") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Monkey Attack Animation`,
                    100,
                    false
                    )
                    pause(500)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Big Dino") {
                    animation.runImageAnimation(
                    otherSprite,
                    assets.animation`Big Dino Attack Animation`,
                    100,
                    false
                    )
                    pause(500)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Evil Princess") {
                    if (sprites.readDataNumber(otherSprite, "Attack") < 1) {
                        sprites.setDataNumber(otherSprite, "Attack", randint(1, 2))
                        if (sprites.readDataNumber(otherSprite, "Attack") == 1) {
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp))) {
                                otherSprite.follow(sprite, 0)
                                pause(200)
                                for (let index = 0; index <= 4; index++) {
                                    Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, otherSprite, 25 * index + -50, -50)
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", 0)
                                    animation.runImageAnimation(
                                    Heart,
                                    assets.animation`Heart Animation`,
                                    200,
                                    false
                                    )
                                }
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight))) {
                                otherSprite.follow(sprite, 0)
                                pause(200)
                                for (let index = 0; index <= 4; index++) {
                                    Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, otherSprite, 50, 25 * index + -50)
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", 0)
                                    animation.runImageAnimation(
                                    Heart,
                                    assets.animation`Heart Animation`,
                                    200,
                                    false
                                    )
                                }
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown))) {
                                otherSprite.follow(sprite, 0)
                                pause(200)
                                for (let index = 0; index <= 4; index++) {
                                    Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, otherSprite, 25 * index + -50, 50)
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", 0)
                                    animation.runImageAnimation(
                                    Heart,
                                    assets.animation`Heart Animation`,
                                    200,
                                    false
                                    )
                                }
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft))) {
                                otherSprite.follow(sprite, 0)
                                pause(200)
                                for (let index = 0; index <= 4; index++) {
                                    Heart = sprites.createProjectileFromSprite(assets.image`Heart Image`, otherSprite, -50, 25 * index + -50)
                                    sprites.setDataString(Heart, "Projectile", "Heart")
                                    sprites.setDataNumber(Heart, "Player", 0)
                                    animation.runImageAnimation(
                                    Heart,
                                    assets.animation`Heart Animation`,
                                    200,
                                    false
                                    )
                                }
                            }
                        } else if (sprites.readDataNumber(otherSprite, "Attack") == 2) {
                            otherSprite.follow(sprite, 0)
                            pause(500)
                            Star = sprites.createProjectileFromSprite(assets.image`Star Image`, otherSprite, 0, 0)
                            sprites.setDataString(Star, "Projectile", "Star")
                            sprites.setDataNumber(Star, "Player", 0)
                            animation.runImageAnimation(
                            Star,
                            assets.animation`Star Waiting Animation`,
                            200,
                            true
                            )
                            Star.setFlag(SpriteFlag.AutoDestroy, false)
                            Star.setFlag(SpriteFlag.DestroyOnWall, false)
                        }
                        otherSprite.follow(sprite, Fast_Speed)
                        sprites.setDataNumber(otherSprite, "Attack", 0)
                    }
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Bruh") {
                    otherSprite.follow(sprite, 0)
                    pause(200)
                    Small_Meteor_Enemy = darts.create(assets.image`Small Meteor Image`, SpriteKind.Projectile, otherSprite.x, otherSprite.y)
                    sprites.setDataString(Small_Meteor_Enemy, "Projectile", "Small Meteor")
                    sprites.setDataNumber(Small_Meteor_Enemy, "Player", 0)
                    sprites.setDataBoolean(Small_Meteor_Enemy, "Activated?", true)
                    Small_Meteor_Enemy.setFlag(SpriteFlag.AutoDestroy, false)
                    Small_Meteor_Enemy.setTrace(true)
                    Small_Meteor_Enemy.setFlag(SpriteFlag.GhostThroughWalls, true)
                    Small_Meteor_Enemy.traceColor = 10
                    Small_Meteor_Enemy.iter = 2
                    if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                        Small_Meteor_Enemy.angle = 90
                    } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                        Small_Meteor_Enemy.angle = 0
                    } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                        Small_Meteor_Enemy.angle = 270
                    } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                        Small_Meteor_Enemy.angle = 180
                    }
                    sprites.setDataBoolean(Small_Meteor_Enemy, "Activated?", false)
                    Small_Meteor_Enemy.lifespan = 5000
                    Small_Meteor_Enemy.throwDart()
                    animation.runImageAnimation(
                    Small_Meteor_Enemy,
                    assets.animation`Small Asteroid Animation`,
                    200,
                    true
                    )
                    otherSprite.follow(sprite, Fast_Speed)
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Glitch") {
                    otherSprite.follow(sprite, 0)
                    pause(1000)
                    pauseUntil(() => characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.Moving)))
                    Football = sprites.create(assets.image`Football Image`, SpriteKind.Projectile)
                    sprites.setDataString(Football, "Projectile", "Football")
                    sprites.setDataNumber(Football, "Player", 0)
                    Football.lifespan = 5000
                    Football.x = otherSprite.x
                    Football.y = otherSprite.y
                    otherSprite.follow(sprite, Below_Average_Speed)
                    if (false || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                        Football.vy = -150
                        animation.runImageAnimation(
                        Football,
                        assets.animation`Football Up Animation`,
                        100,
                        true
                        )
                    } else if (false || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                        Football.vx = 150
                        animation.runImageAnimation(
                        Football,
                        assets.animation`Football Animation`,
                        100,
                        true
                        )
                    } else if (false || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                        Football.vy = 150
                        animation.runImageAnimation(
                        Football,
                        assets.animation`Football Down Animation`,
                        100,
                        true
                        )
                    } else if (false || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                        Football.vx = -150
                        animation.runImageAnimation(
                        Football,
                        assets.animation`Football Left Animation`,
                        100,
                        true
                        )
                    }
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Error") {
                    if (sprites.readDataNumber(otherSprite, "Attack") < 1) {
                        sprites.setDataNumber(otherSprite, "Attack", randint(1, 2))
                        if (sprites.readDataNumber(otherSprite, "Attack") == 1) {
                            pause(500)
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, otherSprite, 0, -200)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, otherSprite, 200, 0)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, otherSprite, 0, 200)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                                Explosive_Bullet = sprites.createProjectileFromSprite(assets.image`Explosive Bullet Image`, otherSprite, -200, 0)
                            }
                            sprites.setDataString(Explosive_Bullet, "Projectile", "Explosive Bullet")
                            sprites.setDataBoolean(Explosive_Bullet, "Activated?", false)
                            sprites.setDataNumber(Explosive_Bullet, "Player", 0)
                        } else if (sprites.readDataNumber(otherSprite, "Attack") == 2) {
                            pause(200)
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                                Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, otherSprite, 0, -100)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                                Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, otherSprite, 100, 0)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                                Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, otherSprite, 0, 100)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                                Splitter = sprites.createProjectileFromSprite(assets.image`Splitter Image`, otherSprite, -100, 0)
                            }
                            sprites.setDataString(Splitter, "Projectile", "Splitter")
                            sprites.setDataNumber(Splitter, "Player", 0)
                            Splitter.setFlag(SpriteFlag.AutoDestroy, false)
                            Splitter.lifespan = 5000
                            animation.runImageAnimation(
                            Splitter,
                            assets.animation`Splitter Animation`,
                            100,
                            false
                            )
                        }
                        otherSprite.follow(sprite, Above_Average_Speed)
                        sprites.setDataNumber(otherSprite, "Attack", 0)
                    }
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Fault") {
                    if (sprites.readDataNumber(otherSprite, "Attack") < 1) {
                        sprites.setDataNumber(otherSprite, "Attack", randint(1, 2))
                        if (sprites.readDataNumber(otherSprite, "Attack") == 1) {
                            pauseUntil(() => characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.Moving)))
                            Laser = sprites.create(assets.image`Laser Image`, SpriteKind.Projectile)
                            sprites.setDataString(Laser, "Projectile", "Laser")
                            sprites.setDataNumber(Laser, "Player", 0)
                            Laser.x = otherSprite.x
                            Laser.y = otherSprite.y
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                                animation.runImageAnimation(
                                Laser,
                                assets.animation`Laser Up Animation`,
                                100,
                                false
                                )
                                Laser.ay = -200
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                                animation.runImageAnimation(
                                Laser,
                                assets.animation`Laser Animation`,
                                100,
                                false
                                )
                                Laser.ax = 200
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                                animation.runImageAnimation(
                                Laser,
                                assets.animation`Laser Down Animation`,
                                100,
                                false
                                )
                                Laser.ay = 200
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                                animation.runImageAnimation(
                                Laser,
                                assets.animation`Laser Left Animation`,
                                100,
                                false
                                )
                                Laser.ax = -200
                            }
                            Laser.setFlag(SpriteFlag.DestroyOnWall, true)
                        } else if (sprites.readDataNumber(otherSprite, "Attack") == 2) {
                            Explosion = sprites.create(assets.image`Explosion Image`, SpriteKind.Projectile)
                            sprites.setDataString(Explosion, "Projectile", "Explosion")
                            sprites.setDataNumber(Explosion, "Player", 0)
                            Explosion.scale = 2
                            Explosion.lifespan = 500
                            animation.runImageAnimation(
                            Explosion,
                            assets.animation`Explosion Animation`,
                            100,
                            false
                            )
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                                Explosion.x = otherSprite.x + -16
                                Explosion.y = otherSprite.y + -52
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                                Explosion.x = otherSprite.x + 56
                                Explosion.y = otherSprite.y + -15
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                                Explosion.x = otherSprite.x + -16
                                Explosion.y = otherSprite.y + 36
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                                Explosion.x = otherSprite.x + -72
                                Explosion.y = otherSprite.y + -15
                            }
                        }
                        otherSprite.follow(sprite, Average_Speed)
                        sprites.setDataNumber(otherSprite, "Attack", 0)
                    }
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Bug") {
                    if (sprites.readDataNumber(otherSprite, "Attack") < 1) {
                        sprites.setDataNumber(otherSprite, "Attack", randint(1, 2))
                        if (sprites.readDataNumber(otherSprite, "Attack") == 1) {
                            Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, otherSprite, 0, -150)
                            sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                            sprites.setDataNumber(Laser_Bullet, "Player", 0)
                            pause(500)
                            for (let index = 0; index <= randint(0, 8); index++) {
                                pause(50)
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, otherSprite, 0, -150)
                                sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                                sprites.setDataNumber(Laser_Bullet, "Player", 0)
                            }
                            for (let index = 0; index <= randint(0, 9); index++) {
                                pause(50)
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, otherSprite, 150, 0)
                                sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                                sprites.setDataNumber(Laser_Bullet, "Player", 0)
                            }
                            for (let index = 0; index <= randint(0, 9); index++) {
                                pause(50)
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, otherSprite, 0, 150)
                                sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                                sprites.setDataNumber(Laser_Bullet, "Player", 0)
                            }
                            for (let index = 0; index <= randint(0, 9); index++) {
                                pause(50)
                                Laser_Bullet = sprites.createProjectileFromSprite(assets.image`Laser Bullet`, otherSprite, -150, 0)
                                sprites.setDataString(Laser_Bullet, "Projectile", "Laser Bullet")
                                sprites.setDataNumber(Laser_Bullet, "Player", 0)
                            }
                        } else if (sprites.readDataNumber(otherSprite, "Attack") == 2) {
                            pause(2000)
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp)) || (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown)))) {
                                Laser_Sniper = sprites.createProjectileFromSprite(assets.image`Laser Sniper Vertical Image`, otherSprite, 0, 0)
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight)) || (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft)))) {
                                Laser_Sniper = sprites.createProjectileFromSprite(assets.image`Laser Sniper Image`, otherSprite, 0, 0)
                            }
                            sprites.setDataString(Laser_Sniper, "Projectile", "Laser Sniper")
                            sprites.setDataNumber(Laser_Sniper, "Player", 0)
                            Laser_Sniper.setFlag(SpriteFlag.AutoDestroy, false)
                            Laser_Sniper.setFlag(SpriteFlag.DestroyOnWall, false)
                            Laser_Sniper.setFlag(SpriteFlag.BounceOnWall, true)
                            Laser_Sniper.lifespan = 1000
                            music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                            if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingUp)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingUp))) {
                                Laser_Sniper.vy = -1000
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingRight)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingRight))) {
                                Laser_Sniper.vx = 1000
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingDown)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingDown))) {
                                Laser_Sniper.vy = 1000
                            } else if (characterAnimations.matchesRule(otherSprite, characterAnimations.rule(Predicate.MovingLeft)) || characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.MovingLeft))) {
                                Laser_Sniper.vx = -1000
                            }
                        }
                        otherSprite.follow(sprite, Boss_Speed)
                        sprites.setDataNumber(otherSprite, "Attack", 0)
                    }
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Shark") {
                    pauseUntil(() => sprites.readDataNumber(otherSprite, "Attack") < 1)
                    sprites.setDataNumber(otherSprite, "Attack", randint(1, 2))
                    if (sprites.readDataNumber(otherSprite, "Attack") == 1) {
                        animation.runImageAnimation(
                        otherSprite,
                        assets.animation`Shark Attack Animation`,
                        200,
                        false
                        )
                        pause(1200)
                        sprites.setDataNumber(otherSprite, "Attack", 0)
                    } else if (sprites.readDataNumber(otherSprite, "Attack") == 2) {
                        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                        pause(1000)
                        sprites.setDataBoolean(otherSprite, "Has Bubble?", true)
                        Bubble = sprites.createProjectileFromSprite(assets.image`Bubble Shield Image`, otherSprite, 0, 0)
                        sprites.setDataString(Bubble, "Projectile", "Bubble")
                        sprites.setDataNumber(Bubble, "Player", 0)
                        Bubble.setFlag(SpriteFlag.DestroyOnWall, false)
                        Bubble.setFlag(SpriteFlag.AutoDestroy, false)
                        Bubble.setFlag(SpriteFlag.GhostThroughWalls, true)
                        Bubble.scale = 2
                        Bubble.z = -1
                        Bubble.follow(otherSprite, 500)
                    }
                } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Mushroom") {
                	
                } else {
                    pause(500)
                }
                if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) == 0) {
                    if (sprites.readDataNumber(otherSprite, "Player") != mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)) {
                        if (sprite.overlapsWith(otherSprite)) {
                            music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                            scene.cameraShake(4, 500)
                            if (sprites.readDataString(otherSprite, "Enemy Type") == "Bat") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -20)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Snake") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -35)
                                InflictStatus("Venom", 2000, 5, mp.getPlayerSprite(mp.getPlayerBySprite(sprite)))
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Skull") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -50)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Crab") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -10)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Monkey") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -15)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Big Dino") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -50)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Mini Dino") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -25)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Moral Dino") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -15)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Clown Fish") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -4)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Angel Fish") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -6)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Clam") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -8)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Shark") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -25)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Zombie 4") {
                                mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -12)
                            } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Mushroom") {
                                if (sprites.readDataNumber(otherSprite, "Attack") == 1) {
                                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -10)
                                }
                            } else {
                                if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).max < 25) {
                                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, 0 - statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).max)
                                } else {
                                    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -25)
                                }
                            }
                        }
                    }
                }
                characterAnimations.setCharacterAnimationsEnabled(otherSprite, true)
            }
            if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Attacking) == 1) {
                if (sprites.readDataBoolean(otherSprite, "Has Status Bar?") == true) {
                    music.play(music.createSoundEffect(WaveShape.Noise, 3900, 3500, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                    if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 2) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Charge_Up_Time) * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier)
                        otherSprite.follow(sprite, 0)
                        otherSprite.startEffect(effects.warmRadial, 500)
                        pause(500)
                        otherSprite.follow(sprite, 5)
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 3) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -6 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier)
                        statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerBySprite(sprite))).value += 2
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 5) {
                        if (sprites.readDataNumber(otherSprite, "Player") != mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number)) {
                            statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -18 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier)
                            otherSprite.setStayInScreen(true)
                            if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 1) {
                                otherSprite.vy += -1000
                            } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 2) {
                                otherSprite.vx += 1000
                            } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 3) {
                                otherSprite.vy += 1000
                            } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Direction) == 4) {
                                otherSprite.vx += -1000
                            } else {
                            	
                            }
                            pause(500)
                            otherSprite.vx = 0
                            otherSprite.vy = 0
                            otherSprite.setStayInScreen(false)
                        }
                    } else if (mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Class) == 7) {
                        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -1 * mp.getPlayerState(mp.getPlayerBySprite(sprite), MultiplayerState.Damage_Multiplier)
                    } else {
                    	
                    }
                    if (sprites.readDataString(otherSprite, "Enemy Type") == "Mushroom") {
                    	
                    } else if (sprites.readDataString(otherSprite, "Enemy Type") == "Crab") {
                        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                        characterAnimations.setCharacterAnimationsEnabled(otherSprite, false)
                        otherSprite.follow(sprite, 0)
                        animation.runImageAnimation(
                        otherSprite,
                        assets.animation`Crab Shield Animation`,
                        100,
                        false
                        )
                        story.startCutscene(function () {
                            pause(randint(500, 2000))
                            otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                            characterAnimations.setCharacterAnimationsEnabled(otherSprite, true)
                            otherSprite.follow(sprite, Average_Speed)
                            story.cancelCurrentCutscene()
                        })
                    } else {
                    	
                    }
                }
            }
            pause(500)
        }
    }
})
let Small_Meteor_Enemy: Dart = null
let Monkey: Sprite = null
let Energ: StatusBarSprite = null
let Clown_Fish: Sprite = null
let Mushroom: Sprite = null
let Big_Dino: Sprite = null
let Crab: Sprite = null
let Zombie_3: Sprite = null
let Bat: Sprite = null
let Shark: Sprite = null
let Zombie_4: Sprite = null
let Blue_Orb: Sprite = null
let Explosive_Bullet: Sprite = null
let Laser_Bullet: Sprite = null
let Flash: Sprite = null
let Heart: Sprite = null
let Laser: Sprite = null
let Red_Orb: Sprite = null
let RandomSprite: Sprite = null
let RandomEnemy: Image = null
let Coin: Sprite = null
let Mini_Dino: Sprite = null
let Skull: Sprite = null
let Small_Meteor: Dart = null
let Meteor: Sprite = null
let Plane: Sprite = null
let Ship: Sprite = null
let Car: Sprite = null
let Duck: Sprite = null
let Hero_Dino: Sprite = null
let Princess: Sprite = null
let Rammer: Sprite = null
let Knight: Sprite = null
let Wizard: Sprite = null
let Clam: Sprite = null
let Zombie_2: Sprite = null
let Yellow_Orb: Sprite = null
let Angel_Fish: Sprite = null
let index = 0
let Evil_Princess: Sprite = null
let Splitter: Sprite = null
let Laser_Sniper: Sprite = null
let Bubble: Sprite = null
let Moral_Dino: Sprite = null
let Star: Sprite = null
let Football: Sprite = null
let Explosion: Sprite = null
let Snake: Sprite = null
let Snack: Sprite = null
let Enemy_Health: StatusBarSprite = null
let Zombie_1: Sprite = null
let mySprite: Sprite = null
let Green_Wall_Toggle = false
let Purple_Wall_Toggle = false
let Camera: Sprite = null
let Buttons: Sprite = null
let Level = 0
let Map = 0
let Fast_Speed = 0
let Boss_Speed = 0
let Above_Average_Speed = 0
let Below_Average_Speed = 0
let Average_Speed = 0
let Start_Battle = 0
let Classes: number[] = []
let Players: number[] = []
let Cheats = false
let Game_Mode = ""
stats.turnStats(true)
game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), false)
game.setGameOverPlayable(false, music.melodyPlayable(music.powerDown), false)
game.setGameOverEffect(false, effects.melt)
Game_Mode = "Arcade"
Cheats = false
Players = []
Players = [
0,
0,
0,
0
]
if (!(blockSettings.exists("Cash"))) {
    blockSettings.writeNumber("Cash", 0)
}
if (!(blockSettings.exists("Classes"))) {
    Classes = [
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    blockSettings.writeNumberArray("Classes", Classes)
}
Classes = blockSettings.readNumberArray("Classes")
Start_Battle = 0
Average_Speed = 25
Below_Average_Speed = 15
Above_Average_Speed = 35
Boss_Speed = 5
Fast_Speed = 50
Map = 0
Level = 1
let Wave = 0
Buttons = sprites.create(assets.image`Buttons`, SpriteKind.Visual)
scene.setBackgroundColor(13)
Buttons.setPosition(145, 100)
Buttons.setFlag(SpriteFlag.RelativeToCamera, true)
let textSprite = textsprite.create("" + blockSettings.readNumber("Cash") + " Cash", 1, 7)
textSprite.setKind(SpriteKind.Visual)
textSprite.setPosition(80, 20)
textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
pauseUntil(() => Start_Battle == 1)
sprites.destroy(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
sprites.destroyAllSpritesOfKind(SpriteKind.Visual)
Camera = sprites.create(assets.image`Laser Bullet`, SpriteKind.Visual)
Camera.setFlag(SpriteFlag.Ghost, true)
Camera.setFlag(SpriteFlag.Invisible, true)
Camera.setFlag(SpriteFlag.StayInScreen, true)
pause(1)
if (Game_Mode == "Arcade") {
    Purple_Wall_Toggle = false
    Green_Wall_Toggle = false
    story.showPlayerChoices("Apocalypse City", "Quiet Ocean", "Wild Forest", "Insane")
    if (story.checkLastAnswer("Insane")) {
        story.showPlayerChoices("Abandoned Dungeon", "Corrupted Code")
        if (story.checkLastAnswer("Abandoned Dungeon")) {
            Map = 1
        } else {
            Map = 5
            textSprite = textsprite.create("Wave " + Wave, 1, 15)
            textSprite.setPosition(19, 20)
            textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        }
    } else if (story.checkLastAnswer("Wild Forest")) {
        Map = 2
    } else if (story.checkLastAnswer("Quiet Ocean")) {
        Map = 3
    } else if (story.checkLastAnswer("Apocalypse City")) {
        Map = 4
    } else {
        Map = 5
    }
    scene.cameraFollowSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.Direction, 3)
    if (Map == 1) {
        tiles.setCurrentTilemap(tilemap`Dungeon Level 1`)
        for (let index = 0; index <= 5; index++) {
            SpawnBat()
        }
    } else if (Map == 2) {
        tiles.setCurrentTilemap(tilemap`Wild Forest`)
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
            SpawnMiniDino(mySprite)
        }
        for (let index = 0; index <= 2; index++) {
            SpawnDrumstick()
            SpawnHam()
        }
    } else if (Map == 3) {
        tiles.setCurrentTilemap(tilemap`Quiet Ocean`)
        scene.setBackgroundColor(9)
        for (let index = 0; index <= 9; index++) {
            SpawnClownFish()
            SpawnAngelFish()
            SpawnClam()
        }
        SpawnShark()
        SpawnBurger()
        SpawnTaco()
        SpawnPizza()
    } else if (Map == 4) {
        tiles.setCurrentTilemap(tilemap`Apocalypse City`)
        scene.setBackgroundColor(13)
        for (let index = 0; index <= 24; index++) {
            SpawnZombie1()
            SpawnZombie2()
            SpawnZombie3()
        }
        SpawnZombie4()
        SpawnIceCream()
        SpawnCake()
        SpawnDonut()
    } else if (Map == 5) {
        scene.setBackgroundColor(0)
        tiles.setCurrentTilemap(tilemap`Corrupted Code`)
        for (let index = 0; index <= randint(0, 24); index++) {
            SpawnRedOrb()
            SpawnYellowOrb()
            SpawnBlueOrb()
        }
        story.setSoundEnabled(true)
        story.startCutscene(function () {
            story.printCharacterText("Randoms are the first enemy you'll be facing. They can only deal melee damage, long ranged attacks are a great counter against them!", "Pigeon")
        })
        Wave += 1
        for (let index = 0; index <= 4; index++) {
            SpawnRandom()
        }
    }
    if (Map != 5) {
        for (let index = 0; index <= 4; index++) {
            SpawnCoin()
        }
    }
} else {
    sprites.destroy(Camera)
    Map = randint(1, 3)
    if (Map == 1) {
        scene.setBackgroundImage(assets.image`Abandoned Dungeon Versus`)
    } else if (Map == 2) {
        scene.setBackgroundImage(assets.image`Apocalypse City Versus`)
    } else if (Map == 3) {
        scene.setBackgroundImage(assets.image`Moon Versus`)
    } else if (Map == 4) {
    	
    } else if (Map == 5) {
    	
    }
}
game.onUpdateInterval(2000, function () {
    if (Start_Battle == 1) {
        for (let index = 0; index <= 3; index++) {
            if (Players[index + 1] == index + 1) {
                if (mp.getPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.Attacking) != -1) {
                    statusbars.getStatusBarAttachedTo(StatusBarKind.Energy, mp.getPlayerSprite(mp.getPlayerByNumber(index + 1))).value += 20
                }
                if (mp.getPlayerState(mp.getPlayerByNumber(index + 1), MultiplayerState.life) <= 198 && sprites.readDataBoolean(mp.getPlayerSprite(mp.getPlayerByNumber(index + 1)), "Has Bubble?") == true) {
                    mp.changePlayerStateBy(mp.getPlayerByNumber(index + 1), MultiplayerState.life, 2)
                }
            }
        }
    }
})
forever(function () {
    if (Game_Mode == "Arcade") {
        if (Map == 5) {
            textSprite.setText("Wave " + Wave)
        }
    }
})
