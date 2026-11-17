# LIA — TCC da Marcely

## ATUALIZAÇÃO 16/11/2026 — Banco de Dados e login didático

O site agora tem uma demonstração de **cadastro, entrada, nome no cabeçalho e botão Sair**, mantendo o projeto original.

| Arquivo | O que mudou |
| --- | --- |
| `banco.sql` | **NOVO** — cria banco `lia`, tabela `usuarios` e cinco registros fictícios no MySQL. |
| `dados/usuarios.json` | **NOVO** — cópia manual dos cinco usuários com senha de teste. |
| `dados/usuarios-exemplo.js` | **NOVO** — cópia para funcionar ao abrir o HTML diretamente pelo VSCode, quando `fetch` é bloqueado. |
| `auth-demo.js` | **NOVO** — verifica usuários fictícios, controla a sessão e mostra nome e botão Sair. |
| `entrar.html` | **NOVO** — tela para entrar com e-mail e senha. |
| `conta.html` | **MODIFICADO** — campo de senha fictícia, criação de sessão e exibição do perfil. |
| `index.html` | **MODIFICADO** — link Entrar e menu que reconhece a sessão. |
| `lia.js` | **MODIFICADO** — tela de boas-vindas aparece quando não há sessão ativa. |
| `navegacao.js` | **MODIFICADO** — mostra nome e Sair nas outras páginas que utilizam o cabeçalho global. |

**Localize as partes novas procurando `ATUALIZAÇÃO 16/11` no código.**

### Testar com usuário fictício

1. Abra `index.html` pelo VSCode ou pelo Explorador de Arquivos.
2. Clique em **Já tenho uma conta — Entrar**.
3. Digite **ana@lia.example** e a senha **lia12345**.
4. Ao entrar, veja **Olá, Ana** e **Sair** no menu.
5. Clique em **Sair**. A página volta ao início com a opção de login.

### Criar uma conta de demonstração

1. Entre na opção **Criar minha conta**.
2. Use somente nome, e-mail e demais informações **inventados**.
3. Crie uma senha fictícia de pelo menos seis caracteres e aceite o aviso de privacidade.
4. Clique em **Criar minha conta**. O perfil será salvo **somente neste navegador**, e o nome aparecerá no menu.
5. Após clicar em **Sair**, volte à tela Entrar e use o mesmo e-mail e a senha fictícia.
6. A tela `conta.html` também serve como edição/visualização do perfil da conta local.

**Contas antigas:** os registros que já existiam no navegador antes da atualização não tinham senha. Para voltar a entrar com uma dessas contas, será necessário cadastrar novamente dados fictícios e definir uma senha.

### Testar o banco SQL

1. Abra `banco.sql` em uma conexão MySQL já configurada.
2. Execute os comandos.
3. Confira os cinco registros pelo `SELECT id,nome,email FROM usuarios;`.

### Importante: limites da atividade

- **O MySQL não está conectado ao site.** O JSON é uma cópia manual de dados fictícios.
- Abrindo pelo `file://`, o login lê a cópia em `dados/usuarios-exemplo.js`; no HTTP/HTTPS ele tenta ler `dados/usuarios.json`.
- Cadastro feito pelo formulário não altera SQL ou JSON: fica no armazenamento local do navegador.
- O resumo de senha no JavaScript é **didático e não é segurança real**. A interface de login não protege arquivos HTML, diário ou outros dados locais.
- **Jamais use nomes reais, senhas reais, endereços, relatos de violência ou quaisquer informações sensíveis nesse cadastro.** Uma aplicação de apoio real exige back-end, autenticação e proteção de dados apropriados.
- O botão Sair encerra somente a sessão de demonstração. Não apaga o histórico nem os dados já armazenados no navegador.

As páginas, imagens e demais funcionalidades originais foram preservadas.
