import React from "react";
import { 
  Card,
  CardBody
} from "reactstrap";

import { FlightSchedulesType } from "../types";
import dayjs from "dayjs";

function FlightScheduleCard(props: {
  schedule: FlightSchedulesType,
  fromAirport: string,
  toAirport: string,
  onClickFlight: (selectedSchedule: FlightSchedulesType) => void
}): JSX.Element {
  const {
    schedule,
    fromAirport,
    toAirport,
    onClickFlight
  } = props;

  const {
    depature_date : depatureDate,
    depature_time : depatureTime,
    arrival_date : arrivalDate,
    arrival_time : arrivalTime,
    flight_name : flightName,
    seat_available : seatAvailable,
    price
  } = schedule;
  const flightTimeMinutes = dayjs(`${arrivalDate} ${arrivalTime}`).diff(dayjs(`${depatureDate} ${depatureTime}`), "minutes");
  const hours = String(Math.floor(flightTimeMinutes / 60)).padStart(2, "0");
  const minutes = String(flightTimeMinutes % 60).padStart(2, "0");

  const onClick = (schedule: FlightSchedulesType): void => {
    if(seatAvailable) {
      onClickFlight(schedule);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center"
      onClick={(): void => onClick(schedule) }>
      <Card className="mt-2 mt-2 w-75">
        <CardBody className={`flight-card ${seatAvailable ? "cursor-pointer" : "diabled-card"}`}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div className="fw-bold text-primary">{ dayjs(`${depatureDate} ${depatureTime}`).format("HH:mm") }</div>
              <div>{ fromAirport}</div>
              <div>{ depatureDate }</div>
            </div>
            <div className="d-flex flex-column">
              <div className="text-center">{ hours }:{minutes}</div>
              <div><i className="fas fa-plane"></i>----------------<i className="fas fa-plane"></i></div>
              <div className="text-center">{ flightName }</div>
            </div>
            <div className="d-flex flex-column">
              <div className="fw-bold text-primary">{ dayjs(`${arrivalDate} ${arrivalTime}`).format("HH:mm") }</div>
              <div>{ toAirport }</div>
              <div> { arrivalDate }</div>
            </div>
            <div className="d-flex flex-column">
              <div>{ price } $ </div>
              {
                !seatAvailable && <div className="text-danger">No Seat Available</div>
              }
              
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default FlightScheduleCard;
  