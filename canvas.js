var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

function loadImages(imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        var image = new Image();

        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

function draw() {
    var canvas = document.getElementById('myCanvas');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var circle = {'x': 10, 'y': 10, 'xVel': 5, 'yVel': 5, 'diameter': 30};

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return setTimeout(callback, 1);
        };

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var images = loadImages(["redBall.png", "wood.jpg"]);
        var woodPattern;
        animate();
    } else {
        console.log("Canvas-unsupported code here");
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawTable();
        ctx.drawImage(images[0], circle.x, circle.y, circle.diameter, circle.diameter);
        circle.x += circle.xVel;
        circle.y += circle.yVel;

        if (circle.x > canvasWidth - circle.diameter|| circle.x < 0) {
            circle.xVel *= -1
        }
        if (circle.y > canvasHeight - circle.diameter|| circle.y < 0) {
            circle.yVel *= -1
        }
        requestAnimationFrame(animate);

        function drawTable() {
            var buffer = canvasWidth * 0.05;
            var woodWidth = canvasWidth * 0.04;
            var feltFromEdge = buffer + woodWidth;
            var pocketSize = buffer * 1.3;
            var holeSize = pocketSize * 0.3;
            var middleHoleAdjustment = woodWidth * 0.2;
            var cushionThickness = (woodWidth * 0.25);
            var centreCushionDiagonalOffset = pocketSize * 0.1;
            var cornerCushionDiagonalOffset = cushionThickness;

            drawWood();
            drawPockets();
            drawFelt();
            drawHoles();
            drawCushions();

            function drawWood() {
                woodPattern = ctx.createPattern(images[1], "repeat");
                ctx.fillStyle = woodPattern;
                ctx.fillRect(buffer, buffer, canvasWidth - 2 * buffer, canvasHeight - 2 * buffer);
            }

            function drawFelt() {
                ctx.fillStyle = "#006600";
                ctx.fillRect(feltFromEdge, feltFromEdge, canvasWidth - 2 * feltFromEdge, canvasHeight - 2 * feltFromEdge);
            }

            function drawCushions() {
                ctx.fillStyle = '#004900';

                // Top Left
                ctx.beginPath();
                ctx.moveTo(buffer + pocketSize, feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - holeSize,feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - holeSize - centreCushionDiagonalOffset, feltFromEdge + cushionThickness);
                ctx.lineTo(buffer + pocketSize + cornerCushionDiagonalOffset, feltFromEdge + cushionThickness);
                ctx.closePath();
                ctx.fill();

                //Top Right
                ctx.beginPath();
                ctx.moveTo(canvasWidth - buffer - pocketSize, feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + holeSize,feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + holeSize + centreCushionDiagonalOffset, feltFromEdge + cushionThickness);
                ctx.lineTo(canvasWidth - buffer - pocketSize - cornerCushionDiagonalOffset, feltFromEdge + cushionThickness);
                ctx.closePath();
                ctx.fill();

                //Left
                ctx.beginPath();
                ctx.moveTo(feltFromEdge, buffer + pocketSize);
                ctx.lineTo(feltFromEdge + cornerCushionDiagonalOffset,buffer + pocketSize + cornerCushionDiagonalOffset);
                ctx.lineTo(feltFromEdge + cornerCushionDiagonalOffset, canvasHeight - buffer - pocketSize - cornerCushionDiagonalOffset);
                ctx.lineTo(feltFromEdge, canvasHeight - buffer - pocketSize);
                ctx.closePath();
                ctx.fill();

                //Right
                ctx.beginPath();
                ctx.moveTo(canvasWidth - feltFromEdge, buffer + pocketSize);
                ctx.lineTo(canvasWidth - feltFromEdge - cornerCushionDiagonalOffset,buffer + pocketSize + cornerCushionDiagonalOffset);
                ctx.lineTo(canvasWidth - feltFromEdge - cornerCushionDiagonalOffset, canvasHeight - buffer - pocketSize - cornerCushionDiagonalOffset);
                ctx.lineTo(canvasWidth - feltFromEdge, canvasHeight - buffer - pocketSize);
                ctx.closePath();
                ctx.fill();

                // Bottom Left
                ctx.beginPath();
                ctx.moveTo(buffer + pocketSize, canvasHeight - feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - holeSize, canvasHeight - feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - holeSize - centreCushionDiagonalOffset, canvasHeight - feltFromEdge - cushionThickness);
                ctx.lineTo(buffer + pocketSize + cornerCushionDiagonalOffset, canvasHeight - feltFromEdge - cushionThickness);
                ctx.closePath();
                ctx.fill();

                //Bottom Right
                ctx.beginPath();
                ctx.moveTo(canvasWidth - buffer - pocketSize, canvasHeight - feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + holeSize,canvasHeight - feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + holeSize + centreCushionDiagonalOffset, canvasHeight - feltFromEdge - cushionThickness);
                ctx.lineTo(canvasWidth - buffer - pocketSize - cornerCushionDiagonalOffset, canvasHeight - feltFromEdge - cushionThickness);
                ctx.closePath();
                ctx.fill();

            }

            function drawPockets() {
                ctx.fillStyle="#7C8E94";
                // Top Left
                ctx.fillRect(buffer, buffer, pocketSize, pocketSize);

                // Top middle
                ctx.fillRect(canvasWidth / 2 - pocketSize / 2, buffer, pocketSize, pocketSize);

                // Bottom middle
                ctx.fillRect(canvasWidth / 2 - pocketSize / 2, canvasHeight - buffer - pocketSize, pocketSize, pocketSize);

                // Bottom Left
                ctx.fillRect(buffer, canvasHeight - buffer - pocketSize, pocketSize, pocketSize);

                // Bottom Right
                ctx.fillRect(canvasWidth - buffer - pocketSize, canvasHeight - buffer - pocketSize, pocketSize, pocketSize);

                // Top Right
                ctx.fillRect(canvasWidth - buffer - pocketSize, buffer, pocketSize, pocketSize);
            }

            function drawHoles() {
                ctx.fillStyle="#000000";

                // Top Left
                ctx.beginPath();
                ctx.arc(feltFromEdge,feltFromEdge,holeSize,0,2*Math.PI);
                ctx.fill();

                // Top Right
                ctx.beginPath();
                ctx.arc(canvasWidth - feltFromEdge,feltFromEdge,holeSize,0,2*Math.PI);
                ctx.fill();

                // Top Middle
                ctx.beginPath();
                ctx.arc(canvasWidth / 2,feltFromEdge - middleHoleAdjustment,holeSize,0,2*Math.PI);
                ctx.fill();

                // Bottom Middle
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, canvasHeight - buffer - woodWidth + middleHoleAdjustment,holeSize,0,2*Math.PI);
                ctx.fill();

                // Bottom Right
                ctx.beginPath();
                ctx.arc(canvasWidth - feltFromEdge, canvasHeight - buffer - woodWidth,holeSize,0,2*Math.PI);
                ctx.fill();

                // Bottom Left
                ctx.beginPath();
                ctx.arc(feltFromEdge, canvasHeight - buffer - woodWidth,holeSize,0,2*Math.PI);
                ctx.fill();
            }
        }
    }
}