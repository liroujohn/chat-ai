import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// ? Crie um cliente OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

//! IMPORTANTE! Defina o tempo de execução para o limite
export const runtime = 'edge'

export async function POST(req: Request) {
  // ? Extrai as `messages` do corpo da requisição
  const { messages } = await req.json()

  // ? Peça ao OpenAI a conclusão do bate-papo por streaming, dado o prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  // ? Converte a resposta em um fluxo de texto amigável
  const stream = OpenAIStream(response)
  // ? Responde com o stream
  return new StreamingTextResponse(stream)
}
