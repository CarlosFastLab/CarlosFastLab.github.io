// Get input values
const businessField = document.getElementById('fbusiness')
const emailField = document.getElementById('femail')
const submitBtn = document.getElementById('submit-button')

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('submit button clicked!', businessField.value)
  console.log('Business field value', businessField.value)
  console.log('Email field value', emailField.value)
  const { data } = await axios.get('https://promptable.ai/api/prompt/clf98beid12kpi7ehg8aiwjkb/deployment/active')
  console.log(data)

  const prompt = data.inputs?.reduce((acc, input) => {
    // Replace input.value with your value!
    return acc.replaceAll(`{{${input.name}}}, ${emailField.value}`)
  }, data.text)
  console.log(prompt)

  const res = await axios.get('https://openai.com/v1/completions', {
    data: {
      // your prompt
      prompt,

      // your model configs from promptable
      config: {
        ...data.config,
        // add any other configs here
      }
    }
  })

  // Your completion!
  console.log(res.data.choices[0].text)
})