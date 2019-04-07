'use strict';

let fs = require('fs');

class WeatherService {
    constructor() {
        this.listeners = {
            'create': [],
            'update': []
        }; // храним callbacks
        this.number = 0;
    }
    on(event, callback) {    // подписываемся на событие
        this.listeners[event].push(callback);
    }
    emit(event, data) {      // публикуем (диспатчим, эмитим) событие
        this.listeners[event].forEach(callback => callback(data));
    }
    checkForecast(event) {
        // fetch yandex
        let data = event + ": " + this.number;
        this.number++;
        this.emit(event, data);
    }
}

class LoggerObserver {
    constructor(weatherService) {
        this.weatherService = weatherService;
        this.weatherService.on('create', this.logDataCreate);
        this.weatherService.on('update', this.logDataUpdate);
    }

    logDataCreate(data) {
        console.log(data);
    }

    logDataUpdate(data) {
        console.log(data);
    }
}

class FileLoggerObserver {
    constructor(weatherService) {
        this.weatherService = weatherService;
        this.weatherService.on(this.logData);
    }

    logData(data) {
        // console.log(data);
        fs.writeFile("logFile.txt", data);
    }
}

let weatherService = new WeatherService();
let loggerObserver = new LoggerObserver(weatherService);
// let loggerFileObserver = new FileLoggerObserver(weatherService);
weatherService.checkForecast('create');
weatherService.checkForecast('create');
weatherService.checkForecast('update');
