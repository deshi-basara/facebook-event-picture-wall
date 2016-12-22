import { FacebookEventPictureWallPage } from './app.po';

describe('facebook-event-picture-wall App', function() {
  let page: FacebookEventPictureWallPage;

  beforeEach(() => {
    page = new FacebookEventPictureWallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
