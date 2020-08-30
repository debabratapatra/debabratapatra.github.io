/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/CanvasManager.js":
/*!*************************************!*\
  !*** ./src/common/CanvasManager.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CanvasManager; });
class CanvasManager {   

    constructor(constants) {
        this.constants = constants;
        this.canvas = constants.canvas;
        this.ctx = constants.ctx;
        this.explorers = [];
        this.attackers = [];
        this.components = [];
        this.init();
    }

    pushSprite(obj, order = 'end') {
        if(order == 'end') {
            this.components.push(obj);
        } else {
            this.components.unshift(obj);
        }
        
        if(obj.type === 'explorers') {
            this.explorers.push(obj);
        }
        if(obj.type === 'attackers') {
            this.attackers.push(obj);
        }
    }

    destroy(component) {
        let name;

        // Check if the name of the component has been sent.
        if(typeof component === 'string') {
            name = component;
        } else {
            name = component.name;
        }

        this.components.forEach((comp, index) => {
            if(comp.name === name) {
                this.components.splice(index, 1);
            }
        });
        this.attackers.forEach((attacker, index) => {
            if(attacker.name === name) {
                this.attackers.splice(index, 1);
            }
        });
        this.explorers.forEach((explorer, index) => {
            if(explorer.name === name) {
                this.explorers.splice(index, 1);
            }
        });
    }

    onMouseDown(x, y) {
        this.components.forEach((component, index) => {
            if(component.hitTest(this.ctx, x, y)) {
                component.startDrag(x, y);
                component.drag = true;
            }
        });
    }

    onMouseMove(x, y) {
        this.canvas.style.cursor = 'default';
        this.components.forEach((component, index) => {
            if(component.hitTest(this.ctx, x, y) && component.showPointer) {
                this.canvas.style.cursor = 'pointer';
            }
            if(component.drag) {
                component.dragging(x, y);
                this.draw();
            }
        });
    }

    onMouseUp(x, y) {
        this.components.forEach((component, index) => {
            // component.endDrag(x, y);
            component.drag = false;
        });
    }

    destroy(component) {
        this.components.forEach((comp, index) => {
            if(comp.name === component.name) {
                this.components.splice(index, 1);
            }
        });
    }

    push(component) {
        this.components.push(component);
    }

    init() {
    }
}

/***/ }),

/***/ "./src/common/Constants.js":
/*!*********************************!*\
  !*** ./src/common/Constants.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Constants; });
class Constants {
    constructor() {
        this.renderCanvas();
        this.setConstants();
        this.init();
    }

    renderCanvas() {
        this.canvas = document.createElement('canvas');
        this.getScreenSize();

        this.canvas.setAttribute('width',this.screenWidth + 'px');
        this.canvas.setAttribute('height',this.screenHeight + 'px');
        this.canvas.setAttribute('id','game-canvas');

        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    getScreenSize() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

        let width = w.innerWidth || e.clientWidth || g.clientWidth;
        this.screenHeight = (w.innerHeight|| e.clientHeight|| g.clientHeight);
        this.screenWidth = width;
    }

    setConstants() {
        const minWidth = 0.1 * this.screenWidth;
        this.roadWidth = minWidth < 100 ? minWidth : 100;
        this.roadScale = this.roadWidth + 20;
    }

    init() {
        
    }
}

/***/ }),

/***/ "./src/common/Observable.js":
/*!**********************************!*\
  !*** ./src/common/Observable.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
class Observable {
    
    constructor() {
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.draggable = false;
        this.animating = false;
    }
    draw() {};
}

/***/ }),

/***/ "./src/common/Static.js":
/*!******************************!*\
  !*** ./src/common/Static.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Static; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable */ "./src/common/Observable.js");


class Static extends _Observable__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor() {
        super();
    }
    hitTest() {}
}   

/***/ }),

/***/ "./src/common/Utility.js":
/*!*******************************!*\
  !*** ./src/common/Utility.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utility; });
class Utility {
    static createAnimationPath(points, velocity) {
        let path = [];

        points.forEach(point => {
            let dx = point[1].x - point[0].x,
                dy = point[1].y - point[0].y,

                //Magnitude/Distance of the line
                distance = Math.sqrt(dy * dy + dx * dx),
                currentPosition = 0,

                //Percent in 0 to 1
                percent = 0;            

            //Until 100%
            while (percent <= 1) {

                currentPosition += velocity;

                //Current Pecentage covered
                percent = currentPosition / distance;

                path.push({
                    x: point[0].x + dx * percent,
                    y: point[0].y + dy * percent
                }); 
            } 
        });
        return path;
    }

    static getLineParams(x1, y1, x2, y2) {
        let dx = x2 - x1,
            dy = y2 - y1,
            slope = dy / dx,
            angle = Math.atan(slope);

        return {
            slope: slope,
            angle: angle,
            distance: Math.sqrt(dy * dy + dx * dx)
        };
    }   

    static round(num) {
        return Math.floor(num);
    }

    static ajax(url, success) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                success(this.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}

/***/ }),

/***/ "./src/components/Tree.js":
/*!********************************!*\
  !*** ./src/components/Tree.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tree; });
/* harmony import */ var _common_Static__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Static */ "./src/common/Static.js");


class Tree extends _common_Static__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(constants) {
        super();
        this.xpos = 0;
        this.ypos = 0;
        this.zpos = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.alpha = 1;
        this.constants = constants;
        this.left = Math.round(Math.random() * this.constants.screenWidth * 0.06);

