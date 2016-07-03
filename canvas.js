function draw() {
    var canvas = document.getElementById('myCanvas');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var circle = {'x': 10, 'y': 10, 'xVel': 5, 'yVel': 5, 'diameter': 40};

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
        var imageObj = new Image();
        imageObj.onload = animate();
        imageObj.src = 'redBall.png';
    } else {
        console.log("Canvas-unsupported code here");
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(imageObj, circle.x, circle.y, circle.diameter, circle.diameter);
        circle.x += circle.xVel;
        circle.y += circle.yVel;

        if (circle.x > canvasWidth - circle.diameter|| circle.x < 0) {
            circle.xVel *= -1
        }
        if (circle.y > canvasHeight - circle.diameter|| circle.y < 0) {
            circle.yVel *= -1
        }
        requestAnimationFrame(animate);
    }
}