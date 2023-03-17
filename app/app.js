// Get input values
const businessField = document.getElementById('fbusiness')
const emailField = document.getElementById('femail')
const submitBtn = document.getElementById('submit-button')
const cardCtr = document.getElementById('response-cards')

function isNotImportant (text) {
  return text.includes('NOT IMPORTANT')
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cardCtr.innerHTML = ''
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
      Authorization: "Bearer iAoSGx1YaW0yjG9-jj-xK",
    },
    body: JSON.stringify(fetchBody)
  }

  try {
    fetch("https://www.everyprompt.com/api/v0/calls/llm-workspace/email-evaluator-KJWqI6", fetchObject)
    .then((response) => {
      response.json()
      .then((responseJson) => {
        responseJson.completions.forEach((completion) => {
        if (isNotImportant(completion.text)) {
          cardCtr.innerHTML += `
          <div class="card-not-important">
            <div class="card-header">
              <h4>✔️ Not Important ✔️</h4>
            </div>
            <div class="card-body">
              <p>${completion.text}</p>
            </div>
          </div>
        `
        } else {
          cardCtr.innerHTML += `
            <div class="card-important">
              <div class="card-header">
                <h4>❗ Important ❗</h4>
              </div>
              <div class="card-body">
                <p>${completion.text}</p>
              </div>
            </div>
          `
          }
        })
      })
    })
  } catch (err) {
    console.log(err)
  }
})