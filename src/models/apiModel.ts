export interface Flight {
  airline: string,
  arrival_airport: string
  created_at: Date,
  departure_airport: string,
  departure_date: Date,
  distance: number,
  flight_number: string,
  id: number,
  updated_at: Date,
  user_id: number,
}

export interface FlightResponse {
  flight: Flight,
}

export interface User {
  created_at: Date,
  email: string,
  id: number,
  name: string,
  updated_at: Date,
}

export interface UserResponse {
  token: string,
  user: User,
}
