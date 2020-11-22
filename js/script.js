// declaring the HTML elements
const seekZipCode = document.querySelector('#btn-zipcode') // button

// inputs
const zipcodeInput = document.querySelector('#zipcode')
const streetInput = document.querySelector('#street')
const neighborhoohInput = document.querySelector('#neighborhood')
const cityInput = document.querySelector('#city')
const fuInput = document.querySelector('#fu') // fu - federative unit ex: SP, RJ

// other elements
const addressWrapper = document.querySelector('.address-wrapper')
const addressNotFound = document.querySelector('.address-not-found')

async function getViaCep(zipcode) {
  try {
    const viaCepUrl = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
    const data = await viaCepUrl.json()

    const { logradouro, bairro, localidade, uf, erro = false } = data

    if (!erro) {
      streetInput.value = logradouro
      neighborhoohInput.value = bairro
      cityInput.value = localidade
      fuInput.value = uf

      addressWrapper.style.display = 'block'
      addressNotFound.style.display = 'none'

    } else {
      addressWrapper.style.display = 'none'
      addressNotFound.style.display = 'block'
    }

    console.log('cep data:', data)

  } catch (error) {
    console.log('error:', error)
    addressWrapper.style.display = 'none'
    addressNotFound.style.display = 'block'
  }
}

const handleZipCodeClick = () => {
  // console.log('input', zipcodeInput.value)
  getViaCep(zipcodeInput.value)

  zipcodeInput.focus() // HTMLElement.focus() para clicar no botão e focar no input depois
}

seekZipCode.addEventListener('click', handleZipCodeClick)


// off topic

// way of get an CSS property of an object
// console.log('addressWrapper', getComputedStyle(addressWrapper).marginTop)
