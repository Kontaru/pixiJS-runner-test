export class Tools {
    static importAll(r) {
        let assets = [];
        for (const key in r) {
          r[key]().then((asset) => assets.push(asset))
        }
        return assets;
    }

    static tap(handler) {
      app.stage.on("tap", handler);
    }
   
    static keyboard(value) {
        const key = {};
        key.value = value;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = (event) => {
          if (event.key === key.value) {
            if (key.isUp && key.press) {
              key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
          }
        };
      
        //The `upHandler`
        key.upHandler = (event) => {
          if (event.key === key.value) {
            if (key.isDown && key.release) {
              key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
          }
        };
      
        //Attach event listeners
        const downListener = key.downHandler.bind(key);
        const upListener = key.upHandler.bind(key);
        
        window.addEventListener("keydown", downListener, false);
        window.addEventListener("keyup", upListener, false);
        
        // Detach event listeners
        key.unsubscribe = () => {
          window.removeEventListener("keydown", downListener);
          window.removeEventListener("keyup", upListener);
        };
        
        return key;
      }
}