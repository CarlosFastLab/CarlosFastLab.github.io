// Get input values
const businessField = document.getElementById('fbusiness')
const emailField = document.getElementById('femail')
const submitBtn = document.getElementById('submit-button')
const cardCtr = document.getElementById('response-cards')
const sideBarTriggerBtn = document.getElementById('sidebar-trigger-button')
const sideBarCloseBtn = document.getElementById('sidebar-close-button')

function isNotImportant(text) {
  return text.includes('NOT IMPORTANT')
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "150px";
  document.getElementById("mySidebar").style.marginLeft = 0;
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

function renderButtonLoader() {
  console.log('render button loader called')
  submitBtn.disabled = true
  submitBtn.classList.add('disabled-button')
  submitBtn.innerHTML = `
    <span class="loader"></span>
  `
}

function renderButtonContent() {
  submitBtn.disabled = false
  submitBtn.classList.remove('disabled-button')
  submitBtn.innerHTML = `
    Is it important?
  `
}

function showSnackbar() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar")

  // Add the "show" class to DIV
  x.className = "show"

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000)
}

sideBarTriggerBtn.addEventListener('click', () => {
  openNav()
})

sideBarCloseBtn.addEventListener('click', () => {
  closeNav()
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (businessField.value === '' || businessField.value === ' ' || emailField.value === '' || emailField.value === ' ') {
    showSnackbar()
    return
  }

  renderButtonLoader()

  cardCtr.innerHTML = ''
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
        renderButtonContent()
      })
  } catch (err) {
    console.log(err)










  }
})