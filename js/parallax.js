!function(window,document,undefined){"use strict";var NAME="Parallax",MAGIC_NUMBER=30,DEFAULTS={relativeInput:!1,clipRelativeInput:!1,calibrationThreshold:100,calibrationDelay:500,supportDelay:500,calibrateX:!1,calibrateY:!0,invertX:!0,invertY:!0,limitX:!1,limitY:!1,scalarX:10,scalarY:10,frictionX:.1,frictionY:.1,originX:.5,originY:.5};function Parallax(element,options){this.element=element,this.layers=element.getElementsByClassName("layer");var data={calibrateX:this.data(this.element,"calibrate-x"),calibrateY:this.data(this.element,"calibrate-y"),invertX:this.data(this.element,"invert-x"),invertY:this.data(this.element,"invert-y"),limitX:this.data(this.element,"limit-x"),limitY:this.data(this.element,"limit-y"),scalarX:this.data(this.element,"scalar-x"),scalarY:this.data(this.element,"scalar-y"),frictionX:this.data(this.element,"friction-x"),frictionY:this.data(this.element,"friction-y"),originX:this.data(this.element,"origin-x"),originY:this.data(this.element,"origin-y")};for(var key in data)null===data[key]&&delete data[key];this.extend(this,DEFAULTS,options,data),this.calibrationTimer=null,this.calibrationFlag=!0,this.enabled=!1,this.depths=[],this.raf=null,this.bounds=null,this.ex=0,this.ey=0,this.ew=0,this.eh=0,this.ecx=0,this.ecy=0,this.erx=0,this.ery=0,this.cx=0,this.cy=0,this.ix=0,this.iy=0,this.mx=0,this.my=0,this.vx=0,this.vy=0,this.onMouseMove=this.onMouseMove.bind(this),this.onDeviceOrientation=this.onDeviceOrientation.bind(this),this.onOrientationTimer=this.onOrientationTimer.bind(this),this.onCalibrationTimer=this.onCalibrationTimer.bind(this),this.onAnimationFrame=this.onAnimationFrame.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.initialise()}Parallax.prototype.extend=function(){if(arguments.length>1)for(var master=arguments[0],i=1,l=arguments.length;i<l;i++){var object=arguments[i];for(var key in object)master[key]=object[key]}},Parallax.prototype.data=function(element,name){return this.deserialize(element.getAttribute("data-"+name))},Parallax.prototype.deserialize=function(value){return"true"===value||"false"!==value&&("null"===value?null:!isNaN(parseFloat(value))&&isFinite(value)?parseFloat(value):value)},Parallax.prototype.camelCase=function(value){return value.replace(/-+(.)?/g,(function(match,character){return character?character.toUpperCase():""}))},Parallax.prototype.transformSupport=function(value){for(var element=document.createElement("div"),propertySupport=!1,propertyValue=null,featureSupport=!1,cssProperty=null,jsProperty=null,i=0,l=this.vendors.length;i<l;i++)if(null!==this.vendors[i]?(cssProperty=this.vendors[i][0]+"transform",jsProperty=this.vendors[i][1]+"Transform"):(cssProperty="transform",jsProperty="transform"),void 0!==element.style[jsProperty]){propertySupport=!0;break}switch(value){case"2D":featureSupport=propertySupport;break;case"3D":if(propertySupport){var body=document.body||document.createElement("body"),documentElement=document.documentElement,documentOverflow=documentElement.style.overflow;document.body||(documentElement.style.overflow="hidden",documentElement.appendChild(body),body.style.overflow="hidden",body.style.background=""),body.appendChild(element),element.style[jsProperty]="translate3d(1px,1px,1px)",featureSupport=void 0!==(propertyValue=window.getComputedStyle(element).getPropertyValue(cssProperty))&&propertyValue.length>0&&"none"!==propertyValue,documentElement.style.overflow=documentOverflow,body.removeChild(element)}}return featureSupport},Parallax.prototype.ww=null,Parallax.prototype.wh=null,Parallax.prototype.wcx=null,Parallax.prototype.wcy=null,Parallax.prototype.wrx=null,Parallax.prototype.wry=null,Parallax.prototype.portrait=null,Parallax.prototype.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),Parallax.prototype.vendors=[null,["-webkit-","webkit"],["-moz-","Moz"],["-o-","O"],["-ms-","ms"]],Parallax.prototype.motionSupport=!!window.DeviceMotionEvent,Parallax.prototype.orientationSupport=!!window.DeviceOrientationEvent,Parallax.prototype.orientationStatus=0,Parallax.prototype.transform2DSupport=Parallax.prototype.transformSupport("2D"),Parallax.prototype.transform3DSupport=Parallax.prototype.transformSupport("3D"),Parallax.prototype.propertyCache={},Parallax.prototype.initialise=function(){var style;this.transform3DSupport&&this.accelerate(this.element),"static"===window.getComputedStyle(this.element).getPropertyValue("position")&&(this.element.style.position="relative"),this.updateLayers(),this.updateDimensions(),this.enable(),this.queueCalibration(this.calibrationDelay)},Parallax.prototype.updateLayers=function(){this.layers=this.element.getElementsByClassName("layer"),this.depths=[];for(var i=0,l=this.layers.length;i<l;i++){var layer=this.layers[i];this.transform3DSupport&&this.accelerate(layer),layer.style.position=i?"absolute":"relative",layer.style.display="block",this.depths.push(this.data(layer,"depth")||0)}},Parallax.prototype.updateDimensions=function(){this.ww=window.innerWidth,this.wh=window.innerHeight,this.wcx=this.ww*this.originX,this.wcy=this.wh*this.originY,this.wrx=Math.max(this.wcx,this.ww-this.wcx),this.wry=Math.max(this.wcy,this.wh-this.wcy)},Parallax.prototype.updateBounds=function(){this.bounds=this.element.getBoundingClientRect(),this.ex=this.bounds.left,this.ey=this.bounds.top,this.ew=this.bounds.width,this.eh=this.bounds.height,this.ecx=this.ew*this.originX,this.ecy=this.eh*this.originY,this.erx=Math.max(this.ecx,this.ew-this.ecx),this.ery=Math.max(this.ecy,this.eh-this.ecy)},Parallax.prototype.queueCalibration=function(delay){clearTimeout(this.calibrationTimer),this.calibrationTimer=setTimeout(this.onCalibrationTimer,delay)},Parallax.prototype.enable=function(){this.enabled||(this.enabled=!0,this.orientationSupport?(this.portrait=null,window.addEventListener("deviceorientation",this.onDeviceOrientation),setTimeout(this.onOrientationTimer,this.supportDelay)):(this.cx=0,this.cy=0,this.portrait=!1,window.addEventListener("mousemove",this.onMouseMove)),window.addEventListener("resize",this.onWindowResize),this.raf=requestAnimationFrame(this.onAnimationFrame))},Parallax.prototype.disable=function(){this.enabled&&(this.enabled=!1,this.orientationSupport?window.removeEventListener("deviceorientation",this.onDeviceOrientation):window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("resize",this.onWindowResize),cancelAnimationFrame(this.raf))},Parallax.prototype.calibrate=function(x,y){this.calibrateX=void 0===x?this.calibrateX:x,this.calibrateY=void 0===y?this.calibrateY:y},Parallax.prototype.invert=function(x,y){this.invertX=void 0===x?this.invertX:x,this.invertY=void 0===y?this.invertY:y},Parallax.prototype.friction=function(x,y){this.frictionX=void 0===x?this.frictionX:x,this.frictionY=void 0===y?this.frictionY:y},Parallax.prototype.scalar=function(x,y){this.scalarX=void 0===x?this.scalarX:x,this.scalarY=void 0===y?this.scalarY:y},Parallax.prototype.limit=function(x,y){this.limitX=void 0===x?this.limitX:x,this.limitY=void 0===y?this.limitY:y},Parallax.prototype.origin=function(x,y){this.originX=void 0===x?this.originX:x,this.originY=void 0===y?this.originY:y},Parallax.prototype.clamp=function(value,min,max){return value=Math.max(value,min),value=Math.min(value,max)},Parallax.prototype.css=function(element,property,value){var jsProperty=this.propertyCache[property];if(!jsProperty)for(var i=0,l=this.vendors.length;i<l;i++)if(jsProperty=null!==this.vendors[i]?this.camelCase(this.vendors[i][1]+"-"+property):property,void 0!==element.style[jsProperty]){this.propertyCache[property]=jsProperty;break}element.style[jsProperty]=value},Parallax.prototype.accelerate=function(element){this.css(element,"transform","translate3d(0,0,0)"),this.css(element,"transform-style","preserve-3d"),this.css(element,"backface-visibility","hidden")},Parallax.prototype.setPosition=function(element,x,y){x+="px",y+="px",this.transform3DSupport?this.css(element,"transform","translate3d("+x+","+y+",0)"):this.transform2DSupport?this.css(element,"transform","translate("+x+","+y+")"):(element.style.left=x,element.style.top=y)},Parallax.prototype.onOrientationTimer=function(event){this.orientationSupport&&0===this.orientationStatus&&(this.disable(),this.orientationSupport=!1,this.enable())},Parallax.prototype.onCalibrationTimer=function(event){this.calibrationFlag=!0},Parallax.prototype.onWindowResize=function(event){this.updateDimensions()},Parallax.prototype.onAnimationFrame=function(){this.updateBounds();var dx=this.ix-this.cx,dy=this.iy-this.cy;(Math.abs(dx)>this.calibrationThreshold||Math.abs(dy)>this.calibrationThreshold)&&this.queueCalibration(0),this.portrait?(this.mx=this.calibrateX?dy:this.iy,this.my=this.calibrateY?dx:this.ix):(this.mx=this.calibrateX?dx:this.ix,this.my=this.calibrateY?dy:this.iy),this.mx*=this.ew*(this.scalarX/100),this.my*=this.eh*(this.scalarY/100),isNaN(parseFloat(this.limitX))||(this.mx=this.clamp(this.mx,-this.limitX,this.limitX)),isNaN(parseFloat(this.limitY))||(this.my=this.clamp(this.my,-this.limitY,this.limitY)),this.vx+=(this.mx-this.vx)*this.frictionX,this.vy+=(this.my-this.vy)*this.frictionY;for(var i=0,l=this.layers.length;i<l;i++){var layer=this.layers[i],depth=this.depths[i],xOffset=this.vx*depth*(this.invertX?-1:1),yOffset=this.vy*depth*(this.invertY?-1:1);this.setPosition(layer,xOffset,yOffset)}this.raf=requestAnimationFrame(this.onAnimationFrame)},Parallax.prototype.onDeviceOrientation=function(event){if(!this.desktop&&null!==event.beta&&null!==event.gamma){this.orientationStatus=1;var x=(event.beta||0)/30,y=(event.gamma||0)/30,portrait=this.wh>this.ww;this.portrait!==portrait&&(this.portrait=portrait,this.calibrationFlag=!0),this.calibrationFlag&&(this.calibrationFlag=!1,this.cx=x,this.cy=y),this.ix=x,this.iy=y}},Parallax.prototype.onMouseMove=function(event){var clientX=event.clientX,clientY=event.clientY;!this.orientationSupport&&this.relativeInput?(this.clipRelativeInput&&(clientX=Math.max(clientX,this.ex),clientX=Math.min(clientX,this.ex+this.ew),clientY=Math.max(clientY,this.ey),clientY=Math.min(clientY,this.ey+this.eh)),this.ix=(clientX-this.ex-this.ecx)/this.erx,this.iy=(clientY-this.ey-this.ecy)/this.ery):(this.ix=(clientX-this.wcx)/this.wrx,this.iy=(clientY-this.wcy)/this.wry)},window[NAME]=Parallax}(window,document),function(){for(var lastTime=0,vendors=["ms","moz","webkit","o"],x=0;x<vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(callback,element){var currTime=(new Date).getTime(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=window.setTimeout((function(){callback(currTime+timeToCall)}),timeToCall);return lastTime=currTime+timeToCall,id}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(id){clearTimeout(id)})}();