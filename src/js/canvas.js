import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
const velocity = 0.05
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.originalX = x
    this.originalY = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.distanceFromCenter = utils.randomIntFromRange(100, 200)
    this.lastMouse = { x: x, y: y }

  }

  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color
    c.moveTo(lastPoint.x, lastPoint.y)
    c.lineTo(this.x, this.y)
    c.lineWidth = this.radius
    c.stroke()
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.fillStyle = this.color
    // c.fill()
    c.closePath()
  }

  update() {
    // Move points over time
    const lastPoint = { x: this.x, y: this.y }
    // Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05
    this.radians += velocity
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter
    this.draw(lastPoint)
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 100; i++) {
    let i = Math.random() * Math.PI * 2
    let x = canvas.width / 2
    let y = canvas.height / 2
    let radius = Math.random() * 4 + 1
     let color = utils.randomColor(colors)
    particles.push(new Particle(x, y, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  // c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgba(255, 255, 255, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.shadowBlur = 0.5
  particles.forEach(p => {
   p.update()
  })

}

init()
animate()
