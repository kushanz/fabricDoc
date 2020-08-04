// Import stylesheets
import './style.css';
import {fabric} from 'fabric';
import $ from "jquery";

var canvascontainer = document.querySelector('.canvas-container');
var canvasObject = document.querySelector('canvas');
var canvas = new fabric.Canvas('mycanvas', {
  preserveObjectStacking:true
});
// canvas.backgroundColor = 'yellow';
var docObj;
var newImage;
var evented = false;
var doc;
var rect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            top : 190,
            left : 0,
            width : 60,
            height : 70,
            fill : 'yellow',
            bringForward:true
        });
        // rect.setControlsVisibility({
        //   mt: false,
        //   mb: false,
        //   ml: false,
        //   mr: false,
        // })

// ad doc image
// var imgDoc = document.getElementById('imgdoc');
// var docInstance = new fabric.Image(imgDoc, {
//   left: 0,
//   top: 0,
//   angle: 0,
//   opacity: 0.75,
//   width:450,
//   height:500,
//   // hasControls:false,
//   // lockMovementX: false,
//   // lockMovementY:false
// })
// docInstance.lockMovementX = false

 canvas.centerObject(rect);
        // canvas.add(docInstance);
        // canvas.add(rect);
  //       canvas.item(1).set({
  //   borderColor: 'red',
  //   cornerColor: 'green',
  //   cornerSize: 10,
  //   transparentCorners: false
  // });
  // canvas.item(0).selectable = false;
canvas.bringForward(rect)


docObj = new fabric.Image.fromURL('https://picsum.photos/450/500',//doc image url
     function(myDoc) {
        doc = myDoc.set({ 
                id:"docimage",
                left: 0,
                top: 0 ,
                width:450, //set canvas eidth
                height:500, //set canvas height
                selectable: true,
                hasBorders: false,
                hasControls: false,
                hasRotatingPoint: false
                    // other options 
            });
        canvas.add(doc);
        canvas.sendBackwards(doc)
        // doc.on('moving', function(e) {
        //   console.log(e.target)
        // });
        // doc.on('moving', docMove);
        // doc.on('mousedown', docMouseDown);

        
})
// docObj = new Image()
// var path = "https://picsum.photos/450/500";
// var height = [],width = [];
// docObj.src = path;
// docObj.onload = function() {
//   let docimage = new fabric.Image(docObj);
//   height.push(docObj.height)
//   width.push(docObj.width)
//   canvas.setHeight(height);
//   canvas.setWidth(width);
//   docimage.set({
//     id: 'docimage',
//     left: 0,
//     top: 0,
//     selectable: true,
//     hasBorders: false,
//     hasControls: false,
//     hasRotatingPoint: false
//   })
//   canvas.add(docimage)
// }

canvas.renderAll();
  

// mouse wheel zooming function
// canvas.on('mouse:wheel', function(opt) {
//   var delta = opt.e.deltaY;
//   console.log(delta)
//   var zoom = canvas.getZoom();
//   zoom *= 0.999 ** delta;
//   if (zoom > 20) zoom = 20;
//   // if (zoom < 0.01) zoom = 0.01;
//   if (zoom < 1) {
//     zoom = 1;
//     canvas.setZoom(1)
//     canvas.setViewportTransform([1,0,0,1,0,0]); 
//   }
//   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//   opt.e.preventDefault();
//   opt.e.stopPropagation();

// });


// reset zoom
function resetZoom() {
  // canvas.setZoom(1);
  // canvas.setDimensions({
  //   top:0,left:0,
  //   width: 450,
  //   height: 500
  // });
  doc.set({
    top:0,
    left:0,
    width:450,
    height:500
  })
  canvas.setViewportTransform([1,0,0,1,0,0]); 
  canvas.renderAll()
}

$('#resetzoom').click(function(e) {
  // canvas.item(0).selectable = false
  // console.log(canvas)
  // canvas.item(1).left = canvas.item(1).left - doc.left;
  // canvas.item(1).top = canvas.item(1).top - doc.top;
  // canvas.item(1).setCoords();
  canvas.getObjects().forEach(function(o) {
            if(o.id === 'signimage') {
              o.left = o.left - docObj.left;
              o.top = o.top - docObj.top;
              o.setCoords();
              }
          })
  canvas.setZoom(1);
  doc.set({
    top:0,
    left:0,
    width:450,
    height:500
  })
  canvas.setViewportTransform([1,0,0,1,0,0]); 
  canvas.renderAll()
})

// zoom in
$('#zoomin').click(function() {
  // if (canvas.getZoom() < 3) {
  //   // canvas.setZoom(canvas.getZoom() + 0.1);
  //   console.log(canvas.width*canvas.getZoom())
  //   // let initzoom = canvas.getZoom();
  //   // canvas.zoomToPoint({ x: 'center', y: 'center' },initzoom+1 );
  //   canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 0.9);
  // }
   if (canvas.getZoom() < 2) {
    canvas.setZoom(canvas.getZoom() + 0.1);
  }
});

