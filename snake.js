const snake = document.getElementById("snake")
const snakes = snake.getElementsByTagName("div")

const food = document.getElementById("food")
const score = document.getElementById("score")
const level = document.getElementById("level")
let dir
const keyarr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
const obj = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft"
}
function changefood() {
    const x = Math.floor(Math.random() * 30) * 10
    const y = Math.floor(Math.random() * 30) * 10
    food.style.left = x + "px"
    food.style.top = y + "px"
    console.log(x, y)
}
let keyactive = true
changefood()
document.addEventListener("keydown", event => {
    if (keyactive && keyarr.includes(event.key)) {
        if (snakes.length < 2 || obj[dir] !== event.key) {
            dir = event.key
            keyactive = false
        }

    }
})
let scorea = 0
let levela = 1
setTimeout(function move() {
    const head = snakes[0]
    let x = head.offsetLeft
    let y = head.offsetTop
    switch (dir) {
        case "ArrowUp":
            y -= 10
            break
        case "ArrowDown":
            y += 10
            break
        case "ArrowLeft":
            x -= 10
            break
        case "ArrowRight":
            x += 10
            break

    }
    if (head.offsetTop == food.offsetTop && head.offsetLeft == food.offsetLeft) {
        changefood()
        snake.insertAdjacentHTML("beforeend", "<div>")
        scorea++
        score.textContent = scorea + ''
        if (scorea % 5 == 0 && levela < 30) {
            levela++
            level.textContent = levela + ''


        }
    }
    if (x < 0 || x > 290 || y < 0 || y > 290) {
        return
    }
    for (let i = 0; i < snakes.length - 1; i++) {
        if (snakes[i].offsetLeft == x && snakes[i].offsetTop == y) {
            return
        }
    }
    const tail = snakes[snakes.length - 1]
    tail.style.left = x + "px"
    tail.style.top = y + "px"
    snake.insertAdjacentElement("afterbegin", tail)
    keyactive = true
    setTimeout(move, 300 - levela * 10)
}, 300)