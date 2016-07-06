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
    var dim = setupDimensions(canvasWidth);
    console.log(dim);

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
            drawWood();
            drawPockets();
            drawFelt();
            drawHoles();
            drawCushions();

            function drawWood() {
                woodPattern = ctx.createPattern(images[1], "repeat");
                ctx.fillStyle = woodPattern;
                ctx.fillRect(dim.buffer, dim.buffer, canvasWidth - 2 * dim.buffer, canvasHeight - 2 * dim.buffer);
            }

            function drawFelt() {
                ctx.fillStyle = "#006600";
                ctx.fillRect(dim.feltFromEdge, dim.feltFromEdge, canvasWidth - 2 * dim.feltFromEdge, canvasHeight - 2 * dim.feltFromEdge);
            }

            function drawCushions() {
                ctx.fillStyle = '#004900';

                // Top Left
                ctx.beginPath();
                ctx.moveTo(dim.buffer + dim.pocketSize, dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - dim.holeSize, dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - dim.holeSize - dim.centreCushionDiagonalOffset, dim.feltFromEdge + dim.cushionThickness);
                ctx.lineTo(dim.buffer + dim.pocketSize + dim.cornerCushionDiagonalOffset, dim.feltFromEdge + dim.cushionThickness);
                ctx.closePath();
                ctx.fill();

                //Top Right
                ctx.beginPath();
                ctx.moveTo(canvasWidth - dim.buffer - dim.pocketSize, dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + dim.holeSize, dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + dim.holeSize + dim.centreCushionDiagonalOffset, dim.feltFromEdge + dim.cushionThickness);
                ctx.lineTo(canvasWidth - dim.buffer - dim.pocketSize - dim.cornerCushionDiagonalOffset, dim.feltFromEdge + dim.cushionThickness);
                ctx.closePath();
                ctx.fill();

                //Left
                ctx.beginPath();
                ctx.moveTo(dim.feltFromEdge, dim.buffer + dim.pocketSize);
                ctx.lineTo(dim.feltFromEdge + dim.cornerCushionDiagonalOffset, dim.buffer + dim.pocketSize + dim.cornerCushionDiagonalOffset);
                ctx.lineTo(dim.feltFromEdge + dim.cornerCushionDiagonalOffset, canvasHeight - dim.buffer - dim.pocketSize - dim.cornerCushionDiagonalOffset);
                ctx.lineTo(dim.feltFromEdge, canvasHeight - dim.buffer - dim.pocketSize);
                ctx.closePath();
                ctx.fill();

                //Right
                ctx.beginPath();
                ctx.moveTo(canvasWidth - dim.feltFromEdge, dim.buffer + dim.pocketSize);
                ctx.lineTo(canvasWidth - dim.feltFromEdge - dim.cornerCushionDiagonalOffset, dim.buffer + dim.pocketSize + dim.cornerCushionDiagonalOffset);
                ctx.lineTo(canvasWidth - dim.feltFromEdge - dim.cornerCushionDiagonalOffset, canvasHeight - dim.buffer - dim.pocketSize - dim.cornerCushionDiagonalOffset);
                ctx.lineTo(canvasWidth - dim.feltFromEdge, canvasHeight - dim.buffer - dim.pocketSize);
                ctx.closePath();
                ctx.fill();

                // Bottom Left
                ctx.beginPath();
                ctx.moveTo(dim.buffer + dim.pocketSize, canvasHeight - dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - dim.holeSize, canvasHeight - dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) - dim.holeSize - dim.centreCushionDiagonalOffset, canvasHeight - dim.feltFromEdge - dim.cushionThickness);
                ctx.lineTo(dim.buffer + dim.pocketSize + dim.cornerCushionDiagonalOffset, canvasHeight - dim.feltFromEdge - dim.cushionThickness);
                ctx.closePath();
                ctx.fill();

                //Bottom Right
                ctx.beginPath();
                ctx.moveTo(canvasWidth - dim.buffer - dim.pocketSize, canvasHeight - dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + dim.holeSize, canvasHeight - dim.feltFromEdge);
                ctx.lineTo((canvasWidth / 2) + dim.holeSize + dim.centreCushionDiagonalOffset, canvasHeight - dim.feltFromEdge - dim.cushionThickness);
                ctx.lineTo(canvasWidth - dim.buffer - dim.pocketSize - dim.cornerCushionDiagonalOffset, canvasHeight - dim.feltFromEdge - dim.cushionThickness);
                ctx.closePath();
                ctx.fill();

            }

            function drawPockets() {
                ctx.fillStyle="#7C8E94";
                // Top Left
                ctx.fillRect(dim.buffer, dim.buffer, dim.pocketSize, dim.pocketSize);

                // Top middle
                ctx.fillRect(canvasWidth / 2 - dim.pocketSize / 2, dim.buffer, dim.pocketSize, dim.pocketSize);

                // Bottom middle
                ctx.fillRect(canvasWidth / 2 - dim.pocketSize / 2, canvasHeight - dim.buffer - dim.pocketSize, dim.pocketSize, dim.pocketSize);

                // Bottom Left
                ctx.fillRect(dim.buffer, canvasHeight - dim.buffer - dim.pocketSize, dim.pocketSize, dim.pocketSize);

                // Bottom Right
                ctx.fillRect(canvasWidth - dim.buffer - dim.pocketSize, canvasHeight - dim.buffer - dim.pocketSize, dim.pocketSize, dim.pocketSize);

                // Top Right
                ctx.fillRect(canvasWidth - dim.buffer - dim.pocketSize, dim.buffer, dim.pocketSize, dim.pocketSize);
            }

            function drawHoles() {
                ctx.fillStyle="#000000";

                // Top Left
                ctx.beginPath();
                ctx.arc(dim.feltFromEdge, dim.feltFromEdge, dim.holeSize, 0, 2*Math.PI);
                ctx.fill();

                // Top Right
                ctx.beginPath();
                ctx.arc(canvasWidth - dim.feltFromEdge, dim.feltFromEdge, dim.holeSize, 0, 2*Math.PI);
                ctx.fill();

                // Top Middle
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, dim.feltFromEdge - dim.middleHoleAdjustment, dim.holeSize, 0, 2*Math.PI);
                ctx.fill();

                // Bottom Middle
                ctx.beginPath();
                ctx.arc(canvasWidth / 2, canvasHeight - dim.buffer - dim.woodWidth + dim.middleHoleAdjustment, dim.holeSize, 0, 2*Math.PI);
                ctx.fill();

                // Bottom Right
                ctx.beginPath();
                ctx.arc(canvasWidth - dim.feltFromEdge, canvasHeight - dim.buffer - dim.woodWidth, dim.holeSize, 0, 2*Math.PI);
                ctx.fill();

                // Bottom Left
                ctx.beginPath();
                ctx.arc(dim.feltFromEdge, canvasHeight - dim.buffer - dim.woodWidth, dim.holeSize, 0, 2*Math.PI);
                ctx.fill();
            }
        }
    }
}

function setupDimensions(canvasWidth) {
    var buffer = canvasWidth * 0.05;
    var woodWidth = canvasWidth * 0.04;
    var feltFromEdge = buffer + woodWidth;
    var pocketSize = buffer * 1.3;
    var holeSize = pocketSize * 0.3;
    var middleHoleAdjustment = woodWidth * 0.2;
    var cushionThickness = (woodWidth * 0.25);
    var centreCushionDiagonalOffset = pocketSize * 0.1;
    var cornerCushionDiagonalOffset = cushionThickness;

    var sizes = {
        buffer: buffer,
        woodWidth: woodWidth,
        feltFromEdge: feltFromEdge,
        pocketSize: pocketSize,
        holeSize: holeSize,
        middleHoleAdjustment: middleHoleAdjustment,
        cushionThickness: cushionThickness,
        centreCushionDiagonalOffset: centreCushionDiagonalOffset,
        cornerCushionDiagonalOffset: cornerCushionDiagonalOffset
    };
    return sizes
}