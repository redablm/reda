import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk pour récupérer les questions
export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async () => {
  const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
  return response.data.results;
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quizSlice.reducer;
