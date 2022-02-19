import { ArticleType } from './article.type';

export interface ArticlesResponseInteface {
  articles: ArticleType[];
  articlesCount: number;
}
