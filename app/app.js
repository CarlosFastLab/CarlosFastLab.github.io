// Get input values
const businessField = document.getElementById('fbusiness')
const emailField = document.getElementById('femail')
const submitBtn = document.getElementById('submit-button')

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('submit button clicked!', businessField.value)
  console.log('Business field value', businessField.value)
  console.log('Email field value', emailField.value)

  const fetchBody = {
    variables: {
      input: emailField.value,
      companyType: businessField.value
    },
    user: "carlosaugustofast@gmail.com"
  }

  const fetchObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer iAoSGx1YaW0yjG9-jj-xK"
    },
    body: JSON.stringify(fetchBody)
  }

  try {
    const response = await fetch(
      "https://www.everyprompt.com/api/v0/calls/llm-workspace/email-evaluator-KJWqI6",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer iAoSGx1YaW0yjG9-jj-xK",
        },
        body: JSON.stringify({
          "variables": {
            "input": "Example",
            "companyType": "Example"
          },
          "user": "carlosaugustofast@gmail.com"
        }),
      }
    )
  } catch (err) {
    console.log(err)
  }
  console.log('--- api response was ---', response)
})