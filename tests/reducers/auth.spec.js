import Immutable from 'immutable'

import auth, { initialState } from '../../app/reducers/auth'
import {
  authStart,
  authSuccess,
  authError,
  LOGOUT,
  userInitSuccess,
  userInitError
} from '../../app/actions/auth'
import {
  setSessionKey,
  getSessionKey,
  removeSessionKey
} from '../../app/modules/auth'


describe('auth reducer', () => {
  let sessionKey
  let user

  let authStartAction
  let authSuccessAction
  let authErrorAction
  let logoutAction
  let userInitSuccessAction
  let userInitErrorAction

  beforeEach(() => {
    sessionKey = 'SESSION KEY'
    user =  Immutable.Map({
      id: 1,
      firstname: 'FIRST_NAME',
      lastname: 'LAST_NAME'
    })

    authStartAction = authStart()
    authSuccessAction = authSuccess(sessionKey, user)
    authErrorAction = authError()
    logoutAction = { type: LOGOUT }
    userInitSuccessAction = userInitSuccess(user)
    userInitErrorAction = userInitError()
  })

  afterEach(() => {
    removeSessionKey()
  })

  // auth start
  describe('after auth start', () => {
    it('should be authenticating', () => {
      expect(initialState.get('isAuthenticating')).toBeFalsy()
      const after = auth(initialState, authStartAction)
      expect(after.get('isAuthenticating')).toBeTruthy()
    })
  })

  // auth success
  describe('after auth success', () => {
    it('should set session key', () => {
      expect(getSessionKey()).toBeFalsy()
      auth(initialState, authSuccessAction)
      expect(getSessionKey()).toEqual(sessionKey)
    })

    it('should set user after auth success', () => {
      expect(initialState.get('user')).toBeNull()
      const after = auth(initialState, authSuccessAction)
      expect(after.get('user')).toEqual(user)
    })

    it('should not be authenticating', () => {
      const before = initialState.merge({isAuthenticating: true})
      expect(before.get('isAuthenticating')).toBeTruthy()
      const after = auth(before, authSuccessAction)
      expect(after.get('isAuthenticating')).toBeFalsy()
    })

    it('should clear auth fail state', () => {
      const before = initialState.merge({ didAuthFail: true })
      expect(before.get('didAuthFail')).toBeTruthy()
      const after = auth(before, authSuccessAction)
      expect(after.get('didAuthFail')).toBeFalsy()
    })

    it('should clear user init fail state', () => {
      const before = initialState.merge({ didUserInitFail: true })
      expect(before.get('didUserInitFail')).toBeTruthy()
      const after = auth(before, authSuccessAction)
      expect(after.get('didUserInitFail')).toBeFalsy()
    })

    it('should clear error message', () => {
      const before = initialState.merge({ errorMessage: 'message' })
      const after = auth(before, authSuccessAction)
      expect(after.get('errorMessage')).toBeNull()
    })
  })

  // auth error
  describe('after auth error', () => {
    it('should not be authenticating', () => {
      const before = initialState.merge({ isAuthenticating: true })
      const after = auth(before, authErrorAction)
      expect(after.get('isAuthenticating')).toBeFalsy()
    })

    it('should set auth fail state', () => {
      const after = auth(initialState, authErrorAction)
      expect(initialState.get('didAuthFail')).toBeFalsy()
      expect(after.get('didAuthFail')).toBeTruthy()
    })

    it('should set error message', () => {
      const after = auth(initialState, authErrorAction)
      expect(initialState.get('errorMessage')).toBeNull()
      expect(after.get('errorMessage')).not.toBeNull()
    })
  })

  // logout
  describe('after logout', () => {
    it('should remove session key', () => {
      setSessionKey(sessionKey)
      expect(getSessionKey()).toEqual(sessionKey)
      auth(initialState, logoutAction)
      expect(getSessionKey()).toBeFalsy()
    })

    it('should initialize entire state', () => {
      const before = initialState.merge({ user, didUserInitFail: true })
      const after = auth(before, logoutAction)
      expect(after).toEqual(initialState)
    })
  })

  // user init success
  describe('after user init success', () => {
    it('should set user', () => {
      expect(initialState.get('user')).toBeNull()
      const after = auth(initialState, userInitSuccessAction)
      expect(after.get('user')).toEqual(user)
    })

    it('should clear user init fail state', () => {
      const before = initialState.merge({ didUserInitFail: true })
      const after = auth(before, userInitSuccessAction)
      expect(after.get('didUserInitFail')).toBeFalsy()
    })
  })

  // user init error
  describe('after user init error', () => {
    it('should set user init fail state', () => {
      const after = auth(initialState, userInitErrorAction)
      expect(after.get('didUserInitFail')).toBeTruthy()
    })
  })
})
