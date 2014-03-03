//variables
var canvasWidth;
var canvasHeight;
var colors=[""];
var shapeCountX;
var shapeCountY;
var shapeWidth;
var shapeHeight;

//constants
var DENSITY_MAX=200;
var SHIM = 1;

//color swatches
var swatchNames=["Attack of the Mac",
                 "Darkness",
                 "Heavy Cream",
                 "Barcelona",
                 "Blue Humans",
                 "Buried at the Beach",
                 "Raptorize",
                 "Cthulhu Rises",
                 "Boring Volcano",
                 "Light the Sky",
                 "Hackers",
                 "Tracert",
                 "City by Night",
                 "Wicked Witch",
                 "Flying Monkeys",
                 "Searching",
                 "Office Chair in the Clouds",
                 "Born to be a Winner",
                 "1969",
                 "Teapots",
                 "Wordpress"
                 ];
var swatchValues=  ["#445555,#889999,#4499DD,#DDDDDD,#AACCCC",
                    "#444,#000,#040404,#080808,#0c0c0c,#101010,#141414,#181818,#1c1c1c,#202020,#242424,#282828,#2c2c2c,#000,#040404,#080808,#0c0c0c,#101010,#141414,#181818,#1c1c1c,#202020,#242424,#282828,#2c2c2c,#000,#040404,#080808,#0c0c0c,#101010,#141414,#181818,#1c1c1c,#202020,#242424,#282828,#2c2c2c",
                    "#fff,#faf9f8,#f7f7f6,#f6f5f4,#f4f3f2,#f2f1f0,#eeedec,#eae9e8,#faf9f8,#f7f7f6,#f6f5f4,#f4f3f2,#f2f1f0,#eeedec,#eae9e8,#faf9f8,#f7f7f6,#f6f5f4,#f4f3f2,#f2f1f0,#eeedec,#eae9e8",
                    "#27282D,#474D4B,#F54296,#E0F635,#FDFFF7",
                    "#294052,#447294,#8FBCDB,#F4D6BC,#F8E4CC",
                    "#886655,#DD9977,#EECCAA,#EEEEEE,#CC99CC",
                    "#070A1E,#382230,#58423F,#888069,#C1BF95",
                    "#553333,#99aaaa,#998866,#cccc99,#aabbaa",
                    "#223333,#889999,#dd9988,#ddeedd,#bbcccc",
                    "#332244,#bb3355,#998899,#ff5555,#ffdd99",
                    "#FF6600,#F6F6EF,#828282,#000000",
                    "#2B2B2D,#166622,#2FBB4F,#922729",
                    "#332244,#5566aa,#aa7799,#dd9999,#ffdd99",
                    "#334444,#99aa88,#bbbbaa,#ddddcc,#ccccbb",
                    "#444466,#6666aa,#8888aa,#8877dd,#ccbbff",
                    "#4D90FE,#DD4B39,#F1F1F1,#777777",
                    "#555588,#6688DD,#FFEEFF,#DDCCEE,#BBBBDD",
                    "#3366BB,#CCCCCC,#EEEEEE,#DDDDEE,#FFDD11",
                    "#443344,#aa5555,#668899,#dd8855,#cccccc",
                    "#333355,#4455aa,#997777,#5577dd,#dd9977",
                    "#E96F23,#EC8B26,#ECB842,#6796B8,#5C556A"
                    ];

function init()
{
    //setup interface
    var colorsDropdown = document.getElementById("colors-dropdown");
    colorsDropdown.innerHTML ="";
    for(var i=0;i<swatchNames.length;i++){
        colorsDropdown.innerHTML += "<li><a href=\"#\" onclick=\"updateColors(this)\">"+swatchNames[i]+"</a></li>";
    }

    updateImage();
}

function updateImage() {
    //define image parameters
    var widthInput = document.getElementById("width");
    var heightInput = document.getElementById("height");
    var densityInputX = document.getElementById("densityX");
    var densityInputY = document.getElementById("densityY");
    var colorsInput = document.getElementById("colors").value;

    canvasWidth = widthInput.value;
    canvasHeight = heightInput.value;

    if (densityInputX.value > DENSITY_MAX){
        densityInputX.value = DENSITY_MAX;
    }
    if (densityInputY.value > DENSITY_MAX){
        densityInputY.value = DENSITY_MAX;
    }
    shapeCountX = densityInputX.value;
    shapeCountY = densityInputY.value;

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

function updateColors(sender) {
    document.getElementById("colors").value = swatchValues[searchStringInArray(sender.innerHTML, swatchNames)];
    updateImage();
}

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}
