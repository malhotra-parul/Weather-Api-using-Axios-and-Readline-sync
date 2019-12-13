//referencing axios and readline-sync
const axios = require("axios");
const readlineSync = require("readline-sync");
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

const APPID = "60eceb8192ad8884a7c8759fb9ccf81a";
const units = "metric";

const getWeatherDetails = async () => {
  try {
    const city = readlineSync.question("Enter City Name - ");  
    return await axios.get(
      baseUrl + city + "&APPID=" + APPID + "&units=" + units
    );
  } catch (error) {
    console.log(error);
  }
};

const printWeatherDetails = async () => {
  try {
    const response = await getWeatherDetails();
    console.log(response.data.main.temp_min + " degree Celsius");
    console.log(response.data.main.temp_max + " degree Celsius");
    console.log(response.data.weather[0].description.toUpperCase());
  } catch (err) {
    console.log(err);
  }
};

const menuItems = async () => {
    await printWeatherDetails();
    do{
        var input = readlineSync.question("Do you want to check weather for another city - Enter Y or N - ");
        input = input.toLowerCase();
        switch(input){
            case 'y':
                await printWeatherDetails();
                break;
            case 'n':
                console.log("Exiting!");

                break;
            default:
                console.log("Please choose Y to check weather details and N to exit.");
        }
        if(input == 'n'){ break; } 
    }while(true);
}

menuItems();
