# Rotas

O TanStack Start utiliza **rotas baseadas em ficheiros**. Cada ficheiro `.tsx` neste diretório define uma rota. Não crie `src/pages/`, `src/routes/_app/index.tsx` ou `app/layout.tsx` — essas são convenções do Next.js / Remix. O único layout raiz é `src/routes/__root.tsx`.

## Convenções

| Ficheiro | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dinâmica — usar `$` simples, sem chavetas) |
| `posts/{-$category}.tsx` | `/posts/:category?` (segmento opcional) |
| `files/$.tsx` | `/files/*` (rota abrangente — ler através do parâmetro `_splat`, nunca `*`) |
| `_layout.tsx` | rota de layout (apresenta os elementos filhos através de `<Outlet />`) |
| `__root.tsx` | estrutura principal da aplicação — envolve todas as páginas; preservar `<Outlet />` |

O ficheiro `routeTree.gen.ts` é gerado automaticamente. Não o edite manualmente.
