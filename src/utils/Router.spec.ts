import { describe } from 'mocha';
import Router from './Router';
import { APP_ROOT_ELEMNT } from '../main';
import { ROUTES } from './conts';
import { expect } from 'chai';
import sinon from 'sinon';
import { MessengerPage, ProfilePage, SigninPage, SignupPage } from '../pages';

describe('Router', () => {
  const router = new Router(APP_ROOT_ELEMNT);
  beforeEach(() => {
    router
      .use(ROUTES.SIGNIN, SigninPage)
      .use(ROUTES.SINGUP, SignupPage)
      .use(ROUTES.PROFILE, ProfilePage)
      .use(ROUTES.MESSENGER, MessengerPage)
      .start();
  });

  it('Метод go', () => {
    router.go(ROUTES.PROFILE);
    expect(window.location.pathname).to.eq(ROUTES.PROFILE);
  });

  it('Метод forward', () => {
    const cb = sinon.spy(router, 'forward');

    router.forward();

    expect(cb.calledOnce).to.be.true;
  });

  it('Метод back', () => {
    const cb = sinon.spy(router, 'back');

    router.back();

    expect(cb.calledOnce).to.be.true;
  });
});
