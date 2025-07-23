# Chatbot Ativa Futevôlei para WhatsApp

![Versão do Node.js](https://img.shields.io/badge/node-v18.0.0%2B-brightgreen)
![Licença](https://img.shields.io/badge/license-MIT-blue)

## 📖 Visão Geral

Este projeto é um chatbot com  IA para WhatsApp desenvolvido para a **Ativa Futevôlei**, uma escola de futevôlei no Rio de Janeiro. O bot, chamado **Jú**, funciona como uma assistente virtual inteligente, utilizando o poder do **Google Gemini** para interagir com os usuários.

O principal objetivo é automatizar o atendimento inicial, fornecendo informações, respondendo a perguntas frequentes e realizando o agendamento de aulas experimentais de forma fluida e humanizada.

## ✨ Principais Funcionalidades

O chatbot com IA foi projetado com uma série de funcionalidades para oferecer uma experiência completa e eficiente ao usuário:

* **Assistente Virtual com IA (Jú):** Utiliza o modelo `gemini-1.5-flash` do Google para entender as intenções do usuário, manter o contexto da conversa e fornecer respostas precisas com base em uma base de conhecimento pré-definida.

* **Menu Interativo Principal:** Ao iniciar a conversa, o usuário recebe um menu com as principais opções, facilitando a navegação:
    * Agendamento de Aula Experimental
    * Planos e Valores
    * Links para Material Esportivo
    * Informações sobre Torneios
    * Localização das Unidades no Maps
    * Formulário para Trabalhar na Ativa
    * Formulário para Propostas de Parceria

* **Agendamento Inteligente de Aulas:** Um fluxo de conversa completo para marcar aulas experimentais, que inclui:
    * Coleta de dados do aluno através de um formulário (nome, telefone, data, unidade, etc.).
    * Verificação de regras de negócio: O bot determina se a aula experimental é gratuita ou paga (R$30 ou R$50) com base na localização do usuário (morador do Rio, bairro próximo aos CTs, etc.).
    * Integração com planos de convênio como **Gympass, Totalpass e Classpass**, informando as condições específicas para esses usuários.
    * Instruções para pagamento via PIX para aulas avulsas, com confirmação após o envio do comprovante.

* **Envio de Mídia Local:** O bot envia imagens diretamente na conversa para uma experiência mais rica e visual, como nos fluxos de:
    * **Agendamento de Aula:** Envia uma imagem promocional.
    * **Planos e Valores:** Envia uma imagem com a tabela de preços.

* **Escalonamento para Atendimento Humano:** Caso o bot não consiga resolver a dúvida do usuário ou se o usuário solicitar explicitamente, um mecanismo de escalonamento é ativado, notificando um responsável humano para assumir a conversa.

* **Gerenciamento de Conversa:**
    * Ignora automaticamente mensagens enviadas em grupos.
    * Exibe o status "digitando..." para simular uma interação mais natural.

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução do JavaScript no servidor.
* **whatsapp-web.js:** Biblioteca principal para interagir com o WhatsApp Web, permitindo enviar e receber mensagens.
* **@google/generative-ai (Gemini):** SDK oficial do Google para integrar a inteligência artificial generativa do Gemini.
* [cite_start]**dotenv:** Para gerenciar variáveis de ambiente de forma segura, como chaves de API. 
* **qrcode-terminal:** Gera o QR Code de autenticação diretamente no terminal.

## 🚀 Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18.0.0 ou superior)
* NPM (geralmente instalado com o Node.js)
* Uma conta do WhatsApp ativa

### 1. Clonar o Repositório

```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO