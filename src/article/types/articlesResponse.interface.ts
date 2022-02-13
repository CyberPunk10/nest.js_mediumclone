import { ArticleEntity } from '../article.entity';

export interface ArticlesResponseInteface {
  articles: ArticleEntity[];
  articlesCount: number;
}
