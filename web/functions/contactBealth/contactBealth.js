exports.handler = async (event, context) => {
  console.log('Handling contact bealth event:', event)

  function generateContactEmail(name, emailAddress, contactNumber, message) {
    return `<div>
    <h2>You've got an enquiry lead from the blog </h2>
    <p>Get in touch with ${name} at ${emailAddress} or on ${contactNumber} pronto hombre..</p>
    <p>Here's their message:</p>
    <p>${message}</p>
    <p>Best Regards,</p>
    <p>The Bealth Blog Robot</p>
  </div>`
  }

  const body = JSON.parse(event.body)
  // Check if they have filled out the honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Honey pot field hit by a bot..' })
    }
  }
  // Validate the data coming in is correct
  const requiredFields = ['name', 'emailAddress']

  for (const field of requiredFields) {
    console.log(`Validating ${field} : ${body[field]} is truthy..`)
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field..`
        })
      }
    }
  }

  // send the email
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)
  const msg = {
    to: 'chrisbellpt@info.com', // Change to your recipient
    from: 'sean.alexander.harris.29@googlemail.com', // Change to your verified sender
    subject: 'bealthy.com Enquiry',
    text: 'Early to bed & early to rise makes a man healthy, bealthy, & wise',
    html: generateContactEmail(
      body['name'],
      body['emailAddress'],
      body['contactNumber'],
      body['message']
    )
  }

  const response = sgMail.send(msg)

  console.log('sendGridResponse:', response)

  if (response.status >= 400 && response.status < 600) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
      rawResponse: response
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failure' }),
      rawResponse: response
    }
  }
}
