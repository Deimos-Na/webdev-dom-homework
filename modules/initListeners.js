import { postComment } from './api'
import { comments, updateComments } from './comments'
import { sanitizeHtml } from './sanitizeHtml'

export const initLikeListeners = (renderComments) => {
  const likeButtons = document.querySelectorAll('.like-button')

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation()

      const index = likeButton.dataset.index
      const comment = comments[index]

      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1

      comment.isLiked = !comment.isLiked

      renderComments()
    })
  }
}

export const initReplyListeners = () => {
  const text = document.getElementById('text-input')
  const commentsElements = document.querySelectorAll('.comment')

  for (const commentElement of commentsElements) {
    commentElement.addEventListener('click', () => {
      const currentComment = comments[commentElement.dataset.index]
      text.value = `${currentComment.name}: ${currentComment.text}`
    })
  }
}

export const initAddCommentListeners = (renderComments) => {
  const name = document.getElementById('name-input')
  const text = document.getElementById('text-input')

  const addButton = document.querySelector('.add-form-button')

  addButton.addEventListener('click', () => {
    if (!name.value || !text.value) {
      alert('Заполните форму')
      return
    }

    document.querySelector('.form-loading').style.display = 'block'
    document.querySelector('.add-form').style.display = 'none'

    postComment(sanitizeHtml(name.value), sanitizeHtml(text.value))
      .then((data) => {
        document.querySelector('.form-loading').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'

        updateComments(data)
        renderComments()
        name.value = ''
        text.value = ''
      })
      .catch((error) => {
        document.querySelector('.form-loading').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'

        if (error.message === 'Ошибка сервера') {
          alert('Ошибка сервера')
        }

        if (error.message === 'Неверный запрос') {
          alert('Имя и комментарий, должны быть не короче 3х символов')
        }

        if (error.message === 'Failed to fetch') {
          alert('Нет интернета, попробуйте снова')
        }

        name.classList.add('-error')
        text.classList.add('-error')

        setTimeout(() => {
          name.classList.remove('-error')
          text.classList.remove('-error')
        }, 2000)
      })
  })
}
