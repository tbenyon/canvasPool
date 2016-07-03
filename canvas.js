function draw() {
    var canvas = document.getElementById('myCanvas');

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        circles(ctx);
    } else {
        Console.log("Canvas-unsupported code here");
    }
}

function circles(ctx) {
    var imageObj = new Image();
    imageObj.onload = function() {
        ctx.drawImage(imageObj, 10, 10, 40, 40);
    };
    imageObj.src = 'redBall.png';

}

