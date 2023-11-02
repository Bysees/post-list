declare global {
  /**
   * ⚠️ FSD
   *
   * Its hack way to export redux infering types from @/app
   * and use it in @/shared/model/hooks.ts
   */


  declare type RootState = import('1_app/store').RootState
  declare type AppDispatch = import('1_app/store').AppDispatch
}

export {}