// zoom out
$('#zoomout').click(function() {
   console.log(canvas.width*canvas.getZoom())
  // if (canvas.getZoom() < 1.1) { 
  //   canvas.item(0).selectable = false
  //   canvas.setViewportTransform([1,0,0,1,0,0]); 
  // } else {
  //   canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 1.1);
  // };
  if (canvas.getZoom() != 1) {
    canvas.setZoom(canvas.getZoom() - 0.1)
  };

});

$('#lockdoc').click(function() {
  canvas.item(0).selectable =  !canvas.item(0).selectable
  // doc.set({ selectable:true })
  console.log(canvas.item(0).selectable)
})

// var canvasresize = function() {

// } 

//   canvas.on('object:moving', function (e) {
//         var obj = e.target;
//          // if object is too big ignore
//         if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
//             return;
//         }        
//         obj.setCoords();        
//         // top-left  corner
//         if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
//             obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
//             obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
//         }
//         // bot-right corner
//         if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
//             obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
//             obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
//         }
// });


// moving canvas object by keyboard arrows

fabric.util.addListener(document.body, 'keydown', function (options) {
            if (options.repeat) {
                return;
            }
            onKeyDown(options)
        });

function onKeyDown(event) {
   const STEP = 2;
  // prevent scrolling
  event.preventDefault();
  let keyCode = event.keyCode || event.which;
  let activeGroup = canvas.getActiveObjects();

   if (Array.isArray(activeGroup)) {
     activeGroup.forEach(obj => {
       switch (keyCode) {
         case 37: // left
           obj.left = obj.left - STEP;
           break;
         case 38: // up
           obj.top = obj.top - STEP;
           break;
         case 39: // right
           obj.left = obj.left + STEP;
           break;
         case 40: // down
           obj.top = obj.top + STEP;
           break;
       }
       obj.setCoords();
     });

     canvas.renderAll();
   }
}
// --------------------------canvas relative movement ---------------------------
// canvas.on('mouse:down', function(e) {
//   docMouseDown()
// });
// canvas.on('object:moving', function(e) {
//   docMove()
// });
// register()
function docMouseDown(){
 this.mousesDownLeft = this.left;
 this.mousesDownTop = this.top;
 this.signLeft = newImage.left;
 this.signTop = newImage.top;
}
function docMove(){
 newImage.left = this.signLeft+ this.left - this.mousesDownLeft ;
 newImage.top = this.signTop+ this.top- this.mousesDownTop;
 newImage.setCoords();
}
function docResize() {
  newImage.left = newImage.left - doc.left;
  newImage.top = newImage.top - doc.top;
  newImage.setCoords();
}
// function register(){
//  if(evented) return;
//  docObj.on('moving', docMove);
//  docObj.on('mousedown', docMouseDown);
//  rect.on('rotating', docRotating);
//  evented = true;
// }
// function unRegister(){
//  doc.off('moving');
//  doc.off('mousedown');
//  rect.on('rotating');
//  evented = false;
// }


// drag outside images to canvas ----------------------------------
var imageOffsetX, imageOffsetY;
var images = document.querySelectorAll('.items img');
[].forEach.call(images, function (img) {
  img.addEventListener('dragstart', handleDragStart, false);
  img.addEventListener('dragend', handleDragEnd, false);
});
canvascontainer.addEventListener('drop',handleDrop, false)

function handleDragStart(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
          
          
            var imageOffset = $(this).offset();
            imageOffsetX = e.clientX - imageOffset.left;
            imageOffsetY = e.clientY - imageOffset.top;
        }
function handleDragEnd(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
        }
