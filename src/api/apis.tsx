import axios from 'axios';

async function summarize(text: string, maxTokens: number, temperature: number) {
    var response =  await axios.post(
        `http://localhost:5109/LLM/OpenAi/summarize`,
        {
            'text': text,
            'maxTokens': maxTokens,
            'temperature': temperature
        }
    );
    return response.data;
}

async function generate(text: string, maxTokens: number, temperature: number) {
    var response =  await axios.post(
        'http://localhost:5109/LLM/OpenAi/generate',
        {
            'text': text,
            'maxTokens': maxTokens,
            'temperature': temperature
        }
    );
    return response.data;
}

async function topicExtraction(text: string, maxTokens: number, temperature: number) {
    var response =  await axios.post(
        `http://localhost:5109/LLM/OpenAi/topicExtraction`,
        {
            'text': text,
            'maxTokens': maxTokens,
            'temperature': temperature
        }
    );
    return response.data;
}

export default async function apiHandler(path: string, text: string, maxTokens: number, temperature: number) {
    console.log(`apiHandler() was hit with path: ${path}`)
    if (path == "summarize") {
        var res = await summarize(text, maxTokens, temperature);
        console.log(`summarize API responded with: ${res}`)
        return res;
    } else if (path == "topicExtraction") {
        var res = await topicExtraction(text, maxTokens, temperature);
        console.log(`topicExtraction API responded with: ${res}`);
        return res;
    } else if (path == "generate") {
        var res = await generate(text, maxTokens, temperature);
        console.log(`generate API responded with: ${res}`);
        return res;
    } else {
        console.log("No path was provided to apiHandler(). Returning default string.");
        return "NONE!";
    }
}
