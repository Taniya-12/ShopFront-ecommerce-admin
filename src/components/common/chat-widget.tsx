import { useEffect, useState } from 'react'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'

const starterMessages = [
  {
    role: 'assistant',
    content: 'Hi! I can help with inventory, orders, and promotions for your store.',
  },
  {
    role: 'assistant',
    content: 'Try asking: “Show me low-stock products” or “Create a promo for summer.”',
  },
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(starterMessages)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!open) {
      setTyping(false)
    }
  }, [open])

  const handleSend = () => {
    const value = draft.trim()
    if (!value) return

    setMessages((current) => [...current, { role: 'user', content: value }])
    setDraft('')
    setTyping(true)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'I can help with that. This demo assistant is ready for your next store workflow.',
        },
      ])
      setTyping(false)
    }, 700)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70]">
      {open ? (
        <Card className="w-[320px] border-brand-200/70 bg-background/95 shadow-2xl backdrop-blur sm:w-[360px]">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Bot className="size-4" />
                </div>
                Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">Always here for quick support</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 p-4">
            <div className="flex max-h-[280px] flex-col gap-2 overflow-y-auto rounded-lg bg-secondary/40 p-3">
              <div className="mb-1 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Live support preview
              </div>
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm',
                    message.role === 'assistant'
                      ? 'bg-card text-foreground'
                      : 'ml-auto bg-brand-600 text-white'
                  )}
                >
                  {message.content}
                </div>
              ))}
              {typing && (
                <div className="max-w-[70%] rounded-2xl bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-dashed border-border bg-card/70 p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-700">
                <Sparkles className="size-4" />
                Quick actions
              </div>
              <div className="flex flex-wrap gap-2">
                {['Low stock', 'New campaign', 'Support ticket'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
                    onClick={() => setDraft(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Write a message..."
                className="h-10"
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Open assistant"
        >
          <Bot className="size-5" />
        </Button>
      )}
    </div>
  )
}
