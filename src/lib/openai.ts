import OpenAI from "openai";

const openai = new OpenAI(); // automatically uses OPENAI_API_KEY environment variables for configuration

export default openai;
