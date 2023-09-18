export const CHAIN_ID = "51";
export const NETWORK_NAME = "Apothem";
export const EXPLORER_URL = "https://explorer.apothem.network/txs/"
export const EXPLORER_WALLET_URL = "https://explorer.apothem.network/address/"
export const PLUGIN_CONTRACT = "0xb3db178db835b4dfcb4149b2161644058393267d";
export const PLUGIN_FDC_CONTRACT = "0x517136D576aFABF376159c5041D0133A4f3315b3"

export const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const getTxnStatus = async (txHash, provider) => {
    let transactionReceipt = null
    while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await provider.getTransactionReceipt(txHash);
        await sleep(3000)
    }
    if (transactionReceipt.status) {
        return [txHash, true];
    } else {
        return [txHash, false];
    }
}

