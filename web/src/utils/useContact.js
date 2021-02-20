export default async function useContact(event, values) {
  event.preventDefault()

  const selectedServices = ``
  for (const [key, value] of Object.entries(values.services)) {
    services = value ? `${services} & ${key}` : services
  }

  // gather all the data
  const formValuesDto = {
    name: values.name,
    emailAddress: values.email,
    message: values.message,
    contactNumber: values.contactNumber,
    services: selectedServices,
    mapleSyrup: values.mapleSyrup
  }

  // 4. Send this data to the serverless function when they check out
  const res = await fetch(`/.netlify/functions/contactBealth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formValuesDto)
  })

  // check if everything worked
  if (res.status >= 400 && res.status < 600) {
    console.log("It didn't work..")
  } else {
    console.log('It worked..')
  }
}
