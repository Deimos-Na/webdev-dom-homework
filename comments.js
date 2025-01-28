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

export function renderComments(commentsList, commentsData) {
  commentsList.innerHTML = ''
  commentsData.forEach((comment, index) => {
    const commentElement = document.createElement('li')
    commentElement.classList.add('comment')

    commentElement.innerHTML = `
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${comment.text}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${
            comment.isLiked ? '-active-like' : ''
          }" data-index="${index}"></button>
        </div>
      </div>
    `
    commentsList.appendChild(commentElement)
  })
}

export function handleLike(commentsData, index) {
  const comment = commentsData[index]
  comment.isLiked = !comment.isLiked
  comment.isLiked ? comment.likes++ : comment.likes--
}

export function addComment(name, text, commentsData) {
  const date = new Date()
  const formattedDate = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

  commentsData.push({
    name,
    date: formattedDate,
    text,
    likes: 0,
    isLiked: false,
  })
}

export const updateComments = (newComments) => {
  commentsData = newComments
}
