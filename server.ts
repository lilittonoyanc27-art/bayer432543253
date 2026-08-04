import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY process env variable is missing');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint 1: Generate a new Situation
app.post('/api/gemini/situation', async (req, res) => {
  try {
    const { level = 'A2', category = 'Restaurante' } = req.body;
    const ai = getGeminiClient();

    const prompt = `Genera una situación práctica e hiperrealista de la vida cotidiana en español para practicar conversación. 
El nivel CEFR es: ${level}.
La categoría o contexto es: ${category}.
El público objetivo es un estudiante que habla armenio.

Requisitos estrictos:
1. Una pregunta de situación en español con el formato "¿Qué harías si...?" o similar.
2. Traducción completa de la pregunta al armenio.
3. Exactamente 4 opciones de respuesta (A, B, C, D) en español con traducción al armenio.
4. Solo 1 opción debe ser la más natural, educada y correcta para la vida cotidiana en países hispanohablantes.
5. Para la opción correcta: explicar por qué es la mejor (en español) y dar una explicación detallada en armenio.
6. Para las opciones incorrectas/peores: explicar por qué son peores/inadecuadas (en español) y dar una explicación en armenio.
7. Opcional: una nota cultural útil en español y armenio.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            category: { type: Type.STRING },
            categoryHy: { type: Type.STRING },
            level: { type: Type.STRING },
            questionEs: { type: Type.STRING },
            questionHy: { type: Type.STRING },
            culturalNoteEs: { type: Type.STRING },
            culturalNoteHy: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  letter: { type: Type.STRING },
                  textEs: { type: Type.STRING },
                  textHy: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN },
                  whyBestEs: { type: Type.STRING },
                  whyWorseEs: { type: Type.STRING },
                  explanationHy: { type: Type.STRING },
                },
                required: ['id', 'letter', 'textEs', 'textHy', 'isCorrect', 'explanationHy'],
              },
            },
          },
          required: ['id', 'category', 'categoryHy', 'level', 'questionEs', 'questionHy', 'options'],
        },
      },
    });

    if (!response.text) {
      throw new Error('No text returned from Gemini API');
    }

    const data = JSON.parse(response.text);
    return res.json(data);
  } catch (error: any) {
    console.error('Error generating situation:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate situation' });
  }
});

// API Endpoint 2: Generate a new Word for Adivina la Palabra
app.post('/api/gemini/word', async (req, res) => {
  try {
    const { category = 'Viajes', level = 'A2' } = req.body;
    const ai = getGeminiClient();

    const prompt = `Genera un vocablo útil e interesante en español para un juego de adivinar palabras (Adivina la palabra).
Categoría: ${category}.
Nivel CEFR: ${level}.
Estudiante: Hablante de armenio.

Proporciona:
- Palabra en español (solo letras normales en español sin espacios si es palabra suelta, o expresión corta).
- Traducción al armenio.
- Pronunciación fonética guiada.
- Categoría y categoría en armenio.
- Nivel (${level}).
- Parte de la oración en español e armenio.
- Un ejemplo claro en español con traducción al armenio.
- 2 a 3 sinónimos y antónimos.
- Introducción a la definición en español y armenio.
- Contexto de uso en español.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            wordEs: { type: Type.STRING },
            translationHy: { type: Type.STRING },
            pronunciation: { type: Type.STRING },
            category: { type: Type.STRING },
            categoryHy: { type: Type.STRING },
            level: { type: Type.STRING },
            partOfSpeech: { type: Type.STRING },
            partOfSpeechHy: { type: Type.STRING },
            exampleEs: { type: Type.STRING },
            exampleHy: { type: Type.STRING },
            synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
            antonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
            definitionIntroEs: { type: Type.STRING },
            definitionIntroHy: { type: Type.STRING },
            usageContextEs: { type: Type.STRING },
          },
          required: [
            'id',
            'wordEs',
            'translationHy',
            'pronunciation',
            'category',
            'categoryHy',
            'level',
            'partOfSpeech',
            'partOfSpeechHy',
            'exampleEs',
            'exampleHy',
            'definitionIntroEs',
            'definitionIntroHy',
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error('No text returned from Gemini API');
    }

    const data = JSON.parse(response.text);
    return res.json(data);
  } catch (error: any) {
    console.error('Error generating word:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate word' });
  }
});

// API Endpoint 3: Deep dive explanation & exercises after word completion
app.post('/api/gemini/word-deepdive', async (req, res) => {
  try {
    const { wordEs, translationHy } = req.body;
    const ai = getGeminiClient();

    const prompt = `El estudiante acaba de adivinar la palabra en español: "${wordEs}" (traducción: "${translationHy}").
Genera un análisis explicativo profundo del profesor de IA para el estudiante de habla armenia:

1. Significado y matices detallados (en español y armenio).
2. Cuándo se utiliza / contextos clave (en español y armenio).
3. Errores típicos de los estudiantes con esta palabra (en español y armenio).
4. Palabras parecidas y diferencias de significado (en español y armenio).
5. De 5 a 10 ejemplos de oraciones reales en español con traducción al armenio.
6. Una mini-quiz (quiz de 2-3 preguntas de opción múltiple) para comprobar la comprensión.
7. 2 a 3 ejercicios de completar el espacio en blanco (fill in the blank).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            translationHy: { type: Type.STRING },
            meaningDetailEs: { type: Type.STRING },
            meaningDetailHy: { type: Type.STRING },
            whenToUseEs: { type: Type.STRING },
            whenToUseHy: { type: Type.STRING },
            commonMistakesEs: { type: Type.STRING },
            commonMistakesHy: { type: Type.STRING },
            similarWordsDiffEs: { type: Type.STRING },
            similarWordsDiffHy: { type: Type.STRING },
            sentenceExamples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  es: { type: Type.STRING },
                  hy: { type: Type.STRING },
                },
                required: ['es', 'hy'],
              },
            },
            miniQuiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  questionEs: { type: Type.STRING },
                  questionHy: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctOptionIndex: { type: Type.INTEGER },
                  explanationHy: { type: Type.STRING },
                },
                required: ['questionEs', 'questionHy', 'options', 'correctOptionIndex', 'explanationHy'],
              },
            },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sentenceWithBlank: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  answer: { type: Type.STRING },
                  translationHy: { type: Type.STRING },
                },
                required: ['sentenceWithBlank', 'options', 'answer', 'translationHy'],
              },
            },
          },
          required: [
            'word',
            'translationHy',
            'meaningDetailEs',
            'meaningDetailHy',
            'whenToUseEs',
            'whenToUseHy',
            'commonMistakesEs',
            'commonMistakesHy',
            'similarWordsDiffEs',
            'similarWordsDiffHy',
            'sentenceExamples',
            'miniQuiz',
            'exercises',
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error('No text returned from Gemini API');
    }

    const data = JSON.parse(response.text);
    return res.json(data);
  } catch (error: any) {
    console.error('Error generating deep dive:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate deep dive analysis' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HablaEspañol server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
