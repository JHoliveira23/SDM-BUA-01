let map = new Map()

map.set("nome", "Danilo")
map.set("idade", 39)
map.set("altura", 1.80)

console.log(map.get("nome"))
console.log(map.has("idade"))

console.log(map.size)

map.forEach((valor, chave)=>{
    console.log(`${chave}: ${valor}`)
})

// Remover um elemento do map
map.delete("idade");
console.log("deletou idade")

map.forEach((valor, chave)=>{
    console.log(`${chave}: ${valor}`)
})

// Remover todos os elementos do map
map.clear()
console.log(map.size)

