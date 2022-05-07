export let names = [
    "Rupert",
    "Sofia",
    "Rigoberto",
    "Nadia",
    "Oliver",
    "Ethan",
    "Amelia",
    "Mia",
    "Lucas",
    "Chloe",
    "Ava",
    "Noah",
    "Enzo",
    "Lea",
    "Mathias",
    "Clara",
    "Nathan",
    "Ines",
    "Chano",
    "Jade",
    "Oceana",
    "Manon",
    "Hugo",
    "Cristina",
    "Felix",
    "Marie",
    "Leon",
    "Lukas",
    "Leonie",
    "Luca",
    "Jonas",
    "Florian",
    "Adriana",
    "Julia",
    "Cora",
    "Maximilian",
    "Vicente",
    "Constanza",
    "Catalina",
    "Valentina",
    "Diego",
    "Juan",
    "Jose",
    "Cristobal",
    "Fernanda",
    "Javiera",
    "Katarzyna",
    "Jan",
    "Ewa",
    "Elzbieta",
    "Marcin",
    "Tomas",
    "Sonia",
    "Cristina",
    "Anna",
    "Lucas",
    "Oscar",
    "Alice",
    "Elin",
    "Alva",
    "Emil",
    "Isak",
    "Ethan",
    "Avery",
    "Zoey",
    "Layla",
    "Dylan",
    "Aaron",
    "Estefania",
    "Paqui",
    "Abel",
    "Jorge",
    "Abraham",
    "Carlos",
    "Mohamed",
    "Siri",
    "Aleksi",
    "Veeti",
    "Eetu",
    "Juho",
    "Arttu",
    "Olafur",
    "Slomo",
    "Helga",
    "Bjorn",
    "Shun",
    "Kaito",
    "Yu",
    "Kenta",
    "Ren",
    "Nico",
    "Misaki",
    "Nanami",
    "Moe",
    "Mitsuki",
    "Ronald",
    "Ryan",
    "Janice",
    "Adryen",
    "Marlon",
  ];
  
export let surnames = [
    "Wang",
    "Smith",
    "Devi",
    "Inanov",
    "Kim",
    "Ali",
    "García",
    "Müller",
    "da Silva",
    "Tesfaye",
    "Nguyen",
    "Illunga",
    "González",
    "Deng",
    "Moyo",
    "Rodríguez",
    "Hansen",
    "Li",
    "Zhang",
    "Chen",
    "Liu",
    "Huang",
    "Wu",
    "Xu",
    "Khan",
    "Sun",
    "Mohammad",
    "Bai",
    "Kaur",
    "Cao",
    "Lopez",
    "Hassan",
    "Hussain",
    "Ceng",
    "Ibrahim",
    "Xiao",
    "dos Santos",
    "Cheng",
    "Perez",
    "Dong",
    "Sanchez",
    "Kumari",
    "Jin",
    "Ferreira",
    "Alves",
    "Qiu",
    "Gomez",
    "Índigo",
    "Abdul",
    "Smith",
    "Torres",
    "Musa",
    "Ramos",
    "Fernández",
    "Morales",
    "Johnson",
    "Tao",
    "Jimenez",
    "Gutierrez",
    "Ruiz",
    "Castillo",
    "Alvarez",
    "Ocaña",
    "Brown",
    "Martin",
    "Jones",
    "Qu",
    "Rana",
    "Sekh",
    "Bi",
    "Mahmoud",
    "Moreno",
    "de Jesús",
    "Lee",
    "Ismail",
    "Malik",
    "Tong",
    "Niu",
    "Joseph",
    "Barman",
    "Soares",
    "Saeed",
    "Herrera",
    "Perdomo",
    "Adam",
    "Lima",
    "Medina",
    "Muñoz",
    "Paswan",
    "Shen",
    "Camara",
    "Ou",
    "Ha",
    "Haji",
    "Naik",
    "da Costa",
    "Tanaka",
    "Watanabe",
    "Shinde",
    "Ito",
  ];

  export function disableItems(...items) {
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute("disabled", "disabled");
    }
  }
  
  export function generateRandomName(name, surname) {
      return name[Math.floor(Math.random()* name.length)] + " " + surname[Math.floor(Math.random() * surname.length)];
  }