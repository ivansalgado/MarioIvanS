// TODO
game.PlayerEntity = me.Entity.extend({
    
    //tells size of  marion and mario's box thing (don't know what to call it)
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "GR",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function(){
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
             }
        }]);
    
      
        //uses standing/walking images
        this.renderable.addAnimation("idle", [39]);
        this.renderable.addAnimation("smallWalk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 100);
        
        this.renderable.setCurrentAnimation("idle");
        //sets speed for direction
        this.body.setVelocity(5, 20);
        //viewport follows character
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update: function(delta){
        //moves right, doesn't flip
        if (me.input.isKeyPressed('right')) {
            this.flipX(false);
            //adds velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        //moves left, flips image(s)
        else if (me.input.isKeyPressed('left')) {
            this.flipX(true);
            //adds velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
         
        //"idle" 
        else {
            this.body.vel.x = 0;
        }
        //jumps and falls
        if (me.input.isKeyPressed('jump')) {
            if(!this.body.jumping && !this.body.falling) {
                this.body.vel.y = - this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }
        
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //when not walking, mario stands
        if(this.body.vel.x !== 0){
            if(!this.renderable.isCurrentAnimation("smallWalk")){
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
        }
        
        
        
        }
        
        else{
            this.renderable.setCurrentAnimation("idle");
        }
        
        
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        
    }


});
//allows you to collide with door and load into new level
game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },

    //loads mario in new level
    onCollision: function(){
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
});

