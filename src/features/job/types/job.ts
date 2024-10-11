export type JobType = {
  id: string;
  job: {
    /* 案件見出し */
    title: string;
    /* サブタイトル(titleよりちょい長めなイメージ、カードで使う) */
    subtitle: string;
    /* 案件イメージ画像 */
    imageUrl: string;
    /* LINE Flex MessageのJSON文字列 */
    lineFlexMsgCard: string;

    /* フォーマット */
    format: string;

    /* 仕事条件・内容等 */
    details: {
      /* 撮影場所 */
      location: string;
      /* 拘束時間 */
      hours: string;
      /* 支払いについて */
      payment: string;
      /* ギャラ目安 */
      guarantee: string;
      /* 応募資格 */
      require: string;
      idCard: string;
      touch: string;
      karami: string;
    };

    jobStep: {
      step: number;
      text: string;
      hour: number;
      description: string;
    }[];

    tags?: string[];

    faq: {
      question: string;
      answer: string;
      priority?: number;
    }[];

    kuchikomi: {
      nickname?: string;
      title?: string;
      shootingDate: string;
      rating?: number;
      comment: string;
      priority?: number;
    }[];
  };
};
