import axios from "axios";
import { 
  AirportsType,
  ApiResponse,
  BookingType,
  FlightSchedulesType
} from "../types/index";
import { encrypt } from "../utils/encryption";

const API_DOMAIN = "http://localhost:3030";

const AIRPORTS_API = `${ API_DOMAIN }/api/airports`;
const FLIGHT_SCHEDULES_API = `${ API_DOMAIN }/api/flight-schedules`;
const FLIGHT_BOOKING_API = `${ API_DOMAIN }/api/booking/new`;

export const getAllAirports = async (): Promise<AirportsType[]> => {
  try {
    const airports = await axios.get(AIRPORTS_API) as ApiResponse<AirportsType[]>;
    return airports.data;
    
  } catch(error) {
    return [];
  }
};

export const getFlightSchedules = async (
  orignAirportId?: number,
  destinationAirportId?: number,
  date?: string
): Promise<FlightSchedulesType[]> => {
  try {
    const params = {
      "origin_airport_id" : orignAirportId,
      "destination_airport_id" : destinationAirportId,
      "flight_date" : date
    };
    const schedules = await axios.get(FLIGHT_SCHEDULES_API, { params }) as ApiResponse<FlightSchedulesType[]>;
    return schedules.data;
    
  } catch(error) {
    return [];
  }
};

export const booking = async ( data: {
  firstName: string,
  middleName: string,
  lastName: string,
  phoneNo: string,
  email: string,
  passportNo: string,
  passportIssueDate: string,
  passportExpirtDate: string,
  creditCardNo: string,
  creditCardPin: string,
  careditCardExpiry: string,
  flightScheduleId: number
}): Promise<BookingType> => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phoneNo,
      email,
      passportNo,
      passportIssueDate,
      passportExpirtDate,
      creditCardNo,
      creditCardPin,
      careditCardExpiry,
      flightScheduleId
    } = data;

    const body = {
      "flight_schedule_id" : flightScheduleId,
      "first_name" : firstName,
      "middle_name" : middleName,
      "last_name" : lastName,
      "phone_no" : encrypt(phoneNo),
      "email" : encrypt(email),
      "passport_no" : encrypt(passportNo),
      "passport_issue_date" : passportIssueDate,
      "passport_expiry_date" : passportExpirtDate,
      "credit_card_no" : encrypt(creditCardNo),
      "credit_card_pin" : encrypt(creditCardPin),
      "credit_card_exp" : encrypt(careditCardExpiry)
    };
    const booking = await axios.post(FLIGHT_BOOKING_API, body) as ApiResponse<BookingType>;
    return booking.data;
    
  } catch(error) {
    return {} as BookingType;
  }
};