const client = require('./whatsappClient.js'); 
const { getGeminiResponse } = require('./geminiService.js'); 

console.log('Iniciando o bot...');

// Escuta por mensagens recebidas
client.on('message', async msg => {
    try {
        // Obtém o objeto da conversa
        const chat = await msg.getChat();

        // **ALTERAÇÃO 1**: Ignora mensagens de grupo de forma robusta
        if (chat.isGroup) {
            console.log(`Mensagem em grupo ignorada. Grupo: '${chat.name}'`);
            return; 
        }

        // **ALTERAÇÃO 2**: Ativa o status "digitando..."
        await chat.sendStateTyping();

        const userId = msg.from;
        const userMessage = msg.body;

        if (!userMessage) {
            // Se a mensagem não tiver texto, limpa o status e para
            await chat.clearState();
            return;
        }
        
        console.log(`Mensagem recebida de ${userId}: ${userMessage}`);

        // Chama o serviço do Gemini (que agora tem um atraso embutido)
        const geminiResponse = await getGeminiResponse(userId, userMessage);

        // Envia a resposta final
        await msg.reply(geminiResponse);
        console.log(`Resposta enviada para ${userId}: ${geminiResponse}`);

    } catch (error) {
        console.error('Ocorreu um erro ao processar a mensagem:', error);
        // Tenta limpar o status "digitando..." em caso de erro
        try {
            const chat = await msg.getChat();
            await chat.clearState();
        } catch (clearError) {
            console.error('Erro ao tentar limpar o estado do chat:', clearError);
        }
    }
});

console.log('Bot pronto para receber mensagens.');