import React from "react";

const Main = ({ weatherData, forecastData, error }) => {
  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!weatherData || !forecastData) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  // Extract the weather condition
  const weatherCondition = weatherData.weather[0].main.toLowerCase();

  // Map weather conditions to online background image URLs
  const backgroundImages = {
    rain: "https://centralca.cdn-anvilcms.net/media/images/2019/01/02/images/Rainy_Weather_pix.max-2400x1350.jpg",
    clear: "https://clarksvillenow.com/wp-content/blogs.dir/43/files/2020/10/shutterstock_206307496-1200x768.jpg",
    clouds: "https://www.stockvault.net/data/2017/05/27/236814/preview16.jpg",
    snow: "https://www.weather.gov/images/nws/snowy-road.jpg",
    thunderstorm: "https://cdn.pixabay.com/photo/2021/04/16/13/31/thunderstorm-6183572_1280.jpg",
    default: "https://gratisography.com/wp-content/uploads/2022/05/gratisography-heavenly-free-stock-photo-1170x775.jpg",
  };

  // Determine the background image based on the weather condition
  const backgroundImage = backgroundImages[weatherCondition] || backgroundImages.default;

  // Helper function to get the day label
  const getDayLabel = (forecastDate) => {
    const today = new Date();
    const forecastDay = new Date(forecastDate);

    // Reset the time to midnight for both dates to compare only the date
    today.setHours(0, 0, 0, 0);
    forecastDay.setHours(0, 0, 0, 0);

    // Calculate the difference in days
    const dayDifference = (forecastDay - today) / (1000 * 60 * 60 * 24);

    if (dayDifference === 0) {
      return "Today";
    } else if (dayDifference === 1) {
      return "Tomorrow";
    } else {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return daysOfWeek[forecastDay.getDay()];
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Allow the container to grow with content
        color: "white",
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black overlay
          minHeight: "100vh", // Ensure the overlay covers the entire area
          width: "100%",
          padding: "20px",
        }}
      >
        {/* Current Weather Section */}
        <div className="max-w-lg mx-auto bg-white bg-opacity-40 text-black rounded-lg shadow-lg p-6 mt-2 border border-gray-200 opacity-70">
          <h2 className="text-3xl font-bold text-center">Current Weather</h2>
          <p className="text-center text-xl mt-2">
            <strong>{weatherData.name}</strong>
          </p>
          <div className="flex items-center justify-center mt-4">
            <img
              className="w-24 h-24"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
          <p className="text-center text-2xl font-semibold mt-2 capitalize">
            {weatherData.weather[0].description}
          </p>
          <p className="text-center text-lg mt-2">
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </p>
          <p className="text-center text-lg">
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p className="text-center text-lg">
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
          </p>
        </div>

        {/* Future Weather Section */}
        <h2 className="text-3xl font-bold text-center mt-10">Future Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-5 opacity-70">
          {forecastData.list.slice(0, 6).map((forecast, index) => {
            const forecastIcon = forecast.weather[0].icon;
            const forecastIconUrl = `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`;

            // Format the time to HH:mm
            const formattedTime = new Date(forecast.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Get the day label
            const dayLabel = getDayLabel(forecast.dt * 1000);

            return (
              <div
                key={index}
                className="bg-white bg-opacity-30 text-black rounded-lg shadow-lg p-4 text-center border border-gray-200"
              >
                <p className="text-lg font-bold">{dayLabel}</p>
                <p className="text-sm text-gray-600">{formattedTime}</p>
                <img
                  className="w-16 h-16 mx-auto mt-2"
                  src={forecastIconUrl}
                  alt={forecast.weather[0].description}
                />
                <p className="text-lg font-semibold mt-2 capitalize">
                  {forecast.weather[0].description}
                </p>
                <p className="text-sm mt-1">
                  <strong>Temp:</strong> {forecast.main.temp}°C
                </p>
                <p className="text-sm">
                  <strong>Humidity:</strong> {forecast.main.humidity}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