        if(this.left < 15) {
            this.left = 10;
        }
        this.xleft = 0.3 * this.left;
        this.mleft = 0.5 * this.left;
        this.mtop = 2 * this.left;
        this.top = 4 * this.left;
        this.reshape();
    }

    reshape() {
        this.width = Math.random() * 30;
        this.height = Math.random() * 80;

        if(this.width < 10) {
            this.width = 10;
        }
        if(this.height < 10) {
            this.height = 10;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        const x = 0;
        const y = 0;

        ctx.beginPath();
        ctx.moveTo(x, y-this.height);
        ctx.bezierCurveTo(x - this.left, y-this.height+this.xleft, x - this.left, 
            y-this.height-this.mtop, x-this.left+this.mleft, y-this.height-this.mtop);

        ctx.lineTo(x+this.width+this.xleft, y-this.height-this.mtop);
        ctx.moveTo(x-this.left+this.mleft, y-this.height-this.mtop);
        ctx.bezierCurveTo(x - this.left, y-this.height-this.top, x+this.width+this.mleft,
            y-this.height-this.top, x+this.width+this.xleft, y-this.height-this.mtop);

        ctx.moveTo(x+this.width+this.xleft, y-this.height-this.mtop);
        ctx.bezierCurveTo(x+this.width+this.left, y-this.height-this.mtop, 
            x+this.width+this.left, y-this.height+this.xleft, x+this.width,y-this.height);
        ctx.lineTo(x, y-this.height);

        ctx.fillStyle = '#65792b';
        ctx.strokeStyle = '#65792b';
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y-this.height);
        ctx.lineTo(x,y);
        ctx.lineTo(x+this.width,y);
        ctx.lineTo(x+this.width,y-this.height);
        ctx.fill();

        ctx.restore();
    }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/Constants */ "./src/common/Constants.js");
/* harmony import */ var _common_CanvasManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/CanvasManager */ "./src/common/CanvasManager.js");
/* harmony import */ var _viewport_Plane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./viewport/Plane */ "./src/viewport/Plane.js");
/* harmony import */ var _components_Tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Tree */ "./src/components/Tree.js");
/* harmony import */ var _workflow_Workflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./workflow/Workflow */ "./src/workflow/Workflow.js");






if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 17 /*~ 1000/60*/);
        }
    );
}

const constants = new _common_Constants__WEBPACK_IMPORTED_MODULE_0__["default"]();
const plane = new _viewport_Plane__WEBPACK_IMPORTED_MODULE_2__["default"](constants);
const canvasManager = new _common_CanvasManager__WEBPACK_IMPORTED_MODULE_1__["default"](constants);

const managers = {
    constants: constants,
    canvasManager: canvasManager,
    plane: plane
};

let fl = 250,
    vpX = constants.screenWidth / 2,
    vpY = constants.screenHeight / 2,
    vx = 0,
    vy = 0,
    vz = -0.50,
    totalTree = 15,
    movingComps = [];

canvasManager.push(plane);

treeGenerator(1);

function createTree(index) {
    const tree = new _components_Tree__WEBPACK_IMPORTED_MODULE_3__["default"](constants);

    tree.initialX = tree.x = Math.random() * constants.screenWidth/2 - constants.roadWidth;

    if(index % 2 ==0) {
        tree.initialX = tree.x = constants.screenWidth/2 + constants.roadWidth
                        + Math.random() * constants.screenWidth/2
    } else {
        tree.initialX = tree.x = Math.random() * constants.screenWidth/2 - constants.roadWidth;
    }
    tree.initialY = tree.y = constants.screenHeight/2 + 100;
    resetMovingComponennt(tree);
    

    return tree;
}

function treeGenerator(index) {
    const tree = createTree(index);

    setTimeout(() => {
        canvasManager.push(tree);
        movingComps.push(tree);

        if(index < totalTree) {
            treeGenerator(++index)
        }
    }, 800);
}

function move(comp) {
    comp.xpos += vx;
    comp.ypos += vy;
    comp.zpos += vz;

    if (comp.zpos < -fl) {
        resetMovingComponennt(comp);
    }
    if (comp.zpos > 10000 - fl) {
        comp.zpos -= 10000;
    }
    var scale = fl / (fl + comp.zpos);
    comp.scaleX = comp.scaleY = scale;
    comp.x = vpX + comp.xpos * scale;
    comp.y = vpY + comp.ypos * scale;
}

function draw() {
    window.requestAnimationFrame(draw);
    constants.ctx.clearRect(0, 0, constants.screenWidth, constants.screenHeight);

    movingComps.forEach(comp => {
        move(comp);
    });

    // constants.canvas.width = constants.canvas.width
    let components = canvasManager.components;
    for(var i = 0; i < components.length; i++) {
        components[i].visible && components[i].draw(canvasManager.ctx);
    }
}

window.document.body.onload = function() {
    draw();
}

function resetMovingComponennt(component) {
    component.x = component.initialX;
    component.y = component.initialY;

    component.xpos = component.x - constants.screenWidth/2;
    component.ypos = component.y - constants.screenHeight/2;
    component.zpos = Math.random();
    component.reshape();
}

const workflow = new _workflow_Workflow__WEBPACK_IMPORTED_MODULE_4__["default"](constants);

