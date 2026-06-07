const { ethers } = require('ethers');
const dotenv = require('dotenv');
dotenv.config();

const ABI = require('../abi/RewardDistributor.json');

class ContractService {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, this.signer);
  }

  async redeemTokens(user, token) {
    const tx = await this.contract.redeemTokens(user, token);
    return await tx.wait();
  }

  async batchRedeemTokens(user, tokens) {
    const tx = await this.contract.batchRedeemTokens(user, tokens);
    return await tx.wait();
  }

  async redeemableAmount(user, token) {
    try {
      const amount = await this.contract.redeemableAmount(user, token);
      return amount.toString();
    } catch (error) {
      if (error.message.includes('No allowance') || error.message.includes('No redeemable balance')) {
        return '0';
      }
      throw error;
    }
  }

  async setAdmin(newAdmin) {
    const tx = await this.contract.setAdmin(newAdmin);
    return await tx.wait();
  }

  async setRecipient(newRecipient) {
    const tx = await this.contract.setRecipient(newRecipient);
    return await tx.wait();
  }

  async getAdmin() {
    return await this.contract.admin();
  }

  async getRecipient() {
    return await this.contract.recipient();
  }
}

module.exports = new ContractService();
