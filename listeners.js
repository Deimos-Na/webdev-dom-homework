import { commentsData, handleLike, renderComments } from "./comments.js"

export function attachLikeEventListeners() {
  const likeButtons = document.querySelectorAll(".like-button")
  likeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      handleLike(commentsData, index)
      renderComments(commentsData)
    })
  })
}

export function attachCommentClickListeners() {
  const commentElements = document.querySelectorAll(".comment-body")
  const inputText = document.getElementById("inpText")
  commentElements.forEach((commentElement, index) => {
    commentElement.addEventListener("click", () => {
      const comment = commentsData[index]
      inputText.value = `> ${comment.name}: ${comment.text}\n`
      inputText.focus()
    })
  })
}
