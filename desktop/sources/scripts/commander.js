export default function Commander (pilot) {
  this.el = document.createElement('div')
  this.el.id = 'commander'

  this.input = document.createElement('input')

  // History of commands entered.
  this.history = []

  // Index of history command to show in input.
  this.historyIndex = 0

  this.install = function (host) {
    this.el.appendChild(this.input)
    host.appendChild(this.el)
  }

  this.start = function () {
    this.input.focus()
  }

  this.input.onkeydown = (e) => {
    switch (e.keyCode) {
      case 40: // Down
        e.preventDefault()
        if (this.historyIndex === this.history.length) return
        this.historyIndex += 1

        if (this.historyIndex === this.history.length) {
          this.input.value = ''
        } else {
          this.input.value = this.history[this.historyIndex]
        }
        break
      case 38: // Up
        e.preventDefault()
        if (this.history.length && this.historyIndex > 0) {
          this.input.value = this.history[--this.historyIndex]
        }
        break
    }
  }

  this.input.onkeypress = (e) => {
    if (e.keyCode !== 13) { return }
    e.preventDefault()
    if (this.input.value !== this.history[this.history.length - 1]) {
      this.history.push(this.input.value)
    }
    this.historyIndex = this.history.length;

    pilot.mixer.run(this.input.value)
    this.input.value = ''
  }
}
