import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import FormField from './FormField';
import SubmitButton from './SubmitButton';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-aos="fade-up"
        >
          <div className="space-y-2">
            <div
              className="inline-block rounded-lg bg-muted px-3 py-2 text-sm"
              data-aos="fade-up"
            >
              Contact Us
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-aos="fade-up"
            >
              Get in Touch
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground text-base md:text-lg lg:text-xl xl:text-2xl"
              data-aos="fade-up"
            >
              Have a question or need emergency assistance? Fill out the form
              below and one of our team members will be in touch shortly.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md mt-8">
          <form className="space-y-4">
            <FormField id="name" label="Name" required />
            <FormField id="email" label="Email" type="email" required />
            <FormField id="message" label="Message" textarea required />
            <SubmitButton text="Submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
