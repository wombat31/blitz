//CONSTANTS//////////////////////////////////////////////////
CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 400;
BUILDING_TILE_WIDTH = 20;
BUILDING_TILE_HEIGHT = 20;
var buildingBlock = new Image;
buildingBlock.src = "images/buildingTile.png";
var airship = new Image;
airship.src = "images/airship.png";
var bomb = new Image;
bomb.src = "images/bomb.png";
    

//SETUP//////////////////////////////////////////////////////
var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);
frameCount = 0;
var gameOn = false;

var gameOver = false;

//randomise building heights
var buildingHeightArray = [];
for(i=0;i<40;i++){
    buildingHeightArray.push(Math.floor(Math.random() * 10));
}
var buildingIndexToCheck;
var buildingHeightToCheck;

var buildingCollapsing = false;

//console.log(buildingHeightArray);
//airship variables
var airshipX = -60;
var airshipY = 0;
var airshipSpeed = 2;
var shipCrashed = false;
var crashIndexXToCheck = 0;
var crashIndexYToCheck = 0;

//bomb variables
var bombX = 0;
var bombY = 0;
bombDropped = false;
bombInTheAir = false;
var buildingHit = false;
var bombSpeed = 1;


var shipCrashed = false;




//var leftKeyPressed = false;
//var rightKeyPressed = false;
//var upKeyPressed = false;
//var downKeyPressed = false;

window.addEventListener('load',start);

window.addEventListener('keydown', onKeyDown);
//window.addEventListener('keyup', onKeyUp);



function start(){
    window.requestAnimationFrame(mainLoop);
}

function checkForBombOnBuilding(){
    

}


function mapConverter(tileRef){
    switch(tileRef){
        case "A":
            tileX = 0;
            tileY = 0;
            break;
        case "B":
            tileX = 30;
            tileY = 0;
            break;
        case "C":
            tileX = 60;
            tileY = 0;
            break;
        case "X":
            tileX = 90;
            tileY = 0;
            break;
        case "R":
            tileX = 120;
            tileY = 0;
            break;
        case "S":
            tileX = 150;
            tileY = 0;
            break;
        case "T":
            tileX = 180;
            tileY = 0;
            break;
        case "D":
            tileX = 0;
            tileY = 30;
            break;
        case ".":
            tileX = 30;
            tileY = 30;
            break;
        case "E":
            tileX = 60;
            tileY = 30;
            break;
        case "F":
            tileX = 0;
            tileY = 60;
            break;
        case "G":
            tileX = 30;
            tileY = 60;
            break;
        case "H":
            tileX = 60;
            tileY = 60;
            break;
        
        default:
            tileX = 30;
            tileY = 30;
    }
}

//MAIN LOOP///////////////////////////////////////////////////
function mainLoop(){
    update();
    draw();
    window.requestAnimationFrame(mainLoop);
}


//PLAYER INPUT////////////////////////////////////////////////

function onKeyDown(event){
    if(event.keyCode == 83){
        gameOn = true;
    }
    if(!bombInTheAir && gameOn){
        if(event.keyCode == 32){
            bombDropped = true;
            bombInTheAir = true;
            //drop the bomb on only one building by dividing the 
            //airship x position and rounding down
            bombX = (Math.floor(airshipX/20))*20;
            buildingIndexToCheck = Math.floor(airshipX/20);
            //console.log(buildingIndexToCheck);
            bombY = airshipY+20;
        }
    }
    if(gameOver){
        if(event.keyCode == 82){
            //initialise all variables
            alert("restart");
            //buildings
            buildingHeightArray = [];
            for(i=0;i<40;i++){
                buildingHeightArray.push(Math.floor(Math.random() * 10));
            }
            airshipX = -60;
            airshipY = 0;
            airshipSpeed = 2;
            shipCrashed = false;

            bombX = 0;
            bombY = 0;
            bombDropped = false;
            bombInTheAir = false;
            buildingHit = false;
            bombSpeed = 1;


            shipCrashed = false;

            gameOn = true;
            gameOver = false;

            

        }
    }
    
}

