import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
let games = [
  { id: "1", title: "Game of Thrones", platform: ["Switch"] },
  { id: "2", title: "Lord of the rings", platform: ["Switch", "xbox", "Ps5"] },
  { id: "3", title: "Elden Ring", platform: ["Pc", "Ps4"] },
  { id: "4", title: "The Witcher", platform: ["Ps5", "Xbox"] },
  { id: "5", title: "House of the Dragon", platform: ["Ps4", "Pc", "Switch"] },
  { id: "6", title: "The Walking Dead", platform: ["Switch"] },
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

let authors = [
  { id: "1", name: "mario", verified: true },
  { id: "2", name: "Hanson", verified: false },
  { id: "3", name: "Junior", verified: true },
];
const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review]
    }
    type Query {
        reviews: [Review]
        review(id: ID!):  Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
      deleteGame (id: ID!): [Game]
      addNewGame (game: AddGameInput!): Game
      updateGame (id: ID!, edits: EditGameInput!): Game
    }
    input AddGameInput {
      title: String!
      platform: [String!]!
    }
    input EditGameInput {
      title: String
      platform: [String!]
    }
`;

const resolvers = {
  Query: {
    games() {
      return games;
    },
    game(_, args) {
      return games.find((game) => game.id === args.id);
    },
    reviews() {
      return reviews;
    },
    review(_, args) {
      return reviews.find((review) => review.id === args.id);
    },
    authors() {
      return reviews;
    },
    author(_, args) {
      return authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((a) => a.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return games.find((g) => g.id === parent.game_id);
    },
    author(parent) {
      return authors.find((a) => a.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      games = games.filter((g) => g.id !== args.id);
      return games;
    },
    addNewGame(_, args) {
      let newGame = { ...args.game, id: Math.floor(Math.random() * 10000) };
      console.log(newGame);
      const gameAdded = games.push(newGame);
      if (gameAdded) {
        return newGame;
      }
    },
    updateGame(_, args) {
      games = games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }
        return g;
      });

      return games.find((g) => g.id === args.id);
    },
  },
};

/* */

// server setup
export const Server = new ApolloServer({
  // typDefs :-> definition of type of data
  typeDefs,
  // resolvers :-> functions on how we respond to data on the graph
  resolvers,
});

const { url } = await startStandaloneServer(Server, { listen: { port: 4000 } });

console.log("server listening to port: ", url);
