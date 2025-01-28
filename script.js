import {
  commentsData,
  renderComments,
  handleLike,
  addComment,
  updateComments,
} from './comments.js'
import { fetchComments } from './api.js'
import { escapeHTML } from './utils.js'

fetchComments().then((data) => {
  updateComments(data)
  renderComments()
})

const commentsList = document.querySelector('.comments')
const inputName = document.getElementById('inpName')
const inputText = document.getElementById('inpText')
const buttonAdd = document.getElementById('btn')

function attachLikeEventListeners() {
  const likeButtons = document.querySelectorAll('.like-button')
  likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index')
      handleLike(commentsData, index)
      renderComments(
        commentsList,

        commentsData,
      )
      attachLikeEventListeners()
    })
  })
}

function attachCommentClickListeners() {
  const commentElements = document.querySelectorAll('.comment-body')
  commentElements.forEach((commentElement, index) => {
    commentElement.addEventListener('click', () => {
      const comment = commentsData[index]
      inputText.value = `> ${comment.name}: ${comment.text}\n`
      inputText.focus()
    })
  })
}

buttonAdd.addEventListener('click', () => {
  const name = inputName.value.trim()
  const text = inputText.value.trim()

  if (name === '' || text === '') {
    inputName.classList.toggle('error', name === '')
    inputText.classList.toggle('error', text === '')
    return
  }

  const escapedName = escapeHTML(name)
  const escapedText = escapeHTML(text)

  addComment(escapedName, escapedText, commentsData)

  inputName.value = ''
  inputText.value = ''
  inputName.classList.remove('error')
  inputText.classList.remove('error')

  renderComments(commentsList, commentsData)
  attachLikeEventListeners()
  attachCommentClickListeners()
})

renderComments(commentsList, commentsData)
attachLikeEventListeners()
attachCommentClickListeners()
