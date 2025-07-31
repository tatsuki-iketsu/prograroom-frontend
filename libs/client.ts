// /libs/client.ts
import { createClient } from "microcms-js-sdk";

// 環境変数から情報を取得
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// 環境変数が設定されていない場合のエラーハンドリング
if (!serviceDomain || !apiKey) {
  throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required.");
}

// APIクライアントの作成
export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});
