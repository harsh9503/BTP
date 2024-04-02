const { contactUsEmail } = require("../mail/templates/contactFormRes")
const { contactUsEmailadmin } = require("../mail/templates/contactFormResAdmin")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    const emailResadmin = await mailSender(
      "virtulearn.noreply@gmail.com",
      "Your Recieved Query",
      contactUsEmailadmin(email, firstname, lastname, message, phoneNo, countrycode)
    )

    //console.log("Email Res ", emailRes)
    //console.log("Email Res Admin", emailResadmin)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}