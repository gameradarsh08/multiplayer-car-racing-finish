class Game{
    constructor(){

    }
    getState(){
        var gameStateRef=database.ref("gameState");
        gameStateRef.on("value",function(data){
            gameState=data.val();
        })
    }
    update(state){
        database.ref('/').update({
            gameState:state
        })
    }
 
    async start(){
        if (gameState===0){
            player=new Player();
            player.getCount();
            var playerCountref=await database.ref('playerCount').once("value")
            if (playerCountref.exists()){
                playerCount=playerCountref.val()
                player.getCount();
            }
            form=new Form();
            form.display();
        }

        car1=createSprite(100,200);
        car1.addImage(car1img)
        car2=createSprite(300,200);
        car2.addImage(car2img)
        car3=createSprite(500,200);
        car3.addImage(car3img)
        car4=createSprite(700,200);
        car4.addImage(car4img)
        cars=[car1,car2,car3,car4]
    }
        play(){
            form.hide();
            textSize(30);
            //text("Game Start",120,100);
            Player.getPlayerInfo();
        if (allplayers!=undefined){
            var index=0,x=175,y
            background("#c68767");
            image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)
            //var display_position=130
            for(var plr in allplayers){
                index=index+1
                x=x+200
                y=displayHeight-allplayers[plr].distance
                cars[index-1].x=x
                cars[index-1].y=y
                if(index===player.index){
                    cars[index-1].shapeColour="red"
                    camera.position.x=displayWidth/2
                    camera.position.y=cars[index-1].y
                }
                
               
                //display_position+=20; 
               // textSize(15);
               // text(allplayers[plr].name+":"+allplayers[plr].distance,120,display_position)          
             }
        }  
        if (keyIsDown(UP_ARROW)&& player.index!=null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>3860){
            gameState=2;
        }
        drawSprites();
    }
    end(){
        console.log("game Ended");
    }
}