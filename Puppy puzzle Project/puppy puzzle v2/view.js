
//++++++++++++++++++++++++++++++++++  Defining Image Sprites ++++++++++++++++++++++++++++++++++++++
let bgImage = new Image()
bgImage.src = 'misc/sprite_sheets/background.png'
let walkImg =new Image()
walkImg.src = 'misc/sprite_sheets/player_spriteSheet.png'
let blockImage = new Image()
blockImage.src = 'misc/sprite_sheets/block.png'
let boxImage1 = new Image()
boxImage1.src = 'misc/sprite_sheets/box1.png'
let boxImage2 = new Image()
boxImage2.src = 'misc/sprite_sheets/box2.png'




//++++++++++++++++++++++++++++++++++++++ set classes +++++++++++++++++++++++++++++++++++++++++++++++
// our obstable object were we will use it to construct the lvls
class Block {
    constructor(Bx,By){
        this.Bx = Bx
        this.By = By
        this.d = 50
    }

    draw() {
         ctx.drawImage(blockImage,0,0,50,50,this.Bx,this.By,this.d,this.d)
    }

    
}


class Box {
    constructor(xBox,yBox){
        this.xBox = xBox
        this.yBox = yBox
        this.d = 50
        this.placed = false
    }

    draw(){
        ctx.drawImage(boxImage2,0,0,50,50,this.xBox,this.yBox,this.d,this.d)
    }

    update(){
        //change the desing/color when it steps on the tile
        if(this.placed == true){
           ctx.drawImage(boxImage1,0,0,50,50,this.xBox,this.yBox,this.d,this.d)
        }
        else{
            ctx.drawImage(boxImage2,0,0,50,50,this.xBox,this.yBox,this.d,this.d)
        }

        
    }
}

class Tile {
    constructor(xTile,yTile){
        this.xTile = xTile
        this.yTile = yTile
        this.d = 50
        
    }

    draw(){
        ctx.fillStyle ="white"
        ctx.beginPath();
        ctx.rect(this.xTile,this.yTile,this.d,this.d)
        ctx.fill();

        ctx.fillStyle ="cyan"
        ctx.beginPath();
        ctx.rect(this.xTile+10,this.yTile+10,30,30)
        ctx.fill();

    }

    


}

class Player{
    constructor(xPlayer,yPlayer){
        this.xPlayer = xPlayer
        this.yPlayer = yPlayer
        this.d = 50
    }
    draw(frameIndex){
        ctx.fillStyle = "magenta"
        ctx.beginPath();
        ctx.drawImage(walkImg,frameIndex * 50, walkDirection[directionIndex],50,50,this.xPlayer,this.yPlayer, this.d,this.d)
    }
}

//++++++++++++++++++++++++++++++++++++++ gamePlay VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++

let directionIndex = 0;

//key defenitions

const p1_d = 50;
let player; 
let key=[] ;
let gameCounter = 0;




//++++++++++++++++++++++++++++++++++  map construction layouts ++++++++++++++++++++++++++++++++++++++

let blocks = []
let boxes = []
let tiles = []
let maps = []

let level = 0
let goalCount = 0



//0 - empty , 1 - blocks; 2 - boxes ; 3 - tiles; 4 - spawn point

 maps.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,4,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,3,0,0,0,1],
    [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]);

maps.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,2,0,0,0,0,0,0,0,2,0,4,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,3,0,0,1],
    [1,0,2,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,0,0,0,3,0,0,0,1],
    [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,2,0,0,0,0,0,0,0,3,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,3,0,0,0,3,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]);

// real lvls from other sokoban games
//http://borgar.net/programs/sokoban/#Sokoban no.6

maps.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,3,0,0,1,1,1,1,1,1,0,0,4,1,1],
    [1,3,3,0,0,1,1,1,1,1,0,0,0,0,0,1],
    [1,3,3,0,0,0,0,0,0,0,2,2,0,0,0,1],
    [1,3,3,0,0,1,1,0,1,1,0,2,0,1,0,1],
    [1,3,3,1,1,1,1,0,1,1,0,2,0,0,0,1],
    [1,1,1,1,0,0,2,0,1,1,2,0,0,0,0,1],
    [1,1,1,1,0,0,0,2,1,1,0,0,0,0,0,1],
    [1,1,1,1,0,2,0,0,1,1,0,2,0,0,0,1],
    [1,1,1,1,0,0,0,0,1,1,2,0,0,0,0,1],
    [1,1,1,1,0,0,0,0,1,1,0,0,0,1,1,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]);

