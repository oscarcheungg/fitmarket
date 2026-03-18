import { NextResponse } from "next/server";

// Major US cities for fitness activity correlation
const CITIES = [
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Los Angeles", lat: 34.05, lon: -118.24 },
  { name: "Chicago", lat: 41.88, lon: -87.63 },
  { name: "Miami", lat: 25.76, lon: -80.19 },
  { name: "Denver", lat: 39.74, lon: -104.98 },
];

interface WeatherData {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    relative_humidity_2m?: number;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    weather_code?: number[];
  };
}

function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain Showers";
  if (code <= 86) return "Snow Showers";
  return "Thunderstorm";
}

function estimateGymActivity(temp: number, weatherCode: number): number {
  // Cold or bad weather = more indoor gym activity
  let score = 50;
  if (temp < 5) score += 30;
  else if (temp < 10) score += 20;
  else if (temp < 15) score += 10;
  else if (temp > 25) score -= 5;
  else if (temp > 30) score -= 15;

  if (weatherCode > 50) score += 15; // precipitation boosts indoor
  if (weatherCode > 70) score += 10; // snow even more

  return Math.min(100, Math.max(10, score));
}

function estimateOutdoorActivity(temp: number, weatherCode: number): number {
  let score = 50;
  if (temp >= 15 && temp <= 25) score += 25;
  else if (temp >= 10 && temp <= 28) score += 15;
  else if (temp < 5) score -= 25;
  else if (temp > 32) score -= 20;

  if (weatherCode > 50) score -= 20;
  if (weatherCode > 70) score -= 15;

  return Math.min(100, Math.max(10, score));
}

export async function GET() {
  try {
    const results = await Promise.all(
      CITIES.map(async (city) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`;

        const response = await fetch(url, { next: { revalidate: 600 } });
        if (!response.ok) throw new Error(`Weather API error for ${city.name}`);

        const data: WeatherData = await response.json();
        const current = data.current;
        const daily = data.daily;

        const temp = current?.temperature_2m ?? 20;
        const code = current?.weather_code ?? 0;

        return {
          city: city.name,
          current: {
            temperature: temp,
            weatherCode: code,
            weatherLabel: getWeatherLabel(code),
            windSpeed: current?.wind_speed_10m ?? 0,
            humidity: current?.relative_humidity_2m ?? 50,
          },
          gymActivityIndex: estimateGymActivity(temp, code),
          outdoorActivityIndex: estimateOutdoorActivity(temp, code),
          forecast: (daily?.time || []).map((date: string, i: number) => ({
            date,
            tempMax: daily?.temperature_2m_max?.[i] ?? 20,
            tempMin: daily?.temperature_2m_min?.[i] ?? 10,
            weatherCode: daily?.weather_code?.[i] ?? 0,
            weatherLabel: getWeatherLabel(daily?.weather_code?.[i] ?? 0),
            gymActivity: estimateGymActivity(
              ((daily?.temperature_2m_max?.[i] ?? 20) + (daily?.temperature_2m_min?.[i] ?? 10)) / 2,
              daily?.weather_code?.[i] ?? 0
            ),
            outdoorActivity: estimateOutdoorActivity(
              ((daily?.temperature_2m_max?.[i] ?? 20) + (daily?.temperature_2m_min?.[i] ?? 10)) / 2,
              daily?.weather_code?.[i] ?? 0
            ),
          })),
        };
      })
    );

    return NextResponse.json({
      cities: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
