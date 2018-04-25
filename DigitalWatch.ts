function MyMethodDecorator(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
  return descriptor;
}
class DigitalWatch {
  constructor() {
    setInterval(() => this.runClock(), 1000)
  }  
  @MyMethodDecorator
  runClock() {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
  
    let watch = hours + ' : ' + minutes + ' : ' + seconds;
    let div=document.getElementById("div");
    div.innerHTML = watch;
  }
}
let clock = new DigitalWatch();

class AnalogWatch extends DigitalWatch{
  constructor() {
    super();
    setInterval(() => this.runClock(), 1000)
  }  
runClock() {
  let canvasHTML: any = document.getElementById('myCanvas');
    let contextHTML = canvasHTML.getContext('2d');
    contextHTML.strokeRect(0,0,canvasHTML.width, canvasHTML.height);
  
    //Расчет координат центра и радиуса часов
    let radiusClock = canvasHTML.width/2 - 10;
    let xCenterClock = canvasHTML.width/2;
    let yCenterClock = canvasHTML.height/2;
  
    //Очистка экрана. 
    contextHTML.fillStyle = "#ffffff";
    contextHTML.fillRect(0,0,canvasHTML.width,canvasHTML.height);
  
    //контур часов
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 1;
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();
  
    //Рисуем рисочки часов
    let radiusNum = radiusClock - 10; //Радиус расположения рисочек  
    let radiusPoint;
    for(var tm = 0; tm < 60; tm++){
    contextHTML.beginPath();
    if(tm % 5 == 0){radiusPoint = 5;}else{radiusPoint = 2;} //для выделения часовых рисочек
    let xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
    let yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
    contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.closePath();
    } 
  
    //Оцифровка циферблата часов
    for(var th = 1; th <= 12; th++){
  contextHTML.beginPath();
  contextHTML.font = 'bold 25px sans-serif';
  let xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/180) + Math.PI/2);
  let yText = yCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/180) + Math.PI/2);
  if(th <= 9){
    contextHTML.strokeText(th, xText - 5 , yText + 10);
  }else{
    contextHTML.strokeText(th, xText - 15 , yText + 10);
  }
       contextHTML.stroke();
  contextHTML.closePath();  
    }

    //Рисуем стрелки
   let lengthSeconds = radiusNum - 10;
    let lengthMinutes = radiusNum - 15;
    let lengthHour = lengthMinutes / 1.5;
    let d = new Date();  //Получаем экземпляр даты
    let t_sec = 6*d.getSeconds();//Определяем угол для секунд
    let t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds()); //Определяем угол для минут
    let t_hour = 30*(d.getHours() + (1/60)*d.getMinutes()); //Определяем угол для часов
  
    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#FF0000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
        yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем минуты
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 3;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
         yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем часы
    contextHTML.beginPath();
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
         yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();  
  
    //Рисуем центр часов
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();
    
    return;
}
}
let newClock = new AnalogWatch();
