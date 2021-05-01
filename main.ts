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
    LevelList = []
}
function LoadGoalsForLevel () {
    GoalList = sprites.allOfKind(SpriteKind.Goals)
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
    LoadPowerupsForLevel()
    LoadGoalsForLevel()
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
    otherSprite.destroy()
})
function LoadPowerupsForLevel () {
    PowerupList = sprites.allOfKind(SpriteKind.PowerUp)
}
info.onCountdownEnd(function () {
    Hero.setFlag(SpriteFlag.GhostThroughSprites, false)
})
function LoadCoinsForLevel () {
    CoinList = sprites.allOfKind(SpriteKind.Coins)
}
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
    EnemyList = sprites.allOfKind(SpriteKind.Enemy)
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
/**
 * Start here!
 * 
 * Change these to manipulate how the game acts without navigating the majority of the code base.
 */
function SetupVariables () {
    GravityStrength = 5
    TerminalVelocity = 100
    JumpPower = -100
    BackgroundColour = color.__rgb(255, 255, 255)
    HeroStartingLocationAsset = sprites.dungeon.stairLadder
    FoodStartingLocationAsset = myTiles.tile1
    EnemyStartingLocationAsset = myTiles.tile4
    CoinStartingLocationAsset = myTiles.tile3
    PowerupStartingLocationAsset = myTiles.tile6
    GoalStartingLocationAsset = myTiles.tile5
    StartingLives = 3
    PlayerSpeed = 100
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coins, function (sprite, otherSprite) {
    otherSprite.destroy()
})
// Game Start Functions
// 
// Everything from START to play beginning
function InitGame () {
    SetupVariables()
    InitLevels()
    SelectCharacter()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    PlayerHurt()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`DeathTile`, function (sprite, location) {
	
})
let GoalStartingLocationAsset: Image = null
let PowerupStartingLocationAsset: Image = null
let CoinStartingLocationAsset: Image = null
let EnemyStartingLocationAsset: Image = null
let FoodStartingLocationAsset: Image = null
let StartingLives = 0
let PlayerSpeed = 0
let GravityStrength = 0
let TerminalVelocity = 0
let EnemyList: Sprite[] = []
let FoodList: Sprite[] = []
let CoinList: Sprite[] = []
let PowerupList: Sprite[] = []
let SelectedHeroIndex = 0
let HeroCharacterSelected = false
let GoalList: Sprite[] = []
let LevelList: number[] = []
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
