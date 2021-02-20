import { useState } from 'react'

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValues(e) {
    // check if its a number and convert to string
    let { value } = e.target

    if (e.target.type === 'number') {
      value = parseInt(e.target.value)
    }

    const isAService = e.target.name.slice(0, 7) === 'service'

    if (isAService) {
      var currentServiceSelected = values['services'][e.target.name.slice(8)]
      var chosenServices = {
        ...values.services,
        [e.target.name.slice(8)]: !currentServiceSelected
      }

      setValues({
        // copy the existing values into it
        ...values,
        // update the new value that changed
        ['services']: chosenServices
      })
    } else {
      setValues({
        // copy the existing values into it
        ...values,
        // update the new value that changed
        [e.target.name]: value
      })
    }
  }

  return { values, updateValues }
}
