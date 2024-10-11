
/**
 * Strategyは、異なる認証戦略を定義するための抽象クラスです。
 * このクラスは、認証プロセスの異なる段階における操作の基本的なインターフェースを提供します。
 * 各具体的な戦略クラスはこのStrategyクラスを継承し、各メソッドを実装する必要があります。
 */
export abstract class Strategy {
  /**
   * クエリパラメータを検証するための抽象メソッド。
   *
   * @param {any} query - 検証するクエリパラメータ。
   */
  abstract validate(query: {[key: string]:string | string[]}): void;

  /**
   * セキュリティチェックを行うための抽象メソッド。
   * 例えば、CSRFトークンの検証など、セキュリティ関連の検証を行います。
   */
  abstract securityCheck(): Promise<void>;

  /**
   * ユーザー登録を行うための抽象メソッド。
   * 登録プロセスの実装は戦略によって異なります。
   */
  abstract register(): Promise<void>;

  /**
   * 外部サービスからユーザープロファイルを取得するための抽象メソッド。
   * 例えば、LINE APIからユーザー情報を取得する実装が考えられます。
   */
  abstract lineProfile(): Promise<void>;

  abstract end(): void
}
