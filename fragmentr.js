//variables
var canvasWidth;
var canvasHeight;
var colors=[""];
var shapeCountX;
var shapeCountY;
var shapeWidth;
var shapeHeight;

//constants
var DENSITY_MAX=100;
var SHIM = 1;

function init()
{
    //define image parameters
    var widthInput = document.getElementById("width");
    var heightInput = document.getElementById("height");
    var densityInput = document.getElementById("density");
    var colorsInput = document.getElementById("colors").value;

    canvasWidth = widthInput.value;
    canvasHeight = heightInput.value;
    density = densityInput.value;

    if (densityInput.value > DENSITY_MAX){
        densityInput.value = DENSITY_MAX;
    }
    shapeCountX = densityInput.value;
    shapeCountY = densityInput.value;

    //parse colors
    colors=[""];
    var colorCount = -1;
    var colorChars = "0123456789abcdefABCDEF";
    for (i = 0; i<colorsInput.length; i++) {
        //part of the current color
        if(colorChars.indexOf(colorsInput.charAt(i))>-1){
            colors[colorCount]+= colorsInput.charAt(i);
        }
        //found a new color
        if (colorsInput.charAt(i) == "#"){
            colorCount++;
            colors[colorCount]= "#";
        }
    }

    shapeWidth = (canvasWidth/shapeCountX)+SHIM;
    shapeHeight = (canvasHeight/shapeCountY+SHIM);

    //create node matrix
    var i, j, x = 0, y = 0, nodeMatrix = new Array(shapeCountX);
    for (i = 0; i < shapeCountX+1; i++) {
        nodeMatrix[i] = new Array(shapeCountY);
        for (j = 0; j < shapeCountY; j++) {
            nodeMatrix[i][j] = [x, y];

            y=y+1;
        }

        x=x+1;
        y=0;
    }

    var canvas = document.getElementById("canvas");
    //setup the canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    if(canvas.getContext)
    {
        //draw the image
        drawImage(nodeMatrix);
    }
}

function updateImage()
{
    init();
}

function drawImage(matrix) {
    var ctx = canvas.getContext("2d");

    // Draw a triangle location for each corner, it will return to the first point
        for (i = 0; i < matrix.length; i++) {
            for (j = 0; j < matrix[i].length; j++) {
                var shimx =i;
                var shimy =j;
                if(i%2){
                    if(j%2) {
                        // Draw up triangle
                    ctx.fillStyle = colors[Math.round(Math.random()*colors.length)%colors.length];
                    ctx.beginPath();
                    ctx.moveTo(matrix[i-((i<1) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight+shapeHeight-shimy);
                    ctx.lineTo(matrix[i][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight-shimy);
                    ctx.lineTo(matrix[i+((i>=shapeCountX) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight+shapeHeight-shimy);
                    ctx.closePath();
                    ctx.fill();
                    } else {
                        // Draw down triangle
                    ctx.fillStyle = colors[Math.round(Math.random()*colors.length)%colors.length];
                    ctx.beginPath();
                    ctx.moveTo(matrix[i-((i<1) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight-shimy);
                    ctx.lineTo(matrix[i][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight+shapeHeight-shimy);
                    ctx.lineTo(matrix[i+((i>=shapeCountX) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight-shimy);
                    ctx.closePath();
                    ctx.fill();
                    }
                    
                } else {
                    if(j%2) {
                        // Draw down triangle
                    ctx.fillStyle = colors[Math.round(Math.random()*colors.length)%colors.length];
                    ctx.beginPath();
                    ctx.moveTo(matrix[i-((i<1) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight-shimy);
                    ctx.lineTo(matrix[i][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight+shapeHeight-shimy);
                    ctx.lineTo(matrix[i+((i>=shapeCountX) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight-shimy);
                    ctx.closePath();
                    ctx.fill();
                    } else {
                        // Draw up triangle
                    ctx.fillStyle = colors[Math.round(Math.random()*colors.length)%colors.length];
                    ctx.beginPath();
                    ctx.moveTo(matrix[i-((i<1) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight+shapeHeight-shimy);
                    ctx.lineTo(matrix[i][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight-shimy);
                    ctx.lineTo(matrix[i+((i>=shapeCountX) ? 0 : 1)][j][0]*shapeWidth-shimx, matrix[i][j][1]*shapeHeight+shapeHeight-shimy);
                    ctx.closePath();
                    ctx.fill();
                    }
                }
            }
        }
}

function saveImage() {
    var canvas = document.getElementById("canvas");
    var save = document.getElementById("save");
    var img = Canvas2Image.saveAsPNG(canvas, true);
    save.innerHTML = save.innerHTML+"<img src=\""+img.src+"\" style=\"display:none\">";
    save.href = img.src;
}
