import "./style.css";
// import Anthropic from "@anthropic-ai/sdk";
// import { ChatAnthropic } from "langchain/chat_models/anthropic";
// import { HumanMessage } from "langchain/schema";
// import { getResponse, promptWrapper } from "./api";
import { generateLocationsArray } from "./aiFunctions";

const aiOutputs = {
  quests: null,
};

const classesFadeOut: string[] =
  "transition-opacity ease-in duration-700 opacity-0".split(" ");

// const classesFadeIn =
//   "transition-opacity ease-out duration-700 opacity-100".split(" ");

// const localErrorLog = JSON.parse(localStorage.getItem("errorLog") || "{}");
const localMessageStore = JSON.parse(
  localStorage.getItem("messageHistory") || "{}"
);

// Landing page
if (window.location.pathname === "/dist/" || window.location.pathname === "/") {
  // Reset local storage
  localStorage.setItem("quests", JSON.stringify({}));

  console.log("main page");
  const link = document.querySelector("a");
  const input = document.querySelector("input");

  if (link) {
    link.addEventListener("click", async event => {
      event?.preventDefault();
      aiOutputs.quests = await generateLocationsArray(input.value);
      if (aiOutputs.quests) {
        localMessageStore.quests = aiOutputs.quests;
      }
      console.log("aiOutputs.quests", aiOutputs.quests);
      console.log("quests page", localMessageStore.quests);
      localStorage.setItem("quests", JSON.stringify(localMessageStore.quests));

      // Animation fade out
      document.body.classList.add(...classesFadeOut);
      setTimeout(() => {
        document.location.href = "/mainquests.html";
      }, 700);
    });
  }
  // Main quests page
} else if (
  window.location.pathname === "/dist/mainquests.html" ||
  window.location.pathname === "/mainquests.html"
) {
  const obj = JSON.parse(localStorage.getItem("quests"));
  console.log(obj);
  const container = document.querySelector(".cards-container");

  for (const prop in obj) {
    obj[prop];
    console.log(obj[prop]);
    container.innerHTML += `
      <div class="quest card w-80 bg-base-100 shadow-xl mx-2 rounded">
        <figure>
          <img class="object-cover aspect-[4/3]" src="https://i.imgur.com/2RdRcuG.jpeg" alt="Shoes" />
        </figure>
        <div
          class="card-body p-4 overflow-hidden hover:overflow-y-scroll hover:animate-fade h-48"
        >
          <div class="form-control w-full max-w-xs text-center"></div>
          <h2 class="font-mono font-semibold text-2xl">${prop}</h2>
          <ul class="list-disc list-inside">
            <li>${obj[prop][0]}</li>
            <li>${obj[prop][1]}</li>
            <li>
              ${obj[prop][2]}
            </li>
          </ul>
        </div>
        <div class="card-actions m-4">
          <button
            class="lets-go-btn btn btn-primary w-full normal-case bg-blue-300 border-none text-white"
          >
            Let's go with this!
          </button>
        </div>
      </div>
      `;
  }
  for (let i = 0; i < 3; i++) {}

  console.log("only log on quests page");
  console.log(aiOutputs);

  document.querySelectorAll(".lets-go-btn").forEach(element => {
    element.addEventListener("click", async () => {
      document.body.classList.add(...classesFadeOut);
    });
  });

  const btn = document.querySelector(".test-retrieval-btn");
  if (btn) {
    btn.addEventListener("click", async () => {
      console.log("btn clicked");
      const response = await fetch("/.netlify/functions/testFunction").then(
        res => res.json
      );

      if (typeof response === "string") {
        document.title = response;
      }
    });
    // Fade out animation!
    // document.body.classList.add(...classes);
  }
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