function crashtest(posX,posY){
    crashIndexXToCheck = (Math.floor(posX/20))+3;
    crashIndexYToCheck = Math.floor(20 - (posY/20));

    if(crashIndexXToCheck > 39){
        crashIndexXToCheck = 39;
    }

    if(buildingHeightArray[crashIndexXToCheck] > crashIndexYToCheck){
        shipCrashed = true;
        //gameOn = false;
        gameOver = true;
    }

    /*
    if(buildingHeightArray[posX] > 0){
        buildingHeightToCheck = Math.floor((CANVAS_HEIGHT - posY)/20)*20;
        
        if(buildingHeightToCheck <= buildingHeightArray[posXIndex]){
            //shipCrashed = true;
        }
    }
   */
    //return crashIndexXToCheck;
    //return crashIndexYToCheck;

}


//UPDATING////////////////////////////////////////////////////

function update(){
    frameCount +=1;
    if(gameOn){
        if(!shipCrashed){
            airshipX += airshipSpeed;
            if(airshipX >= 830){
                airshipX = -60;
                airshipY +=20;
                airshipSpeed +=0.2;
            }
            if(bombDropped && bombY<CANVAS_HEIGHT-20 && bombY<(CANVAS_HEIGHT-(buildingHeightArray[buildingIndexToCheck]*20))){
                bombY +=bombSpeed;
                bombSpeed += 0.05;
            } else {
                bombDropped = false;
                bombInTheAir = false;
                bombSpeed = 1;
                buildingHit = true;
                
            }
            if(buildingHit && !bombInTheAir){
                if((buildingHeightArray[buildingIndexToCheck])>0){
                    if(frameCount%7 == 0){
                        buildingHeightArray[buildingIndexToCheck] -=1;
                        
                    }
                } else {
                    buildingHit = false;
                }
            }
        }
        crashtest(airshipX,airshipY);
        
        
    }
}

//DRAWING/////////////////////////////////////////////////////
function draw(){
    
    c.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    if(gameOn){

        //draw the background
        c.fillStyle = "lightblue";
        c.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT-250);
        //drawbuildings
        /*Loop through buildingHeightArray and stack building images to height of 
        value*/
        var buildingBlockX = 0;
        for(i=0; i<buildingHeightArray.length; i++){
            
            
            for(j=20; j<(buildingHeightArray[i]*20); j+=20){
                c.drawImage(buildingBlock, buildingBlockX,CANVAS_HEIGHT-j);
                //console.log(buildingHeightArray[i]);
                
            }
            buildingBlockX += 20;
            
        }

        //c.drawImage(buildingBlock,0,CANVAS_HEIGHT-20);
        //draw airship
        if(!shipCrashed){
            c.drawImage(airship,airshipX,airshipY);
        }
        //draw bomb
        if(bombDropped && !shipCrashed){
            c.drawImage(bomb,bombX,bombY);
        }
    }
    //draw text to the screen before starting the game

    if(!gameOn){
        c.font = "100px consolas";
        c.fillStyle = "red";
        c.textAlign = "center";
        c.fillText("Blitz",CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
        c.font = "35px consolas";
        c.fillStyle = "black";
        c.fillText("Press s to play - SpaceBar drops bombs",CANVAS_WIDTH/2,CANVAS_HEIGHT/2+50);
        c.font = "30px consolas";
        c.fillText("Clear all buildings to land your ship",CANVAS_WIDTH/2,CANVAS_HEIGHT/2+100);

    }
    //draw text to the screen if crashed and game Over
    if(gameOver){
        c.font = "80px consolas";
        c.fillStyle = "red";
        c.textAlign = "center";
        c.fillText("G A M E  O V E R",CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
        c.font = "35px consolas";
        c.fillStyle = "black";
        c.fillText("Press r to play again",CANVAS_WIDTH/2,CANVAS_HEIGHT/2+50);
        c.font = "30px consolas";
    }



     //draw variables to the screen for checking

     c.font = "20px arial";
     c.fillStyle = "black";
     c.textAlign = "left";
     c.fillText(`shipcrashed: ${shipCrashed}`, 20, 20);
     c.fillText(`airshipX: ${airshipX}`, 20, 50);
     c.fillText(`airShipY: ${airshipY}`, 20, 80);
     c.fillText(`crash X Index: ${crashIndexXToCheck}`, 20, 110);
     c.fillText(`crash Y Index: ${crashIndexYToCheck}`, 20, 140);
     c.fillText(`gameOn: ${gameOn}`, 20, 160);

      
    
}