// real lvls from other sokoban games
//http://borgar.net/programs/sokoban/#Sokoban no.38

maps.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,4,1,1,1],
    [1,0,1,1,0,0,0,0,0,0,2,0,0,1,1,1],
    [1,0,1,1,0,0,0,0,2,1,1,0,2,1,1,1],
    [1,0,1,1,1,1,2,1,3,3,3,1,0,1,1,1],
    [1,0,0,1,1,1,0,2,3,3,3,0,0,1,1,1],
    [1,0,0,1,1,1,0,1,3,0,3,1,0,1,1,1],
    [1,0,0,1,1,1,0,0,0,1,0,1,2,0,1,1],
    [1,0,0,1,1,1,2,0,0,2,0,0,0,0,1,1],
    [1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1],
    [1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]);




//construcition in to the array with new objects

function mapDraw(){
    
    maps[level].forEach(function(row,i){
        row.forEach(function(tile,j){
            if(tile == 1){
                blocks.push(new Block(j*50,i*50))
            }else if(tile ==2){
                boxes.push(new Box(j*50,i*50))
            }else if(tile == 3){
                tiles.push(new Tile(j*50,i*50))
            }else if(tile == 4){
               player = new Player(j*50,i*50)
            }

            
            

        })

    })

    

}

// if the button is pressed it resets the lvl
function resetLvl(){
    
    //reset arrays
    blocks = []
    boxes = []
    tiles = []
    //redraw map
    mapDraw();

}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

//++++++++++++++++++++++++++++++++++++++++++Global Variables+++++++++++++++++++++++++++++++++++++++++++
const W = canvas.width; const H = canvas.height;

let selectedWindow = [5]
selectedWindow[0] = true // menu
selectedWindow[1] = false // gameplay
selectedWindow[2] = false // victory 
selectedWindow[3] = false // endGame
selectedWindow[4] = false // credits

let selectedButton = [2]
selectedButton[0] = true // gameplay button
selectedButton[1] = false // credits button

let frameIndex = 0

let walkDirection = [5] // Direction of the walking animation of the character
walkDirection[0] = 0 // down
walkDirection[1] = 50 //up
walkDirection[2] = 100 // right
walkDirection[3] = 150 // left
walkDirection[4] = 200 // celebration 

let frameCounter = 0


//booleans for the conditions and where are you in the game section
let gameRun = false
let menuRun = true // we start with menu first
let creditRun = false

//++++++++++++++++++++++++++++++Rendering program++++++++++++++++++++++++++++++
bgImage.onload = function(){
    walkImg.onload = function(){
        blockImage.onload =function(){
            boxImage1.onload = function(){
                boxImage2.onload = function(){
                    render()
                }
                
            }
        
        }
    }
 
}

menu()

function menu(){

   
    
    function ArrowReleased(e) {
        if (e.key == 'ArrowUp') {
            for(let i = 0; i < selectedButton.length; i++ ){
                if(selectedButton[i] == true && i > 0){
                    selectedButton[i] = false
                    selectedButton[i-1] = true
                   
                }
            }
            
        }
        if(e.key == 'ArrowDown'){
            for(let i = 0; i < selectedButton.length; i++ ){
                if(selectedButton[i] == true && i < selectedButton.length-1){
                    selectedButton[i] = false
                    selectedButton[i+1] = true
                   
                }
        }
       
        }
        if(e.key == 'Enter'){

            if(menuRun == true){

                if(selectedButton[0] == true){
                    selectedWindow[0] = false
                    selectedWindow[1] = true

                    menuRun = false
                    creditRun = false
                    

                    gamePlay()
                    
                }else if(selectedButton[1] == true){
                    selectedWindow[0] = false
                    selectedWindow[4] = true


                    menuRun = false
                    creditRun = true
                                        

                    credits()
                }

            }



            
        }
    }
    
    function ArrowPressed(e){
        e.repeat = false
        e.preventDefault();
    }
    window.addEventListener('keyup', ArrowReleased); //released
    window.addEventListener('keydown', ArrowPressed);
}




