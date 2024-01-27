import { Page, PageResponse } from "./page.models";


export abstract class Pageable<T> {
  buildPage(page: Page): Page {
    return {
      skip: page.skip ? Number(page.skip) * page.take : 0,
      take: page.take ? Number(page.take) : 25,
    };
  }

  buildPageResponse(items: T[], total: number): PageResponse<T> {
    return {
      items,
      total,
    };
  }
}