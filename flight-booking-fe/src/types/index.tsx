export type ApiResponse<T> = {
  data: T
};

export type DropdownWithSearchOption = {
  key: number,
  value: string,
}

export type AirportsType = {
  id: number,
  airport_name: string
}

export type FlightSchedulesType = {
  id: number,
  flight_id: number,
  origin_airport_id: number,
  destination_airport_id: number,
  depature_date: string,
  depature_time: string,
  arrival_date: string,
  arrival_time: string,
  price: number,
  flight_name: string,
  seat_available: boolean
}

export type BookingType = {
  id: number,
  credit_card_exp: string,
  credit_card_no: string,
  credit_card_pin: string,
  email: string,
  phone_no: string
 }

export enum ShowPage {
  SEARCH_PAGE = "search-page",
  BOOK_PAGE = "booking-page",
  THAKYOU_PAGE = "thankyou-page"
}