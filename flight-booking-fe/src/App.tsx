import {
  Button,
  Card, 
  CardBody, 
  Col,
  Form, 
  FormGroup,
  Input,
  InputGroup,
  Label, 
  Row 
} from "reactstrap";
import "./App.css";
import React,
{ 
  createElement,
  forwardRef,
  LegacyRef,
  ReactElement, 
  useEffect, 
  useState 
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  getAllAirports, 
  getFlightSchedules 
} from "./apis/apis";
import { 
  AirportsType, 
  BookingType, 
  DropdownWithSearchOption, 
  FlightSchedulesType,
  ShowPage
} from "./types/index";

import SearchWithDropdown from "./components/SearchWithDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import FlightScheduleCard from "./components/FlightSchedultCard";
import BookingCard from "./components/BookingCard";
import QRCode from "react-qr-code";

// eslint-disable-next-line react/display-name
const CustomDateInput = forwardRef((
  { 
    value, 
    onClick 
  }: { value: string, onClick: () => void }, 
  ref: LegacyRef<Input>
) => (
  <InputGroup>
    <Input
      readOnly
      type="text"
      onClick={ onClick }
      value={ value }
      ref={ ref } 
      placeholder="Select Date" />
  </InputGroup>
));

function App() : ReactElement {

  const [ airportList, setAirportList ] = useState<DropdownWithSearchOption[]>([]);
  const [ selectedFrom, setSelectedFrom] = useState<DropdownWithSearchOption>();
  const [ selectedTo, setSelectedTo] = useState<DropdownWithSearchOption>();
  const [ selectedDate, setSelectedDate ] = useState<Date | null>();
  const [ schedules, setSchedules ] = useState<FlightSchedulesType[] | null>(null);
  const [ showPage, setShowPage ] = useState<ShowPage>(ShowPage.SEARCH_PAGE);
  const [ selectedScheduleId, setSelectedScheduleId ] = useState<number | null>(null);
  const [ bookingSuccessData, setBookingSuccessData ] = useState<BookingType | null>(null);

  const loadAirports = async(): Promise<void> => {
    const airports = await getAllAirports();
    const options: DropdownWithSearchOption[] = [];

    airports.map((airport: AirportsType) => {
      options.push({
        key : airport.id,
        value : airport.airport_name
      });
    });

    setAirportList(options);
  };
  

  const selectFrom = (selectedAirport: DropdownWithSearchOption): void => {
    setSelectedFrom(selectedAirport);
  };

  const selectTo = (selectedAirport: DropdownWithSearchOption): void => {
    setSelectedTo(selectedAirport);
  };

  const onChangeDate = (date: Date | null): void => {
    if(date) {
      setSelectedDate(dayjs(date).toDate());
    } else {
      setSelectedDate(null);
    }
  };

  const onSearch = async(): Promise<void> => {
    const flightSchedules = await getFlightSchedules(selectedFrom?.key, selectedTo?.key, dayjs(selectedDate).format("YYYY-MM-DD"));
    setSchedules(flightSchedules);
  };

  const onClickFlight = (selectedSchedule: FlightSchedulesType): void => {
    setSelectedScheduleId(selectedSchedule.id);
    setShowPage(ShowPage.BOOK_PAGE);
  };

  const onSubmit = (data: BookingType) : void => {
    setShowPage(ShowPage.THAKYOU_PAGE);
    setSelectedScheduleId(null);
    setBookingSuccessData(data);
  };

  const onClickBack = () : void => {
    setShowPage(ShowPage.SEARCH_PAGE);
    setSelectedScheduleId(null);
  };

  useEffect(() => {
    loadAirports();
  }, []);

  return (
    <>
      {
        showPage === ShowPage.SEARCH_PAGE && <>
          <div className="d-flex justify-content-center mt-2">
            <Card className="w-75">
              <CardBody className="searchCard">
                <Form>
                  <Row>
                    <Col sm={ 12 } md={3}>
                      <FormGroup>
                        <Label>
                          From
                        </Label>
                        <SearchWithDropdown 
                          options={ airportList }
                          defaultName="From"
                          onClick={ selectFrom }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={ 12 } md={3}>
                      <FormGroup>
                        <Label>
                          To
                        </Label>
                        <SearchWithDropdown 
                          options={ airportList }
                          defaultName="To"
                          onClick={ selectTo }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={ 12 } md={3}>
                      <FormGroup>
                        <Label>
                          Depature Date
                        </Label>
                        <div>
                          <DatePicker
                            onChange={ onChangeDate }
                            selected={ selectedDate }
                            dateFormat={ "YYYY-MM-dd" }
                            minDate={ new Date() }
                            customInput={ createElement(CustomDateInput) }/>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={ 12 } md={1}>
                      <FormGroup>
                        <Label>
                        </Label>
                        <Button 
                          color="success"
                          className="mt-2"
                          onClick={ onSearch }>
                          Search
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </div>
          {
            !schedules ? null :
              schedules.length > 0 ? 
                schedules.map((schedule: FlightSchedulesType) => {
                  const fromAirport = airportList.find((airport: DropdownWithSearchOption) => airport.key === schedule.origin_airport_id);
                  const toAirport = airportList.find((airport: DropdownWithSearchOption) => airport.key === schedule.destination_airport_id);
                  return (
                    <FlightScheduleCard 
                      key={schedule.id}
                      schedule={schedule}
                      fromAirport={ fromAirport?.value || ""}
                      toAirport={ toAirport?.value || "" } 
                      onClickFlight= { onClickFlight }/>
                  );
                })
                : <div className="d-flex justify-content-center ">
                  <Card className="mt-2 mt-2 w-75">
                    <CardBody className="text-center">
                      No Flight Found
                    </CardBody>
                  </Card>
                </div>
          }
        </>
      }

      {
        showPage === ShowPage.BOOK_PAGE && <>
          <BookingCard 
            onClickBack= {onClickBack}
            onSubmit={onSubmit}
            flightScheduleId={ selectedScheduleId }/>
        </>
      }

      {
        showPage === ShowPage.THAKYOU_PAGE && <div className="d-flex justify-content-center mt-2">
          <Card className="w-75">
            <CardBody className="thank-you-card">
              <div className="d-flex flex-column text-center">
                <div><h3> Your flight is successfully booked.</h3></div>
                <div className="pt-3"><h3> Your Booking ID : { bookingSuccessData?.id || "-"}</h3></div>
                <div className="pt-2"><QRCode value={ bookingSuccessData?.id + "" } /> </div>
              </div>
            </CardBody>
          </Card>
        </div>
      }

    </>
  );
}

export default App;
