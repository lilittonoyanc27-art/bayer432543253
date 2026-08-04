import { Situation, WordItem, WordDeepDive, CEFRLevel, SituationCategory, WordCategory } from './types';

export async function fetchGeneratedSituation(
  level: CEFRLevel,
  category: SituationCategory
): Promise<Situation | null> {
  try {
    const res = await fetch('/api/gemini/situation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, category }),
    });

    if (!res.ok) {
      console.warn('Failed to fetch situation from API, HTTP status:', res.status);
      return null;
    }

    const data = await res.json();
    return data as Situation;
  } catch (err) {
    console.error('Error calling /api/gemini/situation:', err);
    return null;
  }
}

export async function fetchGeneratedWord(
  category: WordCategory,
  level: CEFRLevel
): Promise<WordItem | null> {
  try {
    const res = await fetch('/api/gemini/word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, level }),
    });

    if (!res.ok) {
      console.warn('Failed to fetch word from API, HTTP status:', res.status);
      return null;
    }

    const data = await res.json();
    return data as WordItem;
  } catch (err) {
    console.error('Error calling /api/gemini/word:', err);
    return null;
  }
}

export async function fetchWordDeepDive(
  wordEs: string,
  translationHy: string
): Promise<WordDeepDive | null> {
  try {
    const res = await fetch('/api/gemini/word-deepdive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wordEs, translationHy }),
    });

    if (!res.ok) {
      console.warn('Failed to fetch word deep dive from API, status:', res.status);
      return null;
    }

    const data = await res.json();
    return data as WordDeepDive;
  } catch (err) {
    console.error('Error calling /api/gemini/word-deepdive:', err);
    return null;
  }
}
