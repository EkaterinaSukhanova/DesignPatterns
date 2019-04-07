'use strict';

let fs = require('fs');

class Observer {
    notify() {}
}


class WeatherService {
    constructor() {
        this.listeners = []; // храним Объекты наблюдателей
        this.number = 0;
    }
    on(listener) {    // подписываемся на событие
        this.listeners.push(listener);
    }
    emit(data) {      // публикуем (диспатчим, эмитим) событие
        this.listeners.forEach(function (listener) {
            listener.notify(data);
        });
    }
    checkForecast() {
        // fetch yandex
        let data = "emit number: " + this.number;
        this.number++;
        this.emit(data);
    }
}

class LoggerObserver extends Observer {
    constructor(weatherService) {
        super();
        this.weatherService = weatherService;
        this.weatherService.on(this);
    }

    notify(data) {
        console.log(data);
    }
}

class FileLoggerObserver extends Observer {
    constructor(weatherService) {
        super();
        this.weatherService = weatherService;
        this.weatherService.on(this);
    }

    notify(data) {
        // console.log(data);
        fs.writeFile("logFile.txt", data);
    }
}

let weatherService = new WeatherService();
let loggerObserver = new LoggerObserver(weatherService);
let loggerFileObserver = new FileLoggerObserver(weatherService);
weatherService.checkForecast();
