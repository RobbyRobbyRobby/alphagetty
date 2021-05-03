namespace SpriteKind {
    export const Coins = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Goals = SpriteKind.create()
    export const LevelFinish = SpriteKind.create()
    export const LevelStartLocation = SpriteKind.create()
}
/**
 * Player Functions
 */
/**
 * Game Lifecycle and Input Events
 */
/**
 * Level Functions
 */
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
	
})
// Level Functions
function bButtonPressed () {
	
}
// Level Initializations
function InitCharacterList () {
    CharacterList = [assets.image`HeroOption1`, assets.image`HeroOption2`, assets.image`HeroOption3`]
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
    if (Hero.vy == 5) {
        Hero.vy = JumpPower
    }
}
function InitPlayerForLevel () {
    tiles.placeOnRandomTile(Hero, HeroStartingLocationAsset)
}
function InitLevels () {
    scene.setBackgroundColor(BackgroundColour)
    CurrentLevelNumber = 0
    LevelList = [tiles.createMap(tilemap`Level0`), tiles.createMap(tilemap`level15`), tiles.createMap(tilemap`level16`)]
}
function LoadGoalsForLevel () {
    tiles.createSpritesOnTiles(assets.tile`GoalLocationTile`, SpriteKind.Goals)
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
    if (CurrentLevelNumber >= LevelList.length - 1) {
        DoGameWon()
    } else {
        tiles.loadMap(LevelList[CurrentLevelNumber])
        LoadEnemiesForLevel()
        LoadFoodForLevel()
        InitPlayerForLevel()
        LoadPowerupsForLevel()
        LoadGoalsForLevel()
    }
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
/**
 * Collision Events
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    otherSprite.destroy()
})
function LoadPowerupsForLevel () {
    tiles.createSpritesOnTiles(assets.tile`PowerupStartingLocation`, SpriteKind.PowerUp)
}
info.onCountdownEnd(function () {
    Hero.setFlag(SpriteFlag.GhostThroughSprites, false)
})
function LoadCoinsForLevel () {
    tiles.createSpritesOnTiles(assets.tile`CoinStartingLocation`, SpriteKind.Coins)
}
function DoGameIntroduction () {
	
}
function LoadFoodForLevel () {
    tiles.createSpritesOnTiles(assets.tile`FoodStartingLocationAsset`, SpriteKind.Food)
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
    tiles.createSpritesOnTiles(assets.tile`EnemyStartingLocation`, SpriteKind.Enemy)
}
info.onLifeZero(function () {
    OnOutOfLives()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goals, function (sprite, otherSprite) {
    otherSprite.destroy()
})
function DoGravityEffect () {
    if (Hero.vy < TerminalVelocity) {
        Hero.vy += GravityStrength
    }
    if (Hero.vy > TerminalVelocity) {
        Hero.vy = TerminalVelocity
    }
}
function DoGameWon () {
	
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
    controller.moveSprite(Hero, PlayerSpeed, 0)
    info.setLife(StartingLives)
    LoadLevel()
}
function OnOutOfLives () {
    LoadLevel()
}
// Start here!
// 
// Change these to manipulate how the game acts without navigating the majority of the code base.
function SetupVariables () {
    GravityStrength = 5
    TerminalVelocity = 100
    JumpPower = -100
    BackgroundColour = color.__rgb(255, 255, 255)
    HeroStartingLocationAsset = sprites.dungeon.stairLadder
    FoodStartingLocationAsset = assets.tile`FoodStartingLocationAsset`
    EnemyStartingLocationAsset = assets.tile`EnemyStartingLocation`
    CoinStartingLocationAsset = assets.tile`CoinStartingLocation`
    PowerupStartingLocationAsset = assets.tile`PowerupStartingLocation`
    GoalStartingLocationAsset = assets.tile`GoalLocationTile`
    StartingLives = 3
    PlayerSpeed = 100
}
function InitNonPlayerSpriteTypes () {
    EnemyList = sprites.allOfKind(SpriteKind.Enemy)
    EnemyList.push(sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy))
    CoinList = sprites.allOfKind(SpriteKind.Coins)
    EnemyList.push(sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Coins))
    FoodList = sprites.allOfKind(SpriteKind.Food)
    EnemyList.push(sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food))
    GoalList = sprites.allOfKind(SpriteKind.Goals)
    EnemyList.push(sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Goals))
    PowerupList = sprites.allOfKind(SpriteKind.PowerUp)
    EnemyList.push(sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.PowerUp))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coins, function (sprite, otherSprite) {
    otherSprite.destroy()
})
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
	
})
/**
 * Game Start Functions
 */
// Game Start Functions
// 
// Everything from START to play beginning
function InitGame () {
    SetupVariables()
    InitLevels()
    InitNonPlayerSpriteTypes()
    SelectCharacter()
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
	
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
	
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    NextLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    PlayerHurt()
})
let PowerupList: Sprite[] = []
let GoalList: Sprite[] = []
let FoodList: Sprite[] = []
let CoinList: Sprite[] = []
let EnemyList: Sprite[] = []
let GoalStartingLocationAsset: Image = null
let PowerupStartingLocationAsset: Image = null
let CoinStartingLocationAsset: Image = null
let EnemyStartingLocationAsset: Image = null
let FoodStartingLocationAsset: Image = null
let StartingLives = 0
let PlayerSpeed = 0
let GravityStrength = 0
let TerminalVelocity = 0
let SelectedHeroIndex = 0
let HeroCharacterSelected = false
let LevelList: tiles.WorldMap[] = []
let CurrentLevelNumber = 0
let BackgroundColour = 0
let HeroStartingLocationAsset: Image = null
let JumpPower = 0
let Hero: Sprite = null
let CharacterList: Image[] = []
InitGame()
game.onUpdate(function () {
    DoGravityEffect()
})
