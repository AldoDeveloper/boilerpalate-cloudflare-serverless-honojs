import { BaseSingleton } from './base.singleton'
import type { EnvContext } from './context'

export abstract class BaseService extends BaseSingleton<BaseService> {
  protected ctx: EnvContext

  protected constructor(ctx: EnvContext) {
    super()
    this.ctx = ctx
  }
}