let games = [
  { id: "1", title: "Game of Thrones", platform: ["Switch"] },
  { id: "2", title: "Lord of the rings", platform: ["Switch", "xbox", "Ps5"] },
  { id: "3", title: "Elden Ring", platform: ["Pc", "Ps4"] },
  { id: "4", title: "The Witcher", platform: ["Ps5", "Xbox"] },
  { id: "5", title: "House of the Dragon", platform: ["Ps4", "Pc", "Switch"] },
  { id: "6", title: "The Walking Dead", platform: ["Switch"] },
];

let authors = [
  { id: "1", name: "mario", verified: true },
  { id: "2", name: "Hanson", verified: false },
  { id: "3", name: "Junior", verified: true },
];

let reviews = [
  {
    id: "1",
    rating: 9,
    content: "lorem ipselum",
    author_id: "1",
    game_id: "1",
  },
  {
    id: "2",
    rating: 10,
    content: "lorem ipselum",
    author_id: "2",
    game_id: "3",
  },
  {
    id: "3",
    rating: 4,
    content: "lorem ipselum",
    author_id: "2",
    game_id: "1",
  },
  {
    id: "4",
    rating: 6,
    content: "lorem ipselum",
    author_id: "1",
    game_id: "4",
  },
  {
    id: "5",
    rating: 8,
    content: "lorem ipselum",
    author_id: "3",
    game_id: "2",
  },
  {
    id: "6",
    rating: 10,
    content: "lorem ipselum",
    author_id: "1",
    game_id: "5",
  },
  {
    id: "7",
    rating: 9,
    content: "lorem ipselum",
    author_id: "3",
    game_id: "3",
  },
];

export default { games, authors, reviews };
