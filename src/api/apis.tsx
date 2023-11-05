import axios from 'axios';

async function summarize(text: string) {
    var response =  await axios.post(
        `http://localhost:5109/LLM/OpenAi/summarize?text=${text}`
    );
    return response.data;
}

async function generate(text: string) {
    var response =  await axios.post(
        `http://localhost:5109/LLM/OpenAi/generate?text=${text}`
    );
    return response.data;
}

async function topicExtraction(text: string) {
    var response =  await axios.post(
        `http://localhost:5109/LLM/OpenAi/topicExtraction?text=${text}`
    );
    return response.data;
}

export default async function apiHandler(path: string, text: string) {
    console.log(`apiHandler() was hit with path: ${path}`)
    if (path == "summarize") {
        var res = await summarize(text);
        console.log(`summarize API responded with: ${res}`)
        return res;
    } else if (path == "topicExtraction") {
        var res = await topicExtraction(text);
        console.log(`topicExtraction API responded with: ${res}`);
        return res;
    } else if (path == "generate") {
        var res = await generate(text);
        console.log(`generate API responded with: ${res}`);
        return res;
    } else {
        console.log("No path was provided to apiHandler(). Returning default string.");
        return "NONE!";
    }
}
