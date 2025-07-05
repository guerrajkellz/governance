// backend/api/businessDecisionFramework/data/fetchBdfData.js
import axios from 'axios';
import fs    from 'fs/promises';
import * as cfg from '../../../config/config.js';
import { getBdfToken } from '../../../apiTokens/bdf.js';

/**
 * Convert Date → "YYYYMMDD"  (always UTC to avoid TZ drift)
 */
function todayYyyyMmDd() {
  const d   = new Date();
  const y   = d.getUTCFullYear();
  const m   = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export async function fetchBdf() {
  /* ---- Local stub for dev -------------------------------------- */
  if (cfg.USE_MOCK === 'true') {
    return JSON.parse(
      await fs.readFile(new URL('../../../mock/bdf.json', import.meta.url))
    );
  }

  /* ---- Real POST call ------------------------------------------ */
  const token = await getBdfToken();

  const { data } = await axios.post(
    cfg.BDF_API_URL,                               // ← endpoint
    {
      lob:  'ccb',                                 // always lower‑case
      date: todayYyyyMmDd()                        // e.g. "20251111"
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;                                     // array of BDF rows
}
