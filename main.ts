namespace SpriteKind {
    export const Coins = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Goals = SpriteKind.create()
}
function InitCharacterList () {
    CharacterList = []
}
function PlayerHurt () {
    info.changeLifeBy(-1)
    info.startCountdown(2)
    Player.setFlag(SpriteFlag.GhostThroughSprites, true)
}
function InitPlayerForLevel () {
    list = [0, 1]
    tiles.placeOnRandomTile(Player, assets.tile`transparency16`)
}
function InitLevels () {
    CurrentLevelNumber = 0
    LevelList = []
}
function LoadLevel () {
    LoadEnemiesForLevel()
    LoadFoodForLevel()
    InitPlayerForLevel()
}
info.onCountdownEnd(function () {
    Player.setFlag(SpriteFlag.GhostThroughSprites, false)
})
function DoGameIntroduction () {
	
}
function LoadFoodForLevel () {
    FoodList = sprites.allOfKind(SpriteKind.Food)
}
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
function SelectCharacter () {
    InitCharacterList()
    Player = sprites.create(img`
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
        `, SpriteKind.Player)
    controller.moveSprite(Player)
    Player.setStayInScreen(true)
}
function InitGame () {
    SelectCharacter()
    InitLevels()
    DoGameIntroduction()
}
let EnemyList: Sprite[] = []
let FoodList: Sprite[] = []
let LevelList: number[] = []
let CurrentLevelNumber = 0
let list: number[] = []
let Player: Sprite = null
let CharacterList: number[] = []
InitGame()