function gamePlay(){
mapDraw()





//++++++++++++++++++++++++++++++++++++ FUNCTIONS SET UP ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//-------------------------handler for keyup--------------------------------------
//NOTE: make it ignore when two keys are pressed at the same time
function ArrowReleased(e) {
    let move = true;
    let moveBox = true; 


    
    if (e.key == 'ArrowRight') {
        
        
        // adding player movement
        if(frameIndex < 1){
            frameIndex++
        }else{
            frameIndex = 0
        }
     

        directionIndex = 2
        //block collission detection
        for(let i = 0; i<blocks.length;i++){
            if(player.xPlayer == blocks[i].Bx-p1_d && player.yPlayer == blocks[i].By){
                move = false
    
            }


        }
        

        //-------------box interactions----------------
        for(let k = 0; k<boxes.length; k++){
           
            moveBox = true;
            //box collission detection and move
            if(player.xPlayer == boxes[k].xBox-p1_d && player.yPlayer ==boxes[k].yBox ){

                //Box collision with other boxes
                for(let l = 0; l<boxes.length; l++){
                    if(boxes[k].xBox == boxes[l].xBox - p1_d && boxes[k].yBox == boxes[l].yBox){
                        move = false
                        moveBox = false
                    }
                }
                //box colission with the block
                for(let i = 0; i<blocks.length;i++){
                    if(player.xPlayer == blocks[i].Bx-p1_d*2 && player.yPlayer == blocks[i].By){
                        move = false
                        moveBox = false
            
                    }
        
        
                }
                
                
                //box collision with border
                if(player.xPlayer >= W-p1_d*2) {
                    move = false
                    moveBox = false

                }
                if(moveBox){
                    boxes[k].xBox +=p1_d

                }

            }

        }
           
        //border colission
        if(player.xPlayer >= W-p1_d ){
            move = false            
        }
          
        if(move){
            player.xPlayer+=p1_d
        }
        
    }
    if (e.key == 'ArrowLeft') { 
        
         // adding player movement
        if(frameIndex < 1){
            frameIndex++
        }else{
            frameIndex = 0
        }
       

        directionIndex = 3
        //block collission detection
        for(let i = 0; i<blocks.length;i++){
            if( player.xPlayer == blocks[i].Bx+p1_d && player.yPlayer == blocks[i].By){
                move = false
    
            }


        }
        


        //-------------box interactions----------------



        

        //box collission detection and move
        for(let k = 0; k<boxes.length; k++){
         
            moveBox = true;
            if(player.xPlayer == boxes[k].xBox+p1_d && player.yPlayer ==boxes[k].yBox ){

              //Box collision with other boxes
              for(let l = 0; l<boxes.length; l++){
                if(boxes[k].xBox == boxes[l].xBox + p1_d && boxes[k].yBox == boxes[l].yBox){
                    move = false
                    moveBox = false
                }
            }
                //box colission with the block
                for(let i = 0; i<blocks.length;i++){
                    if(player.xPlayer == blocks[i].Bx+p1_d*2 && player.yPlayer == blocks[i].By){
                        move = false
                        moveBox = false   
                    }
                }
                
                
                //box collision with border
                if(player.xPlayer <=p1_d) {
                    move = false
                    moveBox = false
    
                }
                if(moveBox){
                    boxes[k].xBox -=p1_d
    
                }
    
    
    
    
    
            }
        }
        

        //box colission with the block

        // box collission with border


        //border collission  
        if(player.xPlayer <=0 ){
           move = false
        } 
        if(move){
            player.xPlayer-=p1_d
        }
        
    }
    if (e.key == 'ArrowUp') {
        // adding player movement
        if(frameIndex < 1){
            frameIndex++
        }else{
            frameIndex = 0
        }
       
        directionIndex = 1
        //block collission detection
        for(let i = 0; i<blocks.length;i++){
            if(player.yPlayer == blocks[i].By+p1_d && player.xPlayer == blocks[i].Bx){
                move = false
    
            }


        }



        

        //-------------box interactions----------------

       
        for(let k = 0; k<boxes.length; k++){
            moveBox = true;
            //box collission detection and move
            if(player.yPlayer == boxes[k].yBox+p1_d && player.xPlayer ==boxes[k].xBox ){
                //Box collision with other boxes
                for(let l = 0; l<boxes.length; l++){
                    if(boxes[k].yBox == boxes[l].yBox + p1_d && boxes[k].xBox == boxes[l].xBox){
                        move = false
                        moveBox = false
                    }
                }
                //box colission with the block
                for(let i = 0; i<blocks.length;i++){
                    if(player.yPlayer == blocks[i].By+p1_d*2 && player.xPlayer == blocks[i].Bx){
                        move = false
                        moveBox = false
            
                    }
        
        
                }
                
                
                //box collision with border
                if(player.yPlayer <=p1_d) {
                    move = false
                    moveBox = false

                }
                if(moveBox){
                    boxes[k].yBox -=p1_d

                }

            }
        }


        //border collission 
        if(player.yPlayer <= 0 ){
            move = false   
        }


        if(move){
            player.yPlayer-=p1_d 
        }

        
        
    }
    if (e.key == 'ArrowDown') {
        // adding player movement
        if(frameIndex < 1){
            frameIndex++
        }else{
            frameIndex = 0
        }
       

        directionIndex = 0
        //block collission detection
        for(let i = 0; i<blocks.length;i++){
            if(player.yPlayer == blocks[i].By-p1_d && player.xPlayer == blocks[i].Bx){
                move = false
    
            }


        }



        //-------------box interactions----------------

        //box collission detection and move
        for(let k = 0; k<boxes.length; k++){
        
            moveBox = true;
            if(player.yPlayer == boxes[k].yBox-p1_d && player.xPlayer ==boxes[k].xBox ){
            //Box collision with other boxes
            for(let l = 0; l<boxes.length; l++){
                if(boxes[k].yBox == boxes[l].yBox - p1_d && boxes[k].xBox == boxes[l].xBox){
                    move = false
                    moveBox = false
                }
            }

                //box colission with the block
                for(let i = 0; i<blocks.length;i++){
                    if(player.yPlayer == blocks[i].By-p1_d*2 && player.xPlayer == blocks[i].Bx){
                        move = false
                        moveBox = false
            
                    }
        
        
                }
                
                
                //box collision with border
                if(player.yPlayer>= H-p1_d*2) {
                    move = false
                    moveBox = false

                }
                if(moveBox){
                    boxes[k].yBox +=p1_d

                }

                

            }
        }



        //border collission   
        if(player.yPlayer>= H-p1_d ) {
            move = false
        }

        if(move){
            player.yPlayer+=p1_d 
        }



        
    }
    
 //Checks if boxes are in goal tiles
 for(let i = 0; i < boxes.length;i++){
    boxes[i].placed = false
    for(let k = 0; k < tiles.length; k++){
        if(boxes[i].xBox == tiles[k].xTile && boxes[i].yBox == tiles[k].yTile){
           goalCount +=1

           boxes[i].placed = true

           if(goalCount == tiles.length){
               if(level == maps.length-1){
                    goalCount = 0
                    //empthy the arrays
                    blocks = []
                    boxes = []
                    tiles = []
                    gameRun = true
                    endGame()
               }else{
                    goalCount = 0
                    //empthy the arrays
                    blocks = []
                    boxes = []
                    tiles = []
                    gameRun = true
                    victory()
                    
               }
            
            
            
            }   
        }
       
    }
}


goalCount = 0


}

function ArrowPressed(e){
    e.repeat = false
    e.preventDefault();
}

//----------------lvl construction arrays and fuctions------------------



// we will make it simple moves by the size of its dimention
// 50 works in a 800x700 , keep in 100 or 50 the size of the canvas
// need the teachs help on how to make the arrow keeps not interfier with the scrool

window.addEventListener('keyup', ArrowReleased); //released
window.addEventListener('keydown', ArrowPressed);


}

