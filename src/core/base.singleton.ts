export abstract class BaseSingleton<T> {
  private static instances: Map<string, any> = new Map()

  protected constructor() {}

  protected static getInstance<T>(this: new (...args: any[]) => T, ...args: any[]): T {
    const key = this.name

    if (!BaseSingleton.instances.has(key)) {
      BaseSingleton.instances.set(key, new this(...args))
    }

    return BaseSingleton.instances.get(key)
  }
}