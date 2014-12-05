game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		var titleImage = new me.Sprite (0, 0, me.loader.getImage("title-screen"));
                me.game.world.addChild (titleImage, 1);
                me.input.bindKey(me.input.KEY.ENTER, "start");
                
                me.game.world.addChild(new (me.Renderable.extend ({
                    init: function(){
                        this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
                    },
                    
                    draw: function() {
                        
                    }
                    
                })));
                
                this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                    if (action === "start"){
                        me.state.change(me.state.PLAY);
                    }
                });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
	}
});