function victory(){

    selectedWindow[1] = false
    selectedWindow[2] = true
    function ArrowReleased(e) {
        if (e.key == 'Enter') {

            if(gameRun == true){

                gameRun = false

                selectedWindow[1] = true
                selectedWindow[2] = false
           
                level+=1
                mapDraw()

            }

            
            
        }
    }

    function ArrowPressed(e){
        e.repeat = false
        e.preventDefault();
    }
    window.addEventListener('keyup', ArrowReleased); //released
    window.addEventListener('keydown', ArrowPressed);

}

function endGame(){

    selectedWindow[1] = false
    selectedWindow[3] = true
    level = 0

    function ArrowReleased(e) {
        
        if (e.key == 'Enter') {

            if(gameRun == true){

                gameRun = false
                menuRun = true

                selectedButton[0] == false // disable the "gamePlay" calling condition
           

                location.reload()



            }
        }
    }

    function ArrowPressed(e){
        e.repeat = false
        e.preventDefault();
    }
    window.addEventListener('keyup', ArrowReleased); //released
    window.addEventListener('keydown', ArrowPressed);
}

function credits(){
    function ArrowReleased(e) {
        
        if (e.key == 'Enter') {

            if(creditRun == true){

                creditRun = false
                menuRun = true

                selectedButton[1] == false // disable the "credits" calling condition

           

                location.reload()


            }
        }
    }

    function ArrowPressed(e){
        e.repeat = false
        e.preventDefault();
    }
    window.addEventListener('keyup', ArrowReleased); //released
    window.addEventListener('keydown', ArrowPressed);
}

