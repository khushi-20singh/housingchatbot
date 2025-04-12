import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const askQuestion = async (question) => {
  const context = "Affordable housing refers to housing units that are affordable by that section of society whose income is below the median household income. Government schemes like PMAY, DDA Housing Scheme, and others aim to provide affordable housing to low and middle-income groups.";

  const res = await axios.post(`${API_BASE}/ask/`, { question, context });
  return res.data.answer;
};

export const calculateBudget = async (income, expenses) => {
  const res = await axios.post(`${API_BASE}/budget/`, { income, expenses });
  return res.data;
};

export const analyzeImage = async (base64Image) => {
  const res = await axios.post(`${API_BASE}/analyze-image/`, { image: base64Image });
  return res.data;
};

