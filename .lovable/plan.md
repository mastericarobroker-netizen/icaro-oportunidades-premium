
## Resumo das mudanças

### 1. Hero — trocar imagem
- Substituir a imagem dos prédios (`hero-skyline.jpg`) pela nova foto de rosto enviada (`Ícaro_Foto_Perfil.jpeg`).
- Subir a foto como Lovable Asset (`src/assets/icaro-hero.jpeg.asset.json`).
- Ajustar layout do Hero para acomodar retrato (composição lado-a-lado ou retrato com overlay escuro mantendo a tipografia atual). Identidade visual e cores preservadas.

### 2. Seção "Sobre"
- Remover a foto de perfil (`icaro-perfil`).
- Manter apenas a foto de corpo inteiro (`icaro-corpo`), centralizando/realinhando o bloco.

### 3. Nova seção "Imóveis Disponíveis"
- Grid com 3 cards (responsivo).
- Cada card mostra:
  - Foto do imóvel
  - Título / endereço curto
  - **Tipo de oferta** (badge): 1° Leilão, 2° Leilão, Licitação Aberta, Venda Online, Venda Direta
  - **Valor de avaliação** (riscado / secundário)
  - **Preço do imóvel** (destaque dourado)
  - Botão "Falar com especialista" (WhatsApp)
- Dados virão do banco (tabela `properties`) — public read via server function.

### 4. Backend (Lovable Cloud)
Ativar Lovable Cloud e criar:

**Tabela `properties`**
| coluna | tipo |
|---|---|
| id | uuid pk |
| title | text |
| address | text |
| city | text |
| image_url | text |
| offer_type | enum (`primeiro_leilao`,`segundo_leilao`,`licitacao_aberta`,`venda_online`,`venda_direta`) |
| appraisal_value | numeric |
| price | numeric |
| description | text |
| active | boolean default true |
| created_at, updated_at | timestamptz |

- RLS: leitura pública (apenas `active=true`); INSERT/UPDATE/DELETE só para admins.

**Roles**
- Enum `app_role` (`admin`,`user`) + tabela `user_roles` + função `has_role` (padrão seguro).

**Storage**
- Bucket `properties` (público) para upload de fotos dos imóveis.

### 5. Autenticação
- Habilitar email/senha (Lovable Cloud).
- Rota `/auth` com login (e cadastro inicial para o primeiro admin — promoção manual via migração para o e-mail do Ícaro, ou rota oculta de seed).

### 6. Dashboard `/dashboard` (protegido)
- Rota sob `_authenticated/` (layout gerenciado pela integração).
- Verificação extra de role `admin` via `has_role`; usuários sem role veem mensagem "sem permissão".
- Tela com:
  - Tabela listando imóveis (título, tipo, preço, status)
  - Botão "Novo imóvel" → dialog/form (title, address, city, offer_type, appraisal_value, price, description, upload de imagem)
  - Ações por linha: Editar / Excluir (com confirmação)
- Operações via server functions (`createServerFn` + `requireSupabaseAuth`) que validam role admin antes de escrever.

### 7. Landing
- Buscar até 3 imóveis ativos via server function pública (admin client, projeção segura) e renderizar na seção nova.
- Caso vazio, mostrar estado "Em breve novas oportunidades".

### Detalhes técnicos
- Server fns em `src/lib/properties.functions.ts` (públicas: `listFeaturedProperties`; protegidas: `createProperty`, `updateProperty`, `deleteProperty`).
- Validações com Zod.
- Upload de imagem direto do browser para o bucket `properties` usando o client browser.
- Mascaramento de moeda BRL nos forms e formatação `Intl.NumberFormat('pt-BR')` na exibição.

### Pontos a confirmar
1. **E-mail do admin inicial** (Ícaro) para já receber a role `admin` via migração — qual usar?
2. Quero confirmar: usar **e-mail/senha** para o login do dashboard (recomendado, sem fricção) — ok?
