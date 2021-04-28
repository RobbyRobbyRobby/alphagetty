namespace SpriteKind {
    export const Coins = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Goals = SpriteKind.create()
    export const LevelFinish = SpriteKind.create()
    export const LevelStartLocation = SpriteKind.create()
}
/**
 * Collision Events
 */
/**
 * Game Lifecycle and Input Events
 */
/**
 * Player Functions
 */
/**
 * Game Start Functions
 */
/**
 * Level Functions
 */
function bButtonPressed () {
	
}
// Level Initializations
function InitCharacterList () {
    CharacterList = [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 . . 4 . . . . . . 
        . . . . . . 4 . . 4 . . . . . . 
        . . . . . . 4 . . 4 . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . d d f d d d f d . . . . 
        . . . d d d d f d d d f d . . . 
        . . . d d 8 d d d 8 d f d . . . 
        . . . d d d d d d d d d d . . . 
        . . . d d d d d d d d d d . . . 
        . . . d d f d f f d f d d . . . 
        . . . . . e e e e e e . . . . . 
        . . . . . e e e e e e . . . . . 
        . . f f f e e e e e e f f f . . 
        . . f . . e e e e e e . . f . . 
        . . f . f . . . . . . f . f . . 
        `, img`
        . . . 5 . . . . . . . . 5 . . . 
        . 5 5 5 5 . . . . . . 5 5 5 5 . 
        5 5 5 5 5 5 . . . . 5 5 5 5 5 5 
        5 5 5 5 5 4 4 4 4 4 4 5 5 5 5 5 
        5 5 5 5 4 4 4 4 4 4 4 4 5 5 5 5 
        5 5 5 4 4 4 6 6 6 6 4 4 4 5 5 5 
        5 5 4 4 4 6 6 6 6 6 6 4 4 4 5 5 
        . 5 4 4 6 6 6 6 6 6 6 6 4 4 5 . 
        . 5 5 4 6 6 6 6 6 6 6 6 4 5 5 . 
        . . 4 4 6 6 6 6 6 6 6 6 4 4 . . 
        . . 4 4 6 6 6 6 6 6 6 6 4 4 . . 
        . . 4 4 4 6 6 6 6 6 6 4 4 4 . . 
        . . . 4 4 4 6 6 6 6 4 4 4 . . . 
        . . . . 4 4 4 4 4 4 4 4 . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        . 7 7 3 3 3 3 3 3 3 3 3 3 7 7 . 
        . 7 7 3 3 3 3 3 3 3 3 3 3 7 7 . 
        . 7 7 3 3 5 5 5 3 5 5 5 5 7 7 . 
        . 7 7 3 3 3 8 8 8 3 8 8 8 7 7 . 
        . 7 7 3 3 3 8 8 8 3 8 8 8 7 7 . 
        . 7 7 3 3 3 3 3 3 3 3 3 3 7 7 . 
        . 7 7 3 3 3 a 3 3 3 3 a 3 7 7 . 
        . 7 7 3 3 3 a a a a a a 3 7 7 . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `]
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    bButtonPressed()
})
function PlayerHurt () {
    info.changeLifeBy(-1)
    info.startCountdown(2)
    Hero.setFlag(SpriteFlag.GhostThroughSprites, true)
}
function aButtonPressed () {
    Hero.vy = JumpPower
}
function InitPlayerForLevel () {
    tiles.placeOnRandomTile(Hero, assets.tile`transparency16`)
}
function InitLevels () {
    scene.setBackgroundColor(14)
    CurrentLevelNumber = 0
    LevelList = []
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (HeroCharacterSelected == false) {
        HeroCharacterSelected = true
        DoGameIntroduction()
    } else {
        aButtonPressed()
    }
})
function LoadLevel () {
    tiles.setTilemap(tilemap`level3`)
    LoadEnemiesForLevel()
    LoadFoodForLevel()
    InitPlayerForLevel()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (HeroCharacterSelected == false) {
        if (SelectedHeroIndex == 1) {
            SelectedHeroIndex += -1
            Hero.setImage(CharacterList[SelectedHeroIndex])
            Hero.startEffect(effects.warmRadial, 500)
        } else if (SelectedHeroIndex == 2) {
            SelectedHeroIndex += -1
            Hero.setImage(CharacterList[SelectedHeroIndex])
            Hero.startEffect(effects.warmRadial, 500)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
	
})
info.onCountdownEnd(function () {
    Hero.setFlag(SpriteFlag.GhostThroughSprites, false)
})
function DoGameIntroduction () {
	
}
function LoadFoodForLevel () {
    FoodList = sprites.allOfKind(SpriteKind.Food)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (HeroCharacterSelected == false) {
        if (SelectedHeroIndex == 0) {
            SelectedHeroIndex += 1
            Hero.setImage(CharacterList[SelectedHeroIndex])
            Hero.startEffect(effects.warmRadial, 500)
        } else if (SelectedHeroIndex == 1) {
            SelectedHeroIndex += 1
            Hero.setImage(CharacterList[SelectedHeroIndex])
            Hero.startEffect(effects.warmRadial, 500)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    PlayerHurt()
})
function NextLevel () {
    CurrentLevelNumber += 1
    LoadLevel()
}
function LoadEnemiesForLevel () {
    EnemyList = sprites.allOfKind(SpriteKind.Goals)
}
info.onLifeZero(function () {
    LoadLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goals, function (sprite, otherSprite) {
	
})
function DoGravityEffect () {
    if (Hero.vy < TerminalVelocity) {
        Hero.vy += GravityStrength
    }
    if (Hero.vy > TerminalVelocity) {
        Hero.vy = TerminalVelocity
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    HealthCollected()
})
function HealthCollected () {
    info.changeLifeBy(1)
}
function SelectCharacter () {
    SelectedHeroIndex = 1
    HeroCharacterSelected = false
    InitCharacterList()
    Hero = sprites.create(CharacterList[SelectedHeroIndex], SpriteKind.Player)
    game.showLongText("Welcome!  Select your hero (left and right)", DialogLayout.Bottom)
    Hero.setStayInScreen(true)
    scene.cameraFollowSprite(Hero)
    while (HeroCharacterSelected == false) {
        pause(100)
    }
    game.showLongText("Character selected!", DialogLayout.Bottom)
    controller.moveSprite(Hero, 100, 0)
    LoadLevel()
}
/**
 * Change these to manipulate how the game acts
 */
function SetupVariables () {
    GravityStrength = 5
    TerminalVelocity = 100
    JumpPower = -100
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coins, function (sprite, otherSprite) {
	
})
// Game Start Functions
// 
// Everything from START to play beginning
function InitGame () {
    SetupVariables()
    InitLevels()
    SelectCharacter()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`transparency16`, function (sprite, location) {
	
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    PlayerHurt()
})
let GravityStrength = 0
let TerminalVelocity = 0
let EnemyList: Sprite[] = []
let FoodList: Sprite[] = []
let SelectedHeroIndex = 0
let HeroCharacterSelected = false
let LevelList: number[] = []
let CurrentLevelNumber = 0
let JumpPower = 0
let Hero: Sprite = null
let CharacterList: Image[] = []
InitGame()
game.onUpdate(function () {
    DoGravityEffect()
})
