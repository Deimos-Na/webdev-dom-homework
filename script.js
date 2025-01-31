import {
  commentsData,
  renderComments,
  addComment,
  updateComments,
} from './comments.js'
import { fetchComments } from './api.js'
import { escapeHTML } from './utils.js'

document.querySelector('.comments').innerHTML =
  'Пожалуйста, подождите, выполняется загрузка комментариев'
fetchComments().then((data) => {
  updateComments(data)
  renderComments(data)
})

const inputName = document.getElementById('inpName')
const inputText = document.getElementById('inpText')
const buttonAdd = document.getElementById('btn')

let formData = {
  name: '',
  text: '',
}

inputName.addEventListener('input', (event) => {
  formData.name = event.target.value
})

inputText.addEventListener('input', (event) => {
  formData.text = event.target.value
})

buttonAdd.addEventListener('click', () => {
  const name = inputName.value.trim()
  const text = inputText.value.trim()

  if (name === '' || text === '') {
    console.error('Заполните форму')
    inputName.classList.toggle('error', name === '')
    inputText.classList.toggle('error', text === '')

    setTimeout(() => {
      inputName.classList.remove('error')
      inputText.classList.remove('error')
    }, 2000)
    return
  }

  const escapedName = escapeHTML(name)
  const escapedText = escapeHTML(text)

  addComment(escapedName, escapedText, commentsData)
    .then(() => {
      document.querySelector('.form-loading').style.display = 'block'
      document.querySelector('.add-form').style.display = 'none'

      formData.name = ''
      formData.text = ''
      inputName.value = ''
      inputText.value = ''
    })
    .catch((error) => {
      console.error(error)

      alert('Произошла ошибка. Попробуйте позже.')

      inputName.value = formData.name
      inputText.value = formData.text
    })

  renderComments(commentsData)
})
