module.exports = (app) => {
    require('dotenv').config();
    const apiKey = "";
    const request = require('request');
    var checkVisibility = (weather) => { // Helper Function
        if (weather <= 0) {
            return "Unknown";
        } else if (weather < 1000) {
            return "Very Poor";
        } else if (weather >= 1000 && weather < 4000) {
                return "Poor";
        } else if (weather >= 4000 && weather < 10000) {
                return "Moderate";
        } else if (weather >= 10000 && weather < 20000) {
                return "Good";
        } else if (weather >= 20000 && weather < 40000) {
                return "Very Good";
        } 
        return "Excellent";
    };
    
    // Home Page
    app.get('/', (req, res) => {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`               
                                                                                                                                                                                        
        request(url, function (err, response, body) {
                if(err) {
                        console.log('error:', err);
                } else {
                    var weather = JSON.parse(body);
                    var weatherInfo = {
                            country: weather.sys.country,                                                                                                                  
                            city: weather.name,                                                                                                                            
                            temperature: Math.round(weather.main.temp),                                                                                                    
                            title: weather.weather[0].main,
                            description: weather.weather[0].description,
                            humidity: weather.main.humidity,                                                                                                               
                            pressure: weather.main.pressure,                                                                                                               
                            feeling: Math.round(weather.main.feels_like),                                                                                                  
                            visibility: checkVisibility(weather.visibility),                                                                                                                 
                            wind: weather.wind.speed,                                                                                                                      
                            icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
                    }
                    res.render('index.ejs', {weatherInfo});
                }
        });


    });

    // Weather Results Page
    app.get('/search-result', (req, res) => {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=${apiKey}`               
                                                                                                                                                                                        
        request(url, function (err, response, body) {
                if(err) {
                        console.log('error:', err);
                } else {
                        try {
                                var weather = JSON.parse(body);
                                var weatherInfo = {
                                    country: weather.sys.country,                                                                                                                  
                                    city: weather.name,                                                                                                                            
                                    temperature: Math.round(weather.main.temp),                                                                                                    
                                    title: weather.weather[0].main,
                                    description: weather.weather[0].description,
                                    humidity: weather.main.humidity,                                                                                                               
                                    pressure: weather.main.pressure,                                                                                                               
                                    feeling: Math.round(weather.main.feels_like),                                                                                                  
                                    visibility: checkVisibility(weather.visibility),                                                                                                                 
                                    wind: weather.wind.speed,                                                                                                                      
                                    icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
                            }
                                res.render('search-results.ejs', {weatherInfo});
                        } catch(err) {
                                res.send('<script> alert("Please enter a valid city"); window.location.href="/"; </script>');
                        }
                }
        });
    });


}