# State Management — Mas Technic Precision Dynamics Hub

## Katman Haritası

| Katman | Araç | Ne Zaman |
|--------|------|---------|
| Server state | TanStack Query v5 | Supabase veri çekme/mutasyon |
| Global client state | Context API (minimal) | Auth user, theme, locale |
| Local component state | `useState` / `useReducer` | Form, toggle, hover, animation flag |
| Derived state | `useMemo` | Hesaplanmış değer (filtre, sort) |
| Animation state | GSAP uniforms / Framer MotionValue | Render-loop driven — React state değil |

## TanStack Query — Temel Kurallar

```typescript
// Sorgu key factory — src/lib/queryKeys.ts'de tanımlı olmalı
export const rfqKeys = {
  all:    () => ["rfqs"] as const,
  list:   (filters: Filters) => [...rfqKeys.all(), "list", filters] as const,
  detail: (id: string) => [...rfqKeys.all(), "detail", id] as const,
}

// ✅ useQuery
const { data, isLoading, error } = useQuery({
  queryKey: rfqKeys.list(filters),
  queryFn:  () => supabase.from("rfq_requests").select("*").returns<RFQ[]>(),
  staleTime: 5 * 60 * 1000,   // 5 dk cache
})

// ✅ useMutation
const { mutate } = useMutation({
  mutationFn: (payload: RFQPayload) =>
    supabase.from("rfq_requests").insert(payload),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: rfqKeys.all() }),
})
```

## Supabase Client

- Tek instance: `src/integrations/supabase/client.ts`
- Edge Function çağrısı: `supabase.functions.invoke("fn-name", { body: payload })`
- Realtime (varsa): `supabase.channel(...)` — component unmount'ta `removeChannel`
- RLS aktif — client sadece authorized data görebilir

## Local State Kalıpları

```typescript
// Boolean toggle
const [isOpen, setIsOpen] = useState(false)

// Form state — küçük form için useState, büyük form için react-hook-form
const [formData, setFormData] = useState<RFQForm>(defaultValues)

// Animation flag — GSAP entrance tetikleyici
const [showContent, setShowContent] = useState(() => !isFirstVisit)

// Multi-step
const [step, setStep] = useState<1 | 2 | 3>(1)
```

## Context API — Sadece Şu İçin

```
src/components/providers/
  SmoothScrollProvider.tsx   ← Lenis instance, sadece provider
  (QueryClientProvider        ← src/App.tsx'de)
  (AuthProvider               ← src/components/auth/ — dokunulmaz)
```

Context prop drilling çözümü için değil — cross-cutting concern (auth, scroll) için.

## Ne Yapma

- Redux / Zustand / Jotai ekleme — Context yeterli
- `useEffect` + `fetch` ile data çekme — `useQuery` kullan
- Animation state'i (hover, progress) React state'e koyma — GSAP uniform / MotionValue kullan
- Global singleton store oluşturma — component scope'ta tut
