import { LoremIpsum } from "lorem-ipsum";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const titleList = ["StakeHolder1", "StakeHolder2", "Developer1", "Developer2", "TeamLeader"];

export function randomChat() {
  const count = Math.floor(Math.random() * (5 - 1) + 1);
  const chats = [];
  for (let i = 0; i < count; i++) {
    const messageObject = {
      name: titleList[Math.floor(Math.random() * (5 - 0) + 0)],
      text: lorem.generateSentences(Math.floor(Math.random() * (3 - 1) + 1)),
      id: `${Math.random()}`,
    };
    chats.push(messageObject);
  }
  return chats;
}