//##################################   ANIMATION CYCLE #######################################
function render() {

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Menu Rendering++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if(selectedWindow[0] == true){
        //Condition to slow down the walking animation on the menu
        if (frameCounter <= 30){
            frameIndex = 0
        }else if(frameCounter > 30 && frameCounter <= 60){
            frameIndex = 1
        }else if(frameCounter > 60){
            frameCounter = 0
        }
        
        frameCounter++
        

        ctx.clearRect(0,0,W,H);
        ctx.drawImage(bgImage,0,0,W,H)
    
        ctx.font = "40pt Orbitron"
    
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'Magenta'
    
        ctx.strokeText("Puppy Puzzle",W/2,H/2-250)
        ctx.fillText("Puppy Puzzle",W/2,H/2-250)
    
        ctx.strokeText("Play Game",W/2,H/2)
        ctx.fillText("Play Game",W/2,H/2)
    
        ctx.strokeText("Credits",W/2,H/2 + 100 )
        ctx.fillText("Credits",W/2,H/2 + 100 )
        if(selectedButton[0] == true){
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[0],50,50,W/2-230,H/2-30,50,50)
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[0],50,50,W/2 + 180,H/2-30,50,50)
        }else if(selectedButton[1] == true){
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[0],50,50,W/2-170,H/2+70,50,50)
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[0],50,50,W/2 + 120,H/2+70,50,50)
        }
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++Gameplay Rendering++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    else if(selectedWindow[1] == true){
     //insert lvl drawing fuction/classes before drawing the players movement and boxes push   
    ctx.drawImage(bgImage,0,0,W,H)

     
     
    
    
     //block layout
     blocks.forEach(function (block) {
         block.draw();
             
     });
    
     tiles.forEach(function (tile){
         tile.draw();
     });
    
    
     
    
     //----------boxes layout test
     boxes.forEach(function(box){
         box.draw();
         box.update();
     });
     
    
     //player draw
     player.draw(frameIndex)
    
    
    
    
     
     
    
    
    
    
     //---------- placement checker here , if all boxes this.placed == true, then you won the lvl and move to the next lvl
    
     
    }