function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'copy';
            return false;
        }

        function handleDragEnter(e) {
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over');
        }

        function handleDrop(e) {
            e = e || window.event;
            if (e.preventDefault) {
              e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            var img = document.querySelector('.items img.img_dragging');
            console.log('event: ', e);
          
            var offset = $(canvasObject).offset();
            var y = e.clientY - (offset.top + imageOffsetY);
            var x = e.clientX - (offset.left + imageOffsetX);
          
            var newImage = new fabric.Image(img, {
                id:'signimage',
                width: img.width,
                height: img.height,
                left: x,
                top: y
            });
            // newImage.toObject = function() {
            //   return { name: 'sign' };
            // };
            canvas.add(newImage);
            //------------------------**** *************************************************
            // doc.on('mousedown', function() {  
            // console.log(this)
            //     this.mousesDownLeft = this.left;
            //     this.mousesDownTop = this.top;
            //     this.signLeft = newImage.left;
            //     this.signTop = newImage.top;
            // });
            // doc.on('moving', function(e) {
            //     // newImage.left = this.signLeft+ this.left - this.mousesDownLeft ;
            //     // newImage.top = this.signTop+ this.top- this.mousesDownTop;
            //     // newImage.setCoords();
            //     var obj;
            //     obj = e.target;
            //     obj.setCoords();
            //     var boundingRect = obj.getBoundingRect();
            //     var z = canvas.getZoom();
            //     var viewportMatrix = canvas.viewportTransform;
            //     console.log(viewportMatrix)
            //     boundingRect.top = (boundingRect.top - viewportMatrix[5]) / z;
            //     boundingRect.left = (boundingRect.left - viewportMatrix[4]) / z;
            //     boundingRect.width /= z;
            //     boundingRect.height /= z;
  
            //     var canvasHeight = canvas.getHeight / z,
            //         canvasWidth = canvas.getWidth / z;
            //     if(boundingRect.top > 0){
            //         obj.top = 0;
            //     }
            //     if(boundingRect.left > 0){
            //         obj.left = 0;
            //     }
            //     if (boundingRect.top < canvasHeight - boundingRect.height){
            //         obj.top = canvasHeight - boundingRect.height;
            //     }
            //     if (boundingRect.left < canvasWidth - boundingRect.width){
            //         obj.left = canvasWidth - boundingRect.width;
            //     }
            // });
            // *******************************************************************************
            return false;

        }


// another way to do _____________________________________________________________________
// var sign;
canvas.on('mouse:down',function(evt) {
  var active = canvas.getActiveObject();
  if(active.id == 'signimage') {
    active.on('moving',function(evt) {
      preventRectFromLeaving(evt, active);
    })

  } else if(active.id == 'docimage') {
// relative movement for signimage
  // active.lockMovementX = true;
  // active.lockMovementY = true;
  // var pointer = canvas.getPointer(evt.e);
  // origX = pointer.x;
  // origY = pointer.y;
  // console.log(canvas.item(1).id)
 
  // newImage.set({
  //   left: origX,
  //   top: origY,
  //   originX: 'left',
  //   originY: 'top',
  // })

    canvas.discardActiveObject();
    active.lockMovementX = false;
    active.lockMovementY = false;
    var lastLeft = active.left,
        lastTop = active.top;
        active.on('moving', function(evt) {
          // debugger;
        // sets boundary area for image when zoomed
        // THIS IS THE PART THAT DOESN'T WORK
        active.setCoords();
        // SET BOUNDING RECT TO 'active'
        var boundingRect = active.getBoundingRect();
        var zoom = canvas.getZoom();
        var viewportMatrix = canvas.viewportTransform;
        // scales bounding rect when zoomed
        // debugger
        boundingRect.top = (boundingRect.top - viewportMatrix[5]) / zoom;
        boundingRect.left = (boundingRect.left - viewportMatrix[4]) / zoom;
        boundingRect.width /= zoom;
        boundingRect.height /= zoom;

        var canvasHeight = canvas.height / zoom,
          canvasWidth = canvas.width / zoom,
          rTop = boundingRect.top + boundingRect.height,
          rLeft = boundingRect.left + boundingRect.width;
        // checks top left
        if (rTop < canvasHeight || rLeft < canvasWidth) {
          active.top = Math.max(active.top, canvasHeight - boundingRect.height);
          active.left = Math.max(active.left, canvasWidth - boundingRect.width);
        }
        // checks bottom right
        if (rTop > 0 || rLeft > 0) {
          active.top = Math.min(active.top, canvas.height - boundingRect.height +
            active.top - boundingRect.top);
          active.left = Math.min(active.left, canvas.width - boundingRect.width +
          active.left - boundingRect.left);
        }
         canvas.getObjects().forEach(function(o) {
            if(o.id === 'signimage') {
              o.left += active.left - lastLeft;
              o.top += active.top - lastTop;
              o.setCoords();
              }
          })
        debugger
        lastLeft = active.left;
        lastTop = active.top;
      });
  }
  //  deactivates all objects on mouseup
      active.on('mouseup', function() {
        active.off('moving');
        // canvas.discardActiveObject().renderAll();
    });

})
function preventRectFromLeaving(evt, active) {

  var obj = active;
  obj.setCoords();

  var boundingRect = obj.getBoundingRect();

  var zoom = canvas.getZoom();
  var viewportMatrix = canvas.viewportTransform;

  boundingRect.top = (boundingRect.top - viewportMatrix[5]) / zoom;
  boundingRect.left = (boundingRect.left - viewportMatrix[4]) / zoom;
  boundingRect.width /= zoom;
  boundingRect.height /= zoom;


  var canvasWidth = obj.canvas.width / zoom;
  var canvasHeight = obj.canvas.height / zoom;

  // if object is too big ignore
  if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) {
    return;
  }
  if (boundingRect.top < 0 || boundingRect.left < 0) {
    obj.top = Math.max(obj.top, obj.top - boundingRect.top);
    obj.left = Math.max(obj.left, obj.left - boundingRect.left);
  }
  // bot-right corner
  if (boundingRect.top + boundingRect.height > canvasHeight || boundingRect.left + boundingRect.width > canvasWidth) {
    obj.top = Math.min(obj.top, canvasHeight - boundingRect.height + obj.top - boundingRect.top);
    obj.left = Math.min(obj.left, canvasWidth - boundingRect.width + obj.left - boundingRect.left);
  }

}
// _______________________________________________________________________________________