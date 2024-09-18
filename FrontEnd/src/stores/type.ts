export interface EmojisData {
  name: string
  image: string
  character: string
}

export interface CatData {
  name: string
  image_link: string
  origin: string
  length: string
  family_friendly: number
  shedding: number
  playfulness: number
  general_health: number
  children_friendly: number
  stranger_friendly: number
  grooming: number
  meowing: number
  intelligence: number
  other_pets_friendly: number
  min_weight: number
  max_weight: number
  min_life_expectancy: number
  max_life_expectancy: number
}

export interface Bank {
  name: string
  code: string
  shortName: string
  logo: string
}

export interface WeatherCondition {
  icon: string
  text: string
}

export interface WeatherDay {
  date: string
  day: {
    condition: WeatherCondition
    maxtemp_c: number
    mintemp_c: number
  }
}

export interface Place {
  location: {
    name: string
    localtime: string
  }
  current: {
    is_day: number
    condition: WeatherCondition
    temp_c: number
    wind_kph: number
    humidity: number
    precip_mm: number
    wind_dir: string
    feelslike_c: number
    uv: number
    last_updated: string
  }
  forecast: {
    forecastday: WeatherDay[]
  }
}

export interface SimplePlace {
  id: string
  name: string
  region: string
  country: string
}

export interface SearchTerm {
  query: string
  timeout: number | null
  results: SimplePlace[] | null
}
