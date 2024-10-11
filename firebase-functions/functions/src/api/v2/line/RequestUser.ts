import {error, info} from "firebase-functions/logger";
import {ActressStrategy} from "./strategy/ActressStrategy";
import {Strategy} from "./strategy/base/Strategy";
import {AffiliatorStrategy} from "./strategy/AffiliatorStrategy";

/**
 * ユーザータイプを表す列挙型。
 */
enum UserType {
  Actress = 1,
  Affiliator = 2,
}

/**
 * ユーザータイプに基づいて戦略をマッピングするマップ。
 */
const userTypeWithStrategy = new Map<UserType, Strategy>([
  [UserType.Actress, new ActressStrategy()],
  [UserType.Affiliator, new AffiliatorStrategy()],
  // ここに追加
]);

/**
 * ユーザータイプ文字列に基づいて適切な戦略を取得します。
 *
 * @param {string} userTypeStr - ユーザータイプを表す文字列。
 * @return {Strategy} 指定されたユーザータイプに対応する戦略。
 * @throws {Error} 指定されたユーザータイプに対応する戦略が存在しない場合にエラーを投げます。
 */
function getStrategy(userTypeStr: string): Strategy {
  const userType = parseInt(userTypeStr);
  const strategy = userTypeWithStrategy.get(userType);
  if (!strategy) {
    throw new Error("対応する戦略が存在しません。");
  }
  return strategy;
}

/**
 * リクエストに対応するユーザーを表すクラス。
 */
export class RequestUser {
  private strategy: Strategy;
  private queryParams: {[key: string]: string};

  /**
   * RequestUserのインスタンスを作成します。
   *
   * @param {any} queryParams - リクエストのクエリパラメータ。
   */
  constructor(queryParams: {[key: string]: string}) {
    info(queryParams);
    this.queryParams = queryParams;
    const {type} = this.queryParams;
    this.strategy = getStrategy(type as string);
  }

  /**
   * 戦略の初期化処理を行います。
   *
   * @return {Promise<void>} 非同期処理を行います。
   */
  async init(): Promise<void> {
    await this.strategy.validate(this.queryParams);
  }

  /**
   * セキュリティチェックを行います。
   *
   * @return {Promise<void>} 非同期処理を行います。
   */
  async start(): Promise<void> {
    await this.strategy.securityCheck();
  }

  /**
   * ユーザー登録処理を行います。
   *
   * @return {Promise<void>} 非同期処理を行います。
   */
  async register(): Promise<void> {
    try {
      await this.strategy.lineProfile();
      await this.strategy.register();
    } catch (e: unknown) {
      error("register エラー", e);
    }
  }

  /**
   * リクエスト処理の最終化を行います。
   */
  end(): void {
    this.strategy.end();
  }
}
