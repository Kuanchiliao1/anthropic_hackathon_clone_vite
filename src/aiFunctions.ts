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
      Generate three locations formatted as shown below. If the topic is gibberish/unknown, then treat it as "general". Output should not have special chars or spaces.
      ###
      Input: San Francisco
      Output:
      Pier 39|Golden Gate Bridge|Alcatraz Island
      ###
      Input: Mexico
      Output:
      Chichen Itza|Tulum|Teotihuacan
      Input: ${location}
      Output:
      `,
    },
  ];
}


//https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=YOUR_API_KEY&signature
// key: AIzaSyDmxOjfDdGP7-xLArRgdOJr9ZImbdrbzgo
// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDmxOjfDdGP7-xLArRgdOJr9ZImbdrbzgo

function getFunFactsPrompt(location: string) {
  return [
    {
      role: "system",
      content:
        "You are a fun fact generator AI. Generate three different fun facts for the given destination/landmark.",
    },
    {
      role: "user",
      content: `
      Generate 3 fun facts formatted as shown below. If the topic is gibberish/unknown, then treat it as "general".
      ###
      Input: Pier 39
      Output:
      Over 1,300 sea lions call this San Francisco hotspot home, providing a unique wildlife experience in the city|The pier boasts a hand-painted Italian carousel, lighting up the waterfront with 1,800 LED lights and 32 animals to ride|It offers incredible views of the Golden Gate Bridge, Alcatraz Island, and the city skyline, a photographer's delight!
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
      console.log(data.choices[0].message.content);
      return data.choices[0].message.content;
    });
  return res;
}

export async function generateLocationsArray(location) {
  const locations = await Promise.all([
    fetchAIOutput(getMainQuestsPrompt(location)),
  ]);

  console.log({ locations });
  const [loc1, loc2, loc3] = locations[0].split("|");
  console.log({ loc1, loc2, loc3 });

  const allFacts = await Promise.all([
    fetchAIOutput(getFunFactsPrompt(loc1)),
    fetchAIOutput(getFunFactsPrompt(loc2)),
    fetchAIOutput(getFunFactsPrompt(loc3)),
  ]);

  const factsFormatted = allFacts.map(fact => fact.split("|"));

  const factsObject = {
    [loc1]: factsFormatted[0],
    [loc2]: factsFormatted[1],
    [loc3]: factsFormatted[2],
  };

  console.log(factsObject);
  return factsObject;
}

// Get it all into an array, then ask seperate instances;
// fetch location
// fetch facts given location
