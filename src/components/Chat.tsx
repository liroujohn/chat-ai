'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useChat } from 'ai/react'
import { ScrollArea } from './ui/scroll-area'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <Card className="w-[900px] shadow-lg shadow-slate-950">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>Chat bot to answer your questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-5 mb-6 border-t border-b border-slate-50 bg-slate-200 ">
        <ScrollArea className="h-[500px] w-full">
          {messages.map((messages) => {
            return (
              <div
                key={messages.id}
                className="flex gap-3 text-slate-600 text-sm mb-4"
              >
                {messages.role === 'user' && (
                  <Avatar className="shadow-md">
                    <AvatarFallback>JG</AvatarFallback>
                    <AvatarImage src="https://github.com/liroujohn.png" />
                  </Avatar>
                )}
                {messages.role === 'assistant' && (
                  <Avatar className="shadow-md">
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="" />
                  </Avatar>
                )}

                <p className="leading-relaxed p-2 border border-slate-100 bg-slate-100 rounded-lg shadow-md">
                  <span className="block font-bold text-slate-700 mb-1">
                    {messages.role === 'user' ? 'Usuário' : 'AI'}
                  </span>
                  {messages.content}
                </p>
              </div>
            )
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
