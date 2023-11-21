
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is TDEE?',
      answer: 'Total daily energy expenditure (TDEE) estimates how many calories your body burns daily by accounting for three major contributing factors: your basal metabolic rate (BMR), your activity level and the thermic effect of food metabolism.',
    },
    {
      question: 'What is BMI?',
      answer: 'Body Mass Index (BMI) is a calcualtion based on height and weight. It is an approximate measure of body fat.',
    },
  ];

  return (
    <div>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
