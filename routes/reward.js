const express = require('express');
const router = express.Router();
const contractService = require('../services/contractService');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/redeemable/:user/:token', async (req, res) => {
  try {
    const { user, token } = req.params;
    const amount = await contractService.redeemableAmount(user, token);
    res.json({ user, token, redeemableAmount: amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/redeem', async (req, res) => {
  try {
    const { user, token } = req.body;
    if (!user || !token) return res.status(400).json({ error: 'Missing user or token' });
    const receipt = await contractService.redeemTokens(user, token);
    res.json({ success: true, transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/batch-redeem', async (req, res) => {
  try {
    const { user, tokens } = req.body;
    if (!user || !tokens || !Array.isArray(tokens)) {
      return res.status(400).json({ error: 'Missing user or tokens array' });
    }
    const receipt = await contractService.batchRedeemTokens(user, tokens);
    res.json({ success: true, transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/set-admin', async (req, res) => {
  try {
    const { newAdmin } = req.body;
    if (!newAdmin) return res.status(400).json({ error: 'Missing newAdmin address' });
    const receipt = await contractService.setAdmin(newAdmin);
    res.json({ success: true, transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/set-recipient', async (req, res) => {
  try {
    const { newRecipient } = req.body;
    if (!newRecipient) return res.status(400).json({ error: 'Missing newRecipient address' });
    const receipt = await contractService.setRecipient(newRecipient);
    res.json({ success: true, transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/admin', async (req, res) => {
  try {
    const admin = await contractService.getAdmin();
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recipient', async (req, res) => {
  try {
    const recipient = await contractService.getRecipient();
    res.json({ recipient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
