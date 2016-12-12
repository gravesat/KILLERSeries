PFont ZXXSans;
PImage backImg;
PImage birdImg;
PImage wallImg;
PImage startImg;
int gamestate = 1, score = 0, highScore = 0, x = -200, y, vy = 0, wx[] = new int[2], wy[] = new int[2];
void setup() {
  size(600,800);
  fill(255);
  textSize(40);
  ZXXSans = createFont("Roboto-Bold", 32);
  textFont(ZXXSans);
  frameRate(60);
  if(key=='+')frameRate(min(60,frameRate+5));
  if(key=='-')frameRate(max(1,frameRate-5));
}
void draw() { //runs 60 times a second
backImg =loadImage("bkgtest.jpg");
birdImg =loadImage("cis.png");
wallImg =loadImage("wall.png");
startImg=loadImage("startscreen1.jpg");
  if(gamestate == 0) {
    imageMode(CORNER);
    image(backImg, x, 0);
    image(backImg, x+backImg.width, 0);
    x -= 6;
    vy += 1;
    y += vy;
    if(x == -1800) x = 0;
    for(int i = 0 ; i < 2; i++) {
      imageMode(CENTER);
      image(wallImg, wx[i], wy[i] - (wallImg.height/2+100));

      image(wallImg, wx[i], wy[i] + (wallImg.height/2+100));
      if(wx[i] < 0) {
        wy[i] = (int)random(200,height-200);
        wx[i] = width;
      }
      if(wx[i] == width/2) highScore = max(++score, highScore);
      if(y>height||y<0||(abs(width/2-wx[i])<25 && abs(y-wy[i])>100)) gamestate=1;
      wx[i] -= 6;
    }
    image(birdImg, width/2, y);
    text(""+score, width/2-15, 700);
  }
  else {
    imageMode(CENTER);
    image(startImg, width/2,height/2);
    text("HIGH SCORE: "+highScore, 195, 630);
  }
}
void mousePressed() {
  vy = -17;
  if(gamestate==1) {
    wx[0] = 600;
    wy[0] = y = height/2;
    wx[1] = 900;
    wy[1] = 600;
    x = gamestate = score = 0;
  }
}