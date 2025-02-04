import React, { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import gpayLogo from '../Images/googlePay.png';
import paytmLogo from '../Images/paytm.webp';
import phonePeLogo from '../Images/phonePay.png';
import amazonPayLogo from '../Images/amazonPay.png';
import mobikwikLogo from '../Images/MobiKwik.png';
import bhimLogo from '../Images/bhim.png';
import visaDebitCardLogo from '../Images/visa.webp';
import mastercardDebitCardLogo from '../Images/masterCard.png';
import rupayDebitCardLogo from '../Images/Rupay.png';
import visaCreditCardLogo from '../Images/visa.webp';
import mastercardCreditCardLogo from '../Images/masterCard.png';
import amexCreditCardLogo from '../Images/American.jpg';
import "../CSS/Cart.css"; // Import your CSS file

const PaymentOptions = ({paymentCheck,setPaymentCheck}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentCheck(true); 
  };

  return (
    <Accordion defaultActiveKey="0">
      <PaymentMethodAccordion
        category="Mobile Wallets"
        logos={[paytmLogo, gpayLogo, phonePeLogo, amazonPayLogo, mobikwikLogo]}
        onSelect={handlePaymentMethodChange}
        selected={selectedPaymentMethod}
      />
      <PaymentMethodAccordion
        category="UPI"
        logos={[bhimLogo, gpayLogo, phonePeLogo, paytmLogo]}
        onSelect={handlePaymentMethodChange}
        selected={selectedPaymentMethod}
      />
      <PaymentMethodAccordion
        category="Debit Cards"
        logos={[visaDebitCardLogo, mastercardDebitCardLogo, rupayDebitCardLogo]}
        onSelect={handlePaymentMethodChange}
        selected={selectedPaymentMethod}
      />
      <PaymentMethodAccordion
        category="Credit Cards"
        logos={[visaCreditCardLogo, mastercardCreditCardLogo, amexCreditCardLogo]}
        onSelect={handlePaymentMethodChange}
        selected={selectedPaymentMethod}
      />
      {/* Add other PaymentMethodAccordion components for different categories */}
    </Accordion>
  );
};

function PaymentMethodAccordion({ category, logos, onSelect, selected }) {
  return (
    <Accordion.Item eventKey={category}>
      <Accordion.Header>{category}</Accordion.Header>
      <Accordion.Body>
        <Form>
          {logos.map((logo, index) => (
            <div className="payment-option" key={index}>
              <input
                type="radio"
                id={`${category}-${index}`}
                name={category}
                value={`${category}-${index}`}
                checked={selected === `${category}-${index}`}
                onChange={() => onSelect(`${category}-${index}`)}
              />
              <label htmlFor={`${category}-${index}`}>
                <img src={logo} alt={`${category}-${index}`} />
                {category === "Mobile Wallets" ? 
                  ["Paytm", "Google Pay", "PhonePe", "Amazon Pay", "Mobikwik"][index] :
                  category === "UPI" ? 
                    ["BHIM", "Google Pay", "PhonePe", "Paytm"][index] :
                    category === "Debit Cards" ?
                      ["Visa Debit Card", "Mastercard Debit Card", "RuPay Debit Card"][index] :
                      ["Visa Credit Card", "Mastercard Credit Card", "American Express Credit Card"][index]} {/* Label format */}
              </label>
            </div>
          ))}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default PaymentOptions;
