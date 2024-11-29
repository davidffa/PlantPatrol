db.employees.insertOne({
  "username": "admin",
  "password": "$2a$10$WatqARWbDf4N.zKgQS0.m.InvqMZYR1Qb/ae4hc0C0QzfAPuCJPje",
  "isManager": true,
  "firstName": "João",
  "lastName": "Ramalho",
  "phoneNumber": "123456789",
  "passwordChanged": false,
  "_class": "pt.ua.deti.ies.plantpatrol.backend.entity.Employee",
  "birthDate": new Date("2004-01-06T00:00:00.000Z")
})

db.employees.insertOne({

  "username": "Paulo",
  "password": "$2a$10$wV8tWT9UuuZhfIsA3rexw.eL.Uyfw7h6aKWHu8FPQzaR6Eu/Sx0te",
  "isManager": false,
  "firstName": "Paulo",
  "lastName": "Miranda",
  "phoneNumber": "922833754",
  "address":
    "Fifth Avenue, 200, NY",
  "birthDate": new Date("1998-06-26T23:00:00.000+00:00"),
  "notes": "He is a skilled technician.",
  "passwordChanged": true,
  "_class": "pt.ua.deti.ies.plantpatrol.backend.entity.Employee"
})

db.plants.insertOne({
  "name": "Sunflower",
  "minimum": 0,
  "amount": 5,
  "family": "Asteraceae",
  "maxHeight": 3,
  "about": "The sunflower is a tall, annual plant with large, bright yellow flower heads. The flower head is actually a composite flower, meaning that it is made up of many smaller flowers. Sunflowers are native to North America and are now grown throughout the world.",
  "curiosities": "Sunflowers can track the sun's movement across the sky throughout the day. They also produce a large amount of seeds, which are a popular food source for birds and other animals.",
  "imageUrl": "https://media.greg.app/Y2FyZS1wbGFudC1wcm9maWxlL3VzZXJzLzM4NTMzMi9wbGFudC1waG90b3MvTm9uZS8xNjg2NTgxNjIwMzM3LTUyOUEzMEU3LUFGODYtNEU0MC1BNkQzLUU0NDZEQkQxNTZDNC5qcGVn?format=pjpeg&optimize=medium&auto=webp&width=498"
})
db.plants.insertOne({
  "name": "Alface",
  "minimum": 3,
  "amount": 5,
  "family": "Asteraceae",
  "maxHeight": 20,
  "about": "Alface, or lettuce, is a leafy green vegetable that is commonly used in salads and other dishes. It has a crisp texture and a mild, slightly bitter flavor. There are many different varieties of alface, with varying leaf shapes, sizes, and colors. ",
  "curiosities": "Alface, or lettuce, is a highly adaptable plant that can be grown in various climates and soil types. It is also one of the few vegetables that can be grown from seed to harvest in just a few weeks.",
  "imageUrl": "https://www.shutterstock.com/image-vector/fresh-organic-lettuce-healthy-meal-260nw-2307287085.jpg"
})
db.plants.insertOne({
  "name": "Rose",
  "minimum": 0,
  "amount": 0,
  "family": "Rosaceae",
  "maxHeight": 2,
  "about": "Roses are woody perennial flowering plants, known for their beautiful and fragrant flowers. They are cultivated worldwide for their aesthetic value and used in perfumes, cosmetics, and other products.",
  "curiosities": "Roses can be almost any color except true blue; Rose hips are rich in Vitamin C.",
  "imageUrl": "https://i.pinimg.com/236x/ac/f5/01/acf501b117630260ac5f83777d128d3e.jpg"
})
db.plants.insertOne({
  "name": "carrot",
  "minimum": 0,
  "amount": 5,
  "family": "Apiaceae",
  "maxHeight": 1,
  "about": "The carrot plant is a taproot, with a long, orange root that is eaten as a vegetable.  The plant's feathery leaves grow from the top of the root and flowers are small and white.",
  "curiosities": "Carrots can be purple, yellow, white, or red, not just orange. The plant itself is a biennial, meaning it takes two years to complete its life cycle.",
  "imageUrl": "https://www.shutterstock.com/image-vector/carrot-vegetable-plants-grown-soil-260nw-2272900871.jpg"
})

db.greenhouses.insertOne({
  "name": "Vegetable Greenhouse",
  "location": "Fifth Avenue",
  "rules": [],
  '_class': "pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse"
})

db.greenhouses.insertOne({
  "name": "Floriculture Greenhouse",
  "location": "Fifth Avenue",
  "rules": [],
  '_class': "pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse"
})