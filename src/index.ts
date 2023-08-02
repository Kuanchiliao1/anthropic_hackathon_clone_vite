import "./style.css";

export { sum } from "./sum";

import Anthropic from "@anthropic-ai/sdk";

import { ChatAnthropic } from "langchain/chat_models/anthropic";
import { HumanMessage } from "langchain/schema";
import { getResponse, promptWrapper } from "./api";

// const chat = new ChatAnthropic({
//   temperature: 0.9,
//   anthropicApiKey:
//     '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', // In Node.js defaults to process.env.ANTHROPIC_API_KEY
// });

// const response = await chat.call([
//   new HumanMessage({
//     text: 'Hello, how',
//   }),
// ]);

// console.log(response)

// console.log('logging response');
// console.log()
// fetch('/.netlify/functions/getResponse.js')
//   .then(response => response.json())
//   .then(data => console.log(data));
// console.log('still logging...')

const globalAIObject = {
  name: "AI",
  stuff: "stuf",
};

const classesFadeOut: string[] =
  "transition-opacity ease-in duration-700 opacity-0".split(" ");

const classesFadeIn =
  "transition-opacity ease-out duration-700 opacity-100".split(" ");

const localErrorLog =
  JSON.parse(localStorage.getItem("errorLog")) || "localErrorLog";
const localMessageHistory =
  JSON.parse(localStorage.getItem("messageHistory")) || "localMessageHistory";

console.log("page path:", window.location.pathname);

if (localErrorLog === "localErrorLog") {
  localStorage.setItem("errorLog", JSON.stringify([]));
}
if (localMessageHistory === "localMessageHistory") {
  localStorage.setItem("messageHistory", JSON.stringify([]));
}
console.log({ localErrorLog, localMessageHistory });

if (window.location.pathname === "/dist/" || window.location.pathname === "/") {
  console.log("main page");
  const link = document.querySelector("a");
  link.addEventListener("click", event => {
    event?.preventDefault();
    document.body.classList.add(...classesFadeOut);
    setTimeout(() => {
      document.location.href = "/mainquests.html";
    }, 700);
  });
} else if (
  window.location.pathname === "/dist/mainquests.html" ||
  window.location.pathname === "/mainquests.html"
) {
  console.log("only log on quests page");

  document.querySelectorAll(".lets-go-btn").forEach(element => {
    console.log(element);
    element.addEventListener("click", async () => {
      // const prompt = "tell me a one sentence story...";
      // const response = await fetch("/.netlify/functions/getData", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(prompt),
      // }).then(response => response.json());
      // console.log("response", response);

      // // document.location.href = '/dist/itinerary.html';
      // console.log(classes);
      document.body.classList.add(...classesFadeOut);
    });
  });

  const btn = document.querySelector(".test-retrieval-btn");
  btn.addEventListener("click", async () => {
    console.log("btn clicked");
    const response = await fetch("/.netlify/functions/testFunction").then(
      res => res.json
    );

    document.title = response;
    console.log(response);
  });
  // Fade out animation!
  // document.body.classList.add(...classes);
}

// const prompt = 'Why is the sky blue?';
// getResponse(promptWrapper(prompt));

// const data = {
//   model: 'claude-2',
//   max_tokens_to_sample: 2000,
//   prompt: 'Hello, how',
// };

// const anthropic = new Anthropic({
//   apiKey: 'my api key', // defaults to process.env["ANTHROPIC_API_KEY"]
// });

// async function main() {
//   const completion = await anthropic.completions.create({
//     model: 'claude-2',
//     max_tokens_to_sample: 300,
//     prompt: `${Anthropic.HUMAN_PROMPT} how does a court case get to the Supreme Court? ${Anthropic.AI_PROMPT}`,
//   });
// }

// main();
