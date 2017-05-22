import { MovieCollectionsPage } from './app.po';

describe('movie-collections App', () => {
  let page: MovieCollectionsPage;

  beforeEach(() => {
    page = new MovieCollectionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
