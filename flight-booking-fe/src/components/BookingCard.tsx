import React, { 
  useRef, 
  useState 
} from "react";
import { 
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { booking } from "../apis/apis";
import dayjs from "dayjs";
import { BookingType } from "../types";

function BookingCard(prop: {
  flightScheduleId: number | null,
  onSubmit: (bookedData: BookingType) => void
  onClickBack: () => void
}): JSX.Element {
  const { 
    flightScheduleId,
    onSubmit,
    onClickBack
  } = prop;
  const [invalidFirstName, setInvalidFirstName ] = useState<boolean>(false);
  const [invalidLastName, setInvalidLastName ] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone ] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail ] = useState<boolean>(false);
  const [invalidPassportNo, setInvalidPassportNo ] = useState<boolean>(false);
  const [invalidPassportIssueDate, setInvalidPassportIssueDate ] = useState<boolean>(false);
  const [invalidPassportExpiryDate, setInvalidPassportExpiryDate ] = useState<boolean>(false);
  const [invalidCreditCardNo, setInvalidCreditCardNo ] = useState<boolean>(false);
  const [invalidCreditCardPin, setInvalidCreditCardPin ] = useState<boolean>(false);
  const [invalidCreditCardExpiry, setInvalidCreditCardExpiry ] = useState<boolean>(false);

  const firstNameInputRef= useRef<HTMLInputElement>(null);
  const middleNameInputRef= useRef<HTMLInputElement>(null);
  const lastNameInputRef= useRef<HTMLInputElement>(null);
  const phoneNoInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passportNoInputRef = useRef<HTMLInputElement>(null);
  const passportIssueDateInputRef = useRef<HTMLInputElement>(null);
  const passportExpirtyDateInputRef = useRef<HTMLInputElement>(null);
  const creditCardNoInputRef = useRef<HTMLInputElement>(null);
  const creditCardPinInputRef = useRef<HTMLInputElement>(null);
  const creditCardExpiryInputRef = useRef<HTMLInputElement>(null);

  const onClickBook = async(): Promise<void> => {
    const validFirstName = !!firstNameInputRef?.current?.value;
    const validLastName = !!lastNameInputRef?.current?.value;
    const validPhoneNo = !!phoneNoInputRef?.current?.value;
    const validEmail = !!emailInputRef?.current?.value;
    const validPassportNo = !!passportNoInputRef?.current?.value;
    const validIssueDate = !!passportIssueDateInputRef?.current?.value;
    const validExpiryDate = !!passportExpirtyDateInputRef?.current?.value;
    const validCreditCardNo = !!creditCardNoInputRef?.current?.value;
    const validCreditCardPin = !!creditCardPinInputRef?.current?.value;
    const validCreditCardExpiry = !!creditCardExpiryInputRef?.current?.value;

    setInvalidFirstName(!validFirstName);
    setInvalidLastName(!validLastName);
    setInvalidPhone(!validPhoneNo);
    setInvalidEmail(!validEmail);
    setInvalidPassportNo(!validPassportNo);
    setInvalidPassportIssueDate(!validIssueDate);
    setInvalidPassportExpiryDate(!validExpiryDate);
    setInvalidCreditCardNo(!validCreditCardNo);
    setInvalidCreditCardPin(!validCreditCardPin);
    setInvalidCreditCardExpiry(!validCreditCardExpiry);

    if(validFirstName && validLastName && validPhoneNo && validEmail && validPassportNo && validIssueDate && validExpiryDate && validCreditCardNo && validCreditCardPin && validCreditCardExpiry && !!flightScheduleId) {
      const res = await booking({
        firstName : firstNameInputRef.current.value,
        middleName : middleNameInputRef.current?.value || "",
        lastName : lastNameInputRef.current.value,
        phoneNo : phoneNoInputRef.current.value,
        email : emailInputRef?.current?.value,
        passportNo : passportNoInputRef?.current?.value,
        passportIssueDate : dayjs(passportIssueDateInputRef?.current?.value).format("YYYY-MM-DD"),
        passportExpirtDate : dayjs(passportExpirtyDateInputRef?.current?.value).format("YYYY-MM-DD"),
        creditCardNo : creditCardNoInputRef?.current?.value,
        creditCardPin : creditCardPinInputRef?.current?.value,
        careditCardExpiry : dayjs(creditCardExpiryInputRef?.current?.value).format("YYYY-MM-DD"),
        flightScheduleId
      });

      onSubmit(res);
    }

  };

  return (
    <div className="d-flex justify-content-center mt-2">
      <Card className="w-75">
        <CardBody className="searchCard">
          <h3>Please Fill Information For Booking</h3>
          <Form>
            <Row>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    First Name
                  </Label>
                  <Input
                    type="text"
                    innerRef={firstNameInputRef}
                    invalid={invalidFirstName}/>
                  { invalidFirstName && <span className="text-danger">First name is invalid</span> }
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Middle Name
                  </Label>
                  <Input
                    type="text"
                    innerRef={middleNameInputRef}/>
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Last Name
                  </Label>
                  <div>
                    <Input
                      invalid={invalidLastName}
                      innerRef={lastNameInputRef}/>
                    { invalidLastName && <span className="text-danger">Last name is invalid</span> }
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={ 12 } md={6}>
                <FormGroup>
                  <Label>
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    innerRef={phoneNoInputRef}
                    invalid={invalidPhone}/>
                  { invalidPhone && <span className="text-danger">Phone no is invalid</span> }
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={6}>
                <FormGroup>
                  <Label>
                    Email
                  </Label>
                  <Input
                    type="email"
                    innerRef={emailInputRef}
                    invalid={invalidEmail}/>
                  { invalidEmail && <span className="text-danger">Email is invalid</span> }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Passport Number
                  </Label>
                  <Input
                    type="text"
                    innerRef={passportNoInputRef}
                    invalid={invalidPassportNo}/>
                  { invalidPassportNo && <span className="text-danger">Passport no is invalid</span> }
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Passport Issue Date
                  </Label>
                  <Input
                    type="date"
                    invalid={invalidPassportExpiryDate}
                    innerRef={passportIssueDateInputRef}/>
                  { invalidPassportIssueDate && <span className="text-danger">Passport issue date is invalid</span> }
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Passport Expiry Date
                  </Label>
                  <Input
                    type="date"
                    innerRef={passportExpirtyDateInputRef}
                    invalid={invalidPassportExpiryDate}/>
                  { invalidPassportExpiryDate && <span className="text-danger">Passport expiry date is invalid</span> }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Credit Card NO
                  </Label>
                  <Input
                    type="text"
                    invalid={invalidCreditCardNo}
                    innerRef={creditCardNoInputRef}/>
                  { invalidCreditCardNo && <span className="text-danger">Credit card no is invalid</span> }
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Credit Card Pin
                  </Label>
                  <Input
                    type="number"
                    invalid={invalidCreditCardPin}
                    innerRef={creditCardPinInputRef}/>
                  { invalidCreditCardPin && <span className="text-danger">Credit card pin is invalid</span> }
                </FormGroup>
              </Col>
              <Col sm={ 12 } md={4}>
                <FormGroup>
                  <Label>
                    Credit Card Expiry
                  </Label>
                  <Input
                    type="date"
                    invalid={invalidCreditCardExpiry}
                    innerRef={creditCardExpiryInputRef}/>
                  { invalidCreditCardExpiry && <span className="text-danger">Credit card expiry is invalid</span> }
                </FormGroup>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col sm={ 12 } md={3}>
                <Button 
                  color="success"
                  className="mt-2 w-100"
                  onClick={ onClickBack }>
                  Back
                </Button>
              </Col>
              <Col sm={ 12 } md={3}>
                <Button 
                  color="success"
                  className="mt-2 w-100"
                  onClick={ onClickBook }>
                  Book
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default BookingCard;
  