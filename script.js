// var canvas = document.body.appendChild( document.createElement( 'canvas' ) ),
//     context = canvas.getContext( '2d' );

// context.globalCompositeOperation = 'lighter';
// canvas.width = 1280;
// canvas.height = 800;
// draw();

// var textStrip = ['E', 'A', 'S', 'T', 'R', 'I', 'V', 'E', 'R'];

// var stripCount = 60, stripX = new Array(), stripY = new Array(), dY = new Array(), stripFontSize = new Array();

// for (var i = 0; i < stripCount; i++) {
//     stripX[i] = Math.floor(Math.random()*1265);
//     stripY[i] = -100;
//     dY[i] = Math.floor(Math.random()*7)+3;
//     stripFontSize[i] = Math.floor(Math.random()*16)+8;
// }

// var theColors = ['#FF0000', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

// function drawStrip(x, y) {
//     for (var k = 0; k <= 20; k++) {
//         var randChar = textStrip[Math.floor(Math.random()*textStrip.length)];
//         if (context.fillText) {
//             switch (k) {
//             case 0:
//                 context.fillStyle = theColors[0]; break;
//             case 1:
//                 context.fillStyle = theColors[1]; break;
//             case 3:
//                 context.fillStyle = theColors[2]; break;
//             case 7:
//                 context.fillStyle = theColors[3]; break;
//             case 13:
//                 context.fillStyle = theColors[4]; break;
//             case 17:
//                 context.fillStyle = theColors[5]; break;
//             }
//             context.fillText(randChar, x, y);
//         }
//         y -= stripFontSize[k];
//     }
// }

// function draw() {
//     // clear the canvas and set the properties
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.shadowOffsetX = context.shadowOffsetY = 0;
//     context.shadowBlur = 8;
//     context.shadowColor = '#94f475';
    
//     for (var j = 0; j < stripCount; j++) {
//         context.font = stripFontSize[j]+'px MatrixCode';
//         context.textBaseline = 'top';
//         context.textAlign = 'center';
        
//         if (stripY[j] > 1358) {
//             stripX[j] = Math.floor(Math.random()*canvas.width);
//             stripY[j] = -100;
//             dY[j] = Math.floor(Math.random()*7)+3;
//             stripFontSize[j] = Math.floor(Math.random()*16)+8;
//             drawStrip(stripX[j], stripY[j]);
//         } else {
//             drawStrip(stripX[j], stripY[j]);
//         }
        
//         stripY[j] += dY[j];
//     }
//     setTimeout(draw, 70);
// }
