import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import ContactUsForm from "./ContactUsForm"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@virtulearn.edu.in",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "B-304, Street No. 3, Randhawa Colony, Mukerian, Hoshiarpur, Punjab, India, 144211",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]

  const ContactDetails = () => {
    return (
      <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
        {contactDetails.map((ele, i) => {
          let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
          return (
            <div
              className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
              key={i}
            >
              <div className="flex flex-row items-center gap-3">
                <Icon size={25} />
                <h1 className="text-lg font-semibold text-richblack-5">
                  {ele?.heading}
                </h1>
              </div>
              <p className="font-medium">{ele?.description}</p>
              <p className="font-semibold">{ele?.details}</p>
            </div>
          )
        })}
      </div>
    )
  }
  

  const ContactForm = () => {
    return (
      <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
        <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
          Got a Idea? We&apos;ve got the skills. Let&apos;s team up
        </h1>
        <p className="">
          Tell us more about yourself and what you&apos;re got in mind.
        </p>
  
        <div className="mt-7">
          <ContactUsForm />
        </div>
      </div>
    );
  };


const Contact = () => {
    return (
      <div className="mb-10">
        <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
          {/* Contact Details */}
          <div className="lg:w-[40%]">
            <ContactDetails />
          </div>
  
          {/* Contact Form */}
          <div className="lg:w-[60%]">
            <ContactForm />
          </div>
        </div>
      </div>
    )
  }
  
  export default Contact