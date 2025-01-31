import { fetchComments, postComments } from './api.js'
import {
  attachCommentClickListeners,
  attachLikeEventListeners,
} from './listeners.js'
import { delay } from './utils.js'

export let commentsData = [
  // {
  //   name: 'Глеб Фокин',
  //   date: '12.02.22 12:18',
  //   text: 'Это будет первый комментарий на этой странице',
  //   likes: 3,
  //   isLiked: false,
  // },
  // {
  //   name: 'Варвара Н.',
  //   date: '13.02.22 19:22',
  //   text: 'Мне нравится как оформлена эта страница! ❤',
  //   likes: 75,
  //   isLiked: true,
  // },
]

export function renderComments(commentsData) {
  const commentsList = document.querySelector('.comments')
  commentsList.innerHTML = ''

  commentsData.forEach((comment, index) => {
    const commentElement = document.createElement('li')
    commentElement.classList.add('comment')

    commentElement.innerHTML = `
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${
            comment.isLiked ? '-active-like' : ''
          } ${comment.isLikeLoading ? 'like-loading' : ''}" 
          data-index="${index}"></button>
        </div>
      </div>
    `

    commentsList.appendChild(commentElement)
  })

  attachLikeEventListeners()
  attachCommentClickListeners()
}

export async function handleLike(commentsData, index) {
  const comment = commentsData[index]

  if (comment.isLikeLoading) return

  comment.isLikeLoading = true
  renderComments(commentsData)

  await delay(1000)

  comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1
  comment.isLiked = !comment.isLiked
  comment.isLikeLoading = false

  renderComments(commentsData)
}

export function addComment(name, text) {
  postComments(name, text)
    .then(() => {
      return fetchComments()
    })
    .then((data) => {
      document.querySelector('.form-loading').style.display = 'none'
      document.querySelector('.add-form').style.display = 'flex'
      updateComments(data)
      renderComments(data)
    })
    .catch((error) => {
      document.querySelector('.form-loading').style.display = 'none'
      document.querySelector('.add-form').style.display = 'flex'

      if (error.message === 'Failed to fetch') {
        alert('Нет интернета, попробуйте снова')
      }
      if (error.message === 'Ошибка сервера') {
        alert('Ошибка сервера')
      }

      if (error.message === 'Неверный запрос') {
        alert('Имя и комментарий должны быть не короче 3-х символов')
      }
    })
}

export const updateComments = (newComments) => {
  commentsData = newComments
}
