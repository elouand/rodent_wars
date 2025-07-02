






function createCard(cardNumber, cardInfos, divName, id) {
  var data = cardInfos[cardNumber]

  var destination = document.getElementById(divName)
  if (destination == undefined) { return }

  var container = document.createElement("div")
  container.className = "card-container"
  container.id = id

  var card = document.createElement("div")
  card.className = "card"
  card.id = "card_" + id

  var mana = document.createElement("div")
  mana.className = "mana"
  mana.id = "mana"
  mana.textContent = data.cost

  var hp = document.createElement("div")
  hp.className = "hp"
  hp.id = "hp"
  hp.textContent = data.hp

  var name = document.createElement("div")
  name.className = "card-name"
  name.id = "name"
  name.textContent = data.name

  var image = document.createElement("div")
  image.className = "card-image"
  image.id = "image"
  image.style.backgroundImage = `url(ressources/${data.image})`

  var description = document.createElement("div")
  description.className = "card-description"
  description.id = "description"
  description.textContent = data.description

  var stats = document.createElement("div")
  stats.className = "stats"

  var attack = document.createElement("div")
  attack.className = "stat attack"
  attack.id = "attack"
  attack.textContent = data.attack

  var health = document.createElement("div")
  health.className = "stat movement"
  health.id = "health"
  health.textContent = data.movement

  stats.appendChild(attack)
  stats.appendChild(health)

  card.appendChild(mana)
  card.appendChild(hp)
  card.appendChild(name)
  card.appendChild(image)
  card.appendChild(description)
  card.appendChild(stats)

  container.appendChild(card)
  destination.appendChild(container)
}
