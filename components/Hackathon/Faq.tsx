"use client";
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FrequentlyAskedQuestion = () => {

  const Questions = [
    {
      id: 1,
      question: 'How do I register for the event?',
      answer: 'Registration is easy and can be done with just one click on our website.'
    },
    {
      id: 2,
      question: 'What is the quiz code and where can I find it?',
      answer: 'The quiz code will be sent to your email after registration. Please check your inbox, and dont forget to save it.'
    },
    {
      id: 3,
      question: 'Where can I get updates and announcements?',
      answer: 'You can stay updated by joining our Telegram and WhatsApp channels, where we share all the latest news and information.'
    },
    {
      id:4,
      question:'How do I start the quiz?',
      answer:'The quiz will be live on our website on the day of the event. You can start the quiz by entering the quiz code.'

    },
    {
      id:5,
      question:'What are the prizes for the quiz?',
      answer:'We offer exciting prizes for participants who answer the questions correctly. Check out our website or social media for prize details.'
    },
    {
      id:6,
      question:'When and where will the winners be announced?',
      answer:'The winners will be announced on our social media handles and leaderboard once the quiz is completed. Stay tuned for the big reveal!'
    },
    {
      id:7,
      question:'Is there a registration fee for participating in the event?',
      answer:'No, the event is completely free of cost. You just need to register on our website to participate.'
    },
    {
      id:8,
      question:'Can I participate in the event from anywhere?',
      answer:'Yes, the event is open to everyone from all over the world. You just need to register on our website to participate.'
    },
    {
      id:9,
      question:'Do I need to have any prior knowledge to participate in the event?',
      answer:'No, the quiz is designed to be fun and engaging for everyone. You just need to have a basic understanding of the HTML , CSS , JAVASCRIPT.'
    },
    {
      id:10,
      question:'How do I contact the organizers?',
      answer:'You can contact us through our social media handles or email us at CODERSYUG@GMAIL.COM'
    }
  ]

  return (
    <section id='faq' className='mt-10 flex flex-col justify-start items-start w-full'>
      <h1 className='text-4xl font-bold'>Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full mt-10 focus:outline-none">
        {Questions.map((question) => (
          <AccordionItem key={`item-${question.id}`} value={`item-${question.id}`}>
            <AccordionTrigger>
             <h1 className='md:text-xl text-lg  font-bold'>{question.id}. {question.question}</h1> 
              </AccordionTrigger>
            <AccordionContent>
              <p className='md:text-lg text-base font-semibold text-zinc-400'>
              {question.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default FrequentlyAskedQuestion