//++++++++++++++++++++++++++++++++++++++++++++++++++Victory Rendering+++++++++++++++++++++++++++++++++++++++++++++++++++
    else if(selectedWindow[2] == true){
       
            //Condition to slow down the walking animation
            if (frameCounter <= 30){
                frameIndex = 0
            }else if(frameCounter > 30 && frameCounter <= 60){
                frameIndex = 1
            }else if(frameCounter > 60){
                frameCounter = 0
            }
            
            frameCounter++
            
    
            ctx.clearRect(0,0,W,H);
            ctx.drawImage(bgImage,0,0,W,H)
        
            ctx.font = "40pt Orbitron"
        
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 5
            ctx.textBaseline = 'middle'
            ctx.textAlign = 'center'
            ctx.fillStyle = 'Magenta'
        
            ctx.strokeText("Well Done!",W/2,H/2-250)
            ctx.fillText("Well Done!",W/2,H/2-250)

            ctx.strokeText(`Level ${level + 1} Complete!`,W/2,H/2 - 100)
            ctx.fillText(`Level ${level + 1} Complete!`,W/2,H/2 - 100)

            ctx.strokeText("Moving to the next level",W/2,H/2)
            ctx.fillText("Moving to the next level",W/2,H/2)

            ctx.font = "20pt Orbitron"
           
            ctx.lineWidth = 3

            ctx.strokeText("Press 'Enter' to continue",W/2,H/2+100)
            ctx.fillText("Press 'Enter' to continue",W/2,H/2+100)

            ctx.drawImage(walkImg,frameIndex*50,walkDirection[4],50,50,W/2-230,H/2-280,50,50)
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[4],50,50,W/2 + 180,H/2-280,50,50)
    }

    //++++++++++++++++++++++++++++++++++++++++++++++End Game Rendering+++++++++++++++++++++++++++++++++++++

    else if(selectedWindow[3] == true){
         //Condition to slow down the walking animation
         if (frameCounter <= 30){
            frameIndex = 0
        }else if(frameCounter > 30 && frameCounter <= 60){
            frameIndex = 1
        }else if(frameCounter > 60){
            frameCounter = 0
        }
        
        frameCounter++
        

        ctx.clearRect(0,0,W,H);
        ctx.drawImage(bgImage,0,0,W,H)
    
        ctx.font = "40pt Orbitron"
    
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'Magenta'
    
        ctx.strokeText("Game Complete!",W/2,H/2-250)
        ctx.fillText("Game Complete!",W/2,H/2-250)



        ctx.font = "20pt Orbitron"
       
        ctx.lineWidth = 3

        ctx.strokeText("Press 'Enter' to go to Menu",W/2,H/2+50)
        ctx.fillText("Press 'Enter' to go to Menu",W/2,H/2+50)

        ctx.drawImage(walkImg,frameIndex*50,walkDirection[4],50,50,W/2-300,H/2-280,50,50)
        ctx.drawImage(walkImg,frameIndex*50,walkDirection[4],50,50,W/2 + 250,H/2-280,50,50)
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++Credits Rendering++++++++++++++++++++++++++++++++++++++++++++++++++++
    else if(selectedWindow[4]== true){
          //Condition to slow down the walking animation
          if (frameCounter <= 30){
            frameIndex = 0
            directionIndex = 0
        }else if(frameCounter > 30 && frameCounter <= 60){
            frameIndex = 1
            directionIndex = 0
        }else if(frameCounter > 60 && frameCounter <= 90){
            frameIndex = 0
            directionIndex = 2
        }else if(frameCounter > 90 && frameCounter <= 120){
            frameIndex = 1
            directionIndex = 2
        }else if(frameCounter > 120 && frameCounter <= 150){
            frameIndex = 0
            directionIndex = 1
        }else if(frameCounter > 150 && frameCounter <= 180){
            frameIndex = 1
            directionIndex = 1
        }else if(frameCounter > 180 && frameCounter <= 210){
            frameIndex = 0
            directionIndex = 3
        }else if(frameCounter > 210 && frameCounter <= 240){
            frameIndex = 1
            directionIndex = 3
        }else if(frameCounter > 240){
            frameCounter = 0
        }


        frameCounter++
        

        ctx.clearRect(0,0,W,H);
        ctx.drawImage(bgImage,0,0,W,H)
    
        ctx.font = "40pt Orbitron"
    
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'Magenta'
    
        ctx.strokeText("Game Made by:",W/2,H/2-250)
        ctx.fillText("Game Made by:",W/2,H/2-250)



        ctx.font = "20pt Orbitron"
       
        ctx.lineWidth = 3

        ctx.strokeText("Luis Pires",W/2,H/2)
        ctx.fillText("Luis Pires",W/2,H/2)

        ctx.strokeText("&",W/2,H/2+50)
        ctx.fillText("&",W/2,H/2+50)

        ctx.strokeText("Miguel Amaral",W/2,H/2+100)
        ctx.fillText("Miguel Amaral",W/2,H/2+100)

        for(let i = 0; i<W/50; i++){
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[directionIndex],50,50,i * 50,0,50,50)
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[directionIndex],50,50,i * 50,H-50,50,50)
        }

        for(let k = 0; k<H/50; k++){
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[directionIndex],50,50,0,k * 50 ,50,50)
            ctx.drawImage(walkImg,frameIndex*50,walkDirection[directionIndex],50,50,W-50,k * 50,50,50)
        }


        
        ctx.drawImage(walkImg,frameIndex*50,walkDirection[4],50,50,W/2-150,H/2 + 20,50,50)
        ctx.drawImage(walkImg,frameIndex*50,walkDirection[4],50,50,W/2 + 100,H/2 + 20,50,50)
    }
    
     //new frame
     window.requestAnimationFrame(render)
    
    }