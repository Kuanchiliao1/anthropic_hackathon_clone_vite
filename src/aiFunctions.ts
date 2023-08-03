const secretKey =
  "stuff here to do,s,k,-,w,X,a,p,E,k,f,1,8,7,t,c,Y,o,E,e,C,F,f,d,T,3,B,l,b,k,F,J,N,X,5,F,l,3,v,E,7,m,6,e,4,7,A,b,r,x,6,p,no stuff here to do!";

// PROMPTS
function getMainQuestsPrompt(location: string) {
  return [
    {
      role: "system",
      content:
        "You are a location generator AI. Generate three different main tourist locations in the given country or city.",
    },
    {
      role: "user",
      content: `
      Generate three locations formatted as shown below. If the topic is gibberish/unknown, then treat it as "general". Output must start with [ character and end with ] character
      ###
      Input: San Francisco
      Output:
      "[Pier 39, Golden Gate Bridge, Alcatraz Island]"
      ###
      Input: Mexico
      Output:
      "[Chichen Itza, Tulum, Teotihuacan]"
      Input: ${location}
      Output:
      `,
    },
  ];
}

function getFunFactsPrompt(location: string) {
  return [
    {
      role: "system",
      content:
        "You are a fun fact generator AI. Generate three different fun facts for the given destination.",
    },
    {
      role: "user",
      content: `
      Generate 3 fun facts formatted as shown below. If the topic is gibberish/unknown, then treat it as "general". Output must start with [ character and end with ] character
      ###
      Input: Pier 39
      Output:
      "[Over 1,300 sea lions call this San Francisco hotspot home, providing a unique wildlife experience in the city., The pier boasts a hand-painted Italian carousel, lighting up the waterfront with 1,800 LED lights and 32 animals to ride, It offers incredible views of the Golden Gate Bridge, Alcatraz Island, and the city skyline, a photographer's delight!]"
      ###
      Input: ${location}
      Output:
      `,
    },
  ];
}

async function fetchAIOutput(messages: any[]) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey.split(",").slice(1, -1).join("")}`,
      "Content-Type": "application/json",
    },
    // Info I'm passing to the AI such as the prompt, length, model etc.
    body: JSON.stringify({
      messages: messages,
      max_tokens: 1000,
      model: "gpt-3.5-turbo",
    }),
  })
    .then(request => request.json())
    .then(data => {
      return JSON.parse(data.choices[0].message.content);
    });
  return res;
}

export async function generateLocationsArray() {
  const [loc1, loc2, loc3] = await Promise.all([
    await fetchAIOutput(getMainQuestsPrompt("mexico")),
    await fetchAIOutput(getMainQuestsPrompt("sf")),
    await fetchAIOutput(getMainQuestsPrompt("london")),
  ]);

  console.log(loc1, loc2);

  const facts = await Promise.all([
    await fetchAIOutput(getFunFactsPrompt(loc1)),
    await fetchAIOutput(getFunFactsPrompt(loc2)),
    await fetchAIOutput(getFunFactsPrompt(loc3)),
  ]);

  const obj = {
    [loc1]: facts[0],
    [loc2]: facts[1],
    [loc3]: facts[2]
  }

  console.log(obj);
  return facts;
}

// Get it all into an array, then ask seperate instances;
// fetch location
// fetch facts given location
