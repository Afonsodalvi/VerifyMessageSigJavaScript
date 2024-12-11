import { verifyMessage, keccak256, toUtf8Bytes } from "ethers";

// Mensagem original
const originalMessage = "Test message 11/12/2024";
// Assinatura correspondente
const signature = "0xed1110cd2af65e8bad933744abc7dca09a5af1392834b68488f958f386030c5511e8ea7c2bd18c1de996c9a57ca31b307a0de60d49ade657bd360cfa80094eaf1c";

async function verifyMessageWithEthers(originalMessage, signature) {
    try {
        // Calcula o hash da mensagem (keccak256)
        const messageHash = keccak256(toUtf8Bytes(originalMessage));
        
        // Converte o hash hex em bytes (Uint8Array)
        const messageBytes = Uint8Array.from(Buffer.from(messageHash.slice(2), 'hex'));

        // verifyMessage aplicará o prefixo Ethereum padrão (32 bytes)
        const recoveredAddress = verifyMessage(messageBytes, signature);

        console.log("Mensagem original:", originalMessage);
        console.log("Hash da Mensagem (keccak256):", messageHash);
        console.log("Assinatura:", signature);
        console.log("Endereço recuperado:", recoveredAddress);

        return recoveredAddress;
    } catch (error) {
        console.error("Erro ao verificar a assinatura:", error);
    }
}

verifyMessageWithEthers(originalMessage, signature)
    .then(recoveredAddress => {
        console.log("Endereço verificado:", recoveredAddress);
    })
    .catch(error => {
        console.error("Erro:", error);
    });
