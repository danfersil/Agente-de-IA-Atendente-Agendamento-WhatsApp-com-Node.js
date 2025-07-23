const client = require('./whatsappClient.js');
const { getGeminiResponse } = require('./geminiService.js');
const { MessageMedia } = require('whatsapp-web.js'); // Importa a classe MessageMedia
const fs = require('fs'); // Importa o módulo para lidar com arquivos (File System)
const path = require('path'); // Importa o módulo para lidar com caminhos de arquivos

console.log('Iniciando o bot...');

// Escuta por mensagens recebidas
client.on('message', async msg => {
    try {
        // Obtém o objeto da conversa
        const chat = await msg.getChat();

        // Ignora mensagens de grupo de forma robusta
        if (chat.isGroup) {
            console.log(`Mensagem em grupo ignorada. Grupo: '${chat.name}'`);
            return;
        }

        // Ativa o status "digitando..."
        await chat.sendStateTyping();

        const userId = msg.from;
        const userMessage = msg.body;

        if (!userMessage) {
            // Se a mensagem não tiver texto, limpa o status e para
            await chat.clearState();
            return;
        }

        console.log(`Mensagem recebida de ${userId}: ${userMessage}`);

        // Chama o serviço do Gemini
        const geminiResponse = await getGeminiResponse(userId, userMessage);

        // --- INÍCIO DAS ALTERAÇÕES PARA ENVIAR IMAGENS LOCAIS ---

        // Verifica se a resposta é para o fluxo de Agendamento
        if (geminiResponse.includes("📅 O Agend. Aulas")) {
            const imagePath = path.join(__dirname, 'images', 'agendamento.jpg');
            
            // Verifica se a imagem existe antes de enviar
            if (fs.existsSync(imagePath)) {
                // Carrega a mídia a partir do caminho do arquivo
                const media = MessageMedia.fromFilePath(imagePath);
                // Envia a imagem com uma legenda
                await client.sendMessage(msg.from, media, { caption: 'Que legal! Bora agendar!!! 🚀' });
            } else {
                console.error('ERRO: A imagem de agendamento não foi encontrada no caminho:', imagePath);
                msg.reply('Ops! Não consegui encontrar a imagem de agendamento, mas vamos continuar.');
            }
        }

        // Verifica se a resposta é para o fluxo de Planos e Valores
        if (geminiResponse.includes("✖️PLANOS E VALORES💵")) {
            const imagePath = path.join(__dirname, 'images', 'tabelaValores.jpg');

            // Verifica se a imagem existe
            if (fs.existsSync(imagePath)) {
                const media = MessageMedia.fromFilePath(imagePath);
                await client.sendMessage(msg.from, media, { caption: 'Confira nossos planos e valores!' });
            } else {
                console.error('ERRO: A imagem da tabela de valores não foi encontrada no caminho:', imagePath);
                msg.reply('Ops! Não encontrei a imagem da tabela de valores, mas aqui estão as informações por texto.');
            }
        }

        // --- FIM DAS ALTERAÇÕES ---

        // Envia a resposta de texto gerada pelo Gemini
        await msg.reply(geminiResponse);
        console.log(`Resposta enviada para ${userId}: ${geminiResponse}`);

    } catch (error) {
        console.error('Ocorreu um erro ao processar a mensagem:', error);
        try {
            const chat = await msg.getChat();
            await chat.clearState();
        } catch (clearError) {
            console.error('Erro ao tentar limpar o estado do chat:', clearError);
        }
    }
});

console.log('Bot pronto para receber mensagens.');