/***/ }),

/***/ "./src/viewport/Plane.js":
/*!*******************************!*\
  !*** ./src/viewport/Plane.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Plane; });
/* harmony import */ var _common_Static__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Static */ "./src/common/Static.js");


/**
 * Background 
 * 
 * @export
 * @class Plane
 * @extends {Sprite}
 */
class Plane extends _common_Static__WEBPACK_IMPORTED_MODULE_0__["default"] {
    

    constructor(constants) {
        super();
        let me = this;
        this.x = 0;
        this.y = 0;
        this.width = constants.screenWidth;
        this.height = constants.screenHeight;
        this.skyHeight = 0.6 * this.height;
        this.roadWidth = constants.roadWidth;
        this.roadScale = constants.roadScale;
        this.roadX = this.width / 2 - this.roadWidth / 2;
    }

    /**
     * Draws the plane
     * 
     * @param {any} ctx 
     * @memberof Plane
     */
    draw(ctx) {
        const oldStyle = ctx.fillStyle;

        var grd = ctx.createLinearGradient(0, 0, 0, this.skyHeight);
        grd.addColorStop(0, "#babafb");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fillRect(0,0, this.width, this.skyHeight);
        
        ctx.fillStyle = '#d2dcb3';
        ctx.fillRect(0, this.skyHeight, this.width, this.height);

        
        ctx.fillStyle = '#f1e4cc';

        ctx.beginPath();
        ctx.moveTo(this.roadX, this.skyHeight);
        ctx.lineTo(this.roadX - this.roadScale, this.height);
        ctx.lineTo(this.roadX + this.roadWidth + this.roadScale, this.height);
        ctx.lineTo(this.roadX + this.roadWidth, this.skyHeight);
        ctx.fill();

        ctx.fillStyle = oldStyle;
    }
}

/***/ }),

/***/ "./src/workflow/Workflow.js":
/*!**********************************!*\
  !*** ./src/workflow/Workflow.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Workflow; });
/* harmony import */ var _common_Utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Utility */ "./src/common/Utility.js");


class Workflow {
    constructor(constants) {
        this.events = [];
        this.currentEvent = null;
        this.currentEventIndex = 0;
        this.constants = constants;
        this.modal = document.getElementById('nadep_modal');
        this.modalContent = this.modal.querySelector('div.content');
        this.modalBodyHeight = 315;
        this.init();
    }

    hideModal() {        
        this.modal.style.display = 'none';
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    showNext(event) {
        this.hideModal();
        setTimeout(() => {
            if(this.currentEventIndex < this.events.length) {
                this.showModal();
                this.show();
            }
        }, event.ntime * 1000);
    }

    showText(event) {
        this.showModal();
        this.modal.classList.add('trans');
        this.modalContent.innerHTML = '<div class="text-center" style="height:' +
             this.modalBodyHeight + 'px">' + event.text + '</div>';

        setTimeout(() => {
            !event.read && this.showNext(event);
        }, event.rtime * 1000);        
    }

    showVideo(event) {
        this.showModal();
        this.modal.classList.remove('trans');

        let iframeWidth = 560;
        let iframeHeight = 315;

        if(this.constants.screenWidth < 768) {
            iframeWidth = 0.9 * this.constants.screenWidth - 44;
            iframeHeight = iframeWidth * 0.56;
        }

        if(this.constants.screenHeight < 415) {
            iframeHeight = (this.constants.screenHeight - 140);
            iframeWidth = iframeHeight * 1.77;
        }

        const iframe = '<iframe width="' + iframeWidth + '" height="' + iframeHeight + '" src="';
        const iframe1 = '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        this.modalContent.innerHTML = iframe + event.link + iframe1;
    }

    show() {
        if(this.currentEventIndex < this.events.length) {
            const event = this.currentEvent = this.events[this.currentEventIndex++];

            if(event.type == 'stop') {
                // localStorage.setItem('nadep-index', this.currentEventIndex);
                this.hideModal();
            } else {
                event.read = false;
                if(event.type == 'text') {
                    this.showText(event);
                } else {
                    this.showVideo(event);
                }
            }
            
        }
    }

    init() {
        const me = this;

        // this.currentEventIndex = localStorage.getItem('nadep-index');

        _common_Utility__WEBPACK_IMPORTED_MODULE_0__["default"].ajax("data.json", (data) => {
            this.events = JSON.parse(data);
            setTimeout(() => {
                this.show();
            }, 5000);            
        });

        const button = document.getElementById('done-btn');

        button.addEventListener("click", () => {
            me.currentEvent.read = true;
            me.showNext(me.currentEvent);
        });
        const modalBody = this.modal.querySelector('div.modal-body');

        if(this.constants.screenHeight < 415) {
            const modalHeight = this.constants.screenHeight - 40;

            this.modal.style.height = modalHeight + 'px';
            this.modal.style.marginTop = (-modalHeight / 2) + 'px';
            modalBody.style.height = (modalHeight - 100) + 'px';
            this.modalBodyHeight = modalHeight - 100;
        }

        if(this.constants.screenWidth < 768) {
            const modalWidth = 0.9 * this.constants.screenWidth;
            this.modalBodyHeight = modalWidth * 0.56;
            modalBody.style.height = this.modalBodyHeight + 'px';
            this.modal.style.height = (this.modalBodyHeight + 100) + 'px';
        }
        
    }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9DYW52YXNNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vQ29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL1N0YXRpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL1V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdwb3J0L1BsYW5lLmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZmxvdy9Xb3JrZmxvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBZSxxQjs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN4Q0E7QUFBQTtBQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBc0M7O0FBRXZCLHFCQUFxQixtREFBVTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBZTtBQUNmO0FBQ0E7O0FBRUE7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O0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnRUFBZ0UsVUFBVSxpQkFBaUIsV0FBVztBQUN0RztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSx1REFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUTtBQUNiLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc01hbmFnZXIgeyAgIFxuXG4gICAgY29uc3RydWN0b3IoY29uc3RhbnRzKSB7XG4gICAgICAgIHRoaXMuY29uc3RhbnRzID0gY29uc3RhbnRzO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNvbnN0YW50cy5jYW52YXM7XG4gICAgICAgIHRoaXMuY3R4ID0gY29uc3RhbnRzLmN0eDtcbiAgICAgICAgdGhpcy5leHBsb3JlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5hdHRhY2tlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gW107XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHB1c2hTcHJpdGUob2JqLCBvcmRlciA9ICdlbmQnKSB7XG4gICAgICAgIGlmKG9yZGVyID09ICdlbmQnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChvYmopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnVuc2hpZnQob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYob2JqLnR5cGUgPT09ICdleHBsb3JlcnMnKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGxvcmVycy5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgaWYob2JqLnR5cGUgPT09ICdhdHRhY2tlcnMnKSB7XG4gICAgICAgICAgICB0aGlzLmF0dGFja2Vycy5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95KGNvbXBvbmVudCkge1xuICAgICAgICBsZXQgbmFtZTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHNlbnQuXG4gICAgICAgIGlmKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBuYW1lID0gY29tcG9uZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IGNvbXBvbmVudC5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZihjb21wLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXR0YWNrZXJzLmZvckVhY2goKGF0dGFja2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoYXR0YWNrZXIubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV4cGxvcmVycy5mb3JFYWNoKChleHBsb3JlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKGV4cGxvcmVyLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGxvcmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bih4LCB5KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZihjb21wb25lbnQuaGl0VGVzdCh0aGlzLmN0eCwgeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuc3RhcnREcmFnKHgsIHkpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kcmFnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoeCwgeSkge1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZihjb21wb25lbnQuaGl0VGVzdCh0aGlzLmN0eCwgeCwgeSkgJiYgY29tcG9uZW50LnNob3dQb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY29tcG9uZW50LmRyYWcpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuZHJhZ2dpbmcoeCwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTW91c2VVcCh4LCB5KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyBjb21wb25lbnQuZW5kRHJhZyh4LCB5KTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5kcmFnID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc3Ryb3koY29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5mb3JFYWNoKChjb21wLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoY29tcC5uYW1lID09PSBjb21wb25lbnQubmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdXNoKGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN0YW50cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuc2V0Q29uc3RhbnRzKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHJlbmRlckNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5nZXRTY3JlZW5TaXplKCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5zY3JlZW5XaWR0aCArICdweCcpO1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsdGhpcy5zY3JlZW5IZWlnaHQgKyAncHgnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdpZCcsJ2dhbWUtY2FudmFzJyk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGdldFNjcmVlblNpemUoKSB7XG4gICAgICAgIHZhciB3ID0gd2luZG93LFxuICAgICAgICBkID0gZG9jdW1lbnQsXG4gICAgICAgIGUgPSBkLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcblxuICAgICAgICBsZXQgd2lkdGggPSB3LmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCA9ICh3LmlubmVySGVpZ2h0fHwgZS5jbGllbnRIZWlnaHR8fCBnLmNsaWVudEhlaWdodCk7XG4gICAgICAgIHRoaXMuc2NyZWVuV2lkdGggPSB3aWR0aDtcbiAgICB9XG5cbiAgICBzZXRDb25zdGFudHMoKSB7XG4gICAgICAgIGNvbnN0IG1pbldpZHRoID0gMC4xICogdGhpcy5zY3JlZW5XaWR0aDtcbiAgICAgICAgdGhpcy5yb2FkV2lkdGggPSBtaW5XaWR0aCA8IDEwMCA/IG1pbldpZHRoIDogMTAwO1xuICAgICAgICB0aGlzLnJvYWRTY2FsZSA9IHRoaXMucm9hZFdpZHRoICsgMjA7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmFibGUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBkcmF3KCkge307XG59IiwiaW1wb3J0IE9ic2VydmFibGUgZnJvbSBcIi4vT2JzZXJ2YWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWMgZXh0ZW5kcyBPYnNlcnZhYmxle1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICBoaXRUZXN0KCkge31cbn0gICAiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlsaXR5IHtcbiAgICBzdGF0aWMgY3JlYXRlQW5pbWF0aW9uUGF0aChwb2ludHMsIHZlbG9jaXR5KSB7XG4gICAgICAgIGxldCBwYXRoID0gW107XG5cbiAgICAgICAgcG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGR4ID0gcG9pbnRbMV0ueCAtIHBvaW50WzBdLngsXG4gICAgICAgICAgICAgICAgZHkgPSBwb2ludFsxXS55IC0gcG9pbnRbMF0ueSxcblxuICAgICAgICAgICAgICAgIC8vTWFnbml0dWRlL0Rpc3RhbmNlIG9mIHRoZSBsaW5lXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHkgKiBkeSArIGR4ICogZHgpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDAsXG5cbiAgICAgICAgICAgICAgICAvL1BlcmNlbnQgaW4gMCB0byAxXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IDA7ICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIC8vVW50aWwgMTAwJVxuICAgICAgICAgICAgd2hpbGUgKHBlcmNlbnQgPD0gMSkge1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uICs9IHZlbG9jaXR5O1xuXG4gICAgICAgICAgICAgICAgLy9DdXJyZW50IFBlY2VudGFnZSBjb3ZlcmVkXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IGN1cnJlbnRQb3NpdGlvbiAvIGRpc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9pbnRbMF0ueCArIGR4ICogcGVyY2VudCxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9pbnRbMF0ueSArIGR5ICogcGVyY2VudFxuICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TGluZVBhcmFtcyh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICBsZXQgZHggPSB4MiAtIHgxLFxuICAgICAgICAgICAgZHkgPSB5MiAtIHkxLFxuICAgICAgICAgICAgc2xvcGUgPSBkeSAvIGR4LFxuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmF0YW4oc2xvcGUpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzbG9wZTogc2xvcGUsXG4gICAgICAgICAgICBhbmdsZTogYW5nbGUsXG4gICAgICAgICAgICBkaXN0YW5jZTogTWF0aC5zcXJ0KGR5ICogZHkgKyBkeCAqIGR4KVxuICAgICAgICB9O1xuICAgIH0gICBcblxuICAgIHN0YXRpYyByb3VuZChudW0pIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWpheCh1cmwsIHN1Y2Nlc3MpIHtcbiAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3ModGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhodHRwLnNlbmQoKTtcbiAgICB9XG59IiwiaW1wb3J0IFN0YXRpYyBmcm9tIFwiLi4vY29tbW9uL1N0YXRpY1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZSBleHRlbmRzIFN0YXRpYyB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25zdGFudHMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMueHBvcyA9IDA7XHJcbiAgICAgICAgdGhpcy55cG9zID0gMDtcclxuICAgICAgICB0aGlzLnpwb3MgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICAgICAgdGhpcy5jb25zdGFudHMgPSBjb25zdGFudHM7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5jb25zdGFudHMuc2NyZWVuV2lkdGggKiAwLjA2KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5sZWZ0IDwgMTUpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueGxlZnQgPSAwLjMgKiB0aGlzLmxlZnQ7XHJcbiAgICAgICAgdGhpcy5tbGVmdCA9IDAuNSAqIHRoaXMubGVmdDtcclxuICAgICAgICB0aGlzLm10b3AgPSAyICogdGhpcy5sZWZ0O1xyXG4gICAgICAgIHRoaXMudG9wID0gNCAqIHRoaXMubGVmdDtcclxuICAgICAgICB0aGlzLnJlc2hhcGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNoYXBlKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBNYXRoLnJhbmRvbSgpICogMzA7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLnJhbmRvbSgpICogODA7XHJcblxyXG4gICAgICAgIGlmKHRoaXMud2lkdGggPCAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaGVpZ2h0IDwgMTApIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdHgpIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICBjdHguc2NhbGUodGhpcy5zY2FsZVgsIHRoaXMuc2NhbGVZKTtcclxuICAgICAgICBjb25zdCB4ID0gMDtcclxuICAgICAgICBjb25zdCB5ID0gMDtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeS10aGlzLmhlaWdodCk7XHJcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8oeCAtIHRoaXMubGVmdCwgeS10aGlzLmhlaWdodCt0aGlzLnhsZWZ0LCB4IC0gdGhpcy5sZWZ0LCBcclxuICAgICAgICAgICAgeS10aGlzLmhlaWdodC10aGlzLm10b3AsIHgtdGhpcy5sZWZ0K3RoaXMubWxlZnQsIHktdGhpcy5oZWlnaHQtdGhpcy5tdG9wKTtcclxuXHJcbiAgICAgICAgY3R4LmxpbmVUbyh4K3RoaXMud2lkdGgrdGhpcy54bGVmdCwgeS10aGlzLmhlaWdodC10aGlzLm10b3ApO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeC10aGlzLmxlZnQrdGhpcy5tbGVmdCwgeS10aGlzLmhlaWdodC10aGlzLm10b3ApO1xyXG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHggLSB0aGlzLmxlZnQsIHktdGhpcy5oZWlnaHQtdGhpcy50b3AsIHgrdGhpcy53aWR0aCt0aGlzLm1sZWZ0LFxyXG4gICAgICAgICAgICB5LXRoaXMuaGVpZ2h0LXRoaXMudG9wLCB4K3RoaXMud2lkdGgrdGhpcy54bGVmdCwgeS10aGlzLmhlaWdodC10aGlzLm10b3ApO1xyXG5cclxuICAgICAgICBjdHgubW92ZVRvKHgrdGhpcy53aWR0aCt0aGlzLnhsZWZ0LCB5LXRoaXMuaGVpZ2h0LXRoaXMubXRvcCk7XHJcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8oeCt0aGlzLndpZHRoK3RoaXMubGVmdCwgeS10aGlzLmhlaWdodC10aGlzLm10b3AsIFxyXG4gICAgICAgICAgICB4K3RoaXMud2lkdGgrdGhpcy5sZWZ0LCB5LXRoaXMuaGVpZ2h0K3RoaXMueGxlZnQsIHgrdGhpcy53aWR0aCx5LXRoaXMuaGVpZ2h0KTtcclxuICAgICAgICBjdHgubGluZVRvKHgsIHktdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyM2NTc5MmInO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNjU3OTJiJztcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeS10aGlzLmhlaWdodCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh4LHkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeCt0aGlzLndpZHRoLHkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeCt0aGlzLndpZHRoLHktdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4vY29tbW9uL0NvbnN0YW50cyc7XG5pbXBvcnQgQ2FudmFzTWFuYWdlciBmcm9tICcuL2NvbW1vbi9DYW52YXNNYW5hZ2VyJztcbmltcG9ydCBQbGFuZSBmcm9tICcuL3ZpZXdwb3J0L1BsYW5lJztcbmltcG9ydCBUcmVlIGZyb20gJy4vY29tcG9uZW50cy9UcmVlJztcbmltcG9ydCBXb3JrZmxvdyBmcm9tICcuL3dvcmtmbG93L1dvcmtmbG93JztcblxuaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9ICh3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTcgLyp+IDEwMDAvNjAqLyk7XG4gICAgICAgIH1cbiAgICApO1xufVxuXG5jb25zdCBjb25zdGFudHMgPSBuZXcgQ29uc3RhbnRzKCk7XG5jb25zdCBwbGFuZSA9IG5ldyBQbGFuZShjb25zdGFudHMpO1xuY29uc3QgY2FudmFzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnN0YW50cyk7XG5cbmNvbnN0IG1hbmFnZXJzID0ge1xuICAgIGNvbnN0YW50czogY29uc3RhbnRzLFxuICAgIGNhbnZhc01hbmFnZXI6IGNhbnZhc01hbmFnZXIsXG4gICAgcGxhbmU6IHBsYW5lXG59O1xuXG5sZXQgZmwgPSAyNTAsXG4gICAgdnBYID0gY29uc3RhbnRzLnNjcmVlbldpZHRoIC8gMixcbiAgICB2cFkgPSBjb25zdGFudHMuc2NyZWVuSGVpZ2h0IC8gMixcbiAgICB2eCA9IDAsXG4gICAgdnkgPSAwLFxuICAgIHZ6ID0gLTAuNTAsXG4gICAgdG90YWxUcmVlID0gMTUsXG4gICAgbW92aW5nQ29tcHMgPSBbXTtcblxuY2FudmFzTWFuYWdlci5wdXNoKHBsYW5lKTtcblxudHJlZUdlbmVyYXRvcigxKTtcblxuZnVuY3Rpb24gY3JlYXRlVHJlZShpbmRleCkge1xuICAgIGNvbnN0IHRyZWUgPSBuZXcgVHJlZShjb25zdGFudHMpO1xuXG4gICAgdHJlZS5pbml0aWFsWCA9IHRyZWUueCA9IE1hdGgucmFuZG9tKCkgKiBjb25zdGFudHMuc2NyZWVuV2lkdGgvMiAtIGNvbnN0YW50cy5yb2FkV2lkdGg7XG5cbiAgICBpZihpbmRleCAlIDIgPT0wKSB7XG4gICAgICAgIHRyZWUuaW5pdGlhbFggPSB0cmVlLnggPSBjb25zdGFudHMuc2NyZWVuV2lkdGgvMiArIGNvbnN0YW50cy5yb2FkV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICsgTWF0aC5yYW5kb20oKSAqIGNvbnN0YW50cy5zY3JlZW5XaWR0aC8yXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHJlZS5pbml0aWFsWCA9IHRyZWUueCA9IE1hdGgucmFuZG9tKCkgKiBjb25zdGFudHMuc2NyZWVuV2lkdGgvMiAtIGNvbnN0YW50cy5yb2FkV2lkdGg7XG4gICAgfVxuICAgIHRyZWUuaW5pdGlhbFkgPSB0cmVlLnkgPSBjb25zdGFudHMuc2NyZWVuSGVpZ2h0LzIgKyAxMDA7XG4gICAgcmVzZXRNb3ZpbmdDb21wb25lbm50KHRyZWUpO1xuICAgIFxuXG4gICAgcmV0dXJuIHRyZWU7XG59XG5cbmZ1bmN0aW9uIHRyZWVHZW5lcmF0b3IoaW5kZXgpIHtcbiAgICBjb25zdCB0cmVlID0gY3JlYXRlVHJlZShpbmRleCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2FudmFzTWFuYWdlci5wdXNoKHRyZWUpO1xuICAgICAgICBtb3ZpbmdDb21wcy5wdXNoKHRyZWUpO1xuXG4gICAgICAgIGlmKGluZGV4IDwgdG90YWxUcmVlKSB7XG4gICAgICAgICAgICB0cmVlR2VuZXJhdG9yKCsraW5kZXgpXG4gICAgICAgIH1cbiAgICB9LCA4MDApO1xufVxuXG5mdW5jdGlvbiBtb3ZlKGNvbXApIHtcbiAgICBjb21wLnhwb3MgKz0gdng7XG4gICAgY29tcC55cG9zICs9IHZ5O1xuICAgIGNvbXAuenBvcyArPSB2ejtcblxuICAgIGlmIChjb21wLnpwb3MgPCAtZmwpIHtcbiAgICAgICAgcmVzZXRNb3ZpbmdDb21wb25lbm50KGNvbXApO1xuICAgIH1cbiAgICBpZiAoY29tcC56cG9zID4gMTAwMDAgLSBmbCkge1xuICAgICAgICBjb21wLnpwb3MgLT0gMTAwMDA7XG4gICAgfVxuICAgIHZhciBzY2FsZSA9IGZsIC8gKGZsICsgY29tcC56cG9zKTtcbiAgICBjb21wLnNjYWxlWCA9IGNvbXAuc2NhbGVZID0gc2NhbGU7XG4gICAgY29tcC54ID0gdnBYICsgY29tcC54cG9zICogc2NhbGU7XG4gICAgY29tcC55ID0gdnBZICsgY29tcC55cG9zICogc2NhbGU7XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICBjb25zdGFudHMuY3R4LmNsZWFyUmVjdCgwLCAwLCBjb25zdGFudHMuc2NyZWVuV2lkdGgsIGNvbnN0YW50cy5zY3JlZW5IZWlnaHQpO1xuXG4gICAgbW92aW5nQ29tcHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgbW92ZShjb21wKTtcbiAgICB9KTtcblxuICAgIC8vIGNvbnN0YW50cy5jYW52YXMud2lkdGggPSBjb25zdGFudHMuY2FudmFzLndpZHRoXG4gICAgbGV0IGNvbXBvbmVudHMgPSBjYW52YXNNYW5hZ2VyLmNvbXBvbmVudHM7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29tcG9uZW50c1tpXS52aXNpYmxlICYmIGNvbXBvbmVudHNbaV0uZHJhdyhjYW52YXNNYW5hZ2VyLmN0eCk7XG4gICAgfVxufVxuXG53aW5kb3cuZG9jdW1lbnQuYm9keS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBkcmF3KCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0TW92aW5nQ29tcG9uZW5udChjb21wb25lbnQpIHtcbiAgICBjb21wb25lbnQueCA9IGNvbXBvbmVudC5pbml0aWFsWDtcbiAgICBjb21wb25lbnQueSA9IGNvbXBvbmVudC5pbml0aWFsWTtcblxuICAgIGNvbXBvbmVudC54cG9zID0gY29tcG9uZW50LnggLSBjb25zdGFudHMuc2NyZWVuV2lkdGgvMjtcbiAgICBjb21wb25lbnQueXBvcyA9IGNvbXBvbmVudC55IC0gY29uc3RhbnRzLnNjcmVlbkhlaWdodC8yO1xuICAgIGNvbXBvbmVudC56cG9zID0gTWF0aC5yYW5kb20oKTtcbiAgICBjb21wb25lbnQucmVzaGFwZSgpO1xufVxuXG5jb25zdCB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdyhjb25zdGFudHMpOyIsImltcG9ydCBTdGF0aWMgZnJvbSBcIi4uL2NvbW1vbi9TdGF0aWNcIjtcblxuLyoqXG4gKiBCYWNrZ3JvdW5kIFxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGxhbmVcbiAqIEBleHRlbmRzIHtTcHJpdGV9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYW5lIGV4dGVuZHMgU3RhdGljIHtcbiAgICBcblxuICAgIGNvbnN0cnVjdG9yKGNvbnN0YW50cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gY29uc3RhbnRzLnNjcmVlbldpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNvbnN0YW50cy5zY3JlZW5IZWlnaHQ7XG4gICAgICAgIHRoaXMuc2t5SGVpZ2h0ID0gMC42ICogdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMucm9hZFdpZHRoID0gY29uc3RhbnRzLnJvYWRXaWR0aDtcbiAgICAgICAgdGhpcy5yb2FkU2NhbGUgPSBjb25zdGFudHMucm9hZFNjYWxlO1xuICAgICAgICB0aGlzLnJvYWRYID0gdGhpcy53aWR0aCAvIDIgLSB0aGlzLnJvYWRXaWR0aCAvIDI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIHBsYW5lXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGN0eCBcbiAgICAgKiBAbWVtYmVyb2YgUGxhbmVcbiAgICAgKi9cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjb25zdCBvbGRTdHlsZSA9IGN0eC5maWxsU3R5bGU7XG5cbiAgICAgICAgdmFyIGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLnNreUhlaWdodCk7XG4gICAgICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgXCIjYmFiYWZiXCIpO1xuICAgICAgICBncmQuYWRkQ29sb3JTdG9wKDEsIFwid2hpdGVcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsIHRoaXMud2lkdGgsIHRoaXMuc2t5SGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2QyZGNiMyc7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCB0aGlzLnNreUhlaWdodCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmMWU0Y2MnO1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLnJvYWRYLCB0aGlzLnNreUhlaWdodCk7XG4gICAgICAgIGN0eC5saW5lVG8odGhpcy5yb2FkWCAtIHRoaXMucm9hZFNjYWxlLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5saW5lVG8odGhpcy5yb2FkWCArIHRoaXMucm9hZFdpZHRoICsgdGhpcy5yb2FkU2NhbGUsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnJvYWRYICsgdGhpcy5yb2FkV2lkdGgsIHRoaXMuc2t5SGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gb2xkU3R5bGU7XG4gICAgfVxufSIsImltcG9ydCBVdGlsaXR5IGZyb20gXCIuLi9jb21tb24vVXRpbGl0eVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya2Zsb3cge1xyXG4gICAgY29uc3RydWN0b3IoY29uc3RhbnRzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRFdmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RXZlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb25zdGFudHMgPSBjb25zdGFudHM7XHJcbiAgICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYWRlcF9tb2RhbCcpO1xyXG4gICAgICAgIHRoaXMubW9kYWxDb250ZW50ID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKCdkaXYuY29udGVudCcpO1xyXG4gICAgICAgIHRoaXMubW9kYWxCb2R5SGVpZ2h0ID0gMzE1O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVNb2RhbCgpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMubW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH1cclxuXHJcbiAgICBzaG93TmV4dChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEV2ZW50SW5kZXggPCB0aGlzLmV2ZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGV2ZW50Lm50aW1lICogMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RleHQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xyXG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgndHJhbnMnKTtcclxuICAgICAgICB0aGlzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCIgc3R5bGU9XCJoZWlnaHQ6JyArXHJcbiAgICAgICAgICAgICB0aGlzLm1vZGFsQm9keUhlaWdodCArICdweFwiPicgKyBldmVudC50ZXh0ICsgJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAhZXZlbnQucmVhZCAmJiB0aGlzLnNob3dOZXh0KGV2ZW50KTtcclxuICAgICAgICB9LCBldmVudC5ydGltZSAqIDEwMDApOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpZGVvKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWwoKTtcclxuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zJyk7XHJcblxyXG4gICAgICAgIGxldCBpZnJhbWVXaWR0aCA9IDU2MDtcclxuICAgICAgICBsZXQgaWZyYW1lSGVpZ2h0ID0gMzE1O1xyXG5cclxuICAgICAgICBpZih0aGlzLmNvbnN0YW50cy5zY3JlZW5XaWR0aCA8IDc2OCkge1xyXG4gICAgICAgICAgICBpZnJhbWVXaWR0aCA9IDAuOSAqIHRoaXMuY29uc3RhbnRzLnNjcmVlbldpZHRoIC0gNDQ7XHJcbiAgICAgICAgICAgIGlmcmFtZUhlaWdodCA9IGlmcmFtZVdpZHRoICogMC41NjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29uc3RhbnRzLnNjcmVlbkhlaWdodCA8IDQxNSkge1xyXG4gICAgICAgICAgICBpZnJhbWVIZWlnaHQgPSAodGhpcy5jb25zdGFudHMuc2NyZWVuSGVpZ2h0IC0gMTQwKTtcclxuICAgICAgICAgICAgaWZyYW1lV2lkdGggPSBpZnJhbWVIZWlnaHQgKiAxLjc3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gJzxpZnJhbWUgd2lkdGg9XCInICsgaWZyYW1lV2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIGlmcmFtZUhlaWdodCArICdcIiBzcmM9XCInO1xyXG4gICAgICAgIGNvbnN0IGlmcmFtZTEgPSAnXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZVwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nO1xyXG4gICAgICAgIHRoaXMubW9kYWxDb250ZW50LmlubmVySFRNTCA9IGlmcmFtZSArIGV2ZW50LmxpbmsgKyBpZnJhbWUxO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50RXZlbnRJbmRleCA8IHRoaXMuZXZlbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBldmVudCA9IHRoaXMuY3VycmVudEV2ZW50ID0gdGhpcy5ldmVudHNbdGhpcy5jdXJyZW50RXZlbnRJbmRleCsrXTtcclxuXHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnR5cGUgPT0gJ3N0b3AnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFkZXAtaW5kZXgnLCB0aGlzLmN1cnJlbnRFdmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5yZWFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC50eXBlID09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RleHQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyhldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmN1cnJlbnRFdmVudEluZGV4ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hZGVwLWluZGV4Jyk7XHJcblxyXG4gICAgICAgIFV0aWxpdHkuYWpheChcImRhdGEuanNvblwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH0sIDUwMDApOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9uZS1idG4nKTtcclxuXHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lLmN1cnJlbnRFdmVudC5yZWFkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWUuc2hvd05leHQobWUuY3VycmVudEV2ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBtb2RhbEJvZHkgPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29uc3RhbnRzLnNjcmVlbkhlaWdodCA8IDQxNSkge1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbEhlaWdodCA9IHRoaXMuY29uc3RhbnRzLnNjcmVlbkhlaWdodCAtIDQwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2RhbC5zdHlsZS5oZWlnaHQgPSBtb2RhbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMubW9kYWwuc3R5bGUubWFyZ2luVG9wID0gKC1tb2RhbEhlaWdodCAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgbW9kYWxCb2R5LnN0eWxlLmhlaWdodCA9IChtb2RhbEhlaWdodCAtIDEwMCkgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsQm9keUhlaWdodCA9IG1vZGFsSGVpZ2h0IC0gMTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5jb25zdGFudHMuc2NyZWVuV2lkdGggPCA3NjgpIHtcclxuICAgICAgICAgICAgY29uc3QgbW9kYWxXaWR0aCA9IDAuOSAqIHRoaXMuY29uc3RhbnRzLnNjcmVlbldpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsQm9keUhlaWdodCA9IG1vZGFsV2lkdGggKiAwLjU2O1xyXG4gICAgICAgICAgICBtb2RhbEJvZHkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5tb2RhbEJvZHlIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsLnN0eWxlLmhlaWdodCA9ICh0aGlzLm1vZGFsQm9keUhlaWdodCArIDEwMCkